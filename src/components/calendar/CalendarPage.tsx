import React, { useState } from "react";
import ContentCalendar from "./ContentCalendar";
import CreatePostDialog, { PostData } from "./CreatePostDialog";
import DashboardLayout from "../layout/DashboardLayout";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Plus,
  BookmarkPlus,
  Calendar as CalendarIcon,
  Grid,
  List,
  Copy,
  Download,
  Share2,
  Tag,
  Filter,
  Repeat,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SavedPost extends PostData {
  id: string;
  createdAt: Date;
}

const CalendarPage: React.FC = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [calendarView, setCalendarView] = useState<"grid" | "list">("grid");
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([
    {
      id: "saved-1",
      title: "Weekend Brunch Special",
      content:
        "Join us this weekend for our special brunch menu featuring locally sourced ingredients and craft cocktails!",
      platform: "instagram",
      scheduledDate: new Date(),
      scheduledTime: "10:00",
      status: "draft",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "saved-2",
      title: "Happy Hour Promotion",
      content:
        "Enjoy 2-for-1 cocktails every weekday from 4-6pm. The perfect way to unwind after work!",
      platform: "facebook",
      scheduledDate: new Date(),
      scheduledTime: "16:00",
      status: "draft",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "saved-3",
      title: "New Menu Launch",
      content:
        "We're excited to announce our new seasonal menu launching next week. Stay tuned for a culinary experience like no other!",
      platform: "linkedin",
      scheduledDate: new Date(),
      scheduledTime: "12:00",
      status: "draft",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ]);

  const [selectedPostType, setSelectedPostType] = useState<string>("all");

  const postTypes = [
    { value: "all", label: "All Types" },
    { value: "promotion", label: "Promotion" },
    { value: "event", label: "Event" },
    { value: "announcement", label: "Announcement" },
    { value: "menu", label: "Menu Update" },
    { value: "holiday", label: "Holiday" },
  ];

  const handleCreatePost = () => {
    setEditingPost(null);
    setCreateDialogOpen(true);
  };

  const handleEditPost = (postId: string) => {
    setEditingPost(postId);
    setCreateDialogOpen(true);
  };

  const handleSavePost = (postData: PostData) => {
    console.log("Saving post:", postData);
    // In a real app, you would save this to your backend
    setCreateDialogOpen(false);
    setEditingPost(null);
  };

  const handleSaveToLibrary = (postData: PostData) => {
    const newSavedPost: SavedPost = {
      ...postData,
      id: `saved-${Date.now()}`,
      createdAt: new Date(),
    };
    setSavedPosts([...savedPosts, newSavedPost]);
  };

  const handleUseSavedPost = (savedPost: SavedPost) => {
    setEditingPost(null);
    setCreateDialogOpen(true);
    // The dialog would be pre-filled with the saved post data
  };

  const handleGenerateByType = (type: string, date: Date) => {
    console.log(`Generating ${type} post for ${date.toDateString()}`);
    // In a real app, this would trigger the AI to generate a post
    // based on the type and date
    setCreateDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-6 bg-background">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Content Calendar
            </h1>
            <p className="text-muted-foreground">
              Plan, create, and schedule your social media content
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-border hover:bg-accent/10 hover:text-primary"
              >
                <Tag className="mr-2 h-4 w-4" /> Categories
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-border hover:bg-accent/10 hover:text-primary"
              >
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-border hover:bg-accent/10 hover:text-primary"
              >
                <Repeat className="mr-2 h-4 w-4" /> Recurring
              </Button>
            </div>
            <Select
              value={selectedPostType}
              onValueChange={setSelectedPostType}
            >
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="border rounded-md p-1">
              <Button
                variant={calendarView === "grid" ? "subtle" : "ghost"}
                size="sm"
                onClick={() => setCalendarView("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={calendarView === "list" ? "subtle" : "ghost"}
                size="sm"
                onClick={() => setCalendarView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-border hover:bg-accent/10 hover:text-primary"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share Calendar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-border hover:bg-accent/10 hover:text-primary"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export Calendar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button onClick={handleCreatePost} className="rounded-full">
              <Plus className="mr-2 h-4 w-4" /> Create Post
            </Button>
          </div>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="calendar">
              <CalendarIcon className="mr-2 h-4 w-4" /> Calendar View
            </TabsTrigger>
            <TabsTrigger value="saved">
              <BookmarkPlus className="mr-2 h-4 w-4" /> Saved Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-4">
            <ContentCalendar
              onCreatePost={handleCreatePost}
              onEditPost={handleEditPost}
              onGenerateByType={handleGenerateByType}
              postType={selectedPostType}
              view={calendarView}
            />
          </TabsContent>

          <TabsContent value="saved" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Post Templates</CardTitle>
                <CardDescription>
                  Reuse your best-performing content or save drafts for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer bg-card border-border"
                      onClick={() => handleUseSavedPost(post)}
                    >
                      <div className="relative">
                        {post.image && (
                          <div className="h-40 w-full">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-background/80 text-xs font-medium px-2 py-1 rounded-full">
                          {post.platform}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.content}
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Saved {post.createdAt.toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card
                    className="border-dashed flex items-center justify-center h-[200px] cursor-pointer hover:bg-accent/5 transition-colors bg-card/50 border-border"
                    onClick={handleCreatePost}
                  >
                    <div className="text-center">
                      <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium">Create New Template</p>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <CreatePostDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSave={handleSavePost}
          onSaveToLibrary={handleSaveToLibrary}
          initialData={editingPost ? { title: "Edit Post" } : undefined}
        />
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
