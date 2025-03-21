import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, Mail } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  initials: string;
  lastActive: string;
}

const TeamSettings = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Hotel Manager",
      email: "manager@hotel.com",
      role: "Admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hotel-manager",
      initials: "HM",
      lastActive: "Now",
    },
    {
      id: "2",
      name: "Sarah Kim",
      email: "sarah.kim@hotel.com",
      role: "Content Creator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      initials: "SK",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      name: "David Chen",
      email: "david.chen@hotel.com",
      role: "Approver",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      initials: "DC",
      lastActive: "Yesterday",
    },
    {
      id: "4",
      name: "Min-ji Park",
      email: "minji.park@hotel.com",
      role: "Content Creator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=minji",
      initials: "MP",
      lastActive: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage team members and their permissions.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Invite a new team member to collaborate on your social media
                  content.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="creator">Content Creator</SelectItem>
                      <SelectItem value="approver">Approver</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : (
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-right">
                    <p className="font-medium">{member.role}</p>
                    <p className="text-xs text-muted-foreground">
                      Active: {member.lastActive}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {member.id !== "1" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Configure what each role can do in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Admin</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Full access to all features, including user management and
                system settings.
              </p>
              <div className="text-sm text-blue-600">All permissions</div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Content Creator</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Can create and edit content, but requires approval before
                publishing.
              </p>
              <div className="text-sm">
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Create and edit content</li>
                  <li>Use AI generator</li>
                  <li>View analytics</li>
                  <li>Submit for approval</li>
                </ul>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Approver</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Can review, approve, or reject content submitted by creators.
              </p>
              <div className="text-sm">
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>View all content</li>
                  <li>Approve or reject content</li>
                  <li>Schedule approved content</li>
                  <li>View analytics</li>
                </ul>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Viewer</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Read-only access to content and analytics.
              </p>
              <div className="text-sm">
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>View all content</li>
                  <li>View analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamSettings;
