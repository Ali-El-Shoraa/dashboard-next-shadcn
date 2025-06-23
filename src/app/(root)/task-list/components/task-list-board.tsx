"use client"

import { useEffect, useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, closestCorners } from "@dnd-kit/core"
import { Plus, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TaskListColumn } from "./task-list-column"

export interface Task {
  id: string
  title: string
  completed: boolean
  assignees: string[]
  likes?: number
  comments?: number
  attachments?: number
  dueDate?: string
  progress?: { completed: number; total: number }
  subtasks?: { id: string; text: string; completed: boolean }[]
}

export interface TaskSection {
  id: string
  title: string
  tasks: Task[]
}

const teamMembers = [
  "/placeholder.svg?height=32&width=32",
  "/placeholder.svg?height=32&width=32",
  "/placeholder.svg?height=32&width=32",
]

const initialData: TaskSection[] = [
  {
    id: "todo",
    title: "To Do's",
    tasks: [
      {
        id: "task-1",
        title: "Senior Software Engineer Backend",
        completed: false,
        assignees: ["/placeholder.svg?height=24&width=24", "/placeholder.svg?height=24&width=24"],
        likes: 4,
        comments: 7,
        attachments: 1,
      },
      {
        id: "task-2",
        title: "User should receive a daily digest email",
        completed: false,
        assignees: [],
        comments: 6,
        attachments: 1,
        dueDate: "Mar 27",
      },
      {
        id: "task-3",
        title: "Change license and remove products",
        completed: false,
        assignees: ["/placeholder.svg?height=24&width=24", "/placeholder.svg?height=24&width=24"],
        comments: 4,
        attachments: 1,
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
        completed: false,
        assignees: ["/placeholder.svg?height=24&width=24"],
        progress: { completed: 1, total: 3 },
        attachments: 1,
        subtasks: [
          { id: "sub-1", text: "Finish the presentation", completed: true },
          { id: "sub-2", text: "Finish the design", completed: false },
          { id: "sub-3", text: "Publish the content", completed: false },
        ],
      },
      {
        id: "task-5",
        title: "Product Update - Q4 2024",
        completed: false,
        assignees: [],
        dueDate: "Mar 27",
        attachments: 1,
      },
      {
        id: "task-6",
        title: "Design marketing assets",
        completed: false,
        assignees: ["/placeholder.svg?height=24&width=24"],
        dueDate: "Mar 27",
        attachments: 1,
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    tasks: [
      {
        id: "task-7",
        title: "Design new diagrams",
        completed: true,
        assignees: ["/placeholder.svg?height=24&width=24"],
        progress: { completed: 3, total: 3 },
        attachments: 1,
      },
      {
        id: "task-8",
        title: "Update the contact page",
        completed: true,
        assignees: ["/placeholder.svg?height=24&width=24", "/placeholder.svg?height=24&width=24"],
        progress: { completed: 2, total: 2 },
        attachments: 1,
      },
    ],
  },
]

export default function TaskListBoard() {
  const [sections, setSections] = useState<TaskSection[]>(initialData)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = sections.flatMap((section) => section.tasks).find((task) => task.id === active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const activeTaskId = active.id as string
    const overSectionId = over.id as string

    // Find the active task and its current section
    let activeTask: Task | undefined
    let sourceSectionId: string | undefined

    for (const section of sections) {
      const task = section.tasks.find((t) => t.id === activeTaskId)
      if (task) {
        activeTask = task
        sourceSectionId = section.id
        break
      }
    }

    if (!activeTask || !sourceSectionId) return

    // If dropping on the same section, do nothing
    if (sourceSectionId === overSectionId) return

    // Update task completion status based on target section
    const updatedTask = {
      ...activeTask,
      completed: overSectionId === "completed",
    }

    // Move task to new section
    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.id === sourceSectionId) {
          // Remove task from source section
          return {
            ...section,
            tasks: section.tasks.filter((task) => task.id !== activeTaskId),
          }
        } else if (section.id === overSectionId) {
          // Add task to target section
          return {
            ...section,
            tasks: [...section.tasks, updatedTask],
          }
        }
        return section
      })
    })
  }

  const addTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      completed: false,
      assignees: [],
    }

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === "todo" ? { ...section, tasks: [...section.tasks, newTask] } : section,
      ),
    )

    setNewTaskTitle("")
    setIsAddingTask(false)
  }

  const removeTask = (taskId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        tasks: section.tasks.filter((task) => task.id !== taskId),
      })),
    )
  }

  const toggleTaskCompletion = (taskId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        tasks: section.tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
      })),
    )
  }

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        tasks: section.tasks.map((task) =>
          task.id === taskId && task.subtasks
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask,
                ),
                progress: task.progress
                  ? {
                      ...task.progress,
                      completed: task.subtasks.filter((st) => (st.id === subtaskId ? !st.completed : st.completed))
                        .length,
                    }
                  : undefined,
              }
            : task,
        ),
      })),
    )
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Acme Inc. Tasks</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {teamMembers.map((avatar, index) => (
                  <div key={index} className="w-8 h-8 rounded-full bg-gray-200 animate-pulse border-2 border-white" />
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse border-2 border-white" />
              </div>
              <div className="w-20 h-9 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Loading sections */}
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="w-24 h-6 bg-gray-200 animate-pulse rounded" />
                <div className="space-y-3">
                  {[1, 2].map((j) => (
                    <div key={j} className="bg-white p-4 rounded-lg border animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Acme Inc. Tasks</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Team Avatars */}
            <div className="flex -space-x-2">
              {teamMembers.map((avatar, index) => (
                <Avatar key={index} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={avatar || "/placeholder.svg"} />
                  <AvatarFallback>U{index + 1}</AvatarFallback>
                </Avatar>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 rounded-full p-0 border-2 border-white bg-white text-violet-500 hover:bg-violet-50"
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Add new user</span>
              </Button>
            </div>

            {/* Add Task Button */}
            <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
              <DialogTrigger asChild>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">Add Task</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Task Title</label>
                    <Input
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Enter task title..."
                      onKeyDown={(e) => e.key === "Enter" && addTask()}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addTask} disabled={!newTaskTitle.trim()}>
                      Add Task
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Task Sections */}
        <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="space-y-8">
            {sections.map((section) => (
              <TaskListColumn
                key={section.id}
                section={section}
                onRemoveTask={removeTask}
                onToggleTask={toggleTaskCompletion}
                onToggleSubtask={toggleSubtask}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="bg-white border rounded-lg p-4 shadow-lg opacity-90">
                <div className="flex items-center">
                  <GripVertical className="h-3 w-3 text-gray-400 mr-2" />
                  <Checkbox checked={activeTask.completed} className="mr-3" />
                  <span className="font-medium text-gray-800">{activeTask.title}</span>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
