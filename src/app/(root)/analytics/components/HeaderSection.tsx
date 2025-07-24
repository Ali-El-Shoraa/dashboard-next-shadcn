"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, Filter, Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function HeaderSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of your business performance
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-64 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {date ? (
                <div className="flex items-center gap-2">
                  <span>{format(date, "MMM dd, yyyy")}</span>
                </div>
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setIsCalendarOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Input } from "@/components/ui/input";
// import { ChevronDown, Filter } from "lucide-react";

// export default function HeaderSection() {
//   return (
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//           Analytics Dashboard
//         </h1>
//         <p className="text-sm text-muted-foreground">
//           Overview of your business performance
//         </p>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//         <div className="relative w-full sm:w-64">
//           <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <Input
//             className="pl-9"
//             placeholder="Select dates"
//             type="text"
//             readOnly
//           />
//         </div>

//         <Button variant="outline">
//           <Filter className="mr-2 h-4 w-4" />
//           Filter
//           <ChevronDown className="ml-2 h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }
