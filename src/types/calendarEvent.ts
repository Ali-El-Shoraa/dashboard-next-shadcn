export interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  calendarId: string;
  description?: string;
  location?: string;
  people?: string[];
  priority?: "high" | "medium" | "low";
  status?: "confirmed" | "tentative" | "cancelled";
}
