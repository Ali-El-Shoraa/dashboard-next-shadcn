"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CircleAlert,
  Eye,
  Mail,
  MousePointer,
  UserMinus,
  UserPlus,
} from "lucide-react";

const campaignData = [
  {
    name: "Emails Sent",
    value: 1503,
    change: "-0.3%",
    icon: <Mail className="h-4 w-4" />,
    color: "#3b82f6",
  },
  {
    name: "Opened",
    value: 6043,
    change: "+2.1%",
    icon: <Eye className="h-4 w-4" />,
    color: "#10b981",
  },
  {
    name: "Clicked",
    value: 600,
    change: "-2.1%",
    icon: <MousePointer className="h-4 w-4" />,
    color: "#ef4444",
  },
  {
    name: "Subscribed",
    value: 490,
    change: "+8.5%",
    icon: <UserPlus className="h-4 w-4" />,
    color: "#8b5cf6",
  },
  {
    name: "Complaints",
    value: 490,
    change: "+4.5%",
    icon: <CircleAlert className="h-4 w-4" />,
    color: "#f59e0b",
  },
  {
    name: "Unsubscribed",
    value: 12,
    change: "-0.5%",
    icon: <UserMinus className="h-4 w-4" />,
    color: "#64748b",
  },
  // عناصر إضافية لاختبار التمرير
  {
    name: "Bounced Emails",
    value: 87,
    change: "+1.2%",
    icon: <Mail className="h-4 w-4" />,
    color: "#f97316",
  },
  {
    name: "Forwarded",
    value: 203,
    change: "+3.7%",
    icon: <Mail className="h-4 w-4" />,
    color: "#ec4899",
  },
];

export default function MonthlyCampaignStateCard() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Monthly Campaign</h2>
            <p className="text-sm text-muted-foreground">
              8.5K social visitors
            </p>
          </div>
          <Badge variant="outline" className="border-green-500 text-green-500">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="px-4 py-2 h-72">
          <div className="space-y-3 pr-3">
            {campaignData.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors border"
              >
                <div
                  className="flex items-center justify-center rounded-lg p-2"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.change.startsWith("+") ? "Increased" : "Decreased"} by{" "}
                    {item.change} from last month
                  </p>
                </div>
                <div className="text-right ml-2">
                  <p className="font-semibold text-base">
                    {item.value.toLocaleString()}
                  </p>
                  <Badge
                    variant={
                      item.change.startsWith("+") ? "secondary" : "destructive"
                    }
                    className="mt-1 px-2 py-0.5 text-xs"
                  >
                    {item.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
