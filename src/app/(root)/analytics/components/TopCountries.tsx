import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TopCountries() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Countries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              name: "🇮🇪 Ireland",
              value: "4.2K",
              percentage: "82%",
              color: "bg-blue-500",
            },
            {
              name: "🇺🇸 United States",
              value: "3.4K",
              percentage: "70%",
              color: "bg-blue-500",
            },
            {
              name: "🇩🇪 Germany",
              value: "1.6K",
              percentage: "60%",
              color: "bg-blue-500",
            },
            {
              name: "🇮🇹 Italy",
              value: "1.2K",
              percentage: "44%",
              color: "bg-blue-500",
            },
            {
              name: "🇬🇧 United Kingdom",
              value: "912",
              percentage: "40%",
              color: "bg-blue-500",
            },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.name}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: item.percentage }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="text-violet-500 p-0">
          Countries Report →
        </Button>
      </CardFooter>
    </Card>
  );
}
