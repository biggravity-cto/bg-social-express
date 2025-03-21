import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ApprovalItem {
  id: string;
  title: string;
  platform: string;
  submittedBy: {
    name: string;
    avatar?: string;
    initials: string;
  };
  submittedAt: string;
  scheduledFor: string;
  status: "pending" | "approved" | "rejected";
  content: string;
  image?: string;
}

interface PendingApprovalsProps {
  approvals?: ApprovalItem[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const PendingApprovals = ({
  approvals = [
    {
      id: "1",
      title: "Weekend Brunch Promotion",
      platform: "Instagram",
      submittedBy: {
        name: "Sarah Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        initials: "SK",
      },
      submittedAt: "2 hours ago",
      scheduledFor: "Tomorrow, 10:00 AM",
      status: "pending",
      content:
        "Join us this weekend for our special brunch menu featuring local ingredients and craft cocktails!",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    },
    {
      id: "2",
      title: "Spa Package Promotion",
      platform: "Facebook",
      submittedBy: {
        name: "David Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
        initials: "DC",
      },
      submittedAt: "5 hours ago",
      scheduledFor: "Friday, 2:00 PM",
      status: "pending",
      content:
        "Treat yourself to our luxury spa package. Book now and get 15% off on all treatments this month.",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
    },
    {
      id: "3",
      title: "Room Promotion for Korean Travelers",
      platform: "Naver",
      submittedBy: {
        name: "Min-ji Park",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=minji",
        initials: "MP",
      },
      submittedAt: "Yesterday",
      scheduledFor: "Next Monday, 9:00 AM",
      status: "pending",
      content:
        "특별 할인: 3박 이상 예약 시 30% 할인 및 무료 조식 제공. 지금 예약하세요!",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    },
  ],
  onApprove = () => {},
  onReject = () => {},
}: PendingApprovalsProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
          Pending Approvals
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-y-auto max-h-[320px]">
        <div className="divide-y">
          {approvals.map((item) => (
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
                  <span>Submitted: {item.submittedAt}</span>
                </div>
                <div>
                  <span>Scheduled: {item.scheduledFor}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                  onClick={() => onApprove(item.id)}
                >
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                  onClick={() => onReject(item.id)}
                >
                  <XCircle className="mr-1 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-slate-50 p-3">
        <Button variant="link" className="w-full text-sm text-muted-foreground">
          View all pending approvals
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PendingApprovals;
