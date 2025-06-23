import React from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "../kanban-board";

interface TaskCardProps {
  task: Task;
  // isDragging?: boolean;
  onRemove?: (taskId: string) => void;
}


export function Item({
    task,
  onRemove,
  // id,
  // index, 
  // column,
}: TaskCardProps) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

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
