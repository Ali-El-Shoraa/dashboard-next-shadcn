"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Cake,
  Plane,
  FileText,
  Utensils,
  Flag,
  Dumbbell,
  Ribbon,
  Presentation,
  Users,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Sun,
  Search,
  Trash,
  Edit,
  X,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar as CalendarComp } from "@/components/ui/calendar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  format,
  addHours,
  startOfDay,
  endOfDay,
  addDays,
  isSameDay,
  isSameMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  differenceInMinutes,
} from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

type Event = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  color: string;
  type: EventType;
  allDay?: boolean;
  location?: string;
  attendees?: string[];
};

type EventType =
  | "meeting"
  | "birthday"
  | "travel"
  | "report"
  | "meal"
  | "hackathon"
  | "fitness"
  | "anniversary"
  | "presentation"
  | "group";

const eventTypes = [
  {
    value: "meeting",
    label: "Meeting",
    icon: <Clock className="h-4 w-4" />,
    color: "bg-blue-500",
  },
  {
    value: "birthday",
    label: "Birthday",
    icon: <Cake className="h-4 w-4" />,
    color: "bg-pink-500",
  },
  {
    value: "travel",
    label: "Travel",
    icon: <Plane className="h-4 w-4" />,
    color: "bg-green-500",
  },
  {
    value: "report",
    label: "Report",
    icon: <FileText className="h-4 w-4" />,
    color: "bg-yellow-500",
  },
  {
    value: "meal",
    label: "Meal",
    icon: <Utensils className="h-4 w-4" />,
    color: "bg-orange-500",
  },
  {
    value: "hackathon",
    label: "Hackathon",
    icon: <Flag className="h-4 w-4" />,
    color: "bg-purple-500",
  },
  {
    value: "fitness",
    label: "Fitness",
    icon: <Dumbbell className="h-4 w-4" />,
    color: "bg-red-500",
  },
  {
    value: "anniversary",
    label: "Anniversary",
    icon: <Ribbon className="h-4 w-4" />,
    color: "bg-teal-500",
  },
  {
    value: "presentation",
    label: "Presentation",
    icon: <Presentation className="h-4 w-4" />,
    color: "bg-indigo-500",
  },
  {
    value: "group",
    label: "Group",
    icon: <Users className="h-4 w-4" />,
    color: "bg-amber-500",
  },
];

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

