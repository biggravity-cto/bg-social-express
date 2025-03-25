import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  Upload,
  Grid,
  List,
  Image as ImageIcon,
  FileText,
  Video,
  Plus,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";

interface AssetProps {
  id: string;
  type: "image" | "video" | "document";
  title: string;
  url: string;
  thumbnail?: string;
  tags: string[];
  uploadedAt: Date;
  size: string;
}

const AssetLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedAssetType, setSelectedAssetType] = useState<string>("all");

  // Sample assets data
  const assets: AssetProps[] = [
    {
      id: "1",
      type: "image",
      title: "Restaurant Interior",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      tags: ["interior", "restaurant", "design"],
      uploadedAt: new Date(2023, 5, 15),
      size: "2.4 MB",
    },
    {
      id: "2",
      type: "image",
      title: "Signature Dish",
      url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      tags: ["food", "dish", "signature"],
      uploadedAt: new Date(2023, 6, 20),
      size: "1.8 MB",
    },
    {
      id: "3",
      type: "image",
      title: "Cocktail Menu",
      url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
      tags: ["drinks", "cocktail", "menu"],
      uploadedAt: new Date(2023, 7, 5),
      size: "3.2 MB",
    },
    {
      id: "4",
      type: "video",
      title: "Chef Interview",
      url: "https://example.com/video1.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
      tags: ["chef", "interview", "cooking"],
      uploadedAt: new Date(2023, 8, 10),
      size: "15.7 MB",
    },
    {
      id: "5",
      type: "document",
      title: "Menu PDF",
      url: "https://example.com/menu.pdf",
      tags: ["menu", "document", "pdf"],
      uploadedAt: new Date(2023, 9, 1),
      size: "4.5 MB",
    },
    {
      id: "6",
      type: "image",
      title: "Hotel Exterior",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      tags: ["hotel", "exterior", "architecture"],
      uploadedAt: new Date(2023, 10, 12),
      size: "2.9 MB",
    },
  ];

  // Filter assets based on search query and selected type
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesType =
      selectedAssetType === "all" || asset.type === selectedAssetType;
    return matchesSearch && matchesType;
  });

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-400" />;
      case "video":
        return <Video className="h-5 w-5 text-red-400" />;
      case "document":
        return <FileText className="h-5 w-5 text-green-400" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-6 bg-background">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-medium gradient-text">Asset Library</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <Input
                type="search"
                placeholder="Search assets..."
                className="pl-10 rounded-full border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border hover:bg-accent/10 hover:text-primary"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="rounded-full">
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1200px-Google_Drive_icon_%282020%29.svg.png"
                    className="mr-2 h-4 w-4"
                  />{" "}
                  Connect Google Drive
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-card">
                <DialogHeader>
                  <DialogTitle>Connect to Google Drive</DialogTitle>
                  <DialogDescription>
                    Link your Google Drive account to access and import your
                    media files directly.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="your.email@example.com"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="folder" className="text-right">
                      Default Folder
                    </Label>
                    <Input
                      id="folder"
                      placeholder="Hotel Assets"
                      className="col-span-3"
                    />
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md text-sm text-muted-foreground">
                    <p>Connecting will allow BG Social Express to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Access files and folders you select</li>
                      <li>Import media directly to your asset library</li>
                      <li>Upload content to your Drive (with permission)</li>
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1200px-Google_Drive_icon_%282020%29.svg.png"
                      className="mr-2 h-4 w-4"
                    />
                    Connect with Google
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-auto grid-cols-4 bg-card rounded-full p-1 border border-border">
              <TabsTrigger
                value="all"
                onClick={() => setSelectedAssetType("all")}
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="image"
                onClick={() => setSelectedAssetType("image")}
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Images
              </TabsTrigger>
              <TabsTrigger
                value="video"
                onClick={() => setSelectedAssetType("video")}
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="document"
                onClick={() => setSelectedAssetType("document")}
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Documents
              </TabsTrigger>
            </TabsList>

            <div className="border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "subtle" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "subtle" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredAssets.map((asset) => (
                  <Card
                    key={asset.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-card border-border"
                  >
                    <div className="relative aspect-video w-full bg-muted">
                      {asset.type === "image" ? (
                        <img
                          src={asset.url}
                          alt={asset.title}
                          className="h-full w-full object-cover"
                        />
                      ) : asset.type === "video" ? (
                        <div className="h-full w-full flex items-center justify-center bg-black/10">
                          {asset.thumbnail ? (
                            <img
                              src={asset.thumbnail}
                              alt={asset.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Video className="h-12 w-12 text-primary/50" />
                          )}
                        </div>
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-muted">
                          <FileText className="h-12 w-12 text-primary/50" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-background/80 text-xs font-medium px-2 py-1 rounded-full">
                        {asset.type}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">
                            {asset.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {asset.uploadedAt.toLocaleDateString()} ·{" "}
                            {asset.size}
                          </p>
                        </div>
                        <div className="flex">{getAssetIcon(asset.type)}</div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {asset.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-accent/10 text-foreground px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add new asset card */}
                <Card className="border-dashed flex items-center justify-center h-full aspect-video cursor-pointer hover:bg-accent/5 transition-colors bg-card/50">
                  <div className="text-center p-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground">
                      Add New Asset
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload images, videos, or documents
                    </p>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="bg-card border-border">
                <CardHeader className="px-6 py-4 border-b border-border">
                  <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-3">Date Added</div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-border">
                    {filteredAssets.map((asset) => (
                      <li
                        key={asset.id}
                        className="hover:bg-accent/5 transition-colors cursor-pointer"
                      >
                        <div className="grid grid-cols-12 items-center px-6 py-4">
                          <div className="col-span-5 flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                              {asset.type === "image" ? (
                                <img
                                  src={asset.url}
                                  alt={asset.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                getAssetIcon(asset.type)
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {asset.title}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {asset.tags.slice(0, 2).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="text-xs bg-accent/10 text-foreground px-1.5 py-0.5 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {asset.tags.length > 2 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{asset.tags.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center space-x-2">
                            {getAssetIcon(asset.type)}
                            <span className="text-sm capitalize">
                              {asset.type}
                            </span>
                          </div>
                          <div className="col-span-2 text-sm text-muted-foreground">
                            {asset.size}
                          </div>
                          <div className="col-span-3 text-sm text-muted-foreground">
                            {asset.uploadedAt.toLocaleDateString()}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="image" className="mt-0">
            {/* Content for Images tab - uses the same filtered assets */}
          </TabsContent>

          <TabsContent value="video" className="mt-0">
            {/* Content for Videos tab - uses the same filtered assets */}
          </TabsContent>

          <TabsContent value="document" className="mt-0">
            {/* Content for Documents tab - uses the same filtered assets */}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AssetLibraryPage;
