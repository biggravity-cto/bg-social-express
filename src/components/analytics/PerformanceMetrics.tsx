import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PerformanceMetrics = () => {
  // In a real app, this would be dynamic data from an API
  const platformData = [
    { platform: "Instagram", engagement: 12453, reach: 78945, followers: 723 },
    { platform: "Facebook", engagement: 8765, reach: 45678, followers: 412 },
    { platform: "Twitter", engagement: 3674, reach: 17945, followers: 112 },
  ];

  return (
    <Card className="w-full bg-card shadow-md rounded-lg border-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
        <CardTitle className="text-lg font-medium gradient-text">
          Platform Performance
        </CardTitle>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px] border-border rounded-full text-foreground bg-background/50">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-border shadow-md bg-card">
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="naver">Naver</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart placeholder - in a real app, use a chart library */}
          <div className="h-64 w-full bg-background rounded-lg flex items-center justify-center mt-4">
            <p className="text-muted-foreground">Performance Chart</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {platformData.map((data) => (
              <div
                key={data.platform}
                className="p-4 border border-border rounded-lg bg-card/50 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 flex items-center justify-center bg-accent/10 rounded-full">
                    {data.platform === "Instagram" && (
                      <span className="text-pink-400">📸</span>
                    )}
                    {data.platform === "Facebook" && (
                      <span className="text-blue-400">👍</span>
                    )}
                    {data.platform === "Twitter" && (
                      <span className="text-sky-400">🐦</span>
                    )}
                  </div>
                  <h3 className="font-medium text-foreground">
                    {data.platform}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Engagement
                    </span>
                    <span className="font-medium text-foreground">
                      {data.engagement.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reach</span>
                    <span className="font-medium text-foreground">
                      {data.reach.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      New Followers
                    </span>
                    <span className="font-medium text-foreground">
                      {data.followers.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
