"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { TaskCard } from "./task-card"
import type { Task } from "./kanban-board"
 
interface KanbanColumnProps {
  id: string
  tasks: Task[]
  onRemoveTask: (taskId: string) => void
}

export function KanbanColumn({ id, tasks, onRemoveTask }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onRemove={onRemoveTask} />
        ))}
      </SortableContext>
    </div>
  )
}
