import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import PendingApprovals from "../dashboard/PendingApprovals";
import ApprovedContent from "./ApprovedContent";
import RejectedContent from "./RejectedContent";
import DashboardLayout from "../layout/DashboardLayout";

const ApprovalsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (id: string) => {
    // In a real app, this would update the database
    console.log(`Approved content with id: ${id}`);
  };

  const handleReject = (id: string) => {
    // In a real app, this would update the database
    console.log(`Rejected content with id: ${id}`);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-6 bg-background">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-medium gradient-text">
            Approval Workflow
          </h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <Input
                type="search"
                placeholder="Search content..."
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
          </div>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-card rounded-full p-1 border border-border">
            <TabsTrigger
              value="pending"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Approved
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Rejected
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-0">
            <PendingApprovals
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </TabsContent>
          <TabsContent value="approved" className="mt-0">
            <ApprovedContent />
          </TabsContent>
          <TabsContent value="rejected" className="mt-0">
            <RejectedContent />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ApprovalsPage;
