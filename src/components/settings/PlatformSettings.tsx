import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PlatformCardProps {
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  lastSync?: string;
  username?: string;
}

const PlatformCard = ({
  name,
  icon,
  connected,
  lastSync,
  username,
}: PlatformCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{icon}</div>
            <CardTitle>{name}</CardTitle>
          </div>
          <Switch checked={connected} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        {connected ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Connected as:</span>
              <span className="font-medium">{username}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last synced:</span>
              <span>{lastSync}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Connect your {name} account to schedule and publish content.
          </p>
        )}
      </CardContent>
      <CardFooter>
        {connected ? (
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1">
              Refresh Token
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-red-600 hover:text-red-600 hover:bg-red-50"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button className="w-full">Connect {name}</Button>
        )}
      </CardFooter>
    </Card>
  );
};

const PlatformSettings = () => {
  const platforms = [
    {
      name: "Instagram",
      icon: "📸",
      connected: true,
      lastSync: "Today, 09:45 AM",
      username: "@hotelgrand",
    },
    {
      name: "Facebook",
      icon: "👍",
      connected: true,
      lastSync: "Today, 09:45 AM",
      username: "Grand Hotel Official",
    },
    {
      name: "Twitter",
      icon: "🐦",
      connected: false,
    },
    {
      name: "Naver",
      icon: "🇰🇷",
      connected: true,
      lastSync: "Yesterday, 02:30 PM",
      username: "그랜드호텔",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Platforms</CardTitle>
          <CardDescription>
            Manage your connected social media accounts and API keys.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <PlatformCard
                key={platform.name}
                name={platform.name}
                icon={platform.icon}
                connected={platform.connected}
                lastSync={platform.lastSync}
                username={platform.username}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Configure API settings for advanced integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex space-x-2">
              <Input
                id="apiKey"
                value="••••••••••••••••••••••••••••••"
                readOnly
                className="font-mono"
              />
              <Button variant="outline">Copy</Button>
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              placeholder="https://your-webhook-endpoint.com/hook"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save API Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlatformSettings;
