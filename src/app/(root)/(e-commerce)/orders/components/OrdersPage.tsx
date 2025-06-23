"use client";
import { Button } from "@/components/ui/button";
import { OrdersDataTable } from "./OrdersDataTable";
import { OrdersStats } from "./OrdersStats";
import {
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  FileText,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OrdersPage() {
  const stats = {
    totalOrders: 1247,
    totalRevenue: 89456.78,
    pendingOrders: 23,
    deliveredOrders: 1156,
    averageOrderValue: 234.56,
    monthlyGrowth: 8.5,
  };

  return (
    <div className="space-y-8 content">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Order Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage customer orders
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Notifications
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4" />
            Add Order
          </Button>
        </div>
      </div>

      {/* Stats */}
      <OrdersStats {...stats} />

      {/* Data Table */}
      {/* bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6 */}
      <div className="">
        <OrdersDataTable />
      </div>
    </div>
  );
}
