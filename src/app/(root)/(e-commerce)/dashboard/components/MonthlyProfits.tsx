"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import { formatCurrency } from "@/utils/formatCurrency";

import type { TooltipProps } from "recharts";
const COLORS = ["#54BA4A", "#7367F0", "#FFA941"];

const data = [
  { name: "Shoes", value: 30, amount: 10200 },
  { name: "Grocery", value: 55, amount: 18700 },
  { name: "Other", value: 15, amount: 5100 },
];

export default function MonthlyProfits() {
  const [hoveredItem, setHoveredItem] = useState<(typeof data)[0] | null>(null);
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const onPieEnter = (
    _: React.MouseEvent<SVGElement, MouseEvent>,
    index: number
  ) => setHoveredItem(data[index]);
  const onPieLeave = () => setHoveredItem(null);

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.value / totalValue) * 100).toFixed(1);

      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg min-w-[160px] text-center">
          <p className="font-medium">{item.name}</p>
          <p className="text-primary text-lg font-bold">
            {formatCurrency(item.amount, "currency")}
          </p>
          <p className="text-sm text-muted-foreground">
            {percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border h-full flex flex-col">
      <div className="p-6 flex justify-between items-center">
        <h3 className="font-semibold text-lg">Monthly Profits</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>This Month</DropdownMenuItem>
            <DropdownMenuItem>Previous Month</DropdownMenuItem>
            <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
            <DropdownMenuItem>Last 6 Months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative flex-1 pb-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={60}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationDuration={300}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                    opacity={
                      hoveredItem && hoveredItem.name !== entry.name ? 0.5 : 1
                    }
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    const polarViewBox = viewBox as {
                      cx?: number;
                      cy?: number;
                    };

                    const cx = polarViewBox?.cx || 0;
                    const cy = polarViewBox?.cy || 0;
                    const displayAmount = hoveredItem
                      ? hoveredItem.amount
                      : totalAmount;
                    const displayText = hoveredItem
                      ? hoveredItem.name
                      : "Total Profit";
                    const percentage = hoveredItem
                      ? `${((hoveredItem.value / totalValue) * 100).toFixed(
                          1
                        )}% of total`
                      : "";

                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy - 10}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-foreground text-3xl font-bold"
                        >
                          {formatCurrency(displayAmount)}
                        </text>
                        <text
                          x={cx}
                          y={cy + 20}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-muted-foreground text-lg"
                        >
                          {displayText}
                        </text>
                        {hoveredItem && (
                          <text
                            x={cx}
                            y={cy + 40}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-muted-foreground text-sm"
                          >
                            {percentage}
                          </text>
                        )}
                      </g>
                    );
                  }}
                />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(
                  value
                  // entry: any, index
                ) => (
                  <span className="text-sm text-muted-foreground flex items-center">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
