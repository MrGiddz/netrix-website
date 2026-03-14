import {
  Award,
  BatteryCharging,
  Camera,
  Eye,
  Fingerprint,
  Flame,
  Home,
  Network,
  Shield,
  Sun,
  Target,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import heroSolar from "@/assets/hero-solar.jpg";
import serviceCctv from "@/assets/service-cctv.jpg";
import serviceCabling from "@/assets/service-cabling.jpg";
import serviceInverter from "@/assets/service-inverter.jpg";
import gallerySolar1 from "@/assets/gallery-solar-1.jpg";
import gallerySolar2 from "@/assets/gallery-solar-2.jpg";
import galleryCctv1 from "@/assets/gallery-cctv-1.jpg";
import galleryCabling1 from "@/assets/gallery-cabling-1.jpg";
import galleryInverter1 from "@/assets/gallery-inverter-1.jpg";
import galleryAutomation1 from "@/assets/gallery-automation-1.jpg";
import teamCeo from "@/assets/team-ceo.jpg";
import teamOps from "@/assets/team-ops.jpg";
import teamTech from "@/assets/team-tech.jpg";
import { defaultSiteContent, siteContentSchema, type SiteContent } from "../../shared/site-content";

export type { SiteContent };
export { defaultSiteContent, siteContentSchema };

const imageMap: Record<string, string> = {
  "hero-solar": heroSolar,
  "service-cctv": serviceCctv,
  "service-cabling": serviceCabling,
  "service-inverter": serviceInverter,
  "gallery-solar-1": gallerySolar1,
  "gallery-solar-2": gallerySolar2,
  "gallery-cctv-1": galleryCctv1,
  "gallery-cabling-1": galleryCabling1,
  "gallery-inverter-1": galleryInverter1,
  "gallery-automation-1": galleryAutomation1,
  "team-ceo": teamCeo,
  "team-ops": teamOps,
  "team-tech": teamTech,
};

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
};

export const resolveImageKey = (imageKey: string) => imageMap[imageKey] || heroSolar;

export const resolveIconKey = (iconKey: string) => iconMap[iconKey] || Sun;
