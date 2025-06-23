import StatsCard from "@/components/StatsCard";

interface StatCardProps {
  title: string;
  value: number;
  change: string;
  changeType: "up" | "down";
  changeText: string;
}

const stats: StatCardProps[] = [
  {
    title: "Total Balance",
    value: 103045,
    change: "3.6%",
    changeType: "up",
    changeText: "Compare from last month",
  },
  {
    title: "Total Income",
    value: 78000,
    change: "2.5%",
    changeType: "up",
    changeText: "Compare from last month",
  },
  {
    title: "Total Expense",
    value: 15010,
    change: "6.0%",
    changeType: "down",
    changeText: "Compare from last month",
  },
  {
    title: "Total Sales Tax",
    value: 9090,
    change: "5.0%",
    changeType: "up",
    changeText: "Compare from last month",
  },
];

export default function SalesPage() {
  return (
    <section className="space-y-4">
      <div className="gap-4 space-y-4 md:grid md:grid-cols-2 lg:space-y-0 xl:grid-cols-8">
        <div className="md:col-span-4 bg-primary-foregroundrounded-lg">
          <AppRevenueChart />
        </div>

        <div className="md:col-span-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {stats.map((state) => (
              <StatsCard key={state.title} state={state} />
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <DashboardOverview />
      </div>
    </section>
  );
}

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  //   TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { FolderUp, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

import AppRevenueChart from "@/components/chart/AppRevenueChart";
import SellingProduct from "@/components/SellingProduct";

const bestSellers = [
  {
    id: 1,
    name: "Sports Shoes",
    sold: 316,
    img: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Black T-Shirt",
    sold: 274,
    img: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Jeans",
    sold: 195,
    img: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Red Sneakers",
    sold: 402,
    img: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Red Scarf",
    sold: 280,
    img: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Kitchen Accessory",
    sold: 150,
    img: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const orders = [
  {
    id: 1083,
    customer: "Marvin Dekidis",
    qty: 2,
    amount: 34.5,
    method: "E-Wallet",
    status: "new order",
    color: "blue",
  },
  {
    id: 1082,
    customer: "Carter Lipshitz",
    qty: 6,
    amount: 60.5,
    method: "Bank Transfer",
    status: "in progress",
    color: "orange",
  },
  {
    id: 1081,
    customer: "Addison Philips",
    qty: 3,
    amount: 47.5,
    method: "E-Wallet",
    status: "new order",
    color: "blue",
  },
  {
    id: 1079,
    customer: "Craig Siphron",
    qty: 15,
    amount: 89.8,
    method: "Bank Transfer",
    status: "on hold",
    color: "orange",
  },
  {
    id: 1078,
    customer: "Emma Johnson",
    qty: 4,
    amount: 120.75,
    method: "Credit Card",
    status: "completed",
    color: "green",
  },
  {
    id: 1077,
    customer: "Michael Smith",
    qty: 8,
    amount: 210.5,
    method: "PayPal",
    status: "completed",
    color: "green",
  },
];

function DashboardOverview() {
  return (
    // <TooltipProvider>
    <div className="gap-4 space-y-4 lg:space-y-0 xl:grid xl:grid-cols-3">
      <div className="xl:col-span-1">
        <SellingProduct data={bestSellers} />
      </div>

      {/* Track Order Status Card */}
      <div className="xl:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader className="flex items-start justify-between px-6 pb-4 border-b">
            <div>
              <CardTitle>Track Order Status</CardTitle>
              <CardDescription>
                Analyze growth and changes in visitor patterns
              </CardDescription>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="h-9 px-4">
                  <FolderUp />
                  <span className="hidden lg:inline">Export</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export data</TooltipContent>
            </Tooltip>
          </CardHeader>
          <CardContent className="px-6">
            {/* Stats */}
            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "New Order",
                  value: 43,
                  percent: 57,
                  up: true,
                  color: `[&>div]:bg-red-500 bg-red-500/10`,
                },
                {
                  label: "On Progress",
                  value: 12,
                  percent: 75,
                  up: false,
                  color: `[&>div]:bg-green-500 bg-green-500/10`,
                },
                {
                  label: "Completed",
                  value: 40,
                  percent: 60,
                  up: true,
                  color: `[&>div]:bg-orange-500 bg-orange-500/10`,
                },
                {
                  label: "Return",
                  value: 2,
                  percent: 52,
                  up: false,
                  color: `[&>div]:bg-blue-500 bg-blue-500/10`,
                },
              ].map((s) => (
                <div key={s.label} className="space-y-2">
                  <div className="font-display text-2xl lg:text-3xl">
                    {s.value.toLocaleString("en-US", {
                      style: "decimal",
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="text-muted-foreground text-sm">
                      {s.label}
                    </div>
                    {s.up ? (
                      <ArrowUp className="size-3 text-green-500" />
                    ) : (
                      <ArrowDown className="size-3 text-red-500" />
                    )}
                    <span
                      className={`text-xs ${
                        s.up ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {s.percent}%
                    </span>
                  </div>
                  <Progress
                    value={100 - s.percent}
                    className={`h-2 rounded-full ${s.color}`}
                  />
                </div>
              ))}
            </div>

            {/* Filter & Columns */}
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Filter orders..."
                className="flex-1 max-w-sm"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    Columns <ChevronDown />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Choose columns</TooltipContent>
              </Tooltip>
            </div>

            {/* Orders Table */}
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {[
                      "ID",
                      "Customer Name",
                      "Qty Items",
                      "Amount",
                      "Payment Method",
                      "Status",
                    ].map((h) => (
                      <TableHead key={h}>{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>{o.id}</TableCell>
                      <TableCell>{o.customer}</TableCell>
                      <TableCell>{o.qty} Items</TableCell>
                      <TableCell>
                        {o.amount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                      <TableCell>{o.method}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`border-${o.color}-400 bg-${o.color}-50 text-${o.color}-800`}
                        >
                          {o.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end space-x-2">
            <div className="text-muted-foreground flex-1 text-sm">
              0 of 16 row(s) selected.
            </div>
            <div className="space-x-2">
              <Button disabled>Previous</Button>
              <Button>Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
    // </TooltipProvider>
  );
}
