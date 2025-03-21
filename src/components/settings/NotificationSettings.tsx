import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NotificationSettingProps {
  title: string;
  description: string;
  checked?: boolean;
}

const NotificationSetting = ({
  title,
  description,
  checked = false,
}: NotificationSettingProps) => {
  return (
    <div className="flex items-center justify-between space-x-4 py-3">
      <div className="flex-1 space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} />
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Configure which email notifications you receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotificationSetting
            title="Content Approvals"
            description="Receive notifications when content is submitted for your approval."
            checked={true}
          />
          <NotificationSetting
            title="Content Status Updates"
            description="Receive notifications when your content is approved or rejected."
            checked={true}
          />
          <NotificationSetting
            title="Scheduled Posts"
            description="Receive notifications when your scheduled posts are published."
            checked={true}
          />
          <NotificationSetting
            title="Performance Reports"
            description="Receive weekly performance reports for your content."
            checked={false}
          />
          <NotificationSetting
            title="Team Updates"
            description="Receive notifications about team member changes."
            checked={false}
          />
        </CardContent>
        <CardFooter>
          <Button>Save Email Preferences</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In-App Notifications</CardTitle>
          <CardDescription>
            Configure which notifications appear in the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotificationSetting
            title="Content Approvals"
            description="Show notifications when content is submitted for your approval."
            checked={true}
          />
          <NotificationSetting
            title="Content Status Updates"
            description="Show notifications when your content is approved or rejected."
            checked={true}
          />
          <NotificationSetting
            title="Scheduled Posts"
            description="Show notifications when your scheduled posts are published."
            checked={true}
          />
          <NotificationSetting
            title="Performance Alerts"
            description="Show notifications for significant changes in content performance."
            checked={true}
          />
          <NotificationSetting
            title="System Updates"
            description="Show notifications about system updates and maintenance."
            checked={false}
          />
        </CardContent>
        <CardFooter>
          <Button>Save In-App Preferences</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Delivery</CardTitle>
          <CardDescription>
            Configure how and when you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailFrequency">Email Frequency</Label>
            <Select defaultValue="realtime">
              <SelectTrigger id="emailFrequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
                <SelectItem value="none">Don't send emails</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Notification Timezone</Label>
            <Select defaultValue="asia-seoul">
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asia-seoul">Asia/Seoul (UTC+9)</SelectItem>
                <SelectItem value="america-newyork">
                  America/New_York (UTC-4)
                </SelectItem>
                <SelectItem value="europe-london">
                  Europe/London (UTC+1)
                </SelectItem>
                <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <NotificationSetting
            title="Do Not Disturb"
            description="Pause all notifications during specified hours."
            checked={false}
          />
        </CardContent>
        <CardFooter>
          <Button>Save Delivery Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationSettings;
