import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const websiteAnalytics = [
  { name: "Direct", value: 432 },
  { name: "Organic", value: 216 },
  { name: "Sessions", value: "29%" },
  { name: "Page Views", value: "2.3K" },
  { name: "Leads", value: "1.6K" },
  { name: "Conversions", value: "8%" },
];

export default function WebsiteAnalyticsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Website Analytics</CardTitle>
        <p className="text-sm text-muted-foreground">
          Total 28.5% Conversion Rate
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {websiteAnalytics.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Badge variant="secondary" className="w-12 justify-center">
                {item.value}
              </Badge>
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
