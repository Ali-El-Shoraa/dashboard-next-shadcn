"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Plus,
  Users,
  Briefcase,
  Mic,
  UserCheck,
  Video,
  Coffee,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DayId = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type Event = {
  title: string;
  participants: string[];
  location: string;
  time: string;
  borderColor: string;
  icon: React.ReactNode;
  description?: string;
  priority?: "low" | "medium" | "high";
};

export default function ScheduleCard() {
  const [activeDay, setActiveDay] = useState<DayId>("mon");
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const days: { id: DayId; name: string; date: string }[] = [
    { id: "mon", name: "Mon", date: "15" },
    { id: "tue", name: "Tue", date: "16" },
    { id: "wed", name: "Wed", date: "17" },
    { id: "thu", name: "Thu", date: "18" },
    { id: "fri", name: "Fri", date: "19" },
    { id: "sat", name: "Sat", date: "20" },
    { id: "sun", name: "Sun", date: "21" },
  ];

  // Unsplash image URLs for participants
  const participantImages = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop",
  ];

  const events: Record<DayId, Event[]> = {
    mon: [
      {
        title: "Weekly Team Meeting",
        participants: [
          participantImages[0],
          participantImages[1],
          participantImages[2],
        ],
        location: "Zoom Meeting",
        time: "09:00 - 10:30 AM",
        borderColor: "border-l-blue-500",
        icon: <Users className="h-5 w-5 text-blue-500" />,
        description: "Discuss project progress and upcoming tasks",
        priority: "high",
      },
      {
        title: "Client Presentation",
        participants: [participantImages[3], participantImages[4]],
        location: "Conference Room A",
        time: "11:00 - 12:30 PM",
        borderColor: "border-l-purple-500",
        icon: <Briefcase className="h-5 w-5 text-purple-500" />,
        description: "Present Q2 results to key client stakeholders",
        priority: "high",
      },
      {
        title: "Lunch with Team",
        participants: [
          participantImages[0],
          participantImages[1],
          participantImages[5],
        ],
        location: "Downtown Cafe",
        time: "01:00 - 02:00 PM",
        borderColor: "border-l-amber-500",
        icon: <Coffee className="h-5 w-5 text-amber-500" />,
        priority: "low",
      },
      {
        title: "New Hire Interview",
        participants: [participantImages[6]],
        location: "HR Office",
        time: "03:00 - 03:45 PM",
        borderColor: "border-l-green-500",
        icon: <UserCheck className="h-5 w-5 text-green-500" />,
        description: "Second round interview for marketing position",
        priority: "medium",
      },
    ],
    tue: [
      {
        title: "Product Strategy Session",
        participants: [
          participantImages[0],
          participantImages[3],
          participantImages[5],
        ],
        location: "Board Room",
        time: "10:00 - 11:30 AM",
        borderColor: "border-l-indigo-500",
        icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
        priority: "high",
      },
      {
        title: "Marketing Sync",
        participants: [participantImages[1], participantImages[4]],
        location: "Slack Huddle",
        time: "02:00 - 02:30 PM",
        borderColor: "border-l-pink-500",
        icon: <MessageSquare className="h-5 w-5 text-pink-500" />,
        priority: "medium",
      },
    ],
    wed: [
      {
        title: "All-Hands Meeting",
        participants: participantImages,
        location: "Main Auditorium",
        time: "09:30 - 11:00 AM",
        borderColor: "border-l-red-500",
        icon: <Mic className="h-5 w-5 text-red-500" />,
        priority: "high",
      },
      {
        title: "1:1 with Manager",
        participants: [participantImages[0]],
        location: "Virtual (Google Meet)",
        time: "01:00 - 01:30 PM",
        borderColor: "border-l-teal-500",
        icon: <Video className="h-5 w-5 text-teal-500" />,
        priority: "medium",
      },
    ],
    thu: [
      {
        title: "Workshop: Advanced React",
        participants: [
          participantImages[2],
          participantImages[3],
          participantImages[6],
        ],
        location: "Training Room",
        time: "10:00 AM - 12:00 PM",
        borderColor: "border-l-yellow-500",
        icon: <BookOpen className="h-5 w-5 text-yellow-500" />,
        priority: "medium",
      },
    ],
    fri: [
      {
        title: "Project Retrospective",
        participants: [
          participantImages[0],
          participantImages[1],
          participantImages[2],
          participantImages[4],
        ],
        location: "Team Space",
        time: "03:00 - 04:30 PM",
        borderColor: "border-l-orange-500",
        icon: <MessageSquare className="h-5 w-5 text-orange-500" />,
        priority: "high",
      },
    ],
    sat: [],
    sun: [],
  };

  // const priorityColors = {
  //   low: "bg-green-100 text-green-800",
  //   medium: "bg-yellow-100 text-yellow-800",
  //   high: "bg-red-100 text-red-800",
  // };

  return (
    <Card className="shadow-lg p-0 gap-0 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="border-b p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold flex-col items-center gap-2">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Weekly Schedule</span>
            </div>
            <span className="text-sm font-normal text-gray-500 ml-2">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </CardTitle>
          <Button
            onClick={() => setIsAddingEvent(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Days Navigation */}
        <div className="flex border-b bg-gray-50">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`flex-1 py-3 text-center transition-all duration-200 ${
                activeDay === day.id
                  ? "border-b-2 border-primary bg-white text-primary font-medium"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="text-sm font-medium">{day.name}</div>
              <div
                className={`text-xs mt-1 ${
                  activeDay === day.id ? "text-primary" : "text-gray-400"
                }`}
              >
                {day.date}
              </div>
            </button>
          ))}
        </div>

        {/* Events List */}
        <ScrollArea
          className={cn(events[activeDay]?.length > 3 ? "h-[500px]" : "h-full")}
        >
          <div className="p-4 bg-gradient-to-br from-white to-gray-50">
            {events[activeDay]?.length > 0 ? (
              <ul className="space-y-4">
                {events[activeDay].map((event, index) => (
                  <li
                    key={index}
                    className={cn(
                      `p-4 rounded-lg border border-l-4 bg-white shadow-sm transition-all hover:shadow-md hover:translate-x-1 cursor-pointer`,
                      event.borderColor
                    )}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start gap-4">
                      {/* <div
                        className={`p-2 rounded-full ${event.borderColor
                          .replace("border-l-", "bg-")
                          .replace("-500", "-100")}`}
                      >
                        {event.icon}
                      </div> */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-900">
                            {event.title}
                          </h4>
                          {/* {event.priority && (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                priorityColors[event.priority]
                              }`}
                            >
                              {event.priority}
                            </span>
                          )} */}
                        </div>
                        <div className="flex items-center mt-2 gap-4">
                          <div className="flex -space-x-2">
                            {event.participants.map((participant, i) => (
                              <Image
                                key={i}
                                src={participant}
                                alt="Participant"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {event.location}
                          </span>
                        </div>
                        {/* {event.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                            {event.description}
                          </p>
                        )} */}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-10 w-10 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-700">
                  No events scheduled
                </h4>
                <p className="text-gray-500 mt-1">
                  Add events to plan your day
                </p>
                <Button onClick={() => setIsAddingEvent(true)} className="mt-4">
                  Create Event
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Event Detail Dialog */}
        <Dialog
          open={!!selectedEvent}
          onOpenChange={(open) => !open && setSelectedEvent(null)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-full",
                    selectedEvent?.borderColor
                      .replace("border-l-", "bg-")
                      .replace("-500", "-100")
                  )}
                >
                  {selectedEvent?.icon}
                </div>
                <div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{selectedEvent?.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <span>{selectedEvent?.location}</span>
                  </div>
                </div>
              </div>

              {selectedEvent?.description && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">
                    Description
                  </h4>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Participants</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent?.participants.map((participant, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Image
                        src={participant}
                        alt="Participant"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Event Dialog */}
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Fill in the details for your new event.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Team meeting, client call, etc."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">
                  Start Time
                </Label>
                <Input id="startTime" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endTime" className="text-right">
                  End Time
                </Label>
                <Input id="endTime" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Zoom, Conference Room, etc."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Event details..."
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
