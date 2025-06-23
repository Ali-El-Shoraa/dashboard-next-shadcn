import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  change: string;
  changeType: "up" | "down";
  changeText: string;
}

export default function StatsCard({ state }: { state: StatCardProps }) {
  return (
    <Card className="border bg-card text-card-foreground rounded-xl py-4 p-6">
      <CardHeader className="p-0">
        <CardDescription className="text-sm text-muted-foreground">
          {state.title}
        </CardDescription>
        <CardTitle className="font-display text-2xl lg:text-3xl">
          {formatCurrency(state.value, "currency")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center text-xs text-muted-foreground">
          {state.changeType === "up" ? (
            <ArrowUp className="mr-1 size-4 text-green-500" />
          ) : (
            <ArrowDown className="mr-1 size-4 text-red-500" />
          )}
          <span
            className={`font-medium ${
              state.changeType === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {state.change}
          </span>
          <span className="ml-1">{state.changeText}</span>
        </div>
      </CardContent>
    </Card>
  );
}