// Template events for the sidebar
const templateEvents = [
  {
    id: "template-birthday",
    title: "Birthday Party",
    type: "birthday",
    color: "bg-pink-500",
    duration: 2, // hours
  },
  {
    id: "template-travel",
    title: "Tour & Picnic",
    type: "travel",
    color: "bg-green-500",
    duration: 4,
  },
  {
    id: "template-report",
    title: "Reporting Schedule",
    type: "report",
    color: "bg-yellow-500",
    duration: 1,
  },
  {
    id: "template-meal",
    title: "Lunch & Break",
    type: "meal",
    color: "bg-orange-500",
    duration: 1,
  },
  {
    id: "template-hackathon",
    title: "Innovation Hackathon",
    type: "hackathon",
    color: "bg-purple-500",
    duration: 8,
  },
  {
    id: "template-fitness",
    title: "Fitness Bootcamp",
    type: "fitness",
    color: "bg-red-500",
    duration: 1,
  },
  {
    id: "template-anniversary",
    title: "Company Anniversary Celebration",
    type: "anniversary",
    color: "bg-teal-500",
    duration: 3,
  },
  {
    id: "template-presentation",
    title: "Client Presentation",
    type: "presentation",
    color: "bg-indigo-500",
    duration: 1.5,
  },
  {
    id: "template-group",
    title: "Group Projects",
    type: "group",
    color: "bg-amber-500",
    duration: 2,
  },
];

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    start: new Date(),
    end: addHours(new Date(), 1),
    type: "meeting",
    allDay: false,
    location: "",
    attendees: [],
  });
  const [currentView, setCurrentView] = useState<
    "month" | "week" | "day" | "list"
  >("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        const eventsWithDates = parsedEvents.map((event: Event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(eventsWithDates);
      } catch (error) {
        console.error("Failed to parse events", error);
      }
    }
  }, []);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleCreateEvent = () => {
    if (!newEvent.title) {
      toast.error("Event title is required");
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description || "",
      start: newEvent.start || new Date(),
      end: newEvent.end || addHours(new Date(), 1),
      color:
        eventTypes.find((t) => t.value === newEvent.type)?.color ||
        "bg-blue-500",
      type: newEvent.type as EventType,
      allDay: newEvent.allDay,
      location: newEvent.location,
      attendees: newEvent.attendees || [],
    };

    setEvents([...events, event]);
    resetNewEvent();
    setShowEventModal(false);
    toast.success("Event created successfully");
  };

  // const handleUpdateEvent = () => {
  //   if (!selectedEvent?.id || !selectedEvent.title) {
  //     toast.error("Event title is required");
  //     return;
  //   }

  //   // Instead of updating, create a new copy of the event
  //   const newEvent = {
  //     ...selectedEvent,
  //     id: Date.now().toString(), // New ID for the copy
  //     color:
  //       eventTypes.find((t) => t.value === selectedEvent.type)?.color ||
  //       "bg-blue-500",
  //   };

  //   setEvents([...events, newEvent]);
  //   setShowEventDetails(false);
  //   toast.success("Event updated (new copy created)");
  // };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    setShowDeleteDialog(false);
    setShowEventDetails(false);
    toast.success("Event deleted successfully");
  };

  const resetNewEvent = () => {
    setNewEvent({
      title: "",
      description: "",
      start: new Date(),
      end: addHours(new Date(), 1),
      type: "meeting",
      allDay: false,
      location: "",
      attendees: [],
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const goToPrevious = () => {
    if (currentView === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (currentView === "week") {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const goToNext = () => {
    if (currentView === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (currentView === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const getEventsForDay = (day: Date) => {
    return events.filter(
      (event) =>
        isSameDay(event.start, day) ||
        (event.allDay && isSameDay(event.start, day))
    );
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle drag and drop
  // Handle drag and drop
  const onDragStart = (event: Event) => {
    setDraggedEvent(event);
  };

  const onDragEnd = (result: DropResult) => {
    setDraggedEvent(null);

    if (!result.destination) return;

    const { source, destination } = result;

    // Handle dropping from sidebar templates
    if (source.droppableId === "sidebar-templates") {
      const template = templateEvents.find((t) => t.id === result.draggableId);
      if (!template) return;

      const startDate = new Date(destination.droppableId);
      let endDate = new Date(startDate);

      if (currentView === "week" || currentView === "day") {
        // Calculate time based on destination index (hour slots)
        const hourSlot = destination.index;
        startDate.setHours(hourSlot, 0, 0, 0);
        endDate = new Date(
          startDate.getTime() + template.duration * 60 * 60 * 1000
        );
      }

      const newEvent: Event = {
        id: Date.now().toString(),
        title: template.title,
        description: "",
        start: startDate,
        end: endDate,
        color: template.color,
        type: template.type as EventType,
      };

      setEvents([...events, newEvent]);
      toast("Event added to calendar");
      return;
    }

    // For list view reordering
    if (
      currentView === "list" &&
      source.droppableId === destination.droppableId
    ) {
      const reorderedEvents = Array.from(events);
      const [removed] = reorderedEvents.splice(source.index, 1);
      reorderedEvents.splice(destination.index, 0, removed);
      setEvents(reorderedEvents);
      return;
    }

    // For calendar drag and drop - create a copy instead of modifying original
    if (
      currentView === "month" ||
      currentView === "week" ||
      currentView === "day"
    ) {
      const day = new Date(destination.droppableId);
      const duration = differenceInMinutes(
        draggedEvent!.end,
        draggedEvent!.start
      );

      const newStart = new Date(day);
      let newEnd = new Date(day);

      if (currentView === "week" || currentView === "day") {
        // Calculate time offset based on destination index (for hour slots)
        const hourSlot = destination.index;
        newStart.setHours(hourSlot, 0, 0, 0);
        newEnd = new Date(newStart.getTime() + duration * 60000);
      } else {
        // For month view, keep the same time but change the date
        newStart.setHours(
          draggedEvent!.start.getHours(),
          draggedEvent!.start.getMinutes(),
          draggedEvent!.start.getSeconds(),
          draggedEvent!.start.getMilliseconds()
        );
        newEnd = new Date(newStart.getTime() + duration * 60000);
      }

      // Create a new event with updated time (keeping the original)
      const newEventCopy = {
        ...draggedEvent!,
        id: Date.now().toString(), // New ID for the copy
        start: newStart,
        end: newEnd,
      };

      setEvents([...events, newEventCopy]);
      toast.success("Event copied to new time");
    }
  };

  const renderSidebar = () => {
    return (
      <div
        className={`bg-white border-r transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-64"
        } flex flex-col`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          {!sidebarCollapsed && (
            <h3 className="font-semibold">Draggable Events</h3>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8 p-0"
          >
            {sidebarCollapsed ? ">" : "<"}
          </Button>
        </div>

        <Droppable droppableId="sidebar-templates" isDropDisabled={true}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 overflow-y-auto p-2 space-y-2"
            >
              {templateEvents.map((template, index) => (
                <Draggable
                  key={template.id}
                  draggableId={template.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 rounded text-white cursor-pointer flex items-center ${
                        template.color
                      } ${sidebarCollapsed ? "justify-center" : ""}`}
                    >
                      <GripVertical className="h-4 w-4 mr-2 opacity-50" />
                      {!sidebarCollapsed && (
                        <span className="text-sm truncate">
                          {template.title}
                        </span>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {!sidebarCollapsed && (
          <div className="p-4 border-t text-xs text-gray-500 text-center">
            Drag events to calendar
          </div>
        )}
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-gray-100 p-2 text-center font-medium">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());

          return (
            <Droppable key={day.toString()} droppableId={day.toString()}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white p-2 min-h-24 ${
                    !isCurrentMonth ? "text-gray-400" : ""
                  }`}
                  onClick={() => {
                    setCurrentDate(day);
                    if (currentView !== "day") setCurrentView("day");
                  }}
                >
                  <div className="flex justify-between">
                    <span
                      className={`text-sm ${
                        isToday
                          ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          : ""
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                    {isSameDay(day, new Date()) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-blue-500 hover:bg-blue-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("provided", provided);
                          setNewEvent((prev) => ({
                            ...prev,
                            // id: ,
                            start: startOfDay(day),
                            end: endOfDay(day),
                          }));
                          setShowEventModal(true);
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="mt-1 space-y-1 overflow-y-auto max-h-20">
                    {dayEvents.slice(0, 3).map((event, index) => (
                      <Draggable
                        key={event.id}
                        draggableId={event.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`text-xs p-1 rounded truncate ${event.color} text-white cursor-pointer flex items-center`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                              setShowEventDetails(true);
                            }}
                            onMouseDown={() => onDragStart(event)}
                          >
                            <GripVertical className="h-3 w-3 mr-1 opacity-50" />
                            {format(event.start, "HH:mm")} {event.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-8 border-b">
          <div className="border-r p-2"></div>
          {days.map((day) => (
            <div key={day.toString()} className="p-2 text-center font-medium">
              <div>{format(day, "EEE")}</div>
              <div
                className={`mx-auto rounded-full w-8 h-8 flex items-center justify-center ${
                  isSameDay(day, new Date()) ? "bg-blue-500 text-white" : ""
                }`}
              >
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8 flex-grow overflow-auto">
          <div className="border-r">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="h-16 border-b text-xs p-1 text-gray-500">
                {i === 0
                  ? "12 AM"
                  : i < 12
                  ? `${i} AM`
                  : i === 12
                  ? "12 PM"
                  : `${i - 12} PM`}
              </div>
            ))}
          </div>
          {days.map((day) => (
            <Droppable key={day.toString()} droppableId={day.toString()}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  key={day.toString()}
                  className="relative border-r"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        const start = new Date(day);
                        start.setHours(i, 0, 0, 0);
                        setNewEvent((prev) => ({
                          ...prev,
                          start,
                          end: addHours(start, 1),
                        }));
                        setShowEventModal(true);
                      }}
                    ></div>
                  ))}
                  {events
                    .filter(
                      (event) => isSameDay(event.start, day) && !event.allDay
                    )
                    .map((event, index) => (
                      <Draggable
                        key={event.id}
                        draggableId={event.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`absolute left-1 right-1 rounded p-1 text-xs text-white ${event.color} border border-white cursor-pointer`}
                            style={{
                              top: `${
                                (event.start.getHours() +
                                  event.start.getMinutes() / 60) *
                                64
                              }px`,
                              height: `${Math.max(
                                32,
                                ((event.end.getTime() - event.start.getTime()) /
                                  (1000 * 60 * 60)) *
                                  64
                              )}px`,
                            }}
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowEventDetails(true);
                            }}
                            onMouseDown={() => onDragStart(event)}
                          >
                            <div className="font-medium truncate flex items-center">
                              <GripVertical className="h-3 w-3 mr-1 opacity-50" />
                              {event.title}
                            </div>
                            <div className="truncate">
                              {format(event.start, "h:mm a")} -{" "}
                              {format(event.end, "h:mm a")}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }).map((_, i) => i);

    return (
      <div className="flex flex-col h-full">
        <div className="text-center font-medium p-2 border-b">
          {format(currentDate, "EEEE, MMMM d, yyyy")}
        </div>
        <div className="grid grid-cols-12 flex-grow overflow-auto">
          <div className="col-span-1 border-r">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-16 border-b text-xs p-1 text-gray-500 flex flex-col justify-center"
              >
                <div>
                  {hour === 0
                    ? "12 AM"
                    : hour < 12
                    ? `${hour} AM`
                    : hour === 12
                    ? "12 PM"
                    : `${hour - 12} PM`}
                </div>
                <div className="text-xs text-gray-400">
                  {hour}:00 - {hour}:59
                </div>
              </div>
            ))}
          </div>
          <Droppable droppableId={currentDate.toString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="col-span-11 relative"
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-16 border-b hover:bg-gray-50 cursor-pointer relative"
                    onClick={(e) => {
                      // Calculate position within the hour slot
                      const rect = e.currentTarget.getBoundingClientRect();
                      const y = e.clientY - rect.top;
                      const minutes = Math.floor((y / rect.height) * 60);

                      const start = new Date(currentDate);
                      start.setHours(hour, minutes, 0, 0);

                      setNewEvent((prev) => ({
                        ...prev,
                        start,
                        end: addHours(start, 1),
                      }));
                      setShowEventModal(true);
                    }}
                  >
                    {/* Add quarter hour markers */}
                    <div className="absolute top-1/4 w-full border-t border-gray-100"></div>
                    <div className="absolute top-2/4 w-full border-t border-gray-100"></div>
                    <div className="absolute top-3/4 w-full border-t border-gray-100"></div>
                  </div>
                ))}
                {events
                  .filter((event) => isSameDay(event.start, currentDate))
                  .map((event, index) => (
                    <Draggable
                      key={event.id}
                      draggableId={event.id}
                      index={index}
                    >
                      {(provided) => {
                        const startPos =
                          (event.start.getHours() +
                            event.start.getMinutes() / 60) *
                          64;
                        const duration =
                          ((event.end.getTime() - event.start.getTime()) /
                            (1000 * 60 * 60)) *
                          64;

                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`absolute left-1 right-1 rounded p-1 text-xs text-white ${event.color} border border-white cursor-pointer shadow-sm`}
                            style={{
                              top: `${startPos}px`,
                              height: `${Math.max(32, duration)}px`,
                            }}
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowEventDetails(true);
                            }}
                            onMouseDown={() => onDragStart(event)}
                          >
                            <div className="font-medium truncate flex items-center">
                              <GripVertical className="h-3 w-3 mr-1 opacity-50" />
                              {event.title}
                            </div>
                            <div className="truncate">
                              {format(event.start, "h:mm a")} -{" "}
                              {format(event.end, "h:mm a")}
                            </div>
                            {event.type && (
                              <div className="text-xs opacity-80 truncate">
                                {
                                  eventTypes.find((t) => t.value === event.type)
                                    ?.label
                                }
                              </div>
                            )}
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    );
  };
  const renderListView = () => {
    const filtered = searchQuery ? filteredEvents : events;
    const upcomingEvents = filtered
      .filter((event) => event.start >= new Date())
      .sort((a, b) => a.start.getTime() - b.start.getTime());

    const pastEvents = filtered
      .filter((event) => event.start < new Date())
      .sort((a, b) => b.start.getTime() - a.start.getTime());

    return (
      <div className="space-y-6 p-4">
        <div>
          <h3 className="font-medium mb-2">Upcoming Events</h3>
          {upcomingEvents.length > 0 ? (
            <Droppable droppableId="upcoming-events">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {upcomingEvents.map((event, index) => (
                    <Draggable
                      key={event.id}
                      draggableId={event.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventDetails(true);
                          }}
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-3 h-3 rounded-full ${event.color}`}
                              ></div>
                              <span className="font-medium">{event.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {format(event.start, "MMM d, yyyy")} •{" "}
                              {format(event.start, "h:mm a")} -{" "}
                              {format(event.end, "h:mm a")}
                            </span>
                          </div>
                          {event.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No upcoming events found
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium mb-2">Past Events</h3>
          {pastEvents.length > 0 ? (
            <Droppable droppableId="past-events">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {pastEvents.map((event, index) => (
                    <Draggable
                      key={event.id}
                      draggableId={event.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer opacity-70"
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventDetails(true);
                          }}
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-3 h-3 rounded-full ${event.color}`}
                              ></div>
                              <span className="font-medium">{event.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {format(event.start, "MMM d, yyyy")} •{" "}
                              {format(event.start, "h:mm a")} -{" "}
                              {format(event.end, "h:mm a")}
                            </span>
                          </div>
                          {event.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No past events found
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        {renderSidebar()}

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">Calendar</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-10 w-64"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={goToPrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={goToNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold mx-4">
                  {currentView === "month"
                    ? format(currentDate, "MMMM yyyy")
                    : currentView === "week"
                    ? `${format(startOfWeek(currentDate), "MMM d")} - ${format(
                        endOfWeek(currentDate),
                        "MMM d, yyyy"
                      )}`
                    : format(currentDate, "MMMM d, yyyy")}
                </h2>
                <Tabs
                  value={currentView}
                  onValueChange={(value) =>
                    setCurrentView(value as "month" | "week" | "day" | "list")
                  }
                >
                  <TabsList>
                    <TabsTrigger value="month">
                      <Grid className="h-4 w-4 mr-1" />
                      Month
                    </TabsTrigger>
                    <TabsTrigger value="week">
                      <Sun className="h-4 w-4 mr-1" />
                      Week
                    </TabsTrigger>
                    <TabsTrigger value="day">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Day
                    </TabsTrigger>
                    <TabsTrigger value="list">
                      <List className="h-4 w-4 mr-1" />
                      List
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
                  <DialogTrigger asChild>
                    <Button className="ml-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Event Title
                        </label>
                        <Input
                          value={newEvent.title}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, title: e.target.value })
                          }
                          placeholder="Enter event title"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Start Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !newEvent.start && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {newEvent.start ? (
                                  format(newEvent.start, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComp
                                mode="single"
                                selected={newEvent.start}
                                onSelect={(date) =>
                                  date &&
                                  setNewEvent({ ...newEvent, start: date })
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Start Time
                          </label>
                          <Input
                            type="time"
                            value={format(
                              newEvent.start || new Date(),
                              "HH:mm"
                            )}
                            onChange={(e) => {
                              const [hours, minutes] = e.target.value
                                .split(":")
                                .map(Number);
                              const newStart = new Date(
                                newEvent.start || new Date()
                              );
                              newStart.setHours(hours, minutes);
                              setNewEvent({ ...newEvent, start: newStart });
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            End Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !newEvent.end && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {newEvent.end ? (
                                  format(newEvent.end, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComp
                                mode="single"
                                selected={newEvent.end}
                                onSelect={(date) =>
                                  date &&
                                  setNewEvent({ ...newEvent, end: date })
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            End Time
                          </label>
                          <Input
                            type="time"
                            value={format(
                              newEvent.end || addHours(new Date(), 1),
                              "HH:mm"
                            )}
                            onChange={(e) => {
                              const [hours, minutes] = e.target.value
                                .split(":")
                                .map(Number);
                              const newEnd = new Date(
                                newEvent.end || addHours(new Date(), 1)
                              );
                              newEnd.setHours(hours, minutes);
                              setNewEvent({ ...newEvent, end: newEnd });
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Event Type
                          </label>
                          <Select
                            value={newEvent.type}
                            onValueChange={(value) =>
                              setNewEvent({
                                ...newEvent,
                                type: value as EventType,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                              {eventTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center">
                                    <div
                                      className={`w-3 h-3 rounded-full mr-2 ${type.color}`}
                                    ></div>
                                    {type.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 flex items-end">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="allDay"
                              checked={newEvent.allDay || false}
                              onChange={(e) =>
                                setNewEvent({
                                  ...newEvent,
                                  allDay: e.target.checked,
                                })
                              }
                              className="h-4 w-4"
                            />
                            <label
                              htmlFor="allDay"
                              className="text-sm font-medium"
                            >
                              All Day Event
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          value={newEvent.location || ""}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              location: e.target.value,
                            })
                          }
                          placeholder="Enter location (optional)"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          value={newEvent.description || ""}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              description: e.target.value,
                            })
                          }
                          placeholder="Enter description (optional)"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Attendees</label>
                        <div className="flex flex-wrap gap-2">
                          {newEvent.attendees?.map((attendee, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="flex items-center"
                            >
                              {attendee}
                              <button
                                onClick={() => {
                                  setNewEvent({
                                    ...newEvent,
                                    attendees: newEvent.attendees?.filter(
                                      (_, i) => i !== index
                                    ),
                                  });
                                }}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Add attendee email"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && e.currentTarget.value) {
                                setNewEvent({
                                  ...newEvent,
                                  attendees: [
                                    ...(newEvent.attendees || []),
                                    e.currentTarget.value,
                                  ],
                                });
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            onClick={() => {
                              const input = document.querySelector(
                                "input[placeholder='Add attendee email']"
                              ) as HTMLInputElement;
                              if (input && input.value) {
                                setNewEvent({
                                  ...newEvent,
                                  attendees: [
                                    ...(newEvent.attendees || []),
                                    input.value,
                                  ],
                                });
                                input.value = "";
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateEvent}>Create Event</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Calendar Content */}
          <div className="flex-grow overflow-auto" ref={calendarRef}>
            {currentView === "month" && renderMonthView()}
            {currentView === "week" && renderWeekView()}
            {currentView === "day" && renderDayView()}
            {currentView === "list" && renderListView()}
          </div>
        </div>

        {/* Event Details Dialog */}
        <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${selectedEvent.color}`}
                    ></div>
                    {selectedEvent.title}
                  </DialogTitle>
                  <DialogDescription>
                    {format(selectedEvent.start, "MMMM d, yyyy")} •{" "}
                    {format(selectedEvent.start, "h:mm a")} -{" "}
                    {format(selectedEvent.end, "h:mm a")}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {selectedEvent.location && (
                    <div>
                      <h4 className="text-sm font-medium">Location</h4>
                      <p className="text-sm">{selectedEvent.location}</p>
                    </div>
                  )}
                  {selectedEvent.description && (
                    <div>
                      <h4 className="text-sm font-medium">Description</h4>
                      <p className="text-sm whitespace-pre-line">
                        {selectedEvent.description}
                      </p>
                    </div>
                  )}
                  {selectedEvent.attendees &&
                    selectedEvent.attendees.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium">Attendees</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedEvent.attendees.map((attendee, index) => (
                            <Badge key={index} variant="outline">
                              {attendee}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
                <DialogFooter className="sm:justify-between">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowEventDetails(false);
                        setNewEvent({
                          ...selectedEvent,
                          start: selectedEvent.start,
                          end: selectedEvent.end,
                        });
                        setShowEventModal(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEventToDelete(selectedEvent.id);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  <Button onClick={() => setShowEventDetails(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Event</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this event? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (eventToDelete) {
                    handleDeleteEvent(eventToDelete);
                  }
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DragDropContext>
  );
}
