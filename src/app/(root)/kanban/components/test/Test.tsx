"use client";
import React, { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import "./styles.css";
import { Column } from "./Column";
import { Item } from "./Item";

export default function Test() {
  const [items, setItems] = useState({
    A: ["A0", "A1", "A2"],
    B: ["B0", "B1"],
    C: [],
  });

  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source } = event.operation;

        if (source?.type === "column") return;

        setItems((items) => move(items, event));
      }}
    >
      <div className="Root">
        {Object.entries(items).map(([column, items], index) => (
          <Column key={column} id={column} index={index}>
            {items.map((id, index) => (
              <Item key={id} id={id} index={index} column={column} />
            ))}
          </Column>
        ))}
      </div>
    </DragDropProvider>
  );
}
