import React from "react";
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header
      className={`h-16 border-b border-border bg-card/50 backdrop-blur-sm px-6 flex items-center justify-between ${className}`}
    >
      <div className="flex items-center">
        <Link
          to="/"
          className="text-xl font-medium gradient-text hover:opacity-90 transition-opacity"
        >
          BG Social Express
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[240px] pl-10 h-10 rounded-full bg-background/50 border-border focus:border-primary"
          />
        </div>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-accent/10 text-foreground/70 hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-google-red rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[300px] rounded-lg shadow-md bg-card border-border"
          >
            <DropdownMenuLabel className="text-foreground font-medium">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-border" />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-accent/10 focus:bg-accent/10">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">
                    New approval request
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Sarah Kim submitted a post for approval
                  </span>
                  <span className="text-xs text-muted-foreground">
                    2 minutes ago
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-accent/10 focus:bg-accent/10">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">
                    Post published
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Weekend Brunch Special was published to Instagram
                  </span>
                  <span className="text-xs text-muted-foreground">
                    1 hour ago
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-accent/10 focus:bg-accent/10">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">
                    Content approved
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Your post was approved by the marketing director
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Yesterday
                  </span>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="border-border" />
            <DropdownMenuItem className="justify-center hover:bg-accent/10 focus:bg-accent/10">
              <Link to="/notifications" className="text-sm text-primary">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-accent/10 rounded-full">
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                <AvatarFallback>HM</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline text-foreground">
                Hotel Manager
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-lg shadow-md bg-card border-border"
          >
            <DropdownMenuLabel className="text-foreground font-medium">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-border" />
            <DropdownMenuItem className="hover:bg-accent/10 focus:bg-accent/10 text-foreground">
              <Link to="/settings" className="flex w-full">
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent/10 focus:bg-accent/10 text-foreground">
              Connected Accounts
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent/10 focus:bg-accent/10 text-foreground">
              Team Management
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-border" />
            <DropdownMenuItem className="hover:bg-accent/10 focus:bg-accent/10 text-foreground">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
