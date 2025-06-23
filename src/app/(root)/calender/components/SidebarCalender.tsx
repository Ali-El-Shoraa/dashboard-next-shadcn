import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  Calendar,
  Filter,
  Plus,
  Search,
  Settings,
  Star,
} from "lucide-react";

type ViewOption = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface SidebarCalenderProps {
  currentView: string;
  viewOptions: ViewOption[];
  selectedCalendars: string[];
  handleViewChange: (key: string) => void;
  toggleCalendar: (calendarId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  todayEvents: {
    id: string;
    title: string;
    start: string | Date;
    calendarId: string;
  }[];
}

export default function SidebarCalender({
  currentView,
  viewOptions,
  handleViewChange,
  selectedCalendars,
  toggleCalendar,
  setSearchQuery,
  searchQuery,
  todayEvents,
}: SidebarCalenderProps) {
  return (
    <div className="w-80 border-r content h-fit">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calendar Pro
            </h1>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your time efficiently
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/50 dark:bg-slate-800/50 border-0 shadow-sm"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="justify-start bg-white/50 dark:bg-slate-800/50 border-0"
          >
            <Bell className="h-4 w-4 mr-2" />
            Reminders
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="justify-start bg-white/50 dark:bg-slate-800/50 border-0"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* View Controls */}
        <Card className="bg-white/60 dark:bg-slate-800/60 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              View Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {viewOptions.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={currentView === key ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange(key)}
                className={`w-full justify-start ${
                  currentView === key
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "hover:bg-white/50 dark:hover:bg-slate-700/50"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Calendar Filters */}
        <Card className="bg-white/60 dark:bg-slate-800/60 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Calendars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium">Work</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleCalendar("work")}
                className={`h-6 px-2 ${
                  selectedCalendars.includes("work")
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20"
                    : "text-muted-foreground"
                }`}
              >
                {selectedCalendars.includes("work") ? "On" : "Off"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Personal</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleCalendar("personal")}
                className={`h-6 px-2 ${
                  selectedCalendars.includes("personal")
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20"
                    : "text-muted-foreground"
                }`}
              >
                {selectedCalendars.includes("personal") ? "On" : "Off"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Events */}
        <Card className="bg-white/60 dark:bg-slate-800/60 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Star className="h-4 w-4" />
              Today s Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              {todayEvents.length > 0 ? (
                <div className="space-y-2">
                  {todayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/50 dark:bg-slate-700/50"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          event.calendarId === "work"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">
                          {event.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.start).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-4">
                  No events today
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
