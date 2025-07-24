"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const salesByCountry = [
  {
    name: "United States",
    value: 1999,
    change: "+27.4%",
    flag: "https://flagcdn.com/w80/us.png",
    code: "US",
    percentage: 42,
  },
  {
    name: "Brazil",
    value: 39,
    change: "+20.1%",
    flag: "https://flagcdn.com/w80/br.png",
    code: "BR",
    percentage: 8,
  },
  {
    name: "India",
    value: 299,
    change: "-5%",
    flag: "https://flagcdn.com/w80/in.png",
    code: "IN",
    percentage: 16,
  },
  {
    name: "Australia",
    value: 99,
    change: "+10.9%",
    flag: "https://flagcdn.com/w80/au.png",
    code: "AU",
    percentage: 12,
  },
  {
    name: "France",
    value: 39,
    change: "+2.1%",
    flag: "https://flagcdn.com/w80/fr.png",
    code: "FR",
    percentage: 8,
  },
  {
    name: "Greece",
    value: 30,
    change: "-0.1%",
    flag: "https://flagcdn.com/w80/gr.png",
    code: "GR",
    percentage: 6,
  },
];

export default function SalesByCountriesCard() {
  const totalSales = salesByCountry.reduce(
    (sum, country) => sum + country.value,
    0
  );

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Sales by Countries</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total ${totalSales.toLocaleString()} • Last 28 days
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary gap-1 px-2">
          View All
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {salesByCountry.map((country, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border">
                <AvatarImage src={country.flag} alt={country.name} />
                <AvatarFallback>{country.code}</AvatarFallback>
              </Avatar>

              <div className="grid gap-1 w-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{country.name}</p>
                  <p className="text-sm font-medium">
                    ${country.value.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Progress value={country.percentage} className="h-2 flex-1" />
                  <span
                    className={`text-xs font-medium ${
                      country.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {country.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
