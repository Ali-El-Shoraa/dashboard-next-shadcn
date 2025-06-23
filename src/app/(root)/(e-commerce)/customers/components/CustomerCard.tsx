"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Star,
  MoreHorizontal,
  Mail,
  MapPin,
  ShoppingBag,
  DollarSign,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Phone,
  Calendar,
} from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  location: string;
  orders: number;
  lastOrder: string;
  totalSpent: string;
  refunds: number | string;
  favorite: boolean;
  avatar: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

interface CustomerCardProps {
  customer: Customer;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function CustomerCard({
  customer,
  isSelected,
  onSelect,
  onToggleFavorite,
}: CustomerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    }
  };

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-lg ${
        isSelected ? "ring-2 ring-blue-500 shadow-md" : ""
      } ${isHovered ? "scale-[1.02]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="py-0">
        <div className="">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(customer.id)}
              className="p-2"
            >
              <Star
                className={`h-4 w-4 transition-colors ${
                  customer.favorite
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-400 hover:text-yellow-500"
                }`}
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Customer
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                  <Trash2 className="h-4 w-4" />
                  Delete Customer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-row-reverse items-center justify-between my-3.5">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect(customer.id)}
              className="mt-1"
            />
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                <AvatarImage
                  src={customer.avatar || "/placeholder.svg"}
                  alt={customer.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {customer.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    className={getTierColor(customer.tier)}
                    variant="secondary"
                  >
                    {customer.tier.toUpperCase()}
                  </Badge>
                  <Badge
                    className={getStatusColor(customer.status)}
                    variant="secondary"
                  >
                    {customer.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail className="h-4 w-4" />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>{customer.location}</span>
          </div>
          {customer.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="h-4 w-4" />
              <span>{customer.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Joined {customer.joinDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <ShoppingBag className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-blue-600">
              {customer.orders}
            </div>
            <div className="text-xs text-gray-500">Orders</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-lg font-bold text-green-600">
              {customer.totalSpent}
            </div>
            <div className="text-xs text-gray-500">Spent</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <RefreshCw className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-purple-600">
              {customer.lastOrder}
            </div>
            <div className="text-xs text-gray-500">Last Order</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <RefreshCw className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-lg font-bold text-red-600">
              {customer.refunds}
            </div>
            <div className="text-xs text-gray-500">Refunds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
