import {
  Award,
  BatteryCharging,
  Briefcase,
  Camera,
  Cloud,
  Eye,
  Fingerprint,
  Flame,
  Home,
  Layers,
  Monitor,
  Network,
  Shield,
  Sun,
  Target,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { defaultSiteContent, siteContentSchema, type SiteContent } from "../../shared/site-content";
import { PUBLIC_IMAGE_OPTIONS, getPublicImageOption } from "../../shared/public-images";

export type { SiteContent };
export { defaultSiteContent, siteContentSchema };
export { PUBLIC_IMAGE_OPTIONS, getPublicImageOption };

const iconMap: Record<string, LucideIcon> = {
  sun: Sun,
  camera: Camera,
  network: Network,
  battery: BatteryCharging,
  flame: Flame,
  home: Home,
  fingerprint: Fingerprint,
  wrench: Wrench,
  target: Target,
  eye: Eye,
  award: Award,
  users: Users,
  shield: Shield,
  zap: Zap,
  layers: Layers,
  monitor: Monitor,
  briefcase: Briefcase,
  cloud: Cloud,
};

export const resolveImageKey = (imageKey: string) => getPublicImageOption(imageKey).src;

export const resolveImageSource = (image?: {
  imageKey?: string;
  imageUrl?: string;
  imageSource?: "public" | "cloudinary";
}) => {
  if (image?.imageSource === "cloudinary" && image.imageUrl) return image.imageUrl;
  return resolveImageKey(image?.imageKey || "hero-solar");
};

export const resolveHeroImageSource = (hero: SiteContent["hero"]) => {
  if (hero.backgroundImageSource === "cloudinary" && hero.backgroundImageUrl) {
    return hero.backgroundImageUrl;
  }
  return resolveImageKey(hero.backgroundImageKey);
};

export const resolveIconKey = (iconKey: string) => iconMap[iconKey] || Sun;
