import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
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
  isSameMonth,
  startOfMonth,
  endOfMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

interface Post {
  id: string;
  title: string;
  platform: "instagram" | "facebook" | "twitter" | "linkedin";
  status: "draft" | "scheduled" | "published";
  time: string;
  image?: string;
  type?: string;
}

interface ContentCalendarProps {
  initialDate?: Date;
  posts?: Record<string, Post[]>;
  onCreatePost?: () => void;
  onEditPost?: (postId: string) => void;
  onGenerateByType?: (type: string, date: Date) => void;
  postType?: string;
  view?: "grid" | "list";
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

const postTypeIcons = {
  promotion: "🏷️",
  event: "🎉",
  announcement: "📢",
  menu: "🍽️",
  holiday: "🎄",
};

const generateMockPosts = (): Record<string, Post[]> => {
  const today = new Date();
  const posts: Record<string, Post[]> = {};

  const postTypes = ["promotion", "event", "announcement", "menu", "holiday"];

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
        const type = postTypes[Math.floor(Math.random() * postTypes.length)];

        const hours = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
        const minutes = ["00", "15", "30", "45"][Math.floor(Math.random() * 4)];
        const ampm = hours >= 12 ? "PM" : "AM";

        const titles = {
          promotion: ["Weekend Special", "Happy Hour Deal", "Limited Offer"],
          event: ["Live Music Night", "Chef's Table", "Wine Tasting"],
          announcement: [
            "New Staff Member",
            "Renovation Complete",
            "Extended Hours",
          ],
          menu: ["New Menu Item", "Seasonal Specials", "Chef's Recommendation"],
          holiday: [
            "Holiday Special",
            "Christmas Menu",
            "New Year's Eve Party",
          ],
        };

        const titleOptions =
          titles[type as keyof typeof titles] || titles.promotion;

        const post: Post = {
          id: `post-${dateStr}-${j}`,
          title: titleOptions[Math.floor(Math.random() * titleOptions.length)],
          platform,
          status,
          time: `${hours % 12 || 12}:${minutes} ${ampm}`,
          type,
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
  onGenerateByType = (type, date) =>
    console.log(`Generate ${type} for ${date}`),
  postType = "all",
  view = "grid",
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [calendarView, setCalendarView] = useState<"week" | "month">("week");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });

  const navigatePrevious = () => {
    if (calendarView === "week") {
      setCurrentDate(subWeeks(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 4));
    }
  };

  const navigateNext = () => {
    if (calendarView === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 4));
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

    // Apply post type filter
    if (postType !== "all") {
      dayPosts = dayPosts.filter((post) => post.type === postType);
    }

    return dayPosts;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const handleCreateForDay = (date: Date) => {
    setSelectedDate(date);
    onCreatePost();
  };

  const handleGenerateForDay = (date: Date) => {
    setSelectedDate(date);
    // Open a popover with post type options
  };

  const renderCalendarGrid = () => (
    <>
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {weekDays.map((day) => (
          <div key={day.toString()} className="text-center">
            <div className="font-medium mb-1 text-xs md:text-sm">
              {format(day, "EEE")}
            </div>
            <div
              className={cn(
                "rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center mx-auto text-xs md:text-sm",
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

      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {weekDays.map((day) => {
          const dayPosts = getPostsForDay(day);

          return (
            <div
              key={day.toString()}
              className={cn(
                "min-h-[150px] md:min-h-[200px] border rounded-lg p-1 md:p-2 overflow-y-auto",
                isToday(day)
                  ? "border-primary/50 bg-primary/5"
                  : "border-gray-200",
              )}
            >
              {dayPosts.length > 0 ? (
                <div className="space-y-1 md:space-y-2">
                  {dayPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-1 md:p-2 rounded-md border bg-white cursor-pointer hover:shadow-sm transition-shadow"
                      onClick={() => onEditPost(post.id)}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-1 mb-1">
                        <Badge
                          className={`${platformColors[post.platform]} text-xs whitespace-nowrap`}
                          variant="outline"
                        >
                          {platformIcons[post.platform]} {post.platform}
                        </Badge>
                        <Badge
                          className={`${statusColors[post.status]} text-xs whitespace-nowrap`}
                          variant="outline"
                        >
                          {post.status}
                        </Badge>
                      </div>
                      <div className="font-medium text-xs md:text-sm truncate">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500">{post.time}</div>
                      {post.image && (
                        <div className="mt-1 h-10 md:h-12 rounded overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {post.type && (
                        <div className="mt-1 text-xs flex items-center">
                          <span className="mr-1">
                            {postTypeIcons[
                              post.type as keyof typeof postTypeIcons
                            ] || "📄"}
                          </span>
                          <span className="capitalize">{post.type}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center space-y-1 md:space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground w-full h-8 px-1"
                    onClick={() => handleCreateForDay(day)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground w-full h-8 px-1"
                      >
                        <Sparkles className="h-3 w-3 mr-1" /> Generate
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2">
                      <div className="space-y-1">
                        <p className="text-xs font-medium mb-2">
                          Generate post for {format(day, "MMM d")}:
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => onGenerateByType("promotion", day)}
                        >
                          🏷️ Promotion
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => onGenerateByType("event", day)}
                        >
                          🎉 Event
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => onGenerateByType("announcement", day)}
                        >
                          📢 Announcement
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => onGenerateByType("menu", day)}
                        >
                          🍽️ Menu Update
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => onGenerateByType("holiday", day)}
                        >
                          🎄 Holiday
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  const renderCalendarList = () => {
    // Flatten all posts and sort by date
    const allPosts: (Post & { date: Date })[] = [];

    Object.entries(posts).forEach(([dateStr, dayPosts]) => {
      dayPosts.forEach((post) => {
        // Apply filters
        if (
          (platformFilter === "all" || post.platform === platformFilter) &&
          (postType === "all" || post.type === postType)
        ) {
          allPosts.push({
            ...post,
            date: parseISO(dateStr),
          });
        }
      });
    });

    // Sort by date
    allPosts.sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
      <div className="space-y-4">
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start p-4 gap-4">
                {post.image && (
                  <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium">{post.title}</div>
                    <Badge
                      className={statusColors[post.status]}
                      variant="outline"
                    >
                      {post.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {format(post.date, "MMM d, yyyy")} at {post.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={platformColors[post.platform]}
                      variant="outline"
                    >
                      {platformIcons[post.platform]} {post.platform}
                    </Badge>
                    {post.type && (
                      <Badge variant="outline" className="bg-gray-100">
                        {postTypeIcons[
                          post.type as keyof typeof postTypeIcons
                        ] || "📄"}{" "}
                        {post.type}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => onEditPost(post.id)}
                >
                  Edit
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts match your filters</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={onCreatePost}
            >
              <Plus className="h-4 w-4 mr-2" /> Create New Post
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 bg-white p-4 md:p-6 rounded-lg border border-gray-200 overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
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

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
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
            value={calendarView}
            onValueChange={(v) => setCalendarView(v as "week" | "month")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" /> Jump to Date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="min-w-[700px] overflow-x-auto">
        {view === "grid" ? renderCalendarGrid() : renderCalendarList()}
      </div>
    </div>
  );
};

export default ContentCalendar;
