"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
// import AlternativeChart from "@/components/chart/AppRevenueChart";
import { ChartPieDonut } from "@/components/chart/chart-pie-donut";
import { ChartPieDonutActive } from "@/components/chart/chart-pie-donut-active";
import { ChartBarStacked } from "@/components/chart/chart-bar-stacked";
import { ChartBarLabelCustom } from "@/components/chart/chart-bar-label-custom";

export default function AnalyticsDashboard() {
  return (
    <section className="flex-1 content">
      <div className="">
        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Left: Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Analytics
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Date picker */}
            <div className="relative w-full sm:w-64">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-9"
                placeholder="Select dates"
                type="text"
                readOnly
              />
            </div>

            {/* Filter button */}
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Line chart (Analytics) */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Unique Visitors */}
                <div>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">24.7K</div>
                    <Badge variant="secondary">+49%</Badge>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Unique Visitors
                  </div>
                </div>
                {/* Total Pageviews */}
                <div>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">56.9K</div>
                    <Badge variant="secondary">+7%</Badge>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total Pageviews
                  </div>
                </div>
                {/* Bounce Rate */}
                <div>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">54%</div>
                    <Badge variant="destructive">-7%</Badge>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Bounce Rate
                  </div>
                </div>
                {/* Visit Duration */}
                <div>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">2m 56s</div>
                    <Badge variant="secondary">+7%</Badge>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Visit Duration
                  </div>
                </div>
              </div>
              {/* Chart placeholder */}
              {/* <AlternativeChart /> */}
              <ChartPieDonut />
              {/* <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Line Chart</span>
              </div> */}
            </CardContent>
          </Card>

          {/* Line chart (Active Users Right Now) */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Active Users Right Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                {/* Live indicator */}
                <div className="relative mr-3">
                  <div className="h-3 w-3 rounded-full bg-red-500 animate-ping absolute"></div>
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                </div>
                {/* Visitors number */}
                <div>
                  <div className="text-3xl font-bold">347</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Live visitors
                  </div>
                </div>
              </div>
              {/* Mini chart placeholder */}
              <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-500">Mini Line Chart</span>
              </div>
              {/* Top pages table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Top pages</TableHead>
                    <TableHead className="text-right">Active users</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>preview.cruip.com/open-pro/</TableCell>
                    <TableCell className="text-right">94</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>preview.cruip.com/simple/</TableCell>
                    <TableCell className="text-right">42</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>cruip.com/unlimited/</TableCell>
                    <TableCell className="text-right">12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>preview.cruip.com/twist/</TableCell>
                    <TableCell className="text-right">4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-violet-500 p-0">
                Real-Time Report →
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Stacked bar chart (Acquisition Channels) */}
          <ChartBarStacked />

          {/* Horizontal bar chart (Audience Overview) */}
          <ChartBarLabelCustom />
        </div>

        {/* Third row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Channels */}
          <Card>
            <CardHeader>
              <CardTitle>Top Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Google",
                    value: "4.7K",
                    percentage: "82%",
                    color: "bg-violet-600",
                  },
                  {
                    name: "Indiehackers.com",
                    value: "4.2K",
                    percentage: "70%",
                    color: "bg-violet-600",
                  },
                  {
                    name: "DuckDuckGo",
                    value: "3.4K",
                    percentage: "60%",
                    color: "bg-violet-600",
                  },
                  {
                    name: "Hacker News",
                    value: "3.1K",
                    percentage: "44%",
                    color: "bg-violet-600",
                  },
                  {
                    name: "Github.com",
                    value: "2.2K",
                    percentage: "40%",
                    color: "bg-violet-600",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.name}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-violet-500 p-0">
                Channels Report →
              </Button>
            </CardFooter>
          </Card>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "cruip.com/",
                    value: "28K",
                    percentage: "82%",
                    color: "bg-green-500",
                  },
                  {
                    name: "preview.cruip.com/open-pro/",
                    value: "12K",
                    percentage: "70%",
                    color: "bg-green-500",
                  },
                  {
                    name: "preview.cruip.com/appy/",
                    value: "9.7K",
                    percentage: "60%",
                    color: "bg-green-500",
                  },
                  {
                    name: "cruip.com/unlimited/",
                    value: "9.2K",
                    percentage: "44%",
                    color: "bg-green-500",
                  },
                  {
                    name: "preview.cruip.com/simple/",
                    value: "7K",
                    percentage: "40%",
                    color: "bg-green-100",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="truncate">{item.name}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-violet-500 p-0">
                Page Report →
              </Button>
            </CardFooter>
          </Card>

          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "🇮🇪 Ireland",
                    value: "4.2K",
                    percentage: "82%",
                    color: "bg-blue-500",
                  },
                  {
                    name: "🇺🇸 United States",
                    value: "3.4K",
                    percentage: "70%",
                    color: "bg-blue-500",
                  },
                  {
                    name: "🇩🇪 Germany",
                    value: "1.6K",
                    percentage: "60%",
                    color: "bg-blue-500",
                  },
                  {
                    name: "🇮🇹 Italy",
                    value: "1.2K",
                    percentage: "44%",
                    color: "bg-blue-500",
                  },
                  {
                    name: "🇬🇧 United Kingdom",
                    value: "912",
                    percentage: "40%",
                    color: "bg-blue-500",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.name}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-violet-500 p-0">
                Countries Report →
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Fourth row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Doughnut chart (Sessions By Device) */}
          <Card>
            <CardHeader>
              <CardTitle>Sessions By Device</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {/* Chart placeholder */}
              <ChartPieDonut />
              {/* <div className="h-40 w-40 bg-gray-100 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                <span className="text-gray-500">Doughnut</span>
              </div> */}
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-violet-600 mr-2"></div>
                  <span className="text-sm">Desktop</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                  <span className="text-sm">Mobile</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-800 mr-2"></div>
                  <span className="text-sm">Tablet</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doughnut chart (Sessions By Age) */}
          <Card>
            <CardHeader>
              <CardTitle>Sessions By Age</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {/* Chart placeholder */}
              <ChartPieDonut />
              {/* <div className="h-40 w-40 bg-gray-100 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                <span className="text-gray-500">Doughnut</span>
              </div> */}
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-violet-600 mr-2"></div>
                  <span className="text-sm">&lt;18</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                  <span className="text-sm">18-24</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <span className="text-sm">24-36</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-sm">&gt;35</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Polar chart (Sessions By Gender) */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Sessions By Gender</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center"> */}
          {/* Chart placeholder */}
          <ChartPieDonutActive />

          {/* </CardContent>
          </Card> */}
        </div>

        {/* Table (Top Products) */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Created by</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">
                    Total impressions
                  </TableHead>
                  <TableHead>Top country</TableHead>
                  <TableHead className="text-right">CR</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    product: "Form Builder CP",
                    users: ["user-28-01", "user-28-02", "user-28-03"],
                    category: "Subscription",
                    impressions: "20,929",
                    country: "🇺🇸",
                    cr: "27.4%",
                    value: "$12,499.77",
                  },
                  {
                    product: "Machine Learning A-Z",
                    users: ["user-28-07", "user-28-04", "user-28-11"],
                    category: "Subscription",
                    impressions: "17,944",
                    country: "🇬🇧",
                    cr: "22.6%",
                    value: "$4,227.09",
                  },
                  {
                    product: "2024 Web Bootcamp",
                    users: ["user-28-05"],
                    category: "Subscription",
                    impressions: "16,097",
                    country: "🇫🇷",
                    cr: "22.4%",
                    value: "$2,499.77",
                  },
                  {
                    product: "Digital Marketing Course",
                    users: ["user-28-06", "user-28-11"],
                    category: "Subscription",
                    impressions: "12,996",
                    country: "🇮🇹",
                    cr: "22.1%",
                    value: "$2,224.09",
                  },
                  {
                    product: "Form Builder PRO",
                    users: ["user-28-09", "user-28-01"],
                    category: "Subscription",
                    impressions: "7,097",
                    country: "🇩🇪",
                    cr: "17.4%",
                    value: "$1,949.72",
                  },
                ].map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.product}
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {item.users.map((user, i) => (
                          <div
                            key={i}
                            className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600"
                          ></div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">
                      {item.impressions}
                    </TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell className="text-right">{item.cr}</TableCell>
                    <TableCell className="text-right text-green-500">
                      {item.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
