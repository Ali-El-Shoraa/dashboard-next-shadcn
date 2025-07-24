"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ArrowUp, ChevronDown, MoreVertical } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { TooltipProps } from "recharts";

export default function WebsiteTrafficCard() {
  const trafficData = [
    { day: "Mon", active: 18, bounce: 25 },
    { day: "Tue", active: 10, bounce: 50 },
    { day: "Wed", active: 65, bounce: 30 },
    { day: "Thu", active: 18, bounce: 30 },
    { day: "Fri", active: 28, bounce: 25 },
    { day: "Sat", active: 10, bounce: 45 },
  ];

  // Calculate average for reference line
  const averageActive = Math.round(
    trafficData.reduce((acc, curr) => acc + curr.active, 0) / trafficData.length
  );
  const averageBounce = Math.round(
    trafficData.reduce((acc, curr) => acc + curr.bounce, 0) / trafficData.length
  );

  // Custom tooltip component

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 shadow-md rounded-md border">
          <p className="font-medium">{label}</p>
          <div className="space-y-1 mt-2">
            {payload.map((entry, index) => (
              <div key={`tooltip-${index}`} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm">
                  {entry.name}:{" "}
                  <span className="font-semibold">{entry.value}%</span>
                  {entry.name === "Active" && (
                    <span className="text-muted-foreground ml-2">
                      (Avg: {averageActive}%)
                    </span>
                  )}
                  {entry.name === "Bounce" && (
                    <span className="text-muted-foreground ml-2">
                      (Avg: {averageBounce}%)
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              Website Traffic Analytics
            </CardTitle>
            <CardDescription className="flex items-center mt-1 text-sm text-green-600">
              <ArrowUp className="h-4 w-4" />
              <span className="ml-1">+2.8% from last week</span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm hover:bg-muted transition-colors">
                <span>This Week</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="text-sm">Today</DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  Yesterday
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  This Month
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  Previous Month
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full p-2 hover:bg-muted">
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>View Report</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-0 flex-1">
        <div className="h-[400px] relative">
          {/* Grid Background */}
          <div className="absolute inset-0 grid grid-cols-6 divide-x divide-muted/20">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-full flex flex-col divide-y divide-muted/20"
              >
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="flex-1"></div>
                ))}
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trafficData}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                // stroke="var(--border)"
                // strokeOpacity={0.5}
              />
              {/* <CartesianGrid vertical={false} /> */}
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => (
                  <span className="text-muted-foreground text-sm capitalize">
                    {value}
                  </span>
                )}
              />
              <ReferenceLine
                y={averageActive}
                stroke="#FFA941"
                strokeDasharray="3 3"
                strokeOpacity={0.7}
                label={{
                  value: `Avg ${averageActive}%`,
                  position: "right",
                  fill: "#FFA941",
                  fontSize: 12,
                }}
              />
              <ReferenceLine
                y={averageBounce}
                stroke="hsl(var(--primary))"
                strokeDasharray="3 3"
                strokeOpacity={0.7}
                label={{
                  value: `Avg ${averageBounce}%`,
                  position: "right",
                  fill: "hsl(var(--primary))",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="active"
                name="Active Users"
                fill="#FFA941"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                dataKey="bounce"
                name="Bounce Rate"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
