// app/components/PaymentGatewayCard.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  //  MoreVertical,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const paymentData = [
  {
    id: 1,
    name: "PayPal",
    amount: 420,
    change: "increase",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M7.5 11.5c0-3.04 2.46-5.5 5.5-5.5h4.5c1.93 0 3.5 1.57 3.5 3.5v6c0 1.93-1.57 3.5-3.5 3.5H13c-3.04 0-5.5-2.46-5.5-5.5v-2z" />
      </svg>
    ),
    color: "primary",
  },
  {
    id: 2,
    name: "Credit Card",
    amount: 250,
    change: "decrease",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm1 4v2h14V8H5zm0 4v2h14v-2H5z" />
      </svg>
    ),
    color: "secondary",
  },
  {
    id: 3,
    name: "Amazon Pay",
    amount: 603,
    change: "increase",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z" />
      </svg>
    ),
    color: "success",
  },
  {
    id: 4,
    name: "Cashback",
    amount: 603,
    change: "increase",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
    color: "info",
  },
  {
    id: 5,
    name: "Stripe",
    amount: 250,
    change: "decrease",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M13.5 8H12v5h1.5V8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
    color: "warning",
  },
  {
    id: 6,
    name: "Apple Pay",
    amount: 485,
    change: "increase",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    color: "destructive",
  },
];

export default function PaymentGatewayCard() {
  const [timeRange, setTimeRange] = useState("This Month");

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              Payment Gateway Earnings
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Summary of your payment transactions
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm rounded-lg px-3 py-1.5 hover:bg-muted transition-colors">
              {timeRange}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {[
                "This Month",
                "Previous Month",
                "Last 3 Months",
                "Last 6 Months",
              ].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => setTimeRange(item)}
                  className={timeRange === item ? "bg-accent" : ""}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-4 flex-1">
        {/* <ScrollArea className="h-[350px] pr-4"> */}
        <div className="space-y-3">
          {paymentData.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg bg-${payment.color}/10 text-${payment.color}`}
                >
                  {payment.icon}
                </div>
                <span className="font-medium">{payment.name}</span>
              </div>
              <div
                className={`flex items-center gap-1 font-medium ${
                  payment.change === "increase"
                    ? "text-success"
                    : "text-destructive"
                }`}
              >
                {payment.change === "increase" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>${payment.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
        {/* </ScrollArea> */}
      </CardContent>
    </Card>
  );
}
