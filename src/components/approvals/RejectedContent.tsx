import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCw, Trash2 } from "lucide-react";

interface RejectedItem {
  id: string;
  title: string;
  platform: string;
  submittedBy: {
    name: string;
    avatar?: string;
    initials: string;
  };
  rejectedAt: string;
  rejectedBy: string;
  reason: string;
  content: string;
  image?: string;
}

interface RejectedContentProps {
  rejectedItems?: RejectedItem[];
}

const RejectedContent = ({
  rejectedItems = [
    {
      id: "1",
      title: "Discount Promotion for All Guests",
      platform: "Instagram",
      submittedBy: {
        name: "Sarah Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        initials: "SK",
      },
      rejectedAt: "Yesterday, 5:30 PM",
      rejectedBy: "Marketing Director",
      reason:
        "Discount percentage too high. Please revise to 15% instead of 30%.",
      content:
        "SPECIAL OFFER: 30% off all bookings this month! Use code SUMMER30 at checkout. Limited time only!",
      image:
        "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=600&q=80",
    },
    {
      id: "2",
      title: "Staff Party Announcement",
      platform: "Facebook",
      submittedBy: {
        name: "David Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
        initials: "DC",
      },
      rejectedAt: "3 days ago",
      rejectedBy: "HR Manager",
      reason:
        "Internal events should not be posted on public channels. Please use internal communication tools.",
      content:
        "Join us for the annual staff appreciation party this Friday at 8 PM in the Grand Ballroom. Food and drinks provided!",
      image:
        "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=600&q=80",
    },
  ],
}: RejectedContentProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <XCircle className="mr-2 h-5 w-5 text-red-500" />
          Rejected Content
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {rejectedItems.map((item) => (
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
                <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                  Rejected
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

              <div className="p-3 bg-red-50 rounded-md mb-3">
                <h5 className="text-xs font-medium text-red-700 mb-1">
                  Rejection Reason:
                </h5>
                <p className="text-sm text-gray-700">{item.reason}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <div>
                  <span>Rejected: {item.rejectedAt}</span>
                </div>
                <div>
                  <span>By: {item.rejectedBy}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                >
                  <RefreshCw className="mr-1 h-4 w-4" />
                  Revise & Resubmit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RejectedContent;
