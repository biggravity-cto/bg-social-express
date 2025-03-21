import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { PlusCircle, Calendar, Wand2, Clock, FileCheck } from "lucide-react";

interface QuickActionProps {
  actions?: QuickAction[];
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

const QuickActions = ({ actions = defaultActions }: QuickActionProps) => {
  return (
    <Card className="w-full p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        {actions.map((action, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 w-32 p-2 border-2 hover:bg-slate-50 transition-colors"
                  onClick={action.onClick}
                >
                  <div className="text-primary mb-2">{action.icon}</div>
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </Card>
  );
};

const defaultActions: QuickAction[] = [
  {
    icon: <PlusCircle size={24} />,
    label: "Create Post",
    description: "Create a new social media post",
    onClick: () => console.log("Create post clicked"),
  },
  {
    icon: <Calendar size={24} />,
    label: "View Calendar",
    description: "Go to content calendar view",
    onClick: () => console.log("View calendar clicked"),
  },
  {
    icon: <Wand2 size={24} />,
    label: "AI Generator",
    description: "Generate content with AI",
    onClick: () => console.log("AI generator clicked"),
  },
  {
    icon: <Clock size={24} />,
    label: "Schedule",
    description: "Schedule posts for later",
    onClick: () => console.log("Schedule clicked"),
  },
  {
    icon: <FileCheck size={24} />,
    label: "Approvals",
    description: "Review pending approvals",
    onClick: () => console.log("Approvals clicked"),
  },
];

export default QuickActions;
