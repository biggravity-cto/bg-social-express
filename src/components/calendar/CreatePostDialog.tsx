import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  ImagePlus,
  Sparkles,
  BookmarkPlus,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (postData: PostData) => void;
  onSaveToLibrary?: (postData: PostData) => void;
  initialData?: Partial<PostData>;
}

export interface PostData {
  title: string;
  content: string;
  platform: string;
  scheduledDate: Date;
  scheduledTime: string;
  image?: string;
  status: "draft" | "scheduled";
  type?: string;
  hashtags?: string[];
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  open = true,
  onOpenChange,
  onSave,
  onSaveToLibrary,
  initialData = {},
}) => {
  const [postData, setPostData] = useState<Partial<PostData>>({
    title: "",
    content: "",
    platform: "instagram",
    scheduledDate: new Date(),
    scheduledTime: "12:00",
    status: "draft",
    type: "promotion",
    hashtags: [],
    ...initialData,
  });

  const [useAI, setUseAI] = useState(false);
  const [hashtag, setHashtag] = useState("");

  const postTypes = [
    { value: "promotion", label: "Promotion", icon: "🏷️" },
    { value: "event", label: "Event", icon: "🎉" },
    { value: "announcement", label: "Announcement", icon: "📢" },
    { value: "menu", label: "Menu Update", icon: "🍽️" },
    { value: "holiday", label: "Holiday", icon: "🎄" },
  ];

  const handleChange = (field: keyof PostData, value: any) => {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!postData.title || !postData.content || !postData.platform) {
      // Show error or handle validation
      return;
    }

    onSave(postData as PostData);
    onOpenChange(false);
  };

  const handleSaveToLibrary = () => {
    if (!postData.title || !postData.content || !postData.platform) {
      // Show error or handle validation
      return;
    }

    if (onSaveToLibrary) {
      onSaveToLibrary(postData as PostData);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll use a placeholder image
      handleChange(
        "image",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
      );
    }
  };

  const generateWithAI = () => {
    // Simulate AI generation
    setUseAI(true);
    setTimeout(() => {
      let aiContent = "";

      switch (postData.type) {
        case "promotion":
          aiContent =
            "Join us this weekend for our special brunch menu featuring locally sourced ingredients and craft cocktails! Perfect for a relaxing Sunday with friends and family. #BrunchGoals #FoodieHeaven";
          break;
        case "event":
          aiContent =
            "Mark your calendars! This Friday we're hosting a live jazz night with the renowned local quartet 'The Smooth Notes'. Enjoy our special cocktail menu while listening to the best jazz in town. #JazzNight #LiveMusic";
          break;
        case "announcement":
          aiContent =
            "We're excited to announce our new head chef, Maria Rodriguez, who brings 15 years of experience from Michelin-starred restaurants. Come taste her innovative creations starting next week! #NewChef #CulinaryExcellence";
          break;
        case "menu":
          aiContent =
            "Our new summer menu has arrived! Featuring fresh seasonal ingredients, innovative dishes, and refreshing cocktails perfect for warm evenings on our patio. #SummerMenu #SeasonalCuisine";
          break;
        case "holiday":
          aiContent =
            "Celebrate the holidays with us! Our special festive menu is now available for booking. Gather your loved ones for an unforgettable dining experience with traditional favorites and creative holiday cocktails. #HolidayDining #FestiveSeason";
          break;
        default:
          aiContent =
            "Join us this weekend for our special brunch menu featuring locally sourced ingredients and craft cocktails! Perfect for a relaxing Sunday with friends and family. #BrunchGoals #FoodieHeaven";
      }

      handleChange("content", aiContent);

      // Extract hashtags from content
      const hashtags =
        aiContent.match(/#\w+/g)?.map((tag) => tag.substring(1)) || [];
      handleChange("hashtags", hashtags);

      setUseAI(false);
    }, 1500);
  };

  const addHashtag = () => {
    if (hashtag && !postData.hashtags?.includes(hashtag)) {
      handleChange("hashtags", [...(postData.hashtags || []), hashtag]);
      setHashtag("");
    }
  };

  const removeHashtag = (tag: string) => {
    handleChange("hashtags", postData.hashtags?.filter((t) => t !== tag) || []);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Create and schedule your social media content
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={postData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="col-span-3"
                placeholder="Post title for internal reference"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                Platform
              </Label>
              <Select
                value={postData.platform}
                onValueChange={(value) => handleChange("platform", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Post Type
              </Label>
              <Select
                value={postData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent>
                  {postTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        <span className="mr-2">{type.icon}</span>
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateWithAI}
                    disabled={useAI}
                    className="mb-2"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {useAI
                      ? "Generating..."
                      : `Generate ${postData.type} Post with AI`}
                  </Button>
                </div>
                <Textarea
                  id="content"
                  value={postData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  rows={5}
                  placeholder="Write your post content here..."
                />
                <div className="text-xs text-muted-foreground text-right">
                  {postData.content.length} characters
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Hashtags</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Hash className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Add hashtag"
                      value={hashtag}
                      onChange={(e) => setHashtag(e.target.value)}
                      className="pl-8"
                      onKeyDown={(e) => e.key === "Enter" && addHashtag()}
                    />
                  </div>
                  <Button type="button" onClick={addHashtag} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {postData.hashtags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeHashtag(tag)}
                    >
                      #{tag} <span className="ml-1">×</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Image</Label>
              <div className="col-span-3">
                {postData.image ? (
                  <div className="relative h-40 rounded-md overflow-hidden">
                    <img
                      src={postData.image}
                      alt="Post preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleChange("image", undefined)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag and drop an image, or click to browse
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                      >
                        Upload Image
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Schedule Date</Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {postData.scheduledDate ? (
                        format(postData.scheduledDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={postData.scheduledDate}
                      onSelect={(date) =>
                        date && handleChange("scheduledDate", date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Schedule Time</Label>
              <div className="col-span-3">
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    type="time"
                    value={postData.scheduledTime}
                    onChange={(e) =>
                      handleChange("scheduledTime", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={postData.status}
                onValueChange={(value: "draft" | "scheduled") =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Save as Draft</SelectItem>
                  <SelectItem value="scheduled">
                    Schedule for Posting
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <div className="col-start-2 col-span-3">
                <div className="rounded-md border p-4 bg-muted/50">
                  <h4 className="text-sm font-medium mb-2">
                    Optimal Posting Times
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Instagram:</span>
                      <span className="text-muted-foreground">
                        11:00 AM, 2:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Facebook:</span>
                      <span className="text-muted-foreground">
                        9:00 AM, 3:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Twitter:</span>
                      <span className="text-muted-foreground">
                        8:00 AM, 4:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>LinkedIn:</span>
                      <span className="text-muted-foreground">
                        10:00 AM, 1:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Approval Required</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <input
                  type="checkbox"
                  id="approval"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="approval" className="text-sm font-normal">
                  Require approval before publishing
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Auto-Translate</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <input
                  type="checkbox"
                  id="translate"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="translate" className="text-sm font-normal">
                  Automatically translate to Korean
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Cross-Post</Label>
              <div className="space-y-2 col-span-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cross-instagram"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor="cross-instagram"
                    className="text-sm font-normal"
                  >
                    Instagram
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cross-facebook"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor="cross-facebook"
                    className="text-sm font-normal"
                  >
                    Facebook
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cross-twitter"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor="cross-twitter"
                    className="text-sm font-normal"
                  >
                    Twitter
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cross-linkedin"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor="cross-linkedin"
                    className="text-sm font-normal"
                  >
                    LinkedIn
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center">
          <div>
            {onSaveToLibrary && (
              <Button
                variant="outline"
                onClick={handleSaveToLibrary}
                className="mr-2"
              >
                <BookmarkPlus className="mr-2 h-4 w-4" /> Save to Library
              </Button>
            )}
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {postData.status === "draft" ? "Save Draft" : "Schedule Post"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
