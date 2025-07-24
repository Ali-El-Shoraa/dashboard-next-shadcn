import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Bell,
  Calendar,
  Filter,
  Plus,
  Search,
  Settings,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  Briefcase,
  Home,
  X,
  Menu,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ViewOption = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface CalendarEvent {
  id: string;
  title: string;
  start: string | Date;
  end?: string | Date;
  calendarId: string;
  priority?: "low" | "medium" | "high";
  status?: "confirmed" | "tentative" | "cancelled";
  description?: string;
}

interface SidebarCalendarProps {
  currentView: string;
  viewOptions: ViewOption[];
  selectedCalendars: string[];
  handleViewChange: (key: string) => void;
  toggleCalendar: (calendarId: string) => void;
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  todayEvents: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
  onAddEvent: () => void;
  onEventClick: (event: CalendarEvent) => void;
  filterPriority: string[];
  setFilterPriority: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SidebarCalendar({
  currentView,
  viewOptions,
  handleViewChange,
  selectedCalendars,
  toggleCalendar,
  setSearchQuery,
  searchQuery,
  todayEvents,
  upcomingEvents,
  onAddEvent,
  onEventClick,
  filterPriority,
  setFilterPriority,
}: SidebarCalendarProps) {
  const [isCalendarsExpanded, setIsCalendarsExpanded] = useState(true);
  const [isTodayEventsExpanded, setIsTodayEventsExpanded] = useState(true);
  const [isUpcomingEventsExpanded, setIsUpcomingEventsExpanded] =
    useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showEventDetails, setShowEventDetails] =
    useState<CalendarEvent | null>(null);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sound: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const calendarTypes = [
    { id: "work", label: "Work", icon: Briefcase, color: "blue" },
    { id: "personal", label: "Personal", icon: Home, color: "green" },
    { id: "family", label: "Family", icon: User, color: "purple" },
  ];

  const getEventPriorityBadge = (priority?: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="h-4 px-1 text-xs">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="warning" className="h-4 px-1 text-xs">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="secondary" className="h-4 px-1 text-xs">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    setShowEventDetails(event);
    onEventClick(event);
  };

