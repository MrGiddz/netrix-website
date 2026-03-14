import {
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  Package,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const adminNavItems: AdminNavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/content", label: "Content", icon: BookOpen },
  { href: "/catalog", label: "Catalog", icon: Package },
  { href: "/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/settings", label: "Settings", icon: Settings },
];
