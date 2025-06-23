"use client";

import { useState } from "react";
import { useNextCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
// import { useTheme } from "next-themes";
import { Calendar, CalendarDays, Clock, Users } from "lucide-react";

import "@schedule-x/theme-shadcn/dist/index.css";
import { CalendarEvent } from "@/types/calendarEvent";
import StatsBar from "./StatsBar";
import CalendarComponent from "./CalendarComponent";
import TopBar from "./TopBar";
import SidebarCalender from "./SidebarCalender";

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

export default function EventCalendar() {
  // const { theme } = useTheme();
  const [currentView, setCurrentView] = useState("week");
  const [selectedCalendars, setSelectedCalendars] = useState([
    "work",
    "personal",
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const calendarApp = useNextCalendarApp({
    views: [
      createViewWeek(),
      createViewDay(),
      createViewMonthAgenda(),
      createViewMonthGrid(),
    ],
    // theme: theme === "dark" ? "shadcn-dark" : "shadcn",
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
    // calendarApp.setView(view)
  };

  const toggleCalendar = (calendarId: string) => {
    setSelectedCalendars((prev) =>
      prev.includes(calendarId)
        ? prev.filter((id) => id !== calendarId)
        : [...prev, calendarId]
    );
  };

  // const upcomingEvents = sampleEvents
  //   .filter((event) => new Date(event.start) > new Date())
  //   .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
  //   .slice(0, 5)

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

  return (
    <div className="flex gap-7">
      {/* Sidebar */}
      <div className="max-lg:hidden">
        <SidebarCalender
          todayEvents={todayEvents}
          currentView={currentView}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          viewOptions={viewOptions}
          handleViewChange={handleViewChange}
          selectedCalendars={selectedCalendars}
          toggleCalendar={toggleCalendar}
        />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-fit content">
        {/* Top Bar */}
        <TopBar />

        {/* Stats Bar */}
        <StatsBar sampleEvents={sampleEvents} />

        {/* Calendar */}
        <CalendarComponent calendarApp={calendarApp} />
      </div>
    </div>
  );
}
