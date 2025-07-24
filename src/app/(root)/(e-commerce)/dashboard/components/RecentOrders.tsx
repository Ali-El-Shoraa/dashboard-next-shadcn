// app/components/RecentOrders.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  //  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ChevronRight,
  // ShoppingCart,
  Calendar,
  Package,
  ShoppingBasket,
  Armchair,
  Headphones,
  Watch,
  Volleyball,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";

const categories = [
  {
    id: "all",
    name: "All",
    icon: ShoppingBasket,
    color: "text-purple-500 bg-purple-50",
    activeColor: "bg-purple-100 border-purple-200",
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: Armchair,
    color: "text-blue-500 bg-blue-50",
    activeColor: "bg-blue-100 border-blue-200",
  },
  {
    id: "sports",
    name: "Sports",
    icon: Volleyball,
    color: "text-green-500 bg-green-50",
    activeColor: "bg-green-100 border-green-200",
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Headphones,
    color: "text-orange-500 bg-orange-50",
    activeColor: "bg-orange-100 border-orange-200",
  },
  {
    id: "jewelry",
    name: "Jewelry",
    icon: Watch,
    color: "text-pink-500 bg-pink-50",
    activeColor: "bg-pink-100 border-pink-200",
  },
];

const orders = [
  {
    id: "#ORD-1001",
    name: "Nordic Comfort Chair",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    category: "furniture",
    qty: 1,
    price: 249,
    rating: 4.6,
    status: "Delivered",
    date: "2023-07-15",
  },
  {
    id: "#ORD-1002",
    name: "Minimalist Wooden Table",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    category: "furniture",
    qty: 2,
    price: 179,
    rating: 4.2,
    status: "Shipped",
    date: "2023-07-18",
  },
  {
    id: "#ORD-2001",
    name: "Professional Rugby Ball",
    image:
      "https://images.unsplash.com/photo-1543357486-c2505d2be59a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    category: "sports",
    qty: 1,
    price: 69,
    rating: 4.8,
    status: "Delivered",
    date: "2023-07-10",
  },
  {
    id: "#ORD-2002",
    name: "Premium Soccer Ball",
    image:
      "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    category: "sports",
    qty: 2,
    price: 49,
    rating: 4.9,
    status: "Processing",
    date: "2023-07-20",
  },
  {
    id: "#ORD-3001",
    name: "Flagship Smartphone",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    category: "electronics",
    qty: 1,
    price: 899,
    rating: 4.7,
    status: "Delivered",
    date: "2023-07-05",
  },
  {
    id: "#ORD-3002",
    name: "Wireless Noise Cancelling Earbuds",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    category: "electronics",
    qty: 1,
    price: 199,
    rating: 4.5,
    status: "Shipped",
    date: "2023-07-17",
  },
  {
    id: "#ORD-4001",
    name: "Diamond Solitaire Ring",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    category: "jewelry",
    qty: 1,
    price: 2499,
    rating: 4.9,
    status: "Processing",
    date: "2023-07-19",
  },
  {
    id: "#ORD-4002",
    name: "18K Gold Necklace",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    category: "jewelry",
    qty: 1,
    price: 1299,
    rating: 4.6,
    status: "Shipped",
    date: "2023-07-14",
  },
];

const statusColors = {
  Delivered: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  Shipped: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  Processing: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
};

export default function RecentOrders() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders
    .filter((order) => activeTab === "all" || order.category === activeTab)
    .filter(
      (order) =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4">
          <div>
            <CardTitle className="text-lg font-semibold">
              Recent Orders
            </CardTitle>
            <CardDescription className="text-sm">
              Track and manage your latest purchases
            </CardDescription>
          </div>

          <div className="space-y-1.5">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex items-center gap-2 bg-transparent p-0 w-full">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className={`flex flex-col items-center gap-2 h-auto py-3 px-2 rounded-xl border hover:shadow-sm transition-all ${cat.color} data-[state=active]:${cat.activeColor} data-[state=active]:shadow-sm`}
                >
                  <div
                    className={`p-2 rounded-full ${cat.color
                      .replace("bg", "bg-opacity-20")
                      .replace("text", "")}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <ScrollArea className="h-72">
            <div className="space-y-3">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border rounded-xl p-4 hover:shadow-sm transition-all duration-200 group hover:border-primary/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-14 w-14 border">
                          <AvatarImage src={order.image} alt={order.name} />
                          <AvatarFallback>
                            {order.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="font-medium">{order.name}</div>
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            statusColors[
                              order.status as keyof typeof statusColors
                            ].bg
                          } ${
                            statusColors[
                              order.status as keyof typeof statusColors
                            ].text
                          } ${
                            statusColors[
                              order.status as keyof typeof statusColors
                            ].border
                          }`}
                        >
                          {order.status}
                        </Badge>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Package className="h-3.5 w-3.5 opacity-70" />
                            <span>{order.id}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 opacity-70" />
                            <span>
                              {new Date(order.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < Math.floor(order.rating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({order.rating.toFixed(1)})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant="outline"
                        className="px-2.5 py-1 rounded-lg bg-secondary/50"
                      >
                        x{order.qty}
                      </Badge>
                      <div className="text-sm font-semibold text-primary">
                        {formatCurrency(order.price, "currency")}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No orders found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}
