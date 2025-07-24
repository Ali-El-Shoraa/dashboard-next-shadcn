import ApplicationsOverview from "./components/ApplicationsOverview";
import AttendanceOverview from "./components/AttendanceOverview";
import BirthdayCard from "./components/BirthdayCard";
import EmployeeList from "./components/EmployeeList";
import InterviewsScheduled from "./components/InterviewsScheduled";
// import ProjectAchievementsCard from "./components/ProjectAchievementsCard";
import RecruitmentAnalysis from "./components/RecruitmentAnalysis";
import ScheduleCard from "./components/ScheduleCard";
import StatsWidget from "./components/StatsWidget";

export default function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 content gap-6">
      <div className="lg:col-span-8 space-y-6">
        <StatsWidget />

        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="md:col-span-6">
            {/* <ProjectAchievementsCard />
          </div>

          <div className="md:col-span-2"> */}
            <ApplicationsOverview />
          </div>
        </div>

        <EmployeeList />

        <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
          <div className="md:col-span-5">
            <AttendanceOverview />
          </div>

          <div className="md:col-span-3">
            <BirthdayCard />
          </div>
        </div>

        <RecruitmentAnalysis />
      </div>

      <div className="lg:col-span-4 space-y-6">
        <ScheduleCard />
        <InterviewsScheduled />
      </div>
    </div>
  );
}
