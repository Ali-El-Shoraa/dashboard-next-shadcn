"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const monthlySalesData = [
  { name: "Jan", revenue: 14000, profit: 8000 },
  { name: "Feb", revenue: 18000, profit: 10000 },
  { name: "Mar", revenue: 12000, profit: 7000 },
  { name: "Apr", revenue: 16000, profit: 9000 },
  { name: "May", revenue: 15000, profit: 8500 },
  { name: "Jun", revenue: 20000, profit: 11000 },
];

export default function AverageDailySalesCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <p className="text-sm text-muted-foreground">Average Daily Sales</p>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl lg:text-3xl font-bold">$28,450</h2>
          <Badge variant="destructive" className="gap-1">
            <TrendingDown className="h-4 w-4" />
            4.2%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlySalesData}>
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
