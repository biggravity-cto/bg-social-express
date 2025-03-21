import React, { useState } from "react";
import AIGenerator from "./AIGenerator";
import DashboardLayout from "../layout/DashboardLayout";
import CreatePostDialog, { PostData } from "../calendar/CreatePostDialog";

const GeneratorPage: React.FC = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleSaveToCalendar = (content: string) => {
    setGeneratedContent(content);
    setCreateDialogOpen(true);
  };

  const handleSavePost = (postData: PostData) => {
    console.log("Saving post from AI generator:", postData);
    // In a real app, you would save this to your backend
    setCreateDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AIGenerator onSaveToCalendar={handleSaveToCalendar} />

        <CreatePostDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSave={handleSavePost}
          initialData={{
            title: "AI Generated Post",
            content: generatedContent,
            status: "draft",
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default GeneratorPage;
