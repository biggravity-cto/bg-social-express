import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Users,
  BarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const MetricCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: MetricCardProps) => {
  return (
    <Card className={cn("bg-white", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div
            className={cn(
              "flex items-center text-xs mt-2",
              trend.positive ? "text-green-500" : "text-red-500",
            )}
          >
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>{trend.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardSummaryProps {
  metrics?: {
    scheduledPosts: {
      count: number;
      trend: { value: string; positive: boolean };
    };
    pendingApprovals: {
      count: number;
      trend: { value: string; positive: boolean };
    };
    engagementRate: {
      value: string;
      trend: { value: string; positive: boolean };
    };
    audienceGrowth: {
      value: string;
      trend: { value: string; positive: boolean };
    };
  };
}

const DashboardSummary = ({
  metrics = defaultMetrics,
}: DashboardSummaryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 bg-gray-50 p-4 rounded-lg">
      <MetricCard
        title="Scheduled Posts"
        value={metrics.scheduledPosts.count.toString()}
        description="Posts scheduled across all platforms"
        icon={<Calendar className="h-5 w-5" />}
        trend={metrics.scheduledPosts.trend}
      />
      <MetricCard
        title="Pending Approvals"
        value={metrics.pendingApprovals.count.toString()}
        description="Content waiting for approval"
        icon={<CheckCircle className="h-5 w-5" />}
        trend={metrics.pendingApprovals.trend}
      />
      <MetricCard
        title="Engagement Rate"
        value={metrics.engagementRate.value}
        description="Average across all platforms"
        icon={<BarChart className="h-5 w-5" />}
        trend={metrics.engagementRate.trend}
      />
      <MetricCard
        title="Audience Growth"
        value={metrics.audienceGrowth.value}
        description="New followers this month"
        icon={<Users className="h-5 w-5" />}
        trend={metrics.audienceGrowth.trend}
      />
    </div>
  );
};

const defaultMetrics = {
  scheduledPosts: {
    count: 24,
    trend: { value: "+12% from last week", positive: true },
  },
  pendingApprovals: {
    count: 7,
    trend: { value: "-3% from last week", positive: true },
  },
  engagementRate: {
    value: "4.8%",
    trend: { value: "+0.6% from last month", positive: true },
  },
  audienceGrowth: {
    value: "+256",
    trend: { value: "+18% from last month", positive: true },
  },
};

export default DashboardSummary;
