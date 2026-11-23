#!/usr/bin/env node
/**
 * Przygotowuje zdjęcia apartamentu do publikacji na stronie.
 *
 * Użycie:
 *   node scripts/optimize-photos.mjs <apartmentId> <folder-z-oryginałami> [--max 2400] [--quality 82]
 *
 * Przykład:
 *   node scripts/optimize-photos.mjs grzybowska-37 ../photo-originals-backup/grzybowska-37
 *
 * Co robi:
 *   - konwertuje JPG / PNG / WebP / TIFF / AVIF do WebP,
 *   - zmniejsza tylko zbyt duże zdjęcia (dłuższy bok ≤ --max), nigdy nie powiększa,
 *   - zachowuje proporcje – bez przycinania i rozciągania,
 *   - nie zmienia kolorystyki (zachowuje profil kolorów ICC),
 *   - usuwa metadane EXIF / XMP / IPTC (m.in. GPS, aparat, daty, autor),
 *   - zapisuje wynik do public/apartments/<apartmentId>/<nazwa>.webp,
 *   - wypisuje gotowe wpisy do wklejenia w lib/apartments.ts (z wymiarami).
 *
 * Skrypt NIE usuwa żadnych plików. Oryginałów nie trzymaj w folderze public.
 * Korzysta z biblioteki `sharp`, instalowanej razem z Next.js
 * (jeśli kiedyś jej zabraknie: `npm install --save-dev sharp`).
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import sharp from "sharp";

const INPUT_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".avif"]);

function parseArgs(argv) {
  const positional = [];
  const options = { max: 2400, quality: 82 };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--max") options.max = Number(argv[++i]);
    else if (argv[i] === "--quality") options.quality = Number(argv[++i]);
    else positional.push(argv[i]);
  }
  return { apartmentId: positional[0], inputDir: positional[1], ...options };
}

/** "IMG_7517.JPG" → "img-7517" */
function outputName(file) {
  return basename(file, extname(file))
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  const { apartmentId, inputDir, max, quality } = parseArgs(process.argv.slice(2));
  if (!apartmentId || !inputDir) {
    console.error("Użycie: node scripts/optimize-photos.mjs <apartmentId> <folder-z-oryginałami> [--max 2400] [--quality 82]");
    process.exit(1);
  }

  const outDir = resolve("public", "apartments", apartmentId);
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(inputDir))
    .filter((f) => INPUT_EXT.has(extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    console.error(`Brak zdjęć w folderze: ${inputDir}`);
    process.exit(1);
  }

  const names = new Set();
  const entries = [];
  let totalIn = 0;
  let totalOut = 0;

  for (const file of files) {
    const name = outputName(file);
    if (names.has(name)) throw new Error(`Dwa pliki dają tę samą nazwę wyjściową: ${name}.webp`);
    names.add(name);

    const input = join(inputDir, file);
    const output = join(outDir, `${name}.webp`);

    const info = await sharp(input)
      .rotate() // zastosuj orientację z EXIF, zanim metadane zostaną usunięte
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .keepIccProfile() // tylko profil kolorów; EXIF/XMP/IPTC są usuwane
      .webp({ quality, effort: 6, smartSubsample: true })
      .toFile(output);

    // Kontrola: w pliku wynikowym nie może być metadanych.
    const meta = await sharp(output).metadata();
    if (meta.exif || meta.xmp || meta.iptc) throw new Error(`Metadane pozostały w ${output}`);

    const inSize = (await stat(input)).size;
    totalIn += inSize;
    totalOut += info.size;
    entries.push({ src: `/apartments/${apartmentId}/${name}.webp`, width: info.width, height: info.height });
    console.error(`✓ ${file.padEnd(28)} → ${name}.webp  ${info.width}×${info.height}  ${kb(inSize)} → ${kb(info.size)}`);
  }

  console.error(`\n${files.length} zdjęć · ${kb(totalIn)} → ${kb(totalOut)} · zapisano w ${outDir}\n`);
  console.error("Wpisy do lib/apartments.ts (uzupełnij opisy alt i ustaw kolejność):\n");
  for (const e of entries) {
    console.log(`  { src: "${e.src}", width: ${e.width}, height: ${e.height}, alt: { pl: "TODO", en: "TODO" } },`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
