import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Sparkles,
  Copy,
  Calendar,
  Check,
  Loader2,
  Image as ImageIcon,
  Sliders,
  Save,
  History,
  Bookmark,
  BookmarkPlus,
  Wand2,
  RefreshCw,
  Lightbulb,
  MessageSquare,
  Clock,
  Palette,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface AIGeneratorProps {
  onSaveToCalendar?: (content: string) => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  icon?: React.ReactNode;
}

interface GeneratedContent {
  text: string;
  hashtags: string[];
  imagePrompt?: string;
  suggestedTime?: string;
}

interface SavedTemplate {
  id: string;
  name: string;
  content: string;
  platform: string;
  date: string;
}

const templates: Template[] = [
  {
    id: "promo-event",
    name: "Event Promotion",
    description: "Promote an upcoming event at your hotel",
    prompt:
      "Create a social media post promoting an event at our hotel. Event details: {{eventDetails}}",
    category: "promotion",
    icon: <Calendar className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "special-offer",
    name: "Special Offer",
    description: "Highlight a special offer or discount",
    prompt:
      "Create a social media post about a special offer at our hotel. Offer details: {{offerDetails}}",
    category: "promotion",
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
  },
  {
    id: "room-highlight",
    name: "Room Highlight",
    description: "Showcase a room or suite",
    prompt:
      "Create a social media post highlighting a room or suite at our hotel. Room details: {{roomDetails}}",
    category: "showcase",
    icon: <ImageIcon className="h-5 w-5 text-green-500" />,
  },
  {
    id: "dining-experience",
    name: "Dining Experience",
    description: "Promote restaurant or dining options",
    prompt:
      "Create a social media post about dining options at our hotel. Dining details: {{diningDetails}}",
    category: "showcase",
    icon: <Palette className="h-5 w-5 text-orange-500" />,
  },
  {
    id: "local-attraction",
    name: "Local Attraction",
    description: "Highlight nearby attractions or activities",
    prompt:
      "Create a social media post about a local attraction near our hotel. Attraction details: {{attractionDetails}}",
    category: "local",
    icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: "seasonal-special",
    name: "Seasonal Special",
    description: "Promote seasonal offerings or holiday specials",
    prompt:
      "Create a social media post about our seasonal or holiday special. Details: {{seasonalDetails}}",
    category: "promotion",
    icon: <Wand2 className="h-5 w-5 text-red-500" />,
  },
  {
    id: "guest-testimonial",
    name: "Guest Testimonial",
    description: "Share a positive guest experience or review",
    prompt:
      "Create a social media post highlighting a guest testimonial. Review details: {{testimonialDetails}}",
    category: "social-proof",
    icon: <MessageSquare className="h-5 w-5 text-indigo-500" />,
  },
  {
    id: "behind-scenes",
    name: "Behind the Scenes",
    description: "Share behind-the-scenes content from your hotel",
    prompt:
      "Create a social media post showing behind-the-scenes at our hotel. Details: {{behindScenesDetails}}",
    category: "engagement",
    icon: <Sliders className="h-5 w-5 text-cyan-500" />,
  },
  {
    id: "staff-spotlight",
    name: "Staff Spotlight",
    description: "Highlight a staff member or team",
    prompt:
      "Create a social media post featuring one of our staff members. Details: {{staffDetails}}",
    category: "engagement",
    icon: <Bookmark className="h-5 w-5 text-pink-500" />,
  },
];

// Sample saved templates
const sampleSavedTemplates: SavedTemplate[] = [
  {
    id: "saved-1",
    name: "Weekend Brunch Promo",
    content:
      "Join us every weekend for our signature brunch experience with complimentary mimosas!",
    platform: "instagram",
    date: "2023-06-15",
  },
  {
    id: "saved-2",
    name: "Summer Pool Party",
    content:
      "Beat the heat at our rooftop pool party every Saturday this summer. DJ, drinks, and stunning views!",
    platform: "facebook",
    date: "2023-07-01",
  },
];

