import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export default function CardItem({ item }: { item: ItemType }) {
  return (
    <Card className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
      {/* <CardHeader > */}
      <Link href="#" className="shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
          className="rounded-sm w-40 h-40 max-md:w-full max-md:h-full object-cover"
        />
      </Link>
      {/* </CardHeader> */}

      {/* Product details */}

      <div className="flex-1 flex flex-col items-center justify-between">
        <CardContent className="p-0">
          <Link href="#">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {item.name}
            </h3>
          </Link>

          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {item.description}
          </CardDescription>
        </CardContent>

        {/* Rating and price */}
        <CardFooter className="w-full p-0">
          <div className="w-full flex flex-wrap items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-2">
              {/* Rating stars */}
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-yellow-400">
                    {star <= Math.floor(item.rating) ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 fill-current text-gray-300"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              <span className="text-sm">{item.rating}</span>
              <span className="text-gray-400">·</span>
              <span className="text-sm font-medium">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <button className="text-sm text-red-600 hover:text-red-800 flex gap-1.5 items-center">
              <Trash2 /> Remove
            </button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
