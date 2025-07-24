"use client";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function ProjectAchievementsCard() {
  const satisfactionRate = 92;
  const projectsCompleted = 15;
  const growthPercentage = 14.5;
  const lastYearRate = 83.04;

  return (
    <Card className="border-none bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-semibold">تهانينا!</CardTitle>
            </div>

            <p className="text-muted-foreground">
              لقد تم إكمال {projectsCompleted} مشروع هذا العام بنجاح.
            </p>

            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-primary">
                  {satisfactionRate}%
                </h3>
                <Badge variant="success" className="gap-1">
                  <ArrowUp className="h-3 w-3" />
                  {growthPercentage}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                العام الماضي{" "}
                <span className="font-medium">{lastYearRate}%</span>
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">رضا العملاء</span>
                <span className="text-sm text-muted-foreground">
                  {satisfactionRate}%
                </span>
              </div>
              <Progress value={satisfactionRate} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <Image
              src="/images/achievement-illustration.png"
              alt="Achievement Illustration"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
