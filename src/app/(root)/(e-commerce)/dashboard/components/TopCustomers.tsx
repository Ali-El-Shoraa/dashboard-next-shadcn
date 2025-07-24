import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/utils/formatCurrency";

const customers = [
  {
    name: "Jane Cooper",
    email: "jane@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    spend: 2450,
    orders: 12,
    location: "New York, USA",
    lastPurchase: "2023-05-15",
    status: "Active",
    favoriteCategory: "Electronics",
  },
  {
    name: "Cameron Williamson",
    email: "cameron@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    spend: 1890,
    orders: 8,
    location: "London, UK",
    lastPurchase: "2023-06-22",
    status: "Active",
    favoriteCategory: "Home & Kitchen",
  },
  {
    name: "Floyd Miles",
    email: "floyd@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    spend: 3210,
    orders: 15,
    location: "Chicago, USA",
    lastPurchase: "2023-07-10",
    status: "VIP",
    favoriteCategory: "Sports & Outdoors",
  },
  {
    name: "Dianne Russell",
    email: "dianne@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    spend: 2750,
    orders: 11,
    location: "Toronto, Canada",
    lastPurchase: "2023-06-30",
    status: "Active",
    favoriteCategory: "Fashion",
  },
  {
    name: "Guy Hawkins",
    email: "guy@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    spend: 1520,
    orders: 6,
    location: "Sydney, Australia",
    lastPurchase: "2023-05-28",
    status: "Inactive",
    favoriteCategory: "Books",
  },
  {
    name: "Eleanor Pena",
    email: "eleanor@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    spend: 3850,
    orders: 18,
    location: "Los Angeles, USA",
    lastPurchase: "2023-07-12",
    status: "VIP",
    favoriteCategory: "Beauty & Personal Care",
  },
  {
    name: "Robert Fox",
    email: "robert@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    spend: 2100,
    orders: 9,
    location: "Berlin, Germany",
    lastPurchase: "2023-06-05",
    status: "Active",
    favoriteCategory: "Electronics",
  },
];

export default function TopCustomers() {
  return (
    <div className="bg-card rounded-xl shadow-sm border">
      <div className="p-6 flex justify-between items-center border-b">
        <div>
          <h3 className="font-semibold text-lg">Top Customers</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Most valuable customers this month
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View All</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
            <DropdownMenuItem>Filter Options</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="h-[350px]">
        <div className="divide-y">
          {customers.map((customer, index) => (
            <div
              key={index}
              className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={customer?.avatar} />
                  <AvatarFallback>{customer?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-medium truncate">{customer?.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {customer?.email}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="font-medium">
                  {formatCurrency(customer?.spend, "currency")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(customer?.orders)} orders
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full text-primary">
          View All Customers
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
