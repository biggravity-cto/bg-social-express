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
    <div className="flex flex-wrap gap-2">
      {actions.map((action, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="glass"
                size="sm"
                className="flex items-center gap-2 h-10 px-4 py-2 shadow-md"
                onClick={action.onClick}
              >
                <div className="text-white">{action.icon}</div>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-card border-border">
              <p>{action.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

const defaultActions: QuickAction[] = [
  {
    icon: <PlusCircle size={20} className="text-google-blue" />,
    label: "Create Post",
    description: "Create a new social media post",
    onClick: () => console.log("Create post clicked"),
  },
  {
    icon: <Calendar size={20} className="text-google-green" />,
    label: "Calendar",
    description: "Go to content calendar view",
    onClick: () => console.log("View calendar clicked"),
  },
  {
    icon: <Wand2 size={20} className="text-google-yellow" />,
    label: "AI Generator",
    description: "Generate content with AI",
    onClick: () => console.log("AI generator clicked"),
  },
  {
    icon: <Clock size={20} className="text-google-red" />,
    label: "Schedule",
    description: "Schedule posts for later",
    onClick: () => console.log("Schedule clicked"),
  },
  {
    icon: <FileCheck size={20} className="text-purple-400" />,
    label: "Approvals",
    description: "Review pending approvals",
    onClick: () => console.log("Approvals clicked"),
  },
];

export default QuickActions;
