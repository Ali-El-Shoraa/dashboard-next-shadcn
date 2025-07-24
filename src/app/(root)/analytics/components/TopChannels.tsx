import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TopChannels() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Channels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              name: "Google",
              value: "4.7K",
              percentage: "82%",
              color: "bg-violet-600",
            },
            {
              name: "Indiehackers.com",
              value: "4.2K",
              percentage: "70%",
              color: "bg-violet-600",
            },
            {
              name: "DuckDuckGo",
              value: "3.4K",
              percentage: "60%",
              color: "bg-violet-600",
            },
            {
              name: "Hacker News",
              value: "3.1K",
              percentage: "44%",
              color: "bg-violet-600",
            },
            {
              name: "Github.com",
              value: "2.2K",
              percentage: "40%",
              color: "bg-violet-600",
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
          Channels Report →
        </Button>
      </CardFooter>
    </Card>
  );
}
