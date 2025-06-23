"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

export default function TodoList() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [Open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium mb-6">Todo Lest</h1>
        <Popover open={Open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button>
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* LIST */}
      <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="todo-1" className="h-5 w-5" />
              <label htmlFor="todo-1" className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </label>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
