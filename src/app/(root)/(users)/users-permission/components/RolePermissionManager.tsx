"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  // Check,
  ChevronDown,
  // ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

type Role = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "pending" | "inactive";
};

type Permission = {
  id: string;
  name: string;
  category: string;
  type: "all" | "reader" | "creator" | "delete";
};

const rolesData: Role[] = [
  {
    id: "1",
    name: "Admin",
    createdAt: "10 Feb 2023, 01:12 PM",
    updatedAt: "15 Feb 2024, 08:21 AM",
    status: "pending",
  },
  {
    id: "2",
    name: "Community Manager",
    createdAt: "05 Mar 2024, 04:30 PM",
    updatedAt: "20 Apr 2024, 11:20 AM",
    status: "active",
  },
  {
    id: "3",
    name: "Consumer",
    createdAt: "21 Aug 2024, 11:18 PM",
    updatedAt: "05 Sep 2024, 06:25 AM",
    status: "pending",
  },
  {
    id: "4",
    name: "Content Editors",
    createdAt: "16 Apr 2024, 09:18 PM",
    updatedAt: "17 May 2024, 08:00 AM",
    status: "active",
  },
  {
    id: "5",
    name: "Registered Users",
    createdAt: "25 Dec 2024, 07:12 AM",
    updatedAt: "28 Jan 2024, 11:20 AM",
    status: "active",
  },
  {
    id: "6",
    name: "Subscribers",
    createdAt: "14 May 2024, 05:25 AM",
    updatedAt: "22 Jun 2024, 10:12 AM",
    status: "active",
  },
  {
    id: "7",
    name: "Translator",
    createdAt: "29 Feb 2024, 08:30 AM",
    updatedAt: "02 Mar 2024, 10:30 PM",
    status: "active",
  },
  {
    id: "8",
    name: "Unverified Users",
    createdAt: "18 Dec 2023, 09:00 PM",
    updatedAt: "20 Jan 2024, 05:05 PM",
    status: "active",
  },
  {
    id: "9",
    name: "Vendor",
    createdAt: "13 Jan 2024, 06:45 AM",
    updatedAt: "15 Feb 2024, 04:20 AM",
    status: "active",
  },
];

const permissionsData: Permission[] = [
  { id: "1", name: "Users", category: "users", type: "all" },
  { id: "2", name: "Products", category: "products", type: "all" },
  { id: "3", name: "FAQs", category: "faqs", type: "all" },
  { id: "4", name: "Category", category: "category", type: "all" },
  { id: "5", name: "Orders", category: "orders", type: "all" },
  { id: "6", name: "Projects", category: "projects", type: "all" },
  { id: "7", name: "Seller", category: "seller", type: "all" },
  { id: "8", name: "To-Do", category: "todo", type: "all" },
  { id: "9", name: "Blog", category: "blog", type: "all" },
];

export default function RolePermissionManager() {
  const [roles, setRoles] = useState<Role[]>(rolesData);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSelectAllCategory = (category: string, isChecked: boolean) => {
    const categoryPermissions = permissionsData
      .filter((p) => p.category === category)
      .map((p) => p.id);

    setSelectedPermissions((prev) =>
      isChecked
        ? [...new Set([...prev, ...categoryPermissions])]
        : prev.filter((id) => !categoryPermissions.includes(id))
    );
  };

  const handleCreateRole = () => {
    if (!newRoleName.trim()) return;

    const newRole: Role = {
      id: Date.now().toString(),
      name: newRoleName,
      createdAt: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      updatedAt: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "active",
    };

    setRoles([...roles, newRole]);
    setNewRoleName("");
    setSelectedPermissions([]);
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: Role["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl font-semibold">
            Roles & Permissions
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role and assign permissions
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input
                    id="role-name"
                    placeholder="Enter role name"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <ScrollArea className="h-[400px] rounded-md border p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {permissionsData.map((permission) => (
                        <div
                          key={permission.id}
                          className="border rounded-lg p-4 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{permission.name}</h4>
                            <Checkbox
                              checked={selectedPermissions.includes(
                                permission.id
                              )}
                              onCheckedChange={(checked) =>
                                handleSelectAllCategory(
                                  permission.category,
                                  checked as boolean
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2 pl-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`${permission.id}-reader`}
                                checked={selectedPermissions.includes(
                                  `${permission.id}-reader`
                                )}
                                onCheckedChange={() =>
                                  handlePermissionToggle(
                                    `${permission.id}-reader`
                                  )
                                }
                              />
                              <Label htmlFor={`${permission.id}-reader`}>
                                Reader
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`${permission.id}-creator`}
                                checked={selectedPermissions.includes(
                                  `${permission.id}-creator`
                                )}
                                onCheckedChange={() =>
                                  handlePermissionToggle(
                                    `${permission.id}-creator`
                                  )
                                }
                              />
                              <Label htmlFor={`${permission.id}-creator`}>
                                Creator
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`${permission.id}-delete`}
                                checked={selectedPermissions.includes(
                                  `${permission.id}-delete`
                                )}
                                onCheckedChange={() =>
                                  handlePermissionToggle(
                                    `${permission.id}-delete`
                                  )
                                }
                              />
                              <Label htmlFor={`${permission.id}-delete`}>
                                Delete
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateRole}>
                  Create Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-[200px]">Role Name</TableHead>
                <TableHead>Creation Date</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.createdAt}</TableCell>
                  <TableCell>{role.updatedAt}</TableCell>
                  <TableCell>{getStatusBadge(role.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
