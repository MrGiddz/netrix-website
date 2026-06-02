import {
  BookOpen,
  CalendarDays,
  FileQuestion,
  FolderKanban,
  Image,
  LayoutDashboard,
  MessageSquareQuote,
  Package,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  section?: string;
};

export const adminNavItems: AdminNavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, section: "Main" },
  { href: "/content", label: "Content", icon: BookOpen, section: "Content" },
  { href: "/catalog", label: "Catalog", icon: Package, section: "Content" },
  { href: "/portfolio", label: "Portfolio", icon: FolderKanban, section: "Content" },
  { href: "/media", label: "Media Library", icon: Image, section: "Content" },
  { href: "/portfolio#testimonials", label: "Testimonials", icon: MessageSquareQuote, section: "Manage" },
  { href: "/portfolio#team", label: "Team", icon: Users, section: "Manage" },
  { href: "/portfolio#milestones", label: "Milestones", icon: CalendarDays, section: "Manage" },
  { href: "/content#faq", label: "FAQ", icon: FileQuestion, section: "Manage" },
  { href: "/settings", label: "Settings", icon: Settings, section: "System" },
];
