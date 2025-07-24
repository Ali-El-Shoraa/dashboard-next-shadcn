import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, Heart, TrendingUp } from "lucide-react";

type SampleEvent = {
  calendarId: string;
  start: string | Date;
  // add other fields if needed
};

interface StatsBarProps {
  sampleEvents: SampleEvent[];
}

export default function StatsBar({ sampleEvents }: StatsBarProps) {
  return (
    // bg-gradient-to-r from-white/60 to-blue-50/60 dark:from-slate-900/60 dark:to-slate-800/60 backdrop-blur-sm
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="bg-white/70 dark:bg-slate-800/70 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-xl font-bold">{sampleEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-slate-800/70 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Work Events</p>
                <p className="text-xl font-bold">
                  {sampleEvents.filter((e) => e.calendarId === "work").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-slate-800/70 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Personal</p>
                <p className="text-xl font-bold">
                  {
                    sampleEvents.filter((e) => e.calendarId === "personal")
                      .length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-slate-800/70 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-xl font-bold">
                  {
                    sampleEvents.filter((event) => {
                      const eventDate = new Date(event.start);
                      const now = new Date();
                      const weekStart = new Date(
                        now.setDate(now.getDate() - now.getDay())
                      );
                      const weekEnd = new Date(weekStart);
                      weekEnd.setDate(weekStart.getDate() + 6);
                      return eventDate >= weekStart && eventDate <= weekEnd;
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
