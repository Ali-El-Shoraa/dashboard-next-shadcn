"use client";

import { useState, useEffect, JSX } from "react";
import {
  Check,
  Plus,
  Trash2,
  Circle,
  FilePlus,
  Activity,
  Flag,
  Calendar,
  Tag,
  Star,
  Archive,
  ListChecks,
  Filter,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar as CalendarComp } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

type Priority = "low" | "medium" | "high" | "critical";
type Category = "work" | "personal" | "shopping" | "health" | "other";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: Priority;
  category?: Category;
  description?: string;
  starred?: boolean;
};

type CategoryFilter = {
  id: string;
  name: string;
  icon: JSX.Element;
  count: number;
  color: string;
};

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<Priority>("medium");
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        // Convert string dates back to Date objects
        const tasksWithDates = parsedTasks.map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error("Failed to parse tasks", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const filters: CategoryFilter[] = [
    {
      id: "all",
      name: "All Tasks",
      icon: <FilePlus className="h-4 w-4" />,
      count: tasks.length,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "completed",
      name: "Completed",
      icon: <Check className="h-4 w-4" />,
      count: tasks.filter((task) => task.completed).length,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "pending",
      name: "Pending",
      icon: <Circle className="h-4 w-4" />,
      count: tasks.filter((task) => !task.completed).length,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "starred",
      name: "Starred",
      icon: <Star className="h-4 w-4" />,
      count: tasks.filter((task) => task.starred).length,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "high-priority",
      name: "High Priority",
      icon: <Flag className="h-4 w-4" />,
      count: tasks.filter(
        (task) => task.priority === "high" || task.priority === "critical"
      ).length,
      color: "bg-red-100 text-red-800",
    },
    {
      id: "today",
      name: "Due Today",
      icon: <Calendar className="h-4 w-4" />,
      count: tasks.filter((task) => task.dueDate && isToday(task.dueDate))
        .length,
      color: "bg-orange-100 text-orange-800",
    },
  ];

  const priorityOptions = [
    {
      value: "low",
      label: "Low",
      icon: <Flag className="h-4 w-4 text-blue-500" />,
    },
    {
      value: "medium",
      label: "Medium",
      icon: <Flag className="h-4 w-4 text-yellow-500" />,
    },
    {
      value: "high",
      label: "High",
      icon: <Flag className="h-4 w-4 text-orange-500" />,
    },
    {
      value: "critical",
      label: "Critical",
      icon: <Flag className="h-4 w-4 text-red-500" />,
    },
  ];

  const categoryOptions = [
    {
      value: "work",
      label: "Work",
      icon: <Activity className="h-4 w-4 text-blue-500" />,
    },
    {
      value: "personal",
      label: "Personal",
      icon: <Circle className="h-4 w-4 text-green-500" />,
    },
    {
      value: "shopping",
      label: "Shopping",
      icon: <ListChecks className="h-4 w-4 text-purple-500" />,
    },
    {
      value: "health",
      label: "Health",
      icon: <Check className="h-4 w-4 text-red-500" />,
    },
    {
      value: "other",
      label: "Other",
      icon: <FilePlus className="h-4 w-4 text-gray-500" />,
    },
  ];

  const addTask = () => {
    if (newTask.trim() === "") {
      toast.error("Task title cannot be empty");
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      description: newTaskDescription,
      completed: false,
      createdAt: new Date(),
      dueDate,
      priority: selectedPriority,
      category: selectedCategory,
      starred: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    setNewTaskDescription("");
    setDueDate(undefined);
    setSelectedPriority("medium");
    setSelectedCategory(undefined);
    setShowTaskForm(false);
    toast.success("Task added successfully");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully");
  };

  const toggleStarred = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, starred: !task.starred } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
    toast.success("Completed tasks cleared");
  };

  const archiveTasks = () => {
    // In a real app, you might move these to an archive array
    toast.success("Tasks archived");
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "completed") return task.completed;
      if (activeFilter === "pending") return !task.completed;
      if (activeFilter === "starred") return task.starred;
      if (activeFilter === "high-priority")
        return task.priority === "high" || task.priority === "critical";
      if (activeFilter === "today")
        return task.dueDate && isToday(task.dueDate);
      return true;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      // Sort by starred first
      if (a.starred && !b.starred) return -1;
      if (!a.starred && b.starred) return 1;

      // Then by priority
      const priorityOrder: Priority[] = ["critical", "high", "medium", "low"];
      const aPriority = priorityOrder.indexOf(a.priority);
      const bPriority = priorityOrder.indexOf(b.priority);
      if (aPriority < bPriority) return -1;
      if (aPriority > bPriority) return 1;

      // Then by due date (tasks with due dates come first)
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && b.dueDate)
        return a.dueDate.getTime() - b.dueDate.getTime();

      // Finally by creation date
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  const formatDate = (date: Date) => {
    return format(date, "MMM dd, yyyy");
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "low":
        return "text-blue-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-orange-500";
      case "critical":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getCategoryColor = (category?: Category) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-800";
      case "personal":
        return "bg-green-100 text-green-800";
      case "shopping":
        return "bg-purple-100 text-purple-800";
      case "health":
        return "bg-red-100 text-red-800";
      case "other":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFilterSelect = (filterId: string) => {
    setActiveFilter(filterId);
    setMobileFiltersOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-72 border-r bg-white shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/user.png" />
              <AvatarFallback>WC</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">WILLIAM C. JENNINGS</h2>
              <p className="text-sm text-gray-500">william@jourrapide.com</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Button className="w-full mb-6" onClick={() => setShowTaskForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Task
          </Button>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              QUICK FILTERS
            </h3>
            <nav className="space-y-1">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                    activeFilter === filter.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <span className="mr-3">{filter.icon}</span>
                  <span className="flex-1 text-left">{filter.name}</span>
                  <Badge variant="secondary">{filter.count}</Badge>
                </button>
              ))}
            </nav>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              CATEGORIES
            </h3>
            <div className="space-y-1">
              {categoryOptions.map((category) => {
                const count = tasks.filter(
                  (t) => t.category === category.value
                ).length;
                return (
                  <button
                    key={category.value}
                    onClick={() =>
                      setActiveFilter(`category-${category.value}`)
                    }
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                      activeFilter === `category-${category.value}`
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <span className="mr-3">{category.icon}</span>
                    <span className="flex-1 text-left">{category.label}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Todo App</h1>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTaskForm(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger className="" asChild>
                <Button variant="ghost" size="icon">
                  <Filter className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="bottom" className="h-[85vh]">
                <ScrollArea className="h-full">
                  <SheetHeader className="sticky top-0 bg-white">
                    <SheetTitle className="text-left">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        QUICK FILTERS
                      </h3>
                      <nav className="space-y-1">
                        {filters.map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => handleFilterSelect(filter.id)}
                            className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                              activeFilter === filter.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            }`}
                          >
                            <span className="mr-3">{filter.icon}</span>
                            <span className="flex-1 text-left">
                              {filter.name}
                            </span>
                            <Badge variant="secondary">{filter.count}</Badge>
                          </button>
                        ))}
                      </nav>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        CATEGORIES
                      </h3>
                      <div className="space-y-1">
                        {categoryOptions.map((category) => {
                          const count = tasks.filter(
                            (t) => t.category === category.value
                          ).length;
                          return (
                            <button
                              key={category.value}
                              onClick={() =>
                                handleFilterSelect(`category-${category.value}`)
                              }
                              className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                                activeFilter === `category-${category.value}`
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-accent hover:text-accent-foreground"
                              }`}
                            >
                              <span className="mr-3">{category.icon}</span>
                              <span className="flex-1 text-left">
                                {category.label}
                              </span>
                              <Badge variant="secondary">{count}</Badge>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button
                      variant="outline"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full"
                    >
                      Close
                    </Button>
                  </SheetFooter>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Task Management Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <FilePlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasks.length}</div>
                <p className="text-xs text-muted-foreground">
                  {tasks.filter((t) => !t.completed).length} pending
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tasks.filter((task) => task.completed).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(
                    (tasks.filter((t) => t.completed).length /
                      (tasks.length || 1)) *
                      100
                  )}
                  % of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Starred</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tasks.filter((task) => task.starred).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {tasks.filter((t) => t.starred && !t.completed).length}{" "}
                  pending
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Due Today</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    tasks.filter(
                      (task) => task.dueDate && isToday(task.dueDate)
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  {
                    tasks.filter(
                      (t) => t.dueDate && isToday(t.dueDate) && !t.completed
                    ).length
                  }{" "}
                  pending
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Task Form */}
          {showTaskForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Task title"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                  <Input
                    placeholder="Description (optional)"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-start">
                          <Flag className="h-4 w-4 mr-2" />
                          {selectedPriority.charAt(0).toUpperCase() +
                            selectedPriority.slice(1)}{" "}
                          Priority
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {priorityOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() =>
                              setSelectedPriority(option.value as Priority)
                            }
                          >
                            {option.icon}
                            <span className="ml-2">{option.label}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-start">
                          <Tag className="h-4 w-4 mr-2" />
                          {selectedCategory
                            ? selectedCategory.charAt(0).toUpperCase() +
                              selectedCategory.slice(1)
                            : "Select Category"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setSelectedCategory(undefined)}
                        >
                          None
                        </DropdownMenuItem>
                        {categoryOptions.map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() =>
                              setSelectedCategory(option.value as Category)
                            }
                          >
                            {option.icon}
                            <span className="ml-2">{option.label}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dueDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {dueDate ? (
                          format(dueDate, "PPP")
                        ) : (
                          <span>Due date (optional)</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComp
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowTaskForm(false)}
                >
                  Cancel
                </Button>
                <Button onClick={addTask}>Add Task</Button>
              </CardFooter>
            </Card>
          )}

          {/* Task List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tasks</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No tasks found</p>
                  <Button
                    variant="ghost"
                    className="mt-2"
                    onClick={() => {
                      setActiveFilter("all");
                      setSearchTerm("");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <ul className="space-y-2">
                  {filteredTasks.map((task) => (
                    <li
                      key={task.id}
                      className={`p-3 rounded-lg border ${
                        task.completed ? "bg-gray-50" : "bg-white"
                      } ${
                        task.starred
                          ? "border-yellow-300"
                          : "border-transparent"
                      } hover:shadow-sm transition-shadow`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center h-9">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="relative"
                          >
                            <div
                              className={`h-5 w-5 rounded-sm border ${
                                task.completed
                                  ? "bg-primary border-primary"
                                  : "border-gray-300"
                              } flex items-center justify-center`}
                            >
                              {task.completed && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3
                              className={`font-medium ${
                                task.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {task.starred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              )}
                              <Flag
                                className={`h-4 w-4 ${getPriorityColor(
                                  task.priority
                                )}`}
                              />
                              {task.category && (
                                <Badge
                                  variant="outline"
                                  className={`${getCategoryColor(
                                    task.category
                                  )} px-2 py-0.5 text-xs`}
                                >
                                  {task.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {task.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {expandedTask === task.id
                                ? task.description
                                : `${task.description.substring(0, 100)}${
                                    task.description.length > 100 ? "..." : ""
                                  }`}
                              {task.description.length > 100 && (
                                <button
                                  onClick={() =>
                                    setExpandedTask(
                                      expandedTask === task.id ? null : task.id
                                    )
                                  }
                                  className="text-blue-500 ml-1 text-xs"
                                >
                                  {expandedTask === task.id
                                    ? "Show less"
                                    : "Show more"}
                                </button>
                              )}
                            </p>
                          )}
                          <div className="flex items-center mt-2 space-x-4">
                            {task.dueDate && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{formatDate(task.dueDate)}</span>
                                {isToday(task.dueDate) && !task.completed && (
                                  <Badge variant="destructive" className="ml-2">
                                    Due Today
                                  </Badge>
                                )}
                              </div>
                            )}
                            <span className="text-sm text-gray-500">
                              Created: {formatDate(task.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleStarred(task.id)}
                                className="h-8 w-8"
                              >
                                <Star
                                  className={`h-4 w-4 ${
                                    task.starred
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-400"
                                  }`}
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {task.starred ? "Remove star" : "Star task"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteTask(task.id)}
                                className="h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete task</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>

            <CardFooter className="flex justify-between text-sm text-gray-500">
              <div>
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1 ? "item" : "items"}
                {activeFilter !== "all" && (
                  <span className="ml-2">(of {tasks.length} total)</span>
                )}
              </div>
              <div className="space-x-4">
                <button onClick={clearCompleted} className="hover:text-primary">
                  Clear completed
                </button>
                <button onClick={archiveTasks} className="hover:text-primary">
                  <Archive className="h-4 w-4 inline mr-1" />
                  Archive
                </button>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
