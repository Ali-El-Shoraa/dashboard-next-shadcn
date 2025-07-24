"use client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, ChevronDown } from "lucide-react";

const lineData = [
  { name: "Jan", visitors: 4000, pageviews: 2400 },
  { name: "Feb", visitors: 3000, pageviews: 1398 },
  { name: "Mar", visitors: 2000, pageviews: 9800 },
  { name: "Apr", visitors: 2780, pageviews: 3908 },
  { name: "May", visitors: 1890, pageviews: 4800 },
  { name: "Jun", visitors: 2390, pageviews: 3800 },
  { name: "Jul", visitors: 3490, pageviews: 4300 },
];

const pieData = [
  { name: "Desktop", value: 55 },
  { name: "Mobile", value: 30 },
  { name: "Tablet", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function AnalyticsDashboard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>Analytics Overview</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="mr-2 h-3.5 w-3.5" />
            Last 30 days
            <ChevronDown className="ml-2 h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filter
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Unique Visitors */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">24.7K</div>
              <Badge variant="outline">+49%</Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Unique Visitors
            </div>
          </div>

          {/* Total Pageviews */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">56.9K</div>
              <Badge variant="destructive">+7%</Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Total Pageviews
            </div>
          </div>

          {/* Bounce Rate */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">54%</div>
              <Badge variant="destructive">-7%</Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Bounce Rate
            </div>
          </div>

          {/* Visit Duration */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2m 56s</div>
              <Badge variant="secondary">+7%</Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Visit Duration
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="pageviews"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart and Bar Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Device Distribution */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Device Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Page Performance */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Home", views: 4000 },
                    { name: "Products", views: 3000 },
                    { name: "Blog", views: 2000 },
                    { name: "About", views: 2780 },
                    { name: "Contact", views: 1890 },
                  ]}
                  layout="vertical"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8884d8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
