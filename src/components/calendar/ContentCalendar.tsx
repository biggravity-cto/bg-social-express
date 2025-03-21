import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  subWeeks,
  eachDayOfInterval,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Filter } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  status: "draft" | "scheduled" | "published";
  time: string;
  image?: string;
}

interface CalendarDay {
  date: Date;
  posts: Post[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

interface ContentCalendarProps {
  initialDate?: Date;
  posts?: Record<string, Post[]>;
  onCreatePost?: () => void;
  onEditPost?: (postId: string) => void;
}

const platformColors = {
  instagram: "bg-pink-100 text-pink-600 hover:bg-pink-200",
  facebook: "bg-blue-100 text-blue-600 hover:bg-blue-200",
  twitter: "bg-sky-100 text-sky-600 hover:bg-sky-200",
  linkedin: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
};

const statusColors = {
  draft: "bg-gray-100 text-gray-600",
  scheduled: "bg-amber-100 text-amber-600",
  published: "bg-green-100 text-green-600",
};

const platformIcons = {
  instagram: "📸",
  facebook: "👍",
  twitter: "🐦",
  linkedin: "💼",
};

const generateMockPosts = (): Record<string, Post[]> => {
  const today = new Date();
  const posts: Record<string, Post[]> = {};

  // Generate posts for the next 14 days
  for (let i = 0; i < 14; i++) {
    const date = addDays(today, i);
    const dateStr = format(date, "yyyy-MM-dd");

    // Random number of posts per day (0-3)
    const numPosts = Math.floor(Math.random() * 4);

    if (numPosts > 0) {
      posts[dateStr] = [];

      for (let j = 0; j < numPosts; j++) {
        const platforms = [
          "instagram",
          "facebook",
          "twitter",
          "linkedin",
        ] as const;
        const statuses = ["draft", "scheduled", "published"] as const;

        const platform =
          platforms[Math.floor(Math.random() * platforms.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        const hours = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
        const minutes = ["00", "15", "30", "45"][Math.floor(Math.random() * 4)];
        const ampm = hours >= 12 ? "PM" : "AM";

        const post: Post = {
          id: `post-${dateStr}-${j}`,
          title: [
            "Weekend Special",
            "New Menu Item",
            "Hotel Promotion",
            "Event Announcement",
            "Holiday Special",
          ][Math.floor(Math.random() * 5)],
          platform,
          status,
          time: `${hours % 12 || 12}:${minutes} ${ampm}`,
        };

        // Add image to some posts
        if (Math.random() > 0.5) {
          const imageIds = [
            "1467003909585-2f8a72700288",
            "1445019980597-93fa8acb246c",
            "1414235077428-338989a2e8c0",
            "1504674900247-0877df9cc836",
          ];
          post.image = `https://images.unsplash.com/photo-${imageIds[Math.floor(Math.random() * imageIds.length)]}?w=150&q=80`;
        }

        posts[dateStr].push(post);
      }
    }
  }

  return posts;
};

const defaultPosts = generateMockPosts();

const ContentCalendar: React.FC<ContentCalendarProps> = ({
  initialDate = new Date(),
  posts = defaultPosts,
  onCreatePost = () => console.log("Create post clicked"),
  onEditPost = (id) => console.log(`Edit post ${id} clicked`),
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [view, setView] = useState<"week" | "month">("week");
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });

  const navigatePrevious = () => {
    if (view === "week") {
      setCurrentDate(subWeeks(currentDate, 1));
    } else {
      // Handle month view navigation
    }
  };

  const navigateNext = () => {
    if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      // Handle month view navigation
    }
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  const weekDays = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, 6),
  });

  const getPostsForDay = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    let dayPosts = posts[dateStr] || [];

    // Apply platform filter
    if (platformFilter !== "all") {
      dayPosts = dayPosts.filter((post) => post.platform === platformFilter);
    }

    return dayPosts;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Content Calendar</h1>
          <p className="text-muted-foreground">
            Plan and schedule your social media content
          </p>
        </div>
        <Button onClick={onCreatePost}>
          <Plus className="mr-2 h-4 w-4" /> Create Post
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={navigatePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={navigateToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="text-lg font-medium">
            {format(startDate, "MMMM d")} -{" "}
            {format(addDays(startDate, 6), "MMMM d, yyyy")}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={view}
            onValueChange={(v) => setView(v as "week" | "month")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div key={day.toString()} className="text-center">
            <div className="font-medium mb-1">{format(day, "EEE")}</div>
            <div
              className={cn(
                "rounded-full w-8 h-8 flex items-center justify-center mx-auto",
                isToday(day)
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600",
              )}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dayPosts = getPostsForDay(day);

          return (
            <div
              key={day.toString()}
              className={cn(
                "min-h-[200px] border rounded-lg p-2",
                isToday(day)
                  ? "border-primary/50 bg-primary/5"
                  : "border-gray-200",
              )}
            >
              {dayPosts.length > 0 ? (
                <div className="space-y-2">
                  {dayPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-2 rounded-md border bg-white cursor-pointer hover:shadow-sm transition-shadow"
                      onClick={() => onEditPost(post.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <Badge
                          className={platformColors[post.platform]}
                          variant="outline"
                        >
                          {platformIcons[post.platform]} {post.platform}
                        </Badge>
                        <Badge
                          className={statusColors[post.status]}
                          variant="outline"
                        >
                          {post.status}
                        </Badge>
                      </div>
                      <div className="font-medium text-sm truncate">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500">{post.time}</div>
                      {post.image && (
                        <div className="mt-1 h-12 rounded overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground"
                    onClick={onCreatePost}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentCalendar;