const AIGenerator: React.FC<AIGeneratorProps> = ({
  onSaveToCalendar = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [promptDetails, setPromptDetails] = useState("");
  const [language, setLanguage] = useState("english");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("professional");
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedTemplates, setSavedTemplates] =
    useState<SavedTemplate[]>(sampleSavedTemplates);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [includeImage, setIncludeImage] = useState(false);
  const [suggestPostTime, setSuggestPostTime] = useState(false);
  const [generationHistory, setGenerationHistory] = useState<
    { prompt: string; result: GeneratedContent }[]
  >([]);
  const [imagePrompt, setImagePrompt] = useState("");
  const [customHashtags, setCustomHashtags] = useState("");
  const [useCustomHashtags, setUseCustomHashtags] = useState(false);

  // Filter templates by category
  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    setSelectedTemplate(template || null);
  };

  const generateContent = () => {
    if (!selectedTemplate || !promptDetails) return;

    setIsGenerating(true);

    // Simulate AI generation with a timeout
    setTimeout(() => {
      let content = "";
      let hashtags: string[] = [];
      let suggestedTime = "";
      let imagePromptText = "";

      switch (selectedTemplate.id) {
        case "promo-event":
          if (language === "korean") {
            content = `🎉 특별 이벤트 알림! 🎉\n\n${promptDetails}\n\n지금 바로 예약하세요! 링크는 프로필에 있습니다. #호텔이벤트 #특별행사 #럭셔리호텔 #주말여행`;
            hashtags = ["호텔이벤트", "특별행사", "럭셔리호텔", "주말여행"];
            suggestedTime = "오전 10시 - 이벤트 3일 전";
            imagePromptText =
              "호텔 이벤트 공간의 우아한 설정, 축제 분위기, 사람들이 즐기는 모습";
          } else {
            content = `🎉 EVENT ALERT! 🎉\n\nJoin us for ${promptDetails}\n\nBook your spot now! Link in bio. #HotelEvents #SpecialOccasions #LuxuryHotel #WeekendGetaway`;
            hashtags = [
              "HotelEvents",
              "SpecialOccasions",
              "LuxuryHotel",
              "WeekendGetaway",
            ];
            suggestedTime = "10:00 AM - 3 days before event";
            imagePromptText =
              "Elegant hotel event space setup, festive atmosphere, people enjoying";
          }
          break;
        case "special-offer":
          if (language === "korean") {
            content = `💯 특별 할인 혜택! 💯\n\n${promptDetails}\n\n지금 예약하고 특별한 경험을 누리세요! #호텔특가 #할인혜택 #럭셔리스테이 #호캉스`;
            hashtags = ["호텔특가", "할인혜택", "럭셔리스테이", "호캉스"];
            suggestedTime = "오후 2시 - 주중";
            imagePromptText =
              "호텔 객실 또는 시설의 고급스러운 사진, 밝고 초대하는 분위기";
          } else {
            content = `💯 SPECIAL OFFER ALERT! 💯\n\n${promptDetails}\n\nBook now and enjoy this amazing deal! #HotelDeals #SpecialOffer #LuxuryStay #HotelPromotion`;
            hashtags = [
              "HotelDeals",
              "SpecialOffer",
              "LuxuryStay",
              "HotelPromotion",
            ];
            suggestedTime = "2:00 PM - Weekdays";
            imagePromptText =
              "Luxurious photo of hotel room or amenity, bright and inviting atmosphere";
          }
          break;
        case "room-highlight":
          if (language === "korean") {
            content = `✨ 럭셔리한 객실 소개 ✨\n\n${promptDetails}\n\n지금 예약하고 특별한 경험을 누리세요! #호텔객실 #럭셔리스테이 #호캉스 #힐링여행`;
            hashtags = ["호텔객실", "럭셔리스테이", "호캉스", "힐링여행"];
            suggestedTime = "오후 7시 - 주말";
            imagePromptText =
              "호텔 객실의 넓은 각도 사진, 자연광, 고급스러운 침구류와 인테리어";
          } else {
            content = `✨ Room Spotlight ✨\n\n${promptDetails}\n\nBook now for an unforgettable stay! #HotelRoom #LuxuryStay #RoomWithAView #VacationMode`;
            hashtags = [
              "HotelRoom",
              "LuxuryStay",
              "RoomWithAView",
              "VacationMode",
            ];
            suggestedTime = "7:00 PM - Weekends";
            imagePromptText =
              "Wide angle photo of hotel room, natural lighting, luxurious bedding and interior";
          }
          break;
        case "dining-experience":
          if (language === "korean") {
            content = `🍽️ 특별한 다이닝 경험 🍽️\n\n${promptDetails}\n\n지금 예약하세요! #호텔다이닝 #맛있는경험 #미식가 #셰프스테이블`;
            hashtags = ["호텔다이닝", "맛있는경험", "미식가", "셰프스테이블"];
            suggestedTime = "오전 11시 - 식사 시간 전";
            imagePromptText =
              "호텔 레스토랑의 우아한 요리 사진, 생생한 색상, 예술적인 플레이팅";
          } else {
            content = `🍽️ Culinary Excellence 🍽️\n\n${promptDetails}\n\nReserve your table now! #HotelDining #CulinaryExperience #Foodie #ChefsTable`;
            hashtags = [
              "HotelDining",
              "CulinaryExperience",
              "Foodie",
              "ChefsTable",
            ];
            suggestedTime = "11:00 AM - Before meal times";
            imagePromptText =
              "Elegant food photography from hotel restaurant, vibrant colors, artistic plating";
          }
          break;
        case "local-attraction":
          if (language === "korean") {
            content = `🌟 주변 명소 추천 🌟\n\n${promptDetails}\n\n더 많은 정보는 프론트 데스크에 문의하세요! #여행팁 #현지경험 #여행스타그램 #로컬여행`;
            hashtags = ["여행팁", "현지경험", "여행스타그램", "로컬여행"];
            suggestedTime = "오전 9시 - 주말";
            imagePromptText =
              "호텔 근처 관광 명소의 아름다운 사진, 생생한 색상, 관광객들이 즐기는 모습";
          } else {
            content = `🌟 Local Attraction Spotlight 🌟\n\n${promptDetails}\n\nAsk our front desk for more information! #TravelTips #LocalExperience #TravelGram #ExploreMore`;
            hashtags = [
              "TravelTips",
              "LocalExperience",
              "TravelGram",
              "ExploreMore",
            ];
            suggestedTime = "9:00 AM - Weekends";
            imagePromptText =
              "Beautiful photo of tourist attraction near hotel, vibrant colors, tourists enjoying";
          }
          break;
        case "behind-scenes":
          if (language === "korean") {
            content = `👀 비하인드 스토리 👀\n\n${promptDetails}\n\n우리 호텔의 숨겨진 이야기를 만나보세요! #호텔비하인드 #숨겨진이야기 #호텔스토리 #호텔라이프`;
            hashtags = [
              "호텔비하인드",
              "숨겨진이야기",
              "호텔스토리",
              "호텔라이프",
            ];
            suggestedTime = "오후 3시 - 주중";
            imagePromptText =
              "호텔 직원들이 일하는 모습, 준비 과정, 또는 일반적으로 손님들이 보지 못하는 호텔의 영역";
          } else {
            content = `👀 Behind The Scenes 👀\n\n${promptDetails}\n\nGet a glimpse into what makes our hotel special! #HotelLife #BehindTheScenes #HotelSecrets #HospitalityLife`;
            hashtags = [
              "HotelLife",
              "BehindTheScenes",
              "HotelSecrets",
              "HospitalityLife",
            ];
            suggestedTime = "3:00 PM - Weekdays";
            imagePromptText =
              "Hotel staff at work, preparation process, or areas of the hotel guests don't typically see";
          }
          break;
        case "staff-spotlight":
          if (language === "korean") {
            content = `💫 직원 스포트라이트 💫\n\n${promptDetails}\n\n우리 호텔의 훌륭한 팀원을 소개합니다! #호텔직원 #팀스포트라이트 #호텔팀 #환대산업`;
            hashtags = ["호텔직원", "팀스포트라이트", "호텔팀", "환대산업"];
            suggestedTime = "오후 1시 - 주중";
            imagePromptText =
              "호텔 직원의 프로페셔널한 포트레이트, 친절한 미소, 업무 중인 모습";
          } else {
            content = `💫 Staff Spotlight 💫\n\n${promptDetails}\n\nMeet the amazing people who make our hotel special! #HotelStaff #TeamSpotlight #HotelTeam #HospitalityIndustry`;
            hashtags = [
              "HotelStaff",
              "TeamSpotlight",
              "HotelTeam",
              "HospitalityIndustry",
            ];
            suggestedTime = "1:00 PM - Weekdays";
            imagePromptText =
              "Professional portrait of hotel staff member, friendly smile, in their work environment";
          }
          break;
        default:
          content = "Generated content will appear here.";
      }

      // Adjust for tone
      if (tone === "casual" && language === "english") {
        content = content.replace("Join us for", "Hey! Come check out");
        content = content.replace("Book your spot now!", "Don't miss out!");
        content = content.replace(
          "Reserve your table now!",
          "Come grab a bite with us!",
        );
        content = content.replace(
          "Ask our front desk for information",
          "Just ask us for the inside scoop",
        );
      } else if (tone === "luxury" && language === "english") {
        content = content.replace(
          "Join us for",
          "We cordially invite you to experience",
        );
        content = content.replace(
          "Book your spot now!",
          "Secure your exclusive reservation today.",
        );
        content = content.replace(
          "Reserve your table now!",
          "We invite you to reserve your exclusive dining experience.",
        );
        content = content.replace(
          "Ask our front desk for information",
          "Our concierge team would be delighted to provide personalized recommendations",
        );
      }

      // Adjust for platform
      if (platform === "twitter" && content.length > 280) {
        content = content.substring(0, 277) + "...";
      } else if (platform === "linkedin") {
        // More professional tone for LinkedIn
        content = content.replace(/🎉|💯|✨|🍽️|🌟|👀|💫/g, "");
        content = content.trim();
      }

      // Use custom hashtags if enabled
      if (useCustomHashtags && customHashtags.trim()) {
        hashtags = customHashtags
          .split(",")
          .map((tag) =>
            tag.trim().startsWith("#") ? tag.trim().substring(1) : tag.trim(),
          );
      }

      const generatedResult: GeneratedContent = {
        text: content,
        hashtags: hashtags,
        imagePrompt: includeImage ? imagePromptText : undefined,
        suggestedTime: suggestPostTime ? suggestedTime : undefined,
      };

      setGeneratedContent(generatedResult);
      setImagePrompt(imagePromptText);

      // Add to history
      setGenerationHistory((prev) => [
        { prompt: promptDetails, result: generatedResult },
        ...prev.slice(0, 9), // Keep only the 10 most recent
      ]);

      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveTemplate = () => {
    if (!generatedContent || !selectedTemplate) return;

    const newTemplate: SavedTemplate = {
      id: `saved-${Date.now()}`,
      name: `${selectedTemplate.name} - ${new Date().toLocaleDateString()}`,
      content: generatedContent.text,
      platform: platform,
      date: new Date().toISOString().split("T")[0],
    };

    setSavedTemplates((prev) => [newTemplate, ...prev]);
  };

  const loadFromHistory = (index: number) => {
    const historyItem = generationHistory[index];
    if (historyItem) {
      setGeneratedContent(historyItem.result);
      setPromptDetails(historyItem.prompt);
    }
  };

  const loadSavedTemplate = (template: SavedTemplate) => {
    setGeneratedContent({
      text: template.content,
      hashtags: [],
      suggestedTime: undefined,
    });
    setPlatform(template.platform);
  };

  const regenerateContent = () => {
    if (selectedTemplate && promptDetails) {
      generateContent();
    }
  };

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <div>
        <h1 className="text-2xl font-bold">AI Content Generator</h1>
        <p className="text-muted-foreground">
          Create engaging social media content for your hospitality business
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Create Content
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            Saved Templates
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Generation History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" />
                    1. Choose Template
                  </CardTitle>
                  <CardDescription>
                    Select a template for your content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium mb-1 block"
                    >
                      Filter by category
                    </Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="promotion">Promotions</SelectItem>
                        <SelectItem value="showcase">Showcase</SelectItem>
                        <SelectItem value="local">Local Content</SelectItem>
                        <SelectItem value="social-proof">
                          Social Proof
                        </SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {filteredTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedTemplate?.id === template.id ? "border-primary bg-primary/5" : "hover:bg-accent/10 border-border"}`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="flex items-center gap-2 font-medium">
                          {template.icon}
                          {template.name}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-primary" />
                    2. Configure
                  </CardTitle>
                  <CardDescription>
                    Set your content preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="korean">Korean</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-2" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="suggest-time">Suggest Post Time</Label>
                        <p className="text-xs text-muted-foreground">
                          Get AI recommendations for optimal posting time
                        </p>
                      </div>
                      <Switch
                        id="suggest-time"
                        checked={suggestPostTime}
                        onCheckedChange={setSuggestPostTime}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="include-image">
                          Generate Image Prompt
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Create a prompt for image generation
                        </p>
                      </div>
                      <Switch
                        id="include-image"
                        checked={includeImage}
                        onCheckedChange={setIncludeImage}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="custom-hashtags">Custom Hashtags</Label>
                        <Switch
                          id="use-custom-hashtags"
                          checked={useCustomHashtags}
                          onCheckedChange={setUseCustomHashtags}
                        />
                      </div>
                      {useCustomHashtags && (
                        <Input
                          id="custom-hashtags"
                          placeholder="Enter hashtags separated by commas"
                          value={customHashtags}
                          onChange={(e) => setCustomHashtags(e.target.value)}
                          className="mt-2"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    3. Enter Details
                  </CardTitle>
                  <CardDescription>
                    {selectedTemplate
                      ? `Provide details for: ${selectedTemplate.name}`
                      : "Select a template first"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedTemplate && (
                      <>
                        <Textarea
                          placeholder={`Enter details about ${selectedTemplate.name.toLowerCase()}...`}
                          value={promptDetails}
                          onChange={(e) => setPromptDetails(e.target.value)}
                          rows={5}
                          className="resize-none"
                        />
                        <Button
                          onClick={generateContent}
                          disabled={!promptDetails || isGenerating}
                          className="w-full"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Generate Content
                            </>
                          )}
                        </Button>
                      </>
                    )}

                    {!selectedTemplate && (
                      <div className="text-center p-6 text-muted-foreground">
                        Please select a template from the left panel
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      4. Generated Content
                    </CardTitle>
                    <CardDescription>Your AI-generated content</CardDescription>
                  </div>
                  {generatedContent && (
                    <Badge variant="outline" className="capitalize">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  {generatedContent ? (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md bg-muted/50 whitespace-pre-line min-h-[150px]">
                        {generatedContent.text}
                      </div>

                      {generatedContent.hashtags &&
                        generatedContent.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {generatedContent.hashtags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                      {generatedContent.suggestedTime && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            Suggested posting time:{" "}
                            {generatedContent.suggestedTime}
                          </span>
                        </div>
                      )}

                      {generatedContent.imagePrompt && (
                        <div className="p-3 border rounded-md bg-muted/30">
                          <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                            <ImageIcon className="h-4 w-4 text-primary" />
                            <span>Image Generation Prompt:</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {generatedContent.imagePrompt}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-6 text-muted-foreground min-h-[200px] flex items-center justify-center border rounded-md border-dashed">
                      Generated content will appear here
                    </div>
                  )}
                </CardContent>
                {generatedContent && (
                  <CardFooter className="flex flex-wrap gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" onClick={copyToClipboard}>
                            {copied ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy to Clipboard
                              </>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy content to clipboard</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" onClick={saveTemplate}>
                            <BookmarkPlus className="mr-2 h-4 w-4" />
                            Save Template
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save for future use</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" onClick={regenerateContent}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Regenerate
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate a new version</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() =>
                              onSaveToCalendar(generatedContent.text)
                            }
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Save to Calendar
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Schedule this post</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-primary" />
                Saved Templates
              </CardTitle>
              <CardDescription>
                Reuse your previously saved content templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedTemplates.length > 0 ? (
                <div className="space-y-4">
                  {savedTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors"
                      onClick={() => loadSavedTemplate(template)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge variant="outline" className="capitalize">
                          {template.platform}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.content}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          Saved on{" "}
                          {new Date(template.date).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  No saved templates yet. Generate and save content to see it
                  here.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Generation History
              </CardTitle>
              <CardDescription>
                View your recent content generation history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generationHistory.length > 0 ? (
                <div className="space-y-4">
                  {generationHistory.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors"
                      onClick={() => loadFromHistory(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">
                          Generated Content #{generationHistory.length - index}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date().toLocaleDateString()}{" "}
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-1">Prompt:</p>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {item.prompt}
                      </p>
                      <p className="text-sm font-medium mb-1">Result:</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.result.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground">
                  No generation history yet. Generate content to see your
                  history here.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIGenerator;
