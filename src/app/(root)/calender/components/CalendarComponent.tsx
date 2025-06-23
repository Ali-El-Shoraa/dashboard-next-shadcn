import { Card, CardContent } from "@/components/ui/card";
import { CalendarApp } from "@schedule-x/calendar";
import { ScheduleXCalendar } from "@schedule-x/react";

interface CalendarComponentProps {
  calendarApp: CalendarApp | null;
}

export default function CalendarComponent({
  calendarApp,
}: CalendarComponentProps) {
  return (
    <div className="flex-1 p-6">
      <Card className="h-full p-0">
        <CardContent className="p-0 h-full">
          <div className="calendar-wrapper h-full">
            <ScheduleXCalendar calendarApp={calendarApp} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
