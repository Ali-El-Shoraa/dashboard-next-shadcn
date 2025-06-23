"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { TaskListItem } from "./task-list-item"
import type { TaskSection } from "./task-list-board"

interface TaskListColumnProps {
  section: TaskSection
  onRemoveTask: (taskId: string) => void
  onToggleTask: (taskId: string) => void
  onToggleSubtask: (taskId: string, subtaskId: string) => void
}

export function TaskListColumn({ section, onRemoveTask, onToggleTask, onToggleSubtask }: TaskListColumnProps) {
  const { setNodeRef } = useDroppable({ id: section.id })

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{section.title}</h2>
      <div ref={setNodeRef} className="space-y-3 min-h-[100px]">
        <SortableContext items={section.tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {section.tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onRemove={onRemoveTask}
              onToggleTask={onToggleTask}
              onToggleSubtask={onToggleSubtask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
