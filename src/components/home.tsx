import React from "react";
import { Suspense } from "react";
import DashboardSummary from "./dashboard/DashboardSummary";
import UpcomingPosts from "./dashboard/UpcomingPosts";
import PendingApprovals from "./dashboard/PendingApprovals";
import QuickActions from "./dashboard/QuickActions";
import { Bell, Settings, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

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
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-gray-600 hover:bg-gray-100",
      )}
    >
      <div className="text-current">{icon}</div>
      <span>{label}</span>
    </a>
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
      icon: <div className="w-5 h-5">🏠</div>,
    },
    {
      id: "calendar",
      label: "Content Calendar",
      icon: <div className="w-5 h-5">📅</div>,
    },
    {
      id: "generator",
      label: "AI Content Generator",
      icon: <div className="w-5 h-5">✨</div>,
    },
    {
      id: "approvals",
      label: "Approval Workflow",
      icon: <div className="w-5 h-5">✓</div>,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <div className="w-5 h-5">📊</div>,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <div className="w-5 h-5">⚙️</div>,
    },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">BG Social Express</h1>
      </div>
      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarLink
              key={link.id}
              icon={link.icon}
              label={link.label}
              active={activeLink === link.id}
              href={`#${link.id}`}
            />
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=hotel-manager" />
            <AvatarFallback>HM</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Hotel Manager</p>
            <p className="text-xs text-gray-500 truncate">manager@hotel.com</p>
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
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <form onSubmit={handleSearch} className="w-1/3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            name="search"
            placeholder="Search..."
            className="w-full pl-9 h-9"
          />
        </div>
      </form>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Settings size={20} />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
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
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
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
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <DashboardSummary />
        <QuickActions />
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
