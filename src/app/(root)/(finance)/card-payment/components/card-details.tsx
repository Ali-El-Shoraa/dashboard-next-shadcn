"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Lock,
  Unlock,
  Edit,
  Trash2,
  RefreshCw,
  BarChart2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
  onRefresh: () => void;
};

export function CardDetails({
  card,
  onEdit,
  onDelete,
  onToggleStatus,
  onRefresh,
}: CardDetailsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const spentPercentage = (card.spentAmount / card.spentLimit) * 100;
  const withdrawnPercentage =
    (card.withdrawnAmount / card.withdrawnLimit) * 100;

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      onRefresh();
      setIsRefreshing(false);
      toast("Card data refreshed", {
        description: "The latest card information has been loaded.",
      });
    }, 1000);
  };

  const handleCopyCardNumber = () => {
    navigator.clipboard.writeText(`**** **** **** ${card.lastDigits}`);
    toast("Copied to clipboard", {
      description: "Card number copied (without full details for security)",
    });
  };

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isMounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      )}
    >
      <Card className="h-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {card.type === "physical" ? "Physical" : "Virtual"} Card Details
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={cn("h-4 w-4", isRefreshing && "animate-spin")}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Card Preview */}
          <div
            className={`
              p-6 rounded-xl ${card.color} text-white shadow-lg cursor-pointer
              transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]
            `}
            onClick={handleCopyCardNumber}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-sm font-semibold tracking-wider">
                MASTERCARD
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-sm opacity-80">Card Number</div>
              <div className="flex space-x-3 font-mono text-lg tracking-wider">
                <span>••••</span>
                <span>••••</span>
                <span>••••</span>
                <span>{card.lastDigits}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div>
                <div className="opacity-80">Expires</div>
                <div className="font-medium">{card.expDate}</div>
              </div>
              <div>
                <div className="opacity-80">CVC</div>
                <div className="font-medium">•••</div>
              </div>
              <div>
                <div className="opacity-80">Type</div>
                <div className="font-medium capitalize">{card.type}</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Card Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Card Name</span>
                <span className="text-sm font-medium">{card.name} Card</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">
                  Cardholder
                </span>
                <span className="text-sm font-medium">{card.owner}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant={card.status === "active" ? "default" : "destructive"}
                  className="capitalize"
                >
                  {card.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Payment Limits */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Spending Limits
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Spending</span>
                <span className="font-medium">
                  {formatCurrency(card.spentAmount)} /{" "}
                  {formatCurrency(card.spentLimit)}
                </span>
              </div>
              <Progress
                value={spentPercentage}
                className={cn(
                  "h-2",
                  spentPercentage > 80
                    ? "[&_.progress-indicator]:bg-red-500"
                    : "[&_.progress-indicator]:bg-primary"
                )}
              />
              <div className="text-xs text-muted-foreground text-right">
                {spentPercentage.toFixed(1)}% of limit used
              </div>
            </div>
          </div>

          {/* Withdrawal Limits */}
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ATM Withdrawals</span>
                <span className="font-medium">
                  {formatCurrency(card.withdrawnAmount)} /{" "}
                  {formatCurrency(card.withdrawnLimit)}
                </span>
              </div>
              <Progress
                value={withdrawnPercentage}
                className={cn(
                  "h-2",
                  withdrawnPercentage > 80
                    ? "[&_.progress-indicator]:bg-red-500"
                    : "[&_.progress-indicator]:bg-primary"
                )}
              />
              <div className="text-xs text-muted-foreground text-right">
                {withdrawnPercentage.toFixed(1)}% of limit used
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" onClick={onToggleStatus}>
              {card.status === "active" ? (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Block
                </>
              ) : (
                <>
                  <Unlock className="mr-2 h-4 w-4" />
                  Unblock
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 col-span-2"
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Card
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
