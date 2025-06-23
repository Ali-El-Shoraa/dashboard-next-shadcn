"use client";

// import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a label list";

const chartData = [
  { gender: "men", visitors: 275, fill: "var(--color-chart-2)" },
  { gender: "women", visitors: 200, fill: "var(--color-chart-5)" },
  //   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  //   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  //   { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  //   visitors: {
  //     label: "gender",
  //   },
  men: {
    label: "Men",
    color: "var(--chart-1)",
  },
  women: {
    label: "Women",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartPieDonutActive() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sessions By Gender</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="gender">
              <LabelList
                dataKey="gender"
                className="fill-background"
                stroke="none"
                // fontSize={12}
                formatter={(value: keyof typeof chartConfig) => {
                  console.log(chartConfig[value]?.label);
                  return chartConfig[value]?.label;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-violet-600/80 mr-2"></div>
            <span className="text-sm">Males</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-300/80 mr-2"></div>
            <span className="text-sm">Females</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-400/80 mr-2"></div>
            <span className="text-sm">Unknown</span>
          </div>
        </div>
        {/* <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
