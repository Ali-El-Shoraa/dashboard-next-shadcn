"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/utils/formatCurrency";

type CardDetailsProps = {
  card: {
    id: string;
    type: "physical" | "virtual";
    name: string;
    lastDigits: string;
    owner: string;
    spent: number;
    limit: number;
    status: "active" | "blocked";
    color: string;
    expDate: string;
    spentAmount: number;
    spentLimit: number;
    withdrawnAmount: number;
    withdrawnLimit: number;
  };
};

export function CardDetails({ card }: CardDetailsProps) {
  const spentPercentage = (card.spentAmount / card.spentLimit) * 100;

  const withdrawnPercentage =
    (card.withdrawnAmount / card.withdrawnLimit) * 100;

  return (
    <div className="border rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold">
        {card.type === "physical" ? "Physical" : "Virtual"} {card.name} Summary
      </h3>

      {/* Card Preview */}
      <div className={`p-4 rounded-lg ${card.color} text-white`}>
        <div className="flex justify-between items-center mb-6">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="text-xs">MASTERCARD</div>
        </div>

        <div className="flex justify-between items-center mb-1">
          <div className="text-sm">Card Number</div>
          <div className="flex space-x-2 font-mono">
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>{card.lastDigits}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div>EXP {card.expDate}</div>
          <div>CVC ***</div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Details</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-gray-500">Card Name</span>
            <span className="text-sm font-medium">
              {card.type === "physical" ? "Physical" : "Virtual"} {card.name}{" "}
              Card
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-gray-500">Status</span>
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  card.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm font-medium capitalize">
                {card.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Limits */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Payment Limits</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Spent This Month</span>
            <span className="font-medium">
              {formatCurrency(card.spent, "currency")}{" "}
              <span className="text-gray-400">/</span>{" "}
              {formatCurrency(card.limit, "currency")}
            </span>
          </div>
          <Progress value={spentPercentage} className="h-2" />
        </div>
      </div>

      {/* Withdrawal Limits */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Withdrawal Limits</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Withdrawn This Month</span>
            <span className="font-medium">
              {formatCurrency(card.withdrawnAmount, "currency")}{" "}
              <span className="text-gray-400">/</span>
              {formatCurrency(card.withdrawnLimit, "currency")}
            </span>
          </div>
          <Progress value={withdrawnPercentage} className="h-2" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4">
        <Button variant="outline" className="flex-1">
          Edit Card
        </Button>
        <Button variant="outline" className="flex-1">
          {card.status === "active" ? "Block Card" : "Unblock Card"}
        </Button>
      </div>
    </div>
  );
}
