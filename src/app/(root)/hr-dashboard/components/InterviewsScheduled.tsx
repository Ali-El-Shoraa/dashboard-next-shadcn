"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Mail,
  FileText,
  CalendarDays,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { JSX, useState } from "react";

type InterviewStatus = "confirmed" | "pending" | "cancelled";

type Interview = {
  id: number;
  name: string;
  position: string;
  date: string;
  time: string;
  location: string;
  status: InterviewStatus;
  avatar: string;
  email: string;
  phone: string;
  notes: string;
};

const interviews: Interview[] = [
  {
    id: 1,
    name: "Lucas E.",
    position: "UI Designer",
    date: "10 Feb, 2024",
    time: "10:00 AM",
    location: "Meeting Room A",
    status: "confirmed",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop",
    email: "lucas@example.com",
    phone: "+1 (555) 123-4567",
    notes: "Bring portfolio samples",
  },
  {
    id: 2,
    name: "Leslie A.",
    position: "Web Designer",
    date: "17 Oct, 2024",
    time: "02:30 PM",
    location: "Zoom Meeting",
    status: "pending",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop",
    email: "leslie@example.com",
    phone: "+1 (555) 987-6543",
    notes: "Discuss remote work options",
  },
  {
    id: 3,
    name: "Savannah N.",
    position: "JS Developer",
    date: "21 Sep, 2024",
    time: "11:15 AM",
    location: "Office 305",
    status: "confirmed",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop",
    email: "savannah@example.com",
    phone: "+1 (555) 456-7890",
    notes: "Technical assessment required",
  },
  {
    id: 4,
    name: "Darlene R.",
    position: "App Developer",
    date: "22 May, 2024",
    time: "09:45 AM",
    location: "Zoom Meeting",
    status: "cancelled",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    email: "darlene@example.com",
    phone: "+1 (555) 789-0123",
    notes: "Rescheduled for next week",
  },
  {
    id: 5,
    name: "Marvin M.",
    position: "Marketing",
    date: "18 Sep, 2024",
    time: "03:00 PM",
    location: "Meeting Room B",
    status: "confirmed",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop",
    email: "marvin@example.com",
    phone: "+1 (555) 234-5678",
    notes: "Bring campaign samples",
  },
];

const statusColors: Record<InterviewStatus, string> = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons: Record<InterviewStatus, JSX.Element> = {
  confirmed: <Check className="h-4 w-4" />,
  pending: <AlertCircle className="h-4 w-4" />,
  cancelled: <X className="h-4 w-4" />,
};

export default function InterviewsScheduled() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<InterviewStatus | "all">(
    "all"
  );

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || interview.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openInterviewDetails = (interview: Interview) => {
    setSelectedInterview(interview);
  };

  return (
    <>
      <Card className="border-none shadow-lg h-fit">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">
              Interview Schedule
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {filteredInterviews.length} upcoming interviews
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="h-8 gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Interview
                  </span>
                </Button>
              </DialogTrigger>
              <InterviewFormDialog />
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onSelect={() => setStatusFilter("all")}>
                  All Interviews
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("confirmed")}>
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("cancelled")}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Reminders
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Export to PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CalendarDays className="h-4 w-4 mr-2" />
                  View Calendar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interviews..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[400px]">
            <ul className="space-y-2">
              {filteredInterviews.map((interview) => (
                <li key={interview.id}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                        onClick={() => openInterviewDetails(interview)}
                      >
                        <Avatar className="h-11 w-11 border-2 border-white shadow">
                          <AvatarImage
                            src={interview.avatar}
                            alt={interview.name}
                          />
                          <AvatarFallback>
                            {interview.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-medium truncate">
                              {interview.name}
                            </h4>
                            <Badge
                              className={`text-xs flex items-center gap-1 ${
                                statusColors[interview.status]
                              }`}
                            >
                              {statusIcons[interview.status]}
                              {interview.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {interview.position}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{interview.time}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="truncate max-w-[120px]">
                                {interview.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </DialogTrigger>

                    {selectedInterview && (
                      <InterviewDetailsDialog
                        interview={selectedInterview}
                        onClose={() => setSelectedInterview(null)}
                      />
                    )}
                  </Dialog>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="ghost" className="text-primary">
            View All Interviews
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

function InterviewDetailsDialog({
  interview,
  onClose,
}: {
  interview: Interview;
  onClose: () => void;
}) {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <div className="flex items-start justify-between">
          <div>
            <DialogTitle className="text-xl">{interview.name}</DialogTitle>
            <DialogDescription>{interview.position}</DialogDescription>
          </div>
          <Badge
            className={`text-sm flex items-center gap-1 ${
              statusColors[interview.status]
            }`}
          >
            {statusIcons[interview.status]}
            {interview.status}
          </Badge>
        </div>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow">
            <AvatarImage src={interview.avatar} alt={interview.name} />
            <AvatarFallback>{interview.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{interview.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{interview.phone}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Interview Details</h4>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{interview.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{interview.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{interview.location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Notes</h4>
            <p className="text-sm text-muted-foreground">{interview.notes}</p>
          </div>
        </div>
      </div>

      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="default">
          <Mail className="h-4 w-4 mr-2" />
          Send Reminder
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function InterviewFormDialog() {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Schedule New Interview</DialogTitle>
        <DialogDescription>
          Fill in the details to schedule a new interview.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Candidate Name</label>
            <Input placeholder="Enter candidate name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Position</label>
            <Input placeholder="Enter position" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time</label>
            <Input type="time" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input placeholder="Enter location or Zoom link" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Confirmed
            </Button>
            <Button variant="outline" size="sm">
              Pending
            </Button>
            <Button variant="outline" size="sm">
              Cancelled
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Add any additional notes..."
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">Schedule Interview</Button>
      </DialogFooter>
    </DialogContent>
  );
}

function Phone({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
