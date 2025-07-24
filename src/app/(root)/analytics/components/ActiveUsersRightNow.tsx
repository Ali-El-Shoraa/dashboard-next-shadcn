"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const activeUsersData = [
  { time: "00:00", users: 120 },
  { time: "03:00", users: 90 },
  { time: "06:00", users: 150 },
  { time: "09:00", users: 200 },
  { time: "12:00", users: 300 },
  { time: "15:00", users: 280 },
  { time: "18:00", users: 347 },
  { time: "21:00", users: 250 },
];

const topPages = [
  { page: "preview.cruip.com/open-pro/", users: 94 },
  { page: "preview.cruip.com/simple/", users: 42 },
  { page: "cruip.com/unlimited/", users: 12 },
  { page: "preview.cruip.com/twist/", users: 4 },
];

export default function ActiveUsersRightNow() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Active Users Right Now</span>
          <span className="text-sm font-normal text-muted-foreground">
            Last updated: Just now
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Live Visitors Count */}
        <div className="flex items-center mb-6">
          <div className="relative mr-3">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-ping absolute opacity-75"></div>
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
          </div>
          <div>
            <div className="text-3xl font-bold">347</div>
            <div className="text-sm text-muted-foreground">
              <span className="text-green-500">↑ 12.4%</span> from yesterday
            </div>
          </div>
        </div>

        {/* Mini Line Chart */}
        <div className="h-32 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activeUsersData}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "none",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top pages table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[70%]">Top pages</TableHead>
                <TableHead className="text-right">Active users</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPages.map((page, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium truncate max-w-[200px]">
                    <Link
                      href={`/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {page.page}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium">{page.users}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({((page.users / 347) * 100).toFixed(1)}%)
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button variant="ghost" className="text-primary hover:text-primary/90">
          View Real-Time Report
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
}
