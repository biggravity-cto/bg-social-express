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
import { CalendarIcon, Clock, ImagePlus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (postData: PostData) => void;
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
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  open = true,
  onOpenChange,
  onSave,
  initialData = {},
}) => {
  const [postData, setPostData] = useState<Partial<PostData>>({
    title: "",
    content: "",
    platform: "instagram",
    scheduledDate: new Date(),
    scheduledTime: "12:00",
    status: "draft",
    ...initialData,
  });

  const [useAI, setUseAI] = useState(false);

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
      const aiContent =
        "Join us this weekend for our special brunch menu featuring locally sourced ingredients and craft cocktails! Perfect for a relaxing Sunday with friends and family. #BrunchGoals #FoodieHeaven";
      handleChange("content", aiContent);
      setUseAI(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Create and schedule your social media content
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
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
                  {useAI ? "Generating..." : "Generate with AI"}
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Schedule</Label>
            <div className="col-span-3 flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] justify-start text-left font-normal"
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

              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="time"
                  value={postData.scheduledTime}
                  onChange={(e) =>
                    handleChange("scheduledTime", e.target.value)
                  }
                  className="pl-10 w-[120px]"
                />
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
                <SelectItem value="scheduled">Schedule for Posting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {postData.status === "draft" ? "Save Draft" : "Schedule Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
