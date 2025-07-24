"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TypeMonthlySalesData = {
  name: string;
  revenue: number;
  profit: number;
};

const monthlySalesData: TypeMonthlySalesData[] = [
  { name: "Jan", revenue: 14000, profit: 8000 },
  { name: "Feb", revenue: 18000, profit: 10000 },
  { name: "Mar", revenue: 12000, profit: 7000 },
  { name: "Apr", revenue: 16000, profit: 9000 },
  { name: "May", revenue: 15000, profit: 8500 },
  { name: "Jun", revenue: 20000, profit: 11000 },
];

export default function EarningReportsCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Earning Reports</CardTitle>
          <p className="text-sm text-muted-foreground">Last 28 days</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          Export
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl lg:text-3xl font-bold">$1,468</h3>
                <Badge variant="destructive">+4.2%</Badge>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="revenue"
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div className="bg-muted rounded-md border p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-background flex size-8 items-center justify-center rounded-md border">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <span>Earnings</span>
                  </div>
                  <div className="font-semibold">$545.69</div>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-primary/20">
                  <div className="h-full w-3/4 bg-green-600"></div>
                </div>
              </div>
              <div className="bg-muted rounded-md border p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-background flex size-8 items-center justify-center rounded-md border">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <span>Profit</span>
                  </div>
                  <div className="font-semibold">$256.34</div>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-primary/20">
                  <div className="h-full w-1/2 bg-blue-600"></div>
                </div>
              </div>
              <div className="bg-muted rounded-md border p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-background flex size-8 items-center justify-center rounded-md border">
                      <TrendingDown className="h-4 w-4" />
                    </div>
                    <span>Expense</span>
                  </div>
                  <div className="font-semibold">$74.19</div>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-primary/20">
                  <div className="h-full w-1/4 bg-red-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
