"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CardType = {
  id: string;
  type: "physical" | "virtual";
  name: string;
  lastDigits: string;
  owner: string;
  spent: number;
  limit: number;
  status: "active" | "blocked";
  color: string;
  expDate: string;
  spentAmount: number;
  spentLimit: number;
  withdrawnAmount: number;
  withdrawnLimit: number;
};

export function CardList({
  cards,
  selectedCard,
  setSelectedCard,
  onAddCard,
}: {
  cards: CardType[];
  selectedCard: string;
  setSelectedCard: (id: string) => void;
  onAddCard: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "physical" | "virtual"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    setMounted(true);
    return () => clearTimeout(timer);
  }, []);

  const filteredCards = cards.filter((card) => {
    if (activeFilter !== "all" && card.type !== activeFilter) return false;
    if (
      searchQuery &&
      !card.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !card.lastDigits.includes(searchQuery)
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
          >
            View All
          </Button>
          <Button
            variant={activeFilter === "physical" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("physical")}
          >
            Physical Cards
          </Button>
          <Button
            variant={activeFilter === "virtual" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("virtual")}
          >
            Virtual Cards
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={onAddCard}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Card
          </Button>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "transition-all duration-300 ease-in-out",
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              )}
              style={{ transitionDelay: `${cards.indexOf(card) * 50}ms` }}
            >
              <Card
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedCard === card.id
                    ? "border-2 border-primary shadow-sm"
                    : "hover:border-gray-300"
                )}
                onClick={() => setSelectedCard(card.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* Card Info */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-7 rounded ${card.color} flex items-center justify-center shadow-inner`}
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{card.name}</div>
                        <div className="text-sm text-muted-foreground">
                          **** **** **** {card.lastDigits}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          card.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        )}
                      >
                        {card.status === "active" ? "Active" : "Blocked"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div
            className={cn(
              "flex flex-col items-center justify-center py-12 text-center transition-opacity duration-300",
              mounted ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="text-muted-foreground mb-4">
              No cards found matching your criteria
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
