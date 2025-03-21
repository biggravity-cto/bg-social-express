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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Approval Workflow</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
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
