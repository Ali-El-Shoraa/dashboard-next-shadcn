"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  isSpecialOffer?: boolean;
}

export function ProductCard({
  //   id,
  title,
  description,
  price,
  originalPrice,
  rating,
  image,
  isSpecialOffer = false,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically call an API to update the like status
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          width={301}
          height={226}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-gray-900/80 hover:bg-gray-900 text-white"
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </Button>
        {isSpecialOffer && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-500">
            Special Offer
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-gray-500">{description}</p>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-current text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm ml-1">{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
          <Badge variant="secondary">${price}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
