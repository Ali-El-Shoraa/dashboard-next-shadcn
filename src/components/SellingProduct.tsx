import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import Image from "next/image";

interface DataType {
  id: number;
  name: string;
  sold: number;
  img: string;
}

export default function SellingProduct({ data }: { data: DataType[] }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex items-center justify-between gap-2">
        <div className="space-y-3">
          <CardTitle>Best Selling Product</CardTitle>
          <CardDescription>Top-Selling Products at a Glance</CardDescription>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View All</TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="px-6 space-y-2 flex-1 overflow-y-auto">
        {data.map((p) => (
          <Link
            key={p.id}
            href={`/sales`}
            className="flex items-center justify-between gap-4 rounded-md border px-4 py-3 hover:bg-muted"
          >
            <div className="flex items-center gap-4">
              <Image
                src={p.img}
                alt={p.name}
                width={40}
                height={40}
                className="rounded-md"
              />
              <div className="font-medium">{p.name}</div>
            </div>
            <div className="text-sm text-green-600">{p.sold} items sold</div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
