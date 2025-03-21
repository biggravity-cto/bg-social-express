import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Heart, BarChart3 } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  platform: string;
  publishedAt: string;
  image?: string;
  engagement: {
    impressions: number;
    likes: number;
    comments: number;
  };
  performanceScore: number;
}

const TopPerformingContent = () => {
  // In a real app, this would be dynamic data from an API
  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "Luxury Suite Promotion for Summer Getaways",
      platform: "Instagram",
      publishedAt: "3 days ago",
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
      engagement: {
        impressions: 12453,
        likes: 843,
        comments: 67,
      },
      performanceScore: 92,
    },
    {
      id: "2",
      title: "Behind the Scenes: Our Award-Winning Restaurant",
      platform: "Facebook",
      publishedAt: "1 week ago",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      engagement: {
        impressions: 8765,
        likes: 632,
        comments: 45,
      },
      performanceScore: 87,
    },
    {
      id: "3",
      title: "Meet Our New Executive Chef",
      platform: "Twitter",
      publishedAt: "2 weeks ago",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
      engagement: {
        impressions: 5432,
        likes: 321,
        comments: 28,
      },
      performanceScore: 78,
    },
    {
      id: "4",
      title: "한국 여행객을 위한 특별 패키지 - 서울에서 3시간 거리",
      platform: "Naver",
      publishedAt: "3 weeks ago",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      engagement: {
        impressions: 7654,
        likes: 543,
        comments: 89,
      },
      performanceScore: 85,
    },
  ];

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Top Performing Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contentItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-slate-50"
            >
              {item.image && (
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  <Badge variant="outline" className="mr-2">
                    {item.platform}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.publishedAt}
                  </span>
                </div>
                <h3 className="text-sm font-medium mb-2">{item.title}</h3>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{item.engagement.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{item.engagement.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span>{item.engagement.comments.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 font-medium">
                  {item.performanceScore}
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  Score
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformingContent;
