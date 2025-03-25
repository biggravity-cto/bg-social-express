import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfileSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md rounded-lg overflow-hidden bg-card">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl font-medium gradient-text">
            Personal Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Update your personal information and contact details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 ring-2 ring-primary/20">
              <AvatarImage src="https://i.pravatar.cc/150?img=32" />
              <AvatarFallback>HM</AvatarFallback>
            </Avatar>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="mb-2 rounded-full border-border hover:bg-accent/10 text-primary"
              >
                Change Avatar
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, GIF or PNG. Max size 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-foreground font-medium"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue="Hotel"
                className="rounded-md border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-foreground font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue="Manager"
                className="rounded-md border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="manager@hotel.com"
              className="rounded-md border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="rounded-md border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className="text-foreground font-medium">
              Preferred Language
            </Label>
            <Select defaultValue="en">
              <SelectTrigger
                id="language"
                className="rounded-md border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border shadow-md bg-card">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border py-4">
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-medium">
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-0 shadow-md rounded-lg overflow-hidden bg-card">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl font-medium gradient-text">
            Password
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label
              htmlFor="currentPassword"
              className="text-foreground font-medium"
            >
              Current Password
            </Label>
            <Input
              id="currentPassword"
              type="password"
              className="rounded-md border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="newPassword"
              className="text-foreground font-medium"
            >
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              className="rounded-md border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-foreground font-medium"
            >
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              className="rounded-md border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-border py-4">
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-medium">
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSettings;
