"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Heart,
  MessageCircle,
  Paperclip,
  Calendar,
  BarChart3,
  X,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Task } from "./kanban-board";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onRemove?: (taskId: string) => void;
}

export function TaskCard({
  task,
  isDragging = false,
  onRemove,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-lg opacity-50">
        <CardContent className="p-4">
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800 dark:text-gray-100">
              {task.title}
            </h3>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with remove button */}
          <div className="flex items-start justify-between">
            {task.type === "note" && task.author ? (
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={task.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{task.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm text-gray-800 dark:text-gray-100">
                    {task.author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {task.author.timestamp}
                  </p>
                </div>
              </div>
            ) : (
              <h3 className="font-medium text-gray-800 dark:text-gray-100 flex-1">
                {task.title}
              </h3>
            )}
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(task.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Title for notes */}
          {task.type === "note" && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {task.title}
            </div>
          )}

          {/* Description */}
          {task.description && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {task.description}
            </div>
          )}

          {/* Image */}
          {task.image && (
            <Image
              width={300}
              height={200}
              src={task.image || "/placeholder.svg"}
              alt="Task attachment"
              className="w-full rounded-lg object-cover"
            />
          )}

          {/* Progress and Checklist */}
          {task.progress && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BarChart3 className="h-4 w-4" />
                <span>
                  {task.progress.completed}/{task.progress.total}
                </span>
              </div>
              {task.checklist && (
                <ul className="space-y-1">
                  {task.checklist.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                          item.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {item.completed && (
                          <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                        )}
                      </div>
                      <span
                        className={
                          item.completed ? "line-through text-gray-500" : ""
                        }
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Left side - Assignees or Add button */}
            <div className="flex items-center">
              {task.assignees.length > 0 ? (
                <div className="flex -space-x-2">
                  {task.assignees.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className="w-7 h-7 border-2 border-white"
                    >
                      <AvatarImage src={avatar || "/placeholder.svg"} />
                      <AvatarFallback>U{index + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              ) : task.type === "task" &&
                task.assignees.length === 0 &&
                !task.progress ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-violet-500 border-violet-200 hover:bg-violet-50"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              ) : null}
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2">
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{task.dueDate}</span>
                </div>
              )}
              {task.likes > 0 && (
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <Heart className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500 ml-1">
                    {task.likes}
                  </span>
                </Button>
              )}
              {task.comments > 0 && (
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <MessageCircle className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500 ml-1">
                    {task.comments}
                  </span>
                </Button>
              )}
              {task.attachments > 0 && (
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <Paperclip className="h-4 w-4 text-gray-400" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
