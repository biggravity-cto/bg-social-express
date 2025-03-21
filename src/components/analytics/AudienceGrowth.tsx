import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AudienceGrowth = () => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Audience Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="followers" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="mt-0">
            {/* Chart placeholder - in a real app, use a chart library */}
            <div className="h-64 w-full bg-slate-100 rounded-md flex items-center justify-center mb-4">
              <p className="text-muted-foreground">Followers Growth Chart</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">
                  Instagram
                </div>
                <div className="font-medium">12,345</div>
                <div className="text-xs text-green-600">+723 this month</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">
                  Facebook
                </div>
                <div className="font-medium">8,721</div>
                <div className="text-xs text-green-600">+412 this month</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">
                  Twitter
                </div>
                <div className="font-medium">5,432</div>
                <div className="text-xs text-green-600">+112 this month</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Naver</div>
                <div className="font-medium">3,876</div>
                <div className="text-xs text-green-600">+245 this month</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age distribution chart placeholder */}
              <div>
                <h3 className="text-sm font-medium mb-2">Age Distribution</h3>
                <div className="h-48 w-full bg-slate-100 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Age Chart</p>
                </div>
              </div>

              {/* Gender distribution chart placeholder */}
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Gender Distribution
                </h3>
                <div className="h-48 w-full bg-slate-100 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Gender Chart</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="mt-0">
            {/* Map chart placeholder */}
            <div className="h-64 w-full bg-slate-100 rounded-md flex items-center justify-center mb-4">
              <p className="text-muted-foreground">
                Geographic Distribution Map
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Top Locations</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>Seoul, South Korea</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>Tokyo, Japan</span>
                  <span className="font-medium">18%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>New York, USA</span>
                  <span className="font-medium">12%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>London, UK</span>
                  <span className="font-medium">8%</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>Singapore</span>
                  <span className="font-medium">6%</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AudienceGrowth;
