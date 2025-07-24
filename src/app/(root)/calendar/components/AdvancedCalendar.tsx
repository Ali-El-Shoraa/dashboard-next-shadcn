"use client";

import { useState, useEffect } from "react";
import { useNextCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { Calendar, CalendarDays, Clock, Users } from "lucide-react";

import "@schedule-x/theme-shadcn/dist/index.css";
import type { CalendarEvent } from "@/types/calendarEvent";
import StatsBar from "./StatsBar";
import CalendarComponent from "./CalendarComponent";
import TopBar from "./TopBar";
import SidebarCalendar from "./SidebarCalendar";

const sampleEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Strategic Planning Meeting",
    start: "2025-01-22 09:00",
    end: "2025-01-22 11:00",
    calendarId: "work",
    description: "Q1 planning and goal setting",
    location: "Executive Conference Room",
    people: ["Sarah Johnson", "Mike Chen", "Alex Rivera"],
    priority: "high",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Client Presentation",
    start: "2025-01-22 14:30",
    end: "2025-01-22 16:00",
    calendarId: "work",
    description: "Product demo for new client",
    location: "Virtual Meeting",
    people: ["John Doe", "Emma Wilson"],
    priority: "high",
    status: "confirmed",
  },
  {
    id: 3,
    title: "Team Lunch",
    start: "2025-01-23 12:00",
    end: "2025-01-23 13:30",
    calendarId: "work",
    description: "Monthly team bonding",
    location: "Italian Bistro",
    people: ["Team Members"],
    priority: "medium",
    status: "confirmed",
  },
  {
    id: 4,
    title: "Yoga Class",
    start: "2025-01-23 18:00",
    end: "2025-01-23 19:00",
    calendarId: "personal",
    description: "Evening relaxation session",
    location: "Wellness Center",
    priority: "low",
    status: "confirmed",
  },
  {
    id: 5,
    title: "Project Review",
    start: "2025-01-24 10:00",
    end: "2025-01-24 12:00",
    calendarId: "work",
    description: "Sprint retrospective and planning",
    location: "Development Lab",
    people: ["Dev Team"],
    priority: "medium",
    status: "tentative",
  },
  {
    id: 6,
    title: "Family Dinner",
    start: "2025-01-24 19:00",
    end: "2025-01-24 21:00",
    calendarId: "personal",
    description: "Weekly family gathering",
    location: "Home",
    priority: "high",
    status: "confirmed",
  },
];

const viewOptions = [
  { key: "day", label: "Day", icon: Clock },
  { key: "week", label: "Week", icon: CalendarDays },
  { key: "month-grid", label: "Month", icon: Calendar },
  { key: "month-agenda", label: "Agenda", icon: Users },
];

export default function AdvancedCalendar() {
  const [currentView, setCurrentView] = useState("week");
  const [selectedCalendars, setSelectedCalendars] = useState([
    "work",
    "personal",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [currentDate, setCurrentDate] = useState(new Date())
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calendarApp = useNextCalendarApp({
    views: [
      createViewWeek(),
      createViewDay(),
      createViewMonthAgenda(),
      createViewMonthGrid(),
    ],
    defaultView: currentView,
    calendars: {
      work: {
        label: "Work",
        colorName: "work",
        lightColors: {
          main: "hsl(221.2 83.2% 53.3%)",
          container: "hsl(221.2 83.2% 53.3%)",
          onContainer: "hsl(210 40% 98%)",
        },
        darkColors: {
          main: "hsl(217.2 91.2% 59.8%)",
          container: "hsl(217.2 91.2% 59.8%)",
          onContainer: "hsl(222.2 84% 4.9%)",
        },
      },
      personal: {
        label: "Personal",
        colorName: "personal",
        lightColors: {
          main: "hsl(142.1 76.2% 36.3%)",
          container: "hsl(142.1 76.2% 36.3%)",
          onContainer: "hsl(210 40% 98%)",
        },
        darkColors: {
          main: "hsl(142.1 70.6% 45.3%)",
          container: "hsl(142.1 70.6% 45.3%)",
          onContainer: "hsl(222.2 84% 4.9%)",
        },
      },
    },
    events: sampleEvents.filter((event) =>
      selectedCalendars.includes(event.calendarId)
    ),
  });

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    if (calendarApp) {
      // calendarApp.setView(view);
    }
  };

  const toggleCalendar = (calendarId: string) => {
    setSelectedCalendars((prev) =>
      prev.includes(calendarId)
        ? prev.filter((id) => id !== calendarId)
        : [...prev, calendarId]
    );
  };

  const todayEvents = sampleEvents
    .filter((event) => {
      const eventDate = new Date(event.start).toDateString();
      const today = new Date().toDateString();
      return eventDate === today;
    })
    .map((event) => ({
      ...event,
      id: String(event.id),
    }));

  if (!mounted) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading calendar...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Sidebar */}
      <SidebarCalendar
        todayEvents={todayEvents}
        currentView={currentView}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        viewOptions={viewOptions}
        handleViewChange={handleViewChange}
        selectedCalendars={selectedCalendars}
        toggleCalendar={toggleCalendar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar
        // currentDate={currentDate.toLocaleDateString("en-US", {
        //   month: "long",
        //   year: "numeric",
        // })}
        />

        {/* Stats Bar */}
        <StatsBar sampleEvents={sampleEvents} />

        {/* Calendar */}
        <CalendarComponent calendarApp={calendarApp} />
      </div>
    </div>
  );
}
