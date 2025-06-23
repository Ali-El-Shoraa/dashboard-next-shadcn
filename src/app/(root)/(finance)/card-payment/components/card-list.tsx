"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CardType = {
  id: string;
  type: "physical" | "virtual";
  name: string;
  lastDigits: string;
  owner: string;
  spent: string;
  limit: string;
  status: "active" | "blocked";
  color: string;
};

export function CardList() {
  const [selectedCard, setSelectedCard] = useState<string>("card1");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "physical" | "virtual"
  >("all");

  const cards: CardType[] = [
    {
      id: "card1",
      type: "physical",
      name: "_Metal",
      lastDigits: "7328",
      owner: "Dominik Lamakani",
      spent: "$780.00",
      limit: "$20,000",
      status: "active",
      color: "bg-gradient-to-r from-gray-700 to-gray-900",
    },
    {
      id: "card2",
      type: "virtual",
      name: "_Virtual",
      lastDigits: "7377",
      owner: "Dominik Lamakani",
      spent: "$0",
      limit: "$20,000",
      status: "blocked",
      color: "bg-gradient-to-r from-purple-800 to-indigo-200",
    },
  ];

  const filteredCards = cards.filter((card) => {
    if (activeFilter === "all") return true;
    return card.type === activeFilter;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
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
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            className={`cursor-pointer transition-all ${
              selectedCard === card.id
                ? "border-2 border-primary"
                : "hover:border-gray-300"
            }`}
            onClick={() => setSelectedCard(card.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* Card Info */}
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-7 rounded ${card.color} flex items-center justify-center`}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{card.name}</div>
                    <div className="text-sm text-gray-500">
                      **{card.lastDigits}
                    </div>
                  </div>
                </div>

                {/* Owner */}
                <div className="text-sm">{card.owner}</div>

                {/* Limits */}
                <div className="text-sm">
                  {card.spent} / {card.limit}
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      card.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {card.status === "active" ? "Active" : "Blocked"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
