"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Users, Wallet, Handshake, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function StatsWidget() {
  const [counters, setCounters] = useState({
    newEmployees: 0,
    grossSalary: 0,
    hiredCandidates: 0,
    totalEmployees: 0,
  });

  useEffect(() => {
    // Counter animation using setTimeout
    const animateCounter = (target: number, setter: (val: number) => void) => {
      let current = 0;
      const increment = target / 30; // Adjust speed

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setter(Math.floor(current));
      }, 20);
    };

    animateCounter(70, (val) =>
      setCounters((prev) => ({ ...prev, newEmployees: val }))
    );
    animateCounter(562210, (val) =>
      setCounters((prev) => ({ ...prev, grossSalary: val }))
    );
    animateCounter(100, (val) =>
      setCounters((prev) => ({ ...prev, hiredCandidates: val }))
    );
    animateCounter(356, (val) =>
      setCounters((prev) => ({ ...prev, totalEmployees: val }))
    );
  }, []);

  const stats = [
    {
      title: "New Employees",
      value: counters.newEmployees,
      icon: <UserPlus className="h-6 w-6 text-emerald-600" />,
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
      hoverEffect: "hover:shadow-emerald-200",
    },
    {
      title: "Gross Salary",
      value: counters.grossSalary.toLocaleString(),
      icon: <Wallet className="h-6 w-6 text-amber-600" />,
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
      hoverEffect: "hover:shadow-amber-200",
    },
    {
      title: "Hired Candidates",
      value: counters.hiredCandidates,
      icon: <Handshake className="h-6 w-6 text-indigo-600" />,
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-600",
      hoverEffect: "hover:shadow-indigo-200",
    },
    {
      title: "Total Employees",
      value: counters.totalEmployees,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      hoverEffect: "hover:shadow-blue-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div key={index}>
          <Card
            className={`group transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg p-0 ${stat.hoverEffect}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-full transition-all duration-300 group-hover:scale-110 ${stat.bgColor} ${stat.textColor}`}
                >
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <CardTitle
                    className={`text-2xl font-bold ${stat.textColor} transition-all duration-300`}
                  >
                    {stat.value}
                  </CardTitle>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${stat.bgColor} transition-all duration-1000 ease-out`}
                  style={{
                    width: `${Math.min(
                      100,
                      (Number(stat.value) / 500) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
