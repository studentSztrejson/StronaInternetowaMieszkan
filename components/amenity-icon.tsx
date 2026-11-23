import type { ComponentType } from "react";
import type { AmenityKey } from "@/lib/amenities";
import {
  IconBalcony,
  IconCoffee,
  IconElevator,
  IconFlame,
  IconKey,
  IconKitchen,
  IconLaptop,
  IconParking,
  IconSnowflake,
  IconTv,
  IconWasher,
  IconWifi,
  type IconProps,
} from "@/components/icons";

export const AMENITY_ICONS: Record<AmenityKey, ComponentType<IconProps>> = {
  wifi: IconWifi,
  kitchen: IconKitchen,
  coffeeMachine: IconCoffee,
  airConditioning: IconSnowflake,
  heating: IconFlame,
  washer: IconWasher,
  tv: IconTv,
  workspace: IconLaptop,
  elevator: IconElevator,
  parking: IconParking,
  balcony: IconBalcony,
  selfCheckIn: IconKey,
};

export function AmenityIcon({ amenity, ...props }: IconProps & { amenity: AmenityKey }) {
  const Icon = AMENITY_ICONS[amenity];
  return <Icon {...props} />;
}
