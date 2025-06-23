import React from "react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";

export function Column({
  children,
  id,
  index,
}: {
  children: React.ReactNode;
  id: string;
  index: number;
}) {
  const { ref } = useSortable({
    id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["item", "column"],
  });

  return (
    <div className="Column" ref={ref}>
      {children}
    </div>
  );
}
