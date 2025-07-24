import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TopPages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              name: "cruip.com/",
              value: "28K",
              percentage: "82%",
              color: "bg-green-500",
            },
            {
              name: "preview.cruip.com/open-pro/",
              value: "12K",
              percentage: "70%",
              color: "bg-green-500",
            },
            {
              name: "preview.cruip.com/appy/",
              value: "9.7K",
              percentage: "60%",
              color: "bg-green-500",
            },
            {
              name: "cruip.com/unlimited/",
              value: "9.2K",
              percentage: "44%",
              color: "bg-green-500",
            },
            {
              name: "preview.cruip.com/simple/",
              value: "7K",
              percentage: "40%",
              color: "bg-green-100",
            },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate">{item.name}</span>
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
          Page Report →
        </Button>
      </CardFooter>
    </Card>
  );
}
