import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  ArrowUpRight,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";

export default function TotalEarnings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Main Earnings Card - Full width on mobile, spans 6 columns on desktop */}
      <div className="md:col-span-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        <div className="">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                Total Earnings
              </p>
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(24515400, "currency")}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                +12.5% from last month
              </p>
            </div>

            <div className={`p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30`}>
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <Button
            className="w-fit mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            variant="default"
          >
            View Sales Report
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="absolute right-4 -bottom-2 opacity-90 dark:opacity-20">
            <Image
              src={`/image/ecommerce/monitor.png`}
              alt="monitor"
              width={180}
              height={120}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid - spans 6 columns on desktop */}

      <div className="md:col-span-2">
        <StatCard
          title="New Orders"
          value={2435}
          change="50%"
          isPositive={true}
          icon={ShoppingBag}
          color="primary"
          trendData={[30, 40, 30, 60, 45, 70]}
        />
      </div>

      <div className="md:col-span-2">
        <StatCard
          title="New Customers"
          value={2908}
          change="20%"
          isPositive={true}
          icon={Users}
          color="warning"
          trendData={[20, 30, 40, 30, 45, 50]}
        />
      </div>

      <div className="md:col-span-2">
        <StatCard
          title="Avg. Sale"
          value={389}
          currency={true}
          change="10%"
          isPositive={false}
          icon={DollarSign}
          color="secondary"
          trendData={[50, 45, 40, 35, 30, 25]}
        />
      </div>

      <div className="md:col-span-2">
        <StatCard
          title="Gross Profit"
          value={3908}
          change="80%"
          isPositive={true}
          icon={TrendingUp}
          color="success"
          trendData={[10, 20, 30, 40, 50, 60]}
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  currency,
  change,
  isPositive,
  icon: Icon,
  color = "primary",
  trendData = [],
}: {
  title: string;
  value: number;
  currency?: boolean;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color?: "primary" | "warning" | "secondary" | "success";
  trendData?: number[];
}) {
  const colorClasses = {
    primary: {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      chart: "#3b82f6",
    },
    warning: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      chart: "#f59e0b",
    },
    secondary: {
      text: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      chart: "#8b5cf6",
    },
    success: {
      text: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/30",
      chart: "#10b981",
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {title}
            </p>
            <div className="flex items-end gap-1 mt-1">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(value, currency ? "currency" : undefined)}
              </h4>
              <span
                className={`text-sm flex items-center ${
                  isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isPositive ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                {change}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color].bg}`}>
            <Icon className={`h-6 w-6 ${colorClasses[color].text}`} />
          </div>
        </div>

        {/* Mini trend chart */}
        <div className="mt-4 h-12 w-full">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke={colorClasses[color].chart}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={trendData
                .map((val, i) => {
                  const x = (i / (trendData.length - 1)) * 100;
                  const y = 30 - (val / 100) * 30;
                  return `${x},${y}`;
                })
                .join(" ")}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
