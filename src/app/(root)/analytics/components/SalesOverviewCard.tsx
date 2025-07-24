import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import React from "react";

export default function SalesOverviewCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <p className="text-sm text-muted-foreground">Sales Overview</p>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl lg:text-3xl font-bold">$42.5K</h2>
          <Badge variant="destructive" className="gap-1">
            <TrendingUp className="h-4 w-4" />
            12.5%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 divide-x">
          <div className="flex items-center gap-3 text-sm">
            <Badge variant="secondary" className="w-12 justify-center">
              62.2%
            </Badge>
            <span>Orders</span>
          </div>
          <div className="flex items-center justify-end gap-3 text-sm">
            <Badge variant="secondary" className="w-12 justify-center">
              25.5%
            </Badge>
            <span>Visits</span>
          </div>
        </div>
        <div className="mt-4 flex overflow-hidden rounded-md">
          <span className="h-2 bg-orange-600" style={{ width: "70%" }}></span>
          <span className="h-2 bg-green-600" style={{ width: "30%" }}></span>
        </div>
      </CardContent>
    </Card>
  );
}