  const sidebarContent = (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 flex-1 flex flex-col border rounded-2xl">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calendar Pro+
            </h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={onAddEvent}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add Event</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add new event</TooltipContent>
            </Tooltip>
          </div>
          <p className="text-sm text-muted-foreground">
            Organize your schedule with precision
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events, tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background shadow-sm"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Bell className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Remind</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notification settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Filter events</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Settings</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Calendar settings</TooltipContent>
          </Tooltip>
        </div>

        {/* View Controls */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 px-4 pt-3">
            <CardTitle className="text-sm font-semibold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>View Options</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-2 pt-0">
            <div className="grid grid-cols-2 gap-1">
              {viewOptions.map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={currentView === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewChange(key)}
                  className={`justify-start gap-2 ${
                    currentView === key
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar Filters */}
        <Card className="shadow-sm">
          <CardHeader
            className="pb-2 px-4 pt-3 cursor-pointer"
            onClick={() => setIsCalendarsExpanded(!isCalendarsExpanded)}
          >
            <CardTitle className="text-sm font-semibold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Calendars</span>
                </div>
                {isCalendarsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
          {isCalendarsExpanded && (
            <CardContent className="px-4 pb-3 pt-0 space-y-3">
              {calendarTypes.map((calendar) => (
                <div key={calendar.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <calendar.icon
                        className={`h-4 w-4 text-${calendar.color}-500`}
                      />
                      <span className="text-sm font-medium">
                        {calendar.label}
                      </span>
                    </div>
                    <Switch
                      checked={selectedCalendars?.includes(calendar.id)}
                      onCheckedChange={() => toggleCalendar(calendar.id)}
                    />
                  </div>
                  <Separator />
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Today's Events */}
        <Card className="border-0 shadow-sm">
          <CardHeader
            className="pb-2 px-4 pt-3 cursor-pointer"
            onClick={() => setIsTodayEventsExpanded(!isTodayEventsExpanded)}
          >
            <CardTitle className="text-sm font-semibold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Today&apos;s Schedule</span>
                </div>
                {isTodayEventsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
          {isTodayEventsExpanded && (
            <CardContent className="px-4 pb-3 pt-0">
              <ScrollArea
                className={todayEvents?.length > 0 ? "h-[200px]" : "h-auto"}
              >
                {todayEvents?.length > 0 ? (
                  <div className="space-y-2">
                    {todayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "flex items-start gap-3 p-2 rounded-lg transition-colors hover:bg-accent cursor-pointer",
                          event.calendarId === "work"
                            ? "border-l-4 border-blue-500"
                            : event.calendarId === "personal"
                            ? "border-l-4 border-green-500"
                            : "border-l-4 border-purple-500"
                        )}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">
                              {event.title}
                            </p>
                            {getEventPriorityBadge(event.priority)}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.start).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              {event.end && (
                                <>
                                  {" - "}
                                  {new Date(event.end).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </>
                              )}
                            </p>
                            <Badge variant="outline" className="text-xs h-5">
                              {event.calendarId}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-xs text-muted-foreground">
                      No events scheduled for today
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-blue-500"
                      onClick={onAddEvent}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Event
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          )}
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-sm">
          <CardHeader
            className="pb-2 px-4 pt-3 cursor-pointer"
            onClick={() =>
              setIsUpcomingEventsExpanded(!isUpcomingEventsExpanded)
            }
          >
            <CardTitle className="text-sm font-semibold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Upcoming</span>
                </div>
                {isUpcomingEventsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
          {isUpcomingEventsExpanded && (
            <CardContent className="px-4 pb-3 pt-0">
              <ScrollArea
                className={upcomingEvents?.length > 0 ? "h-[200px]" : "h-auto"}
              >
                {upcomingEvents?.length > 0 ? (
                  <div className="space-y-2">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "flex items-start gap-3 p-2 rounded-lg transition-colors hover:bg-accent cursor-pointer",
                          event.calendarId === "work"
                            ? "border-l-4 border-blue-500"
                            : event.calendarId === "personal"
                            ? "border-l-4 border-green-500"
                            : "border-l-4 border-purple-500"
                        )}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">
                              {event.title}
                            </p>
                            {getEventPriorityBadge(event.priority)}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.start).toLocaleDateString([], {
                                month: "short",
                                day: "numeric",
                              })}
                              {event.end && (
                                <>
                                  {" • "}
                                  {new Date(event.start).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </>
                              )}
                            </p>
                            <Badge variant="outline" className="text-xs h-5">
                              {event.calendarId}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-xs text-muted-foreground">
                      No upcoming events
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          )}
        </Card>
      </div>
    </ScrollArea>
  );

  return (
    <>
      {/* Floating Action Button for mobile */}
      {isMobile && !isSidebarOpen && (
        <Button
          onClick={toggleSidebar}
          size="icon"
          className="fixed left-4 bottom-4 z-50 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 w-12"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      {isMobile ? (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetHeader className="hidden">
            <SheetTitle>Sheet</SheetTitle>
          </SheetHeader>
          <SheetContent side="left" className="w-80 p-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      ) : (
        <div className="w-80 h-full flex flex-col bg-background/50">
          {sidebarContent}
        </div>
      )}

      {/* Event Details Dialog */}
      <Dialog
        open={!!showEventDetails}
        onOpenChange={(open) => !open && setShowEventDetails(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full bg-${
                  showEventDetails?.calendarId === "work"
                    ? "blue"
                    : showEventDetails?.calendarId === "personal"
                    ? "green"
                    : "purple"
                }-500`}
              />
              {showEventDetails?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {new Date(showEventDetails?.start || "").toLocaleString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {showEventDetails?.end && (
                    <>
                      {" - "}
                      {new Date(showEventDetails.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </>
                  )}
                </span>
              </div>
              {showEventDetails?.description && (
                <div className="flex items-start gap-2">
                  <span className="text-sm text-muted-foreground mt-0.5">
                    •
                  </span>
                  <p className="text-sm">{showEventDetails.description}</p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {showEventDetails?.calendarId}
                </Badge>
                {getEventPriorityBadge(showEventDetails?.priority)}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          {/* <DialogHeader>
            <DialogTitle>Calendar Settings</DialogTitle>
          </DialogHeader> */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">
                    Email notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        email: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push notifications</Label>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        push: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-notifications">Sound alerts</Label>
                  <Switch
                    id="sound-notifications"
                    checked={notificationSettings.sound}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        sound: checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium mb-2">Calendar Sync</h3>
              <Button variant="outline" className="w-full">
                Connect Google Calendar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Events</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Calendar Types</h3>
              <div className="space-y-2">
                {calendarTypes.map((calendar) => (
                  <div
                    key={calendar.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <calendar.icon
                        className={`h-4 w-4 text-${calendar.color}-500`}
                      />
                      <Label htmlFor={`filter-${calendar.id}`}>
                        {calendar.label}
                      </Label>
                    </div>
                    <Switch
                      id={`filter-${calendar.id}`}
                      checked={selectedCalendars?.includes(calendar.id)}
                      onCheckedChange={() => toggleCalendar(calendar.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium mb-2">Event Priority</h3>
              <div className="flex gap-2">
                <Badge
                  variant={
                    filterPriority?.includes("high") ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    setFilterPriority((prev) =>
                      prev?.includes("high")
                        ? prev.filter((p) => p !== "high")
                        : [...prev, "high"]
                    );
                  }}
                >
                  High
                </Badge>
                <Badge
                  variant={
                    filterPriority?.includes("medium") ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    setFilterPriority((prev) =>
                      prev?.includes("medium")
                        ? prev.filter((p) => p !== "medium")
                        : [...prev, "medium"]
                    );
                  }}
                >
                  Medium
                </Badge>
                <Badge
                  variant={
                    filterPriority?.includes("low") ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    setFilterPriority((prev) =>
                      prev?.includes("low")
                        ? prev.filter((p) => p !== "low")
                        : [...prev, "low"]
                    );
                  }}
                >
                  Low
                </Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
