import type { ComponentType } from "react";
import type { AmenityKey } from "@/lib/amenities";
import {
  IconBalcony,
  IconBuilding,
  IconCoffee,
  IconDishwasher,
  IconElevator,
  IconFlame,
  IconHairDryer,
  IconKey,
  IconKitchen,
  IconLaptop,
  IconOven,
  IconPlayground,
  IconSkyline,
  IconSnowflake,
  IconTerrace,
  IconTv,
  IconWasher,
  IconWifi,
  type IconProps,
} from "@/components/icons";

export const AMENITY_ICONS: Record<AmenityKey, ComponentType<IconProps>> = {
  wifi: IconWifi,
  airConditioning: IconSnowflake,
  kitchen: IconKitchen,
  oven: IconOven,
  dishwasher: IconDishwasher,
  washer: IconWasher,
  hairDryer: IconHairDryer,
  tv: IconTv,
  workspace: IconLaptop,
  privateBalcony: IconBalcony,
  cityView: IconSkyline,
  sharedTerrace: IconTerrace,
  commonAreas: IconBuilding,
  playground: IconPlayground,
  coffeeMachine: IconCoffee,
  heating: IconFlame,
  elevator: IconElevator,
  balcony: IconBalcony,
  selfCheckIn: IconKey,
};

export function AmenityIcon({ amenity, ...props }: IconProps & { amenity: AmenityKey }) {
  const Icon = AMENITY_ICONS[amenity];
  return <Icon {...props} />;
}
