"use client";
import { useState, useRef, useEffect } from "react";
import { Check, Trash2, Plus, Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  category?: string;
  priority?: "low" | "medium" | "high";
  createdAt: Date;
};

export default function AdvancedTodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "priority">(
    "newest"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTask: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        category: "Personal",
        priority: "medium",
        createdAt: new Date(),
      };
      setTodos([newTask, ...todos]);
      setNewTodo("");
      inputRef.current?.focus();
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos
    .filter((todo) => {
      const matchesSearch = todo.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return b.createdAt.getTime() - a.createdAt.getTime();
      if (sortBy === "oldest")
        return a.createdAt.getTime() - b.createdAt.getTime();
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (
          priorityOrder[b.priority || "medium"] -
            priorityOrder[a.priority || "medium"] ||
          b.createdAt.getTime() - a.createdAt.getTime()
        );
      }
      return 0;
    });

  const remainingCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const priorityColor = (priority: Todo["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full max-w-md h-[500px] flex flex-col  gap-0">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>To-Do List</span>
          <Badge variant="outline">
            {remainingCount} {remainingCount === 1 ? "task" : "tasks"} left
          </Badge>
        </CardTitle>
      </CardHeader>

      <div className="px-6 py-3 border-b">
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup
                value={filter}
                onValueChange={(v) =>
                  setFilter(v as "all" | "active" | "completed")
                }
              >
                <DropdownMenuRadioItem value="all">
                  All tasks
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="active">
                  Active
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completed">
                  Completed
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="flex-1"
          />
          <Button onClick={addTodo} className="gap-1">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      <CardContent className="flex-1 p-2">
        <ScrollArea className="h-52">
          {filteredTodos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <p className="mb-2">
                {searchTerm ? "No tasks match your search" : "No tasks yet"}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                  inputRef.current?.focus();
                }}
              >
                {searchTerm ? "Clear search" : "Add your first task"}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    todo.completed ? "bg-muted/50" : "hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center ${
                        todo.completed
                          ? "bg-primary border-primary text-white"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {todo.completed && <Check className="h-3 w-3" />}
                    </button>
                    <span
                      className={`truncate ${
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                      title={todo.text}
                    >
                      {todo.text}
                    </span>
                    {todo.priority && (
                      <Badge
                        variant="outline"
                        className={`ml-auto text-xs ${priorityColor(
                          todo.priority
                        )}`}
                      >
                        {todo.priority}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:bg-red-500/10 flex-shrink-0"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t py-3 px-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredTodos.length} {filteredTodos.length === 1 ? "item" : "items"}{" "}
          shown
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                Sort: {sortBy}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(v) =>
                  setSortBy(v as "newest" | "oldest" | "priority")
                }
              >
                <DropdownMenuRadioItem value="newest">
                  Newest first
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  Oldest first
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="priority">
                  By priority
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {completedCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:bg-red-500/10"
              onClick={clearCompleted}
            >
              Clear completed
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
