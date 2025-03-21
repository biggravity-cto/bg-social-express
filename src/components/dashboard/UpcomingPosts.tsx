import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Calendar,
  Clock,
  Edit,
  Instagram,
  Facebook,
  Twitter,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  scheduledDate: Date;
  platform: SocialPlatform;
  image?: string;
  status: "scheduled" | "draft" | "published";
}

interface UpcomingPostsProps {
  posts?: Post[];
}

const platforms: Record<string, SocialPlatform> = {
  instagram: {
    name: "Instagram",
    icon: <Instagram size={16} />,
    color: "bg-pink-100 text-pink-600",
  },
  facebook: {
    name: "Facebook",
    icon: <Facebook size={16} />,
    color: "bg-blue-100 text-blue-600",
  },
  twitter: {
    name: "Twitter",
    icon: <Twitter size={16} />,
    color: "bg-sky-100 text-sky-600",
  },
};

const defaultPosts: Post[] = [
  {
    id: "1",
    title: "Weekend Brunch Special",
    content:
      "Join us this weekend for our special brunch menu featuring locally sourced ingredients and craft cocktails! #BrunchGoals #FoodieHeaven",
    scheduledDate: new Date(Date.now() + 86400000), // tomorrow
    platform: platforms.instagram,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    status: "scheduled",
  },
  {
    id: "2",
    title: "Summer Pool Party",
    content:
      "Beat the heat at our exclusive summer pool party! Live DJ, specialty cocktails, and amazing views. Reserve your spot now!",
    scheduledDate: new Date(Date.now() + 172800000), // day after tomorrow
    platform: platforms.facebook,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80",
    status: "scheduled",
  },
  {
    id: "3",
    title: "New Spa Treatment",
    content:
      "Introducing our new signature spa treatment! Experience ultimate relaxation with our aromatherapy massage and facial combo.",
    scheduledDate: new Date(Date.now() + 259200000), // 3 days from now
    platform: platforms.twitter,
    status: "draft",
  },
  {
    id: "4",
    title: "Chef's Special Dinner",
    content:
      "Our executive chef has prepared a special 5-course tasting menu available this weekend only. Limited seating available!",
    scheduledDate: new Date(Date.now() + 345600000), // 4 days from now
    platform: platforms.instagram,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    status: "scheduled",
  },
];

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Card className="mb-4 overflow-hidden bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge className={`${post.platform.color} font-normal`}>
            <div className="flex items-center gap-1">
              {post.platform.icon}
              <span>{post.platform.name}</span>
            </div>
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit size={14} className="mr-2" />
                Edit Post
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-lg mt-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
          {post.image && (
            <div className="relative h-32 rounded-md overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(post.scheduledDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{formatTime(post.scheduledDate)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Badge
          variant={post.status === "draft" ? "outline" : "secondary"}
          className="text-xs"
        >
          {post.status === "draft" ? "Draft" : "Scheduled"}
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" className="text-xs">
                <Edit size={14} className="mr-1" /> Quick Edit
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit post details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

const UpcomingPosts: React.FC<UpcomingPostsProps> = ({
  posts = defaultPosts,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 w-full h-full overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Upcoming Posts
          </h2>
          <p className="text-sm text-gray-500">Manage your scheduled content</p>
        </div>
        <Button size="sm">
          <Calendar size={16} className="mr-2" />
          View Calendar
        </Button>
      </div>

      <div className="overflow-y-auto flex-grow pr-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingPosts;
