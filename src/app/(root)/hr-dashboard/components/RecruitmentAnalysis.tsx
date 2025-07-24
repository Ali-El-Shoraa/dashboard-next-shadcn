"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Filter, Download } from "lucide-react";
import {
  Bar,
  BarChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const departmentData = [
  {
    name: "Designers",
    data: [3, 5, 7, 4, 6, 3, 4, 8, 7, 9, 12, 15],
    color: "bg-primary",
    fill: "#3b82f6",
  },
  {
    name: "Developers",
    data: [5, 2, 8, 6, 7, 7, 8, 6, 8, 10, 9, 12],
    color: "bg-secondary",
    fill: "#a3a3a3",
  },
  {
    name: "Managers",
    data: [4, 3, 3, 6, 7, 10, 13, 10, 12, 16, 17, 20],
    color: "bg-warning",
    fill: "#f59e42",
  },
  {
    name: "Sales & Marketing",
    data: [2, 6, 2, 8, 7, 10, 10, 14, 13, 14, 19, 22],
    color: "bg-success",
    fill: "#22c55e",
  },
];

const months = [
  "Jan 2024",
  "Feb 2024",
  "Mar 2024",
  "Apr 2024",
  "May 2024",
  "Jun 2024",
  "Jul 2024",
  "Aug 2024",
  "Sep 2024",
  "Oct 2024",
  "Nov 2024",
  "Dec 2024",
];

const timeRanges = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

export default function RecruitmentAnalysis() {
  const [activeDepartments, setActiveDepartments] = useState(
    departmentData.map((d) => d.name)
  );
  const [timeRange, setTimeRange] = useState("monthly");

  const toggleDepartment = (departmentName: string) => {
    setActiveDepartments((prev) =>
      prev.includes(departmentName)
        ? prev.filter((name) => name !== departmentName)
        : [...prev, departmentName]
    );
  };

  const chartData = months.map((month, i) => {
    const dataPoint: Record<string, number | string> = { month };
    departmentData.forEach((dept) => {
      if (activeDepartments.includes(dept.name)) {
        dataPoint[dept.name.replace(/ & /g, "")] = dept.data[i];
      }
    });
    return dataPoint;
  });

  const totalHires = departmentData.reduce(
    (sum, dept) => sum + dept.data.reduce((a, b) => a + b, 0),
    0
  );

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            Recruitment Analysis
            <span className="text-sm font-normal text-muted-foreground">
              ({totalHires} total hires)
            </span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">(Department Wise)</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {departmentData.map((dept) => (
                <DropdownMenuItem
                  key={dept.name}
                  onSelect={(e) => {
                    e.preventDefault();
                    toggleDepartment(dept.name);
                  }}
                  className="flex items-center"
                >
                  <span className={`mr-2 h-3 w-3 rounded-full ${dept.color}`} />
                  <span>{dept.name}</span>
                  {activeDepartments.includes(dept.name) && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Refresh</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`h-[400px]`}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  background: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-md)",
                }}
                itemStyle={{ color: "var(--foreground)" }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
              {departmentData.map(
                (dept) =>
                  activeDepartments.includes(dept.name) && (
                    <Bar
                      key={dept.name}
                      dataKey={dept.name.replace(/ & /g, "")}
                      name={dept.name}
                      fill={dept.fill}
                      radius={[4, 4, 0, 0]}
                    />
                  )
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpand}
          className="text-muted-foreground"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Collapse
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Expand
            </>
          )}
        </Button>
      </CardFooter> */}
    </Card>
  );
}
