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
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">
          Platform Performance
        </CardTitle>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
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
          <div className="h-64 w-full bg-slate-100 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Performance Chart</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {platformData.map((data) => (
              <div key={data.platform} className="p-4 border rounded-md">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 mr-2">
                    {data.platform === "Instagram" && "📸"}
                    {data.platform === "Facebook" && "👍"}
                    {data.platform === "Twitter" && "🐦"}
                  </div>
                  <h3 className="font-medium">{data.platform}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Engagement
                    </span>
                    <span className="font-medium">
                      {data.engagement.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reach</span>
                    <span className="font-medium">
                      {data.reach.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      New Followers
                    </span>
                    <span className="font-medium">
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
