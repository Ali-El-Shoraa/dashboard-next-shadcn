"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KanbanColumn } from "./kanban-column";
import { TaskCard } from "./task-card";

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignees: string[];
  likes: number;
  comments: number;
  attachments: number;
  dueDate?: string;
  progress?: { completed: number; total: number };
  checklist?: { id: string; text: string; completed: boolean }[];
  image?: string;
  creator?: string;
  taskId?: string;
  type: "task" | "note";
  author?: {
    name: string;
    avatar: string;
    timestamp: string;
  };
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialData: Column[] = [
  {
    id: "todo",
    title: "To Do's",
    tasks: [
      {
        id: "task-1",
        title: "Managing teams (book)",
        description: "#7764 created by markus-james",
        assignees: [
          "/placeholder.svg?height=28&width=28",
          "/placeholder.svg?height=28&width=28",
        ],
        likes: 4,
        comments: 7,
        attachments: 1,
        type: "task",
      },
      {
        id: "task-2",
        title: "User should receive a daily digest email",
        description:
          "Dedicated form for a category of users that will perform actions.",
        assignees: [],
        likes: 0,
        comments: 6,
        attachments: 1,
        dueDate: "Mar 27",
        type: "task",
      },
      {
        id: "task-3",
        title: "Change license and remove references to products",
        assignees: [
          "/placeholder.svg?height=28&width=28",
          "/placeholder.svg?height=28&width=28",
        ],
        likes: 0,
        comments: 4,
        attachments: 1,
        type: "task",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    tasks: [
      {
        id: "task-4",
        title: "Managing teams (book)",
        assignees: ["/placeholder.svg?height=28&width=28"],
        likes: 0,
        comments: 0,
        attachments: 1,
        progress: { completed: 1, total: 3 },
        checklist: [
          { id: "1", text: "Implement new designs", completed: true },
          { id: "2", text: "Usability testing", completed: false },
          { id: "3", text: "Design navigation changes", completed: false },
        ],
        type: "task",
      },
      {
        id: "task-5",
        title: "Product Update - Q4 2024",
        description:
          "Dedicated form for a category of users that will perform actions.",
        assignees: [
          "/placeholder.svg?height=28&width=28",
          "/placeholder.svg?height=28&width=28",
        ],
        likes: 0,
        comments: 0,
        attachments: 1,
        dueDate: "Mar 27",
        image: "/placeholder.svg?height=142&width=259",
        type: "task",
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    tasks: [
      {
        id: "task-6",
        title: "Design new diagrams",
        description: "#7896 created by jerzy-wierzy",
        assignees: ["/placeholder.svg?height=28&width=28"],
        likes: 4,
        comments: 7,
        attachments: 0,
        type: "task",
      },
      {
        id: "task-7",
        title: "Manage internal feedback",
        assignees: ["/placeholder.svg?height=28&width=28"],
        likes: 0,
        comments: 0,
        attachments: 1,
        progress: { completed: 2, total: 2 },
        checklist: [
          { id: "1", text: "Call with incoming clients", completed: true },
          { id: "2", text: "Manage inbound deals", completed: true },
        ],
        type: "task",
      },
    ],
  },
  {
    id: "notes",
    title: "Notes",
    tasks: [
      {
        id: "note-1",
        title:
          "Publishing industries for previewing layouts and visual #family 🔥",
        assignees: [],
        likes: 4,
        comments: 16,
        attachments: 0,
        image: "/placeholder.svg?height=142&width=259",
        type: "note",
        author: {
          name: "Adrian Przetocki",
          avatar: "/placeholder.svg?height=28&width=28",
          timestamp: "11:51 AM Jan 12",
        },
      },
      {
        id: "note-2",
        title:
          "Dedicated form for a category of users that will perform actions? #viewall",
        assignees: [],
        likes: 6,
        comments: 7,
        attachments: 1,
        type: "note",
        author: {
          name: "Adrian Przetocki",
          avatar: "/placeholder.svg?height=28&width=28",
          timestamp: "11:51 AM Jan 12",
        },
      },
    ],
  },
];

const filters = ["View All", "Web Sprint", "Marketing", "Development"];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [activeFilter, setActiveFilter] = useState("View All");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [, setIsAddingTask] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTaskId = active.id as string;
    const overColumnId = over.id as string;

    // Find the active task and its current column
    let activeTask: Task | undefined;
    let sourceColumnId: string | undefined;

    for (const column of columns) {
      const task = column.tasks.find((t) => t.id === activeTaskId);
      if (task) {
        activeTask = task;
        sourceColumnId = column.id;
        break;
      }
    }

    if (!activeTask || !sourceColumnId) return;

    // If dropping on the same column, do nothing
    if (sourceColumnId === overColumnId) return;

    // Move task to new column
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === sourceColumnId) {
          // Remove task from source column
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== activeTaskId),
          };
        } else if (column.id === overColumnId) {
          // Add task to target column
          return {
            ...column,
            tasks: [...column.tasks, activeTask],
          };
        }
        return column;
      });
    });
  };

  const addTask = (columnId: string) => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDescription || undefined,
      assignees: [],
      likes: 0,
      comments: 0,
      attachments: 0,
      type: columnId === "notes" ? "note" : "task",
      ...(columnId === "notes" && {
        author: {
          name: "You",
          avatar: "/placeholder.svg?height=28&width=28",
          timestamp: new Date().toLocaleString(),
        },
      }),
    };

    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );

    setNewTaskTitle("");
    setNewTaskDescription("");
    setIsAddingTask(null);
  };

  const removeTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Acme Inc. Tasks
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                Add Board
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeFilter === filter
                      ? "border-violet-500 text-violet-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </nav>
          </div>

          {/* Loading state */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                    {column.title}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-violet-500 hover:text-violet-600 p-1"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3 min-h-[200px]">
                  {column.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Acme Inc. Tasks
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              Add Board
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeFilter === filter
                    ? "border-violet-500 text-violet-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </nav>
        </div>

        {/* Kanban Board */}
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                    {column.title}
                  </h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-violet-500 hover:text-violet-600 p-1"
                        onClick={() => setIsAddingTask(column.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Add New {column.id === "notes" ? "Note" : "Task"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Enter task title..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Description
                          </label>
                          <Textarea
                            value={newTaskDescription}
                            onChange={(e) =>
                              setNewTaskDescription(e.target.value)
                            }
                            placeholder="Enter description..."
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => addTask(column.id)}
                            disabled={!newTaskTitle.trim()}
                          >
                            Add {column.id === "notes" ? "Note" : "Task"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setNewTaskTitle("");
                              setNewTaskDescription("");
                              setIsAddingTask(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Column Content */}
                <KanbanColumn
                  id={column.id}
                  tasks={column.tasks}
                  onRemoveTask={removeTask}
                />
              </div>
            ))}
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
