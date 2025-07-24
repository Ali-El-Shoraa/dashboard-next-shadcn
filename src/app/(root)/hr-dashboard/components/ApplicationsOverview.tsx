"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Filter,
  Download,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", applications: 40, hired: 28 },
  { name: "Feb", applications: 30, hired: 25 },
  { name: "Mar", applications: 45, hired: 32 },
  { name: "Apr", applications: 50, hired: 35 },
  { name: "May", applications: 35, hired: 22 },
  { name: "Jun", applications: 60, hired: 45 },
  { name: "Jul", applications: 55, hired: 38 },
  { name: "Aug", applications: 70, hired: 50 },
  { name: "Sep", applications: 65, hired: 42 },
  { name: "Oct", applications: 80, hired: 60 },
];

export default function ApplicationsOverview() {
  const totalApplications = data.reduce(
    (sum, item) => sum + item.applications,
    0
  );
  const totalHired = data.reduce((sum, item) => sum + item.hired, 0);
  const successRate = ((totalHired / totalApplications) * 100).toFixed(1);

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg font-medium">
            Applications Overview
          </CardTitle>
          <CardDescription className="text-sm">
            Hiring performance over the past months
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Filter
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="h-3.5 w-3.5 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorApplications"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  border: "none",
                  background: "white",
                  padding: "8px 12px",
                }}
                formatter={(value) => [
                  value,
                  value === value ? "Applications" : "Hired",
                ]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {value}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="applications"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorApplications)"
                name="Applications"
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="hired"
                stroke="#f59e0b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHired)"
                name="Hired"
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <StatCard
            title="Total Applications"
            value={totalApplications}
            change="+12.5%"
            isPositive={true}
          />
          <StatCard
            title="Total Hired"
            value={totalHired}
            change="+8.3%"
            isPositive={true}
          />
          <StatCard
            title="Success Rate"
            value={`${successRate}%`}
            change="+4.2%"
            isPositive={true}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({
  title,
  value,
  change,
  isPositive,
}: {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
}) {
  return (
    <div className="bg-muted/50 p-4 rounded-lg dark:bg-gray-800">
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      <p
        className={`text-sm flex items-center mt-1 ${
          isPositive
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {isPositive ? (
          <ChevronUp className="h-4 w-4 mr-1" />
        ) : (
          <ChevronDown className="h-4 w-4 mr-1" />
        )}
        {change}
      </p>
    </div>
  );
}
