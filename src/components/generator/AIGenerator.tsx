import React, { useState } from "react";
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
import { Sparkles, Copy, Calendar, Check, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

interface AIGeneratorProps {
  onSaveToCalendar?: (content: string) => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
}

const templates: Template[] = [
  {
    id: "promo-event",
    name: "Event Promotion",
    description: "Promote an upcoming event at your hotel",
    prompt:
      "Create a social media post promoting an event at our hotel. Event details: {{eventDetails}}",
    category: "promotion",
  },
  {
    id: "special-offer",
    name: "Special Offer",
    description: "Highlight a special offer or discount",
    prompt:
      "Create a social media post about a special offer at our hotel. Offer details: {{offerDetails}}",
    category: "promotion",
  },
  {
    id: "room-highlight",
    name: "Room Highlight",
    description: "Showcase a room or suite",
    prompt:
      "Create a social media post highlighting a room or suite at our hotel. Room details: {{roomDetails}}",
    category: "showcase",
  },
  {
    id: "dining-experience",
    name: "Dining Experience",
    description: "Promote restaurant or dining options",
    prompt:
      "Create a social media post about dining options at our hotel. Dining details: {{diningDetails}}",
    category: "showcase",
  },
  {
    id: "local-attraction",
    name: "Local Attraction",
    description: "Highlight nearby attractions or activities",
    prompt:
      "Create a social media post about a local attraction near our hotel. Attraction details: {{attractionDetails}}",
    category: "local",
  },
  {
    id: "seasonal-special",
    name: "Seasonal Special",
    description: "Promote seasonal offerings or holiday specials",
    prompt:
      "Create a social media post about our seasonal or holiday special. Details: {{seasonalDetails}}",
    category: "promotion",
  },
  {
    id: "guest-testimonial",
    name: "Guest Testimonial",
    description: "Share a positive guest experience or review",
    prompt:
      "Create a social media post highlighting a guest testimonial. Review details: {{testimonialDetails}}",
    category: "social-proof",
  },
];

const AIGenerator: React.FC<AIGeneratorProps> = ({
  onSaveToCalendar = () => {},
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [promptDetails, setPromptDetails] = useState("");
  const [language, setLanguage] = useState("english");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("professional");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

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
      let hashtags = [];

      switch (selectedTemplate.id) {
        case "promo-event":
          if (language === "korean") {
            content = `🎉 특별 이벤트 알림! 🎉\n\n${promptDetails}\n\n지금 바로 예약하세요! 링크는 프로필에 있습니다. #호텔이벤트 #특별행사 #럭셔리호텔 #주말여행`;
            hashtags = ["호텔이벤트", "특별행사", "럭셔리호텔", "주말여행"];
          } else {
            content = `🎉 EVENT ALERT! 🎉\n\nJoin us for ${promptDetails}\n\nBook your spot now! Link in bio. #HotelEvents #SpecialOccasions #LuxuryHotel #WeekendGetaway`;
            hashtags = [
              "HotelEvents",
              "SpecialOccasions",
              "LuxuryHotel",
              "WeekendGetaway",
            ];
          }
          break;
        case "special-offer":
          if (language === "korean") {
            content = `💯 특별 할인 혜택! 💯\n\n${promptDetails}\n\n지금 예약하고 특별한 경험을 누리세요! #호텔특가 #할인혜택 #럭셔리스테이 #호캉스`;
            hashtags = ["호텔특가", "할인혜택", "럭셔리스테이", "호캉스"];
          } else {
            content = `💯 SPECIAL OFFER ALERT! 💯\n\n${promptDetails}\n\nBook now and enjoy this amazing deal! #HotelDeals #SpecialOffer #LuxuryStay #HotelPromotion`;
            hashtags = [
              "HotelDeals",
              "SpecialOffer",
              "LuxuryStay",
              "HotelPromotion",
            ];
          }
          break;
        case "room-highlight":
          if (language === "korean") {
            content = `✨ 럭셔리한 객실 소개 ✨\n\n${promptDetails}\n\n지금 예약하고 특별한 경험을 누리세요! #호텔객실 #럭셔리스테이 #호캉스 #힐링여행`;
            hashtags = ["호텔객실", "럭셔리스테이", "호캉스", "힐링여행"];
          } else {
            content = `✨ Room Spotlight ✨\n\n${promptDetails}\n\nBook now for an unforgettable stay! #HotelRoom #LuxuryStay #RoomWithAView #VacationMode`;
            hashtags = [
              "HotelRoom",
              "LuxuryStay",
              "RoomWithAView",
              "VacationMode",
            ];
          }
          break;
        case "dining-experience":
          if (language === "korean") {
            content = `🍽️ 특별한 다이닝 경험 🍽️\n\n${promptDetails}\n\n지금 예약하세요! #호텔다이닝 #맛있는경험 #미식가 #셰프스테이블`;
            hashtags = ["호텔다이닝", "맛있는경험", "미식가", "셰프스테이블"];
          } else {
            content = `🍽️ Culinary Excellence 🍽️\n\n${promptDetails}\n\nReserve your table now! #HotelDining #CulinaryExperience #Foodie #ChefsTable`;
            hashtags = [
              "HotelDining",
              "CulinaryExperience",
              "Foodie",
              "ChefsTable",
            ];
          }
          break;
        case "local-attraction":
          if (language === "korean") {
            content = `🌟 주변 명소 추천 🌟\n\n${promptDetails}\n\n더 많은 정보는 프론트 데스크에 문의하세요! #여행팁 #현지경험 #여행스타그램 #로컬여행`;
            hashtags = ["여행팁", "현지경험", "여행스타그램", "로컬여행"];
          } else {
            content = `🌟 Local Attraction Spotlight 🌟\n\n${promptDetails}\n\nAsk our front desk for more information! #TravelTips #LocalExperience #TravelGram #ExploreMore`;
            hashtags = [
              "TravelTips",
              "LocalExperience",
              "TravelGram",
              "ExploreMore",
            ];
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
        content = content.replace(/🎉|💯|✨|🍽️|🌟/g, "");
        content = content.trim();
      }

      setGeneratedContent(content);
      handleChange("hashtags", hashtags);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <div>
        <h1 className="text-2xl font-bold">AI Content Generator</h1>
        <p className="text-muted-foreground">
          Create engaging social media content for your hospitality business
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Choose Template</CardTitle>
              <CardDescription>
                Select a template for your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedTemplate?.id === template.id ? "border-primary bg-primary/5" : "hover:bg-accent"}`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {template.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Configure</CardTitle>
              <CardDescription>Set your content preferences</CardDescription>
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
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>3. Enter Details</CardTitle>
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
                <CardTitle>4. Generated Content</CardTitle>
                <CardDescription>Your AI-generated content</CardDescription>
              </div>
              {generatedContent && (
                <Badge variant="outline">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="p-4 border rounded-md bg-muted/50 whitespace-pre-line min-h-[200px]">
                  {generatedContent}
                </div>
              ) : (
                <div className="text-center p-6 text-muted-foreground min-h-[200px] flex items-center justify-center border rounded-md border-dashed">
                  Generated content will appear here
                </div>
              )}
            </CardContent>
            {generatedContent && (
              <CardFooter className="flex justify-between">
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
                <Button onClick={() => onSaveToCalendar(generatedContent)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Save to Calendar
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
