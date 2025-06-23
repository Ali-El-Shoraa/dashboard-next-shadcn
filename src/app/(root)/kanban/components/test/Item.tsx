import React from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Card, CardContent } from "@/components/ui/card";

export function Item({
  id,
  index,
  column,
}: {
  id: string;
  index: number;
  column: string;
}) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <div className="bg-white rounded-2xl dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group">
      <Card
        ref={ref}
        data-dragging={isDragging}
        className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
      >
        <CardContent className="p-4">
          <button className="Item">{id}</button>
        </CardContent>
      </Card>
    </div>
  );
}
