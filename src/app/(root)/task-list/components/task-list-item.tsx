"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Heart, MessageCircle, Paperclip, Calendar, BarChart3, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Task } from "./task-list-board"

interface TaskListItemProps {
  task: Task
  onRemove: (taskId: string) => void
  onToggleTask: (taskId: string) => void
  onToggleSubtask: (taskId: string, subtaskId: string) => void
}

export function TaskListItem({ task, onRemove, onToggleTask, onToggleSubtask }: TaskListItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow group ${
        isDragging ? "opacity-50" : ""
      } ${task.completed ? "bg-gray-50 border-gray-200" : ""}`}
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            {/* Drag handle */}
            <button
              {...attributes}
              {...listeners}
              className="mr-2 p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-3 w-3" />
              <span className="sr-only">Drag</span>
            </button>

            {/* Checkbox and title */}
            <div className="flex items-center flex-1 min-w-0">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="mr-3 rounded-full"
              />
              <span
                className={`font-medium text-gray-800 dark:text-gray-100 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
            </div>
          </div>

          {/* Subtasks */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="ml-8 mt-3 space-y-2">
              {task.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center">
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() => onToggleSubtask(task.id, subtask.id)}
                    className="mr-3 rounded-full"
                  />
                  <span
                    className={`text-sm text-gray-800 dark:text-gray-100 ${
                      subtask.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {subtask.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-4">
          {/* Assignees */}
          {task.assignees.length > 0 && (
            <div className="flex -space-x-2">
              {task.assignees.map((avatar, index) => (
                <Avatar key={index} className="w-6 h-6 border-2 border-white">
                  <AvatarImage src={avatar || "/placeholder.svg"} />
                  <AvatarFallback>U{index + 1}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}

          {/* Progress */}
          {task.progress && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <BarChart3 className="h-4 w-4" />
              <span>
                {task.progress.completed}/{task.progress.total}
              </span>
            </div>
          )}

          {/* Due date */}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{task.dueDate}</span>
            </div>
          )}

          {/* Like button */}
          {task.likes !== undefined && task.likes > 0 && (
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <Heart className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500 ml-1">{task.likes}</span>
            </Button>
          )}

          {/* Comments button */}
          {task.comments !== undefined && task.comments > 0 && (
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <MessageCircle className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500 ml-1">{task.comments}</span>
            </Button>
          )}

          {/* Attachments button */}
          {task.attachments !== undefined && task.attachments > 0 && (
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <Paperclip className="h-4 w-4 text-gray-400" />
            </Button>
          )}

          {/* Remove button */}
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-gray-400 hover:text-red-500"
            onClick={() => onRemove(task.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
