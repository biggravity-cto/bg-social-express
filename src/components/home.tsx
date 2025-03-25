import React, { useState } from "react";
import { Suspense } from "react";
import DashboardSummary from "./dashboard/DashboardSummary";
import UpcomingPosts from "./dashboard/UpcomingPosts";
import PendingApprovals from "./dashboard/PendingApprovals";
import QuickActions from "./dashboard/QuickActions";
import {
  Bell,
  Settings,
  Search,
  User,
  Home as HomeIcon,
  Calendar,
  Sparkles,
  CheckSquare,
  BarChart3,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  active = false,
  href = "#",
  onClick,
}) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-full transition-colors",
        active
          ? "bg-primary/20 text-primary"
          : "text-foreground/70 hover:bg-card hover:text-foreground",
      )}
    >
      <div
        className={cn(
          "text-current",
          active ? "text-primary" : "text-foreground/70",
        )}
      >
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
};

interface SidebarProps {
  activeLink?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeLink = "dashboard" }) => {
  const links = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HomeIcon className="w-5 h-5" />,
      path: "/",
    },
    {
      id: "calendar",
      label: "Content Calendar",
      icon: <Calendar className="w-5 h-5" />,
      path: "/calendar",
    },
    {
      id: "generator",
      label: "AI Content Generator",
      icon: <Sparkles className="w-5 h-5" />,
      path: "/generator",
    },
    {
      id: "approvals",
      label: "Approval Workflow",
      icon: <CheckSquare className="w-5 h-5" />,
      path: "/approvals",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/analytics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/settings",
    },
  ];

  return (
    <div className="w-64 h-full bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold gradient-text">BG Social Express</h1>
      </div>
      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarLink
              key={link.id}
              icon={link.icon}
              label={link.label}
              active={activeLink === link.id}
              href={link.path}
            />
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 ring-2 ring-primary/20">
            <AvatarImage src="https://i.pravatar.cc/150?img=32" />
            <AvatarFallback>HM</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Hotel Manager</p>
            <p className="text-xs text-muted-foreground truncate">
              manager@hotel.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch = () => {} }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-6">
      <form onSubmit={handleSearch} className="w-1/3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
          <Input
            type="search"
            name="search"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 h-10 rounded-full bg-background/50 border-border focus:border-primary"
          />
        </div>
      </form>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground/70 hover:text-foreground rounded-full"
        >
          <Bell size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground/70 hover:text-foreground rounded-full"
        >
          <Settings size={20} />
        </Button>
        <Avatar className="h-9 w-9 ring-2 ring-primary/20">
          <AvatarImage src="https://i.pravatar.cc/150?img=12" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children = null,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine active link based on current path
  let activeLink = "dashboard";
  if (currentPath === "/") activeLink = "dashboard";
  else if (currentPath.includes("/calendar")) activeLink = "calendar";
  else if (currentPath.includes("/generator")) activeLink = "generator";
  else if (currentPath.includes("/approvals")) activeLink = "approvals";
  else if (currentPath.includes("/analytics")) activeLink = "analytics";
  else if (currentPath.includes("/settings")) activeLink = "settings";

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeLink={activeLink} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <QuickActions />
        </div>
        <DashboardSummary />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UpcomingPosts />
          </div>
          <div>
            <PendingApprovals />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
