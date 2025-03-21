import React, { useState } from "react";
import ContentCalendar from "./ContentCalendar";
import CreatePostDialog, { PostData } from "./CreatePostDialog";
import DashboardLayout from "../layout/DashboardLayout";

const CalendarPage: React.FC = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ContentCalendar
          onCreatePost={handleCreatePost}
          onEditPost={handleEditPost}
        />

        <CreatePostDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSave={handleSavePost}
          initialData={editingPost ? { title: "Edit Post" } : undefined}
        />
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
