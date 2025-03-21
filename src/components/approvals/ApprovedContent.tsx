import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Share2 } from "lucide-react";

interface ApprovedItem {
  id: string;
  title: string;
  platform: string;
  submittedBy: {
    name: string;
    avatar?: string;
    initials: string;
  };
  approvedAt: string;
  scheduledFor: string;
  content: string;
  image?: string;
}

interface ApprovedContentProps {
  approvedItems?: ApprovedItem[];
}

const ApprovedContent = ({
  approvedItems = [
    {
      id: "1",
      title: "Summer Pool Party Announcement",
      platform: "Instagram",
      submittedBy: {
        name: "Sarah Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        initials: "SK",
      },
      approvedAt: "Yesterday, 3:45 PM",
      scheduledFor: "Tomorrow, 11:00 AM",
      content:
        "Beat the heat at our exclusive summer pool party! Join us for refreshing cocktails, live DJ, and summer vibes. Limited spots available!",
      image:
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&q=80",
    },
    {
      id: "2",
      title: "New Executive Chef Announcement",
      platform: "Facebook",
      submittedBy: {
        name: "David Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
        initials: "DC",
      },
      approvedAt: "2 days ago",
      scheduledFor: "Today, 2:00 PM",
      content:
        "We're thrilled to welcome Chef Michael Laurent to our culinary team! With 15 years of experience in Michelin-starred restaurants, he brings a fresh perspective to our menu.",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
    },
  ],
}: ApprovedContentProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          Approved Content
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {approvedItems.map((item) => (
            <div key={item.id} className="p-4 hover:bg-slate-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <div className="mr-3">
                    <Avatar>
                      {item.submittedBy.avatar ? (
                        <AvatarImage
                          src={item.submittedBy.avatar}
                          alt={item.submittedBy.name}
                        />
                      ) : (
                        <AvatarFallback>
                          {item.submittedBy.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span className="mr-2">{item.platform}</span>
                      <span>by {item.submittedBy.name}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  Approved
                </div>
              </div>

              {item.image && (
                <div className="mb-2 rounded-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-24 object-cover"
                  />
                </div>
              )}

              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {item.content}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>
                  <span>Approved: {item.approvedAt}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Scheduled: {item.scheduledFor}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="mr-1 h-4 w-4" />
                  Reschedule
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovedContent;
