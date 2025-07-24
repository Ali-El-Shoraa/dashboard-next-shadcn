"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronUp, Clock, MessageCircleReply, Ticket } from "lucide-react";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const ticketData = [
  {
    name: "New Tickets",
    value: 40,
    icon: <Ticket className="h-4 w-4" />,
    color: "green",
  },
  {
    name: "Open Tickets",
    value: 25,
    icon: <Clock className="h-4 w-4" />,
    color: "orange",
  },
  {
    name: "Response Time",
    value: "1 Day",
    icon: <MessageCircleReply className="h-4 w-4" />,
    color: "teal",
  },
];

export default function CompletionRate() {
  return (
    <Card className="h-full flex flex-col group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <TooltipComponent>
              <TooltipTrigger asChild>
                <p className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-help">
                  Completion Rate
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>Percentage of completed tasks vs total tasks</p>
              </TooltipContent>
            </TooltipComponent>

            <div className="flex items-center gap-2 mt-1">
              <h2 className="text-2xl lg:text-3xl font-bold">83%</h2>

              <TooltipComponent>
                <TooltipTrigger asChild>
                  <Badge
                    variant="destructive"
                    className="gap-1 h-6 hover:bg-success/90"
                  >
                    <ChevronUp className="h-3 w-3" />
                    <span className="text-xs">24.2%</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>24.2% increase from last month</p>
                </TooltipContent>
              </TooltipComponent>
            </div>
          </div>

          <TooltipComponent>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                View Details
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View detailed completion analytics</p>
            </TooltipContent>
          </TooltipComponent>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Pie Chart with Tooltip */}
        <div className="h-[180px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ payload }) => (
                  <div className="bg-background border rounded-lg shadow-lg p-3">
                    <p className="font-medium">{payload?.[0]?.name}</p>
                    <p className="text-sm">
                      {payload?.[0]?.value}% •{" "}
                      {payload?.[0]?.value === 83 ? "Completed" : "Remaining"}
                    </p>
                  </div>
                )}
              />
              <Pie
                data={[
                  { name: "Completed", value: 83 },
                  { name: "Remaining", value: 17 },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                <Cell fill="#3b82f6" stroke="none" />
                <Cell fill="#f3f4f6" stroke="none" />
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-2xl font-bold fill-foreground"
              >
                83%
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Section with Tooltips */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {ticketData.map((item, index) => (
            <TooltipComponent key={index}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-default">
                  <div
                    className={`p-2 rounded-full ${
                      item.color === "green"
                        ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                        : item.color === "orange"
                        ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"
                        : "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {typeof item.value === "number"
                        ? item.value.toLocaleString()
                        : item.value}
                    </p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {item.name} - {item.value}{" "}
                  {typeof item.value === "number" ? "items" : ""}
                </p>
                {index === 0 && (
                  <p className="text-xs text-muted-foreground">
                    New tickets created
                  </p>
                )}
                {index === 1 && (
                  <p className="text-xs text-muted-foreground">
                    Tickets currently open
                  </p>
                )}
                {index === 2 && (
                  <p className="text-xs text-muted-foreground">
                    Average response time
                  </p>
                )}
              </TooltipContent>
            </TooltipComponent>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <TooltipComponent>
          <TooltipTrigger asChild>
            <div className="w-full bg-muted rounded-full h-2 cursor-help">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: "83%" }}
              ></div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>83% of tasks completed</p>
            <p className="text-xs text-muted-foreground">17% remaining</p>
          </TooltipContent>
        </TooltipComponent>
      </CardFooter>
    </Card>
  );
}

//   <div className="lg:col-span-4">
//           <Card className="h-full flex flex-col">
//             <CardHeader>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Completion Rate
//                   </p>
//                   <div className="flex items-center gap-2 mt-1">
//                     <h2 className="text-2xl lg:text-3xl font-bold">83%</h2>
//                     <Badge variant="success" className="gap-1 h-6">
//                       <ChevronUp className="h-3 w-3" />
//                       <span className="text-xs">24.2%</span>
//                     </Badge>
//                   </div>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-muted-foreground"
//                 >
//                   View Details
//                 </Button>
//               </div>
//             </CardHeader>

//             <CardContent className="flex-1 flex flex-col">
//               {/* Pie Chart - Improved */}
//               <div className="h-[180px] relative">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={[
//                         { name: "Completed", value: 83 },
//                         { name: "Remaining", value: 17 },
//                       ]}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={70}
//                       outerRadius={90}
//                       paddingAngle={2}
//                       dataKey="value"
//                       startAngle={90}
//                       endAngle={-270}
//                     >
//                       <Cell fill="#3b82f6" stroke="none" />
//                       <Cell fill="#f3f4f6" stroke="none" />
//                     </Pie>
//                     <text
//                       x="50%"
//                       y="50%"
//                       textAnchor="middle"
//                       dominantBaseline="middle"
//                       className="text-2xl font-bold fill-foreground"
//                     >
//                       83%
//                     </text>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Stats Section - Improved Layout */}
//               <div className="mt-6 grid grid-cols-3 gap-3">
//                 {ticketData.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
//                   >
//                     <div
//                       className={`p-2 rounded-full ${
//                         item.color === "green"
//                           ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
//                           : item.color === "orange"
//                           ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"
//                           : "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
//                       }`}
//                     >
//                       {item.icon}
//                     </div>
//                     <div className="text-center">
//                       <p className="text-sm font-medium">{item.name}</p>
//                       <p className="text-xs text-muted-foreground mt-1">
//                         {typeof item.value === "number"
//                           ? item.value.toLocaleString()
//                           : item.value}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>

//             <CardFooter className="pt-0">
//               <div className="w-full bg-muted rounded-full h-2">
//                 <div
//                   className="bg-blue-500 h-2 rounded-full"
//                   style={{ width: "83%" }}
//                 ></div>
//               </div>
//             </CardFooter>
//           </Card>
//         </div>
