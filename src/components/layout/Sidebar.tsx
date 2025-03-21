import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  Sparkles,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({
  icon,
  label,
  href,
  active = false,
}: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

interface SidebarProps {
  activePath?: string;
}

const Sidebar = ({ activePath }: SidebarProps) => {
  const location = useLocation();
  const currentPath = activePath || location.pathname;

  const navItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Content Calendar",
      href: "/calendar",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      label: "AI Content Generator",
      href: "/generator",
    },
    {
      icon: <CheckSquare className="w-5 h-5" />,
      label: "Approval Workflow",
      href: "/approvals",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Analytics",
      href: "/analytics",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">BG Social Express</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Hospitality Social Suite
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={currentPath === item.href}
          />
        ))}
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
