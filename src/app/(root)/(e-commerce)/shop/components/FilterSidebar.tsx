"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Checkbox } from "./ui/checkbox";
// import { Label } from "./ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
import { Star } from "lucide-react";
// import { Button } from "./ui/button";

export function FilterSidebar() {
  const categories = [
    "Apps / Software",
    "Design / Tech Products",
    "Books & Writing",
    "Education",
    "Drawing / Painting",
  ];

  const priceRanges = [
    "Less than $20",
    "$20 - $40",
    "$40 - $80",
    "More than $80",
  ];

  const ratings = [4, 3, 2, 1];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-6">
        {/* Discover Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3">Discover</h3>
          <ul className="space-y-2">
            <li>
              <Button variant="link" className="text-violet-500 p-0 h-auto">
                View All
              </Button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <Button variant="link" className="text-gray-600 p-0 h-auto">
                  {category}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Price Range
          </h3>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Multi Select */}
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Multi Select
          </h3>
          <ul className="space-y-2">
            {categories.slice(0, 4).map((category) => (
              <li key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </li>
            ))}
          </ul>
        </div>

        {/* Sort By Rating */}
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Sort By Rating
          </h3>
          <ul className="space-y-2">
            {ratings.map((rating) => (
              <li key={rating}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600"
                >
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating ? "fill-current text-yellow-500" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{rating} Stars and up</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
