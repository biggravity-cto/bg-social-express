import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  HelpCircle,
  FileText,
  Video,
  MessageSquare,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

const HelpCenter = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-6 bg-background">
        <div>
          <h1 className="text-2xl font-medium gradient-text">Help Center</h1>
          <p className="text-muted-foreground">
            Find answers to common questions and learn how to use BG Social
            Express
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
          <Input
            placeholder="Search for help articles..."
            className="pl-12 py-6 text-lg rounded-full border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary shadow-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center text-foreground font-medium">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Documentation
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Browse our comprehensive documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  Getting Started Guide
                </li>
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  Content Calendar Tutorial
                </li>
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  AI Generator Best Practices
                </li>
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  Approval Workflow Setup
                </li>
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  Analytics Dashboard Guide
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full mt-4 rounded-full border-border hover:bg-accent/10 text-primary"
              >
                View All Documentation
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center text-foreground font-medium">
                <Video className="mr-2 h-5 w-5 text-google-red" />
                Video Tutorials
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Learn through step-by-step video guides
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  Creating Your First Post
                </li>
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  Using AI to Generate Content
                </li>
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  Managing the Approval Process
                </li>
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  Understanding Analytics Reports
                </li>
                <li className="text-sm text-primary hover:underline cursor-pointer">
                  Team Collaboration Features
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full mt-4 rounded-full border-border hover:bg-accent/10 text-primary"
              >
                View All Videos
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center text-foreground font-medium">
                <MessageSquare className="mr-2 h-5 w-5 text-google-green" />
                Contact Support
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Get help from our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is available Monday-Friday, 9am-5pm KST to
                assist with any questions or issues you may have.
              </p>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-border hover:bg-accent/10 text-primary"
                >
                  Submit a Ticket
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-border hover:bg-accent/10 text-primary"
                >
                  Live Chat
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-border hover:bg-accent/10 text-primary"
                >
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-md rounded-lg overflow-hidden bg-card">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-xl font-medium gradient-text">
              Frequently Asked Questions
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-border">
                <AccordionTrigger className="text-foreground font-medium hover:text-primary">
                  How do I create my first social media post?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  To create your first post, navigate to the Content Calendar
                  page and click the "Create Post" button. You can then select
                  your platform, add your content, upload media, and schedule
                  when you want it to be published. Alternatively, you can use
                  our AI Generator to help create content based on templates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-border">
                <AccordionTrigger className="text-foreground font-medium hover:text-primary">
                  How does the approval workflow function?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The approval workflow allows content creators to submit posts
                  for review before publishing. Approvers can review, approve,
                  reject, or request changes to submitted content. Once
                  approved, posts can be scheduled or published immediately. You
                  can configure who has approval permissions in the Team
                  Settings section.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-border">
                <AccordionTrigger className="text-foreground font-medium hover:text-primary">
                  Can I generate content in multiple languages?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, our AI Generator supports multiple languages, including
                  English and Korean. When creating content with the AI
                  Generator, you can select your preferred language from the
                  dropdown menu. You can also enable auto-translation in the
                  post settings to automatically translate your content to other
                  languages.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-border">
                <AccordionTrigger className="text-foreground font-medium hover:text-primary">
                  How do I connect my social media accounts?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  To connect your social media accounts, go to the Settings page
                  and select the "Platforms" tab. Click the "Connect" button
                  next to each platform you want to connect and follow the
                  authentication process. Once connected, you'll be able to
                  schedule and publish content directly to these platforms.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-border">
                <AccordionTrigger className="text-foreground font-medium hover:text-primary">
                  What analytics are available for my posts?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our Analytics Dashboard provides comprehensive metrics for
                  your social media performance, including engagement rates,
                  audience growth, and content performance. You can view data by
                  platform, date range, and content type. The system also
                  provides insights and recommendations to improve your social
                  media strategy.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HelpCenter;
