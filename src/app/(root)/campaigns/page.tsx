import { CampaignsPage } from "./components/CampaignsPage";

export default function Page() {
  return <CampaignsPage />;
}

// "use client";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   // CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Search, Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

// // type Campaign = {
// //   id: number,
// //   title: string,
// //   description: string,
// //   dateRange: string,
// //   status: "one-time" | "off-track" | "at-risk" | "on-track",
// //   icon: JSX.Element,
// //   members: {
// //     id: number,
// //     name: string,
// //     avatar: string,
// //   }[],
// // };

// const statusVariants = {
//   "one-time": { label: "One-Time", color: "bg-blue-100 text-blue-800" },
//   "off-track": { label: "Off-Track", color: "bg-yellow-100 text-yellow-800" },
//   "at-risk": { label: "At Risk", color: "bg-red-100 text-red-800" },
//   "on-track": { label: "On Track", color: "bg-green-100 text-green-800" },
// };

// type CampaignStatus = "one-time" | "off-track" | "at-risk" | "on-track";

// type Campaign = {
//   id: number;
//   title: string;
//   description: string;
//   dateRange: string;
//   status: CampaignStatus;
//   icon: React.ReactNode;
//   members: {
//     id: number;
//     name: string;
//     avatar: string;
//   }[];
// };

// const campaigns: Campaign[] = [
//   {
//     id: 1,
//     title: "Monitor progress in Real Time Value",
//     description:
//       "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.",
//     dateRange: "Jan 20 → Jan 27",
//     status: "one-time",
//     icon: (
//       <svg viewBox="0 0 36 36" className="h-5 w-5">
//         <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"></path>
//       </svg>
//     ),
//     members: [
//       { id: 1, name: "User 01", avatar: "/images/user-28-01.jpg" },
//       { id: 2, name: "User 02", avatar: "/images/user-28-02.jpg" },
//       { id: 3, name: "User 03", avatar: "/images/user-28-03.jpg" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Product Launch Campaign",
//     description: "Marketing campaign for the new product release.",
//     dateRange: "Feb 1 → Feb 28",
//     status: "on-track",
//     icon: (
//       <svg viewBox="0 0 36 36" className="h-5 w-5 text-white">
//         <path d="M15 13v-3l-5 4 5 4v-3h8a1 1 0 000-2h-8zM21 21h-8a1 1 0 000 2h8v3l5-4-5-4v3z"></path>
//       </svg>
//     ),
//     members: [
//       { id: 4, name: "User 04", avatar: "/images/user-28-04.jpg" },
//       { id: 5, name: "User 05", avatar: "/images/user-28-05.jpg" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Q4 Sales Promotion",
//     description: "End of year sales campaign to boost revenue.",
//     dateRange: "Oct 15 → Dec 31",
//     status: "at-risk",
//     icon: (
//       <svg viewBox="0 0 36 36" className="h-5 w-5">
//         <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z"></path>
//       </svg>
//     ),
//     members: [
//       { id: 7, name: "User 07", avatar: "/images/user-28-07.jpg" },
//       { id: 8, name: "User 08", avatar: "/images/user-28-08.jpg" },
//       { id: 9, name: "User 09", avatar: "/images/user-28-09.jpg" },
//     ],
//   },
//   // يمكن إضافة المزيد من الحملات هنا
// ];

// export default function CampaignsPage() {
//   return (
//     <main className="flex-1 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Page header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           {/* Left: Title */}
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//               Campaigns
//             </h1>
//           </div>

//           {/* Right: Actions */}
//           <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//             {/* Search form */}
//             <div className="relative w-full sm:w-64">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input className="pl-9" placeholder="Search..." type="search" />
//             </div>

//             {/* Filter button */}
//             <Button variant="outline">
//               <Filter className="mr-2 h-4 w-4" />
//               Filter
//             </Button>

//             {/* Create campaign button */}
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Create Campaign
//             </Button>
//           </div>
//         </div>

//         {/* Cards grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {campaigns.map((campaign) => (
//             <Card
//               key={campaign.id}
//               className="hover:shadow-md transition-shadow"
//             >
//               <CardHeader className="pb-4">
//                 <div className="flex items-center justify-between">
//                   <div
//                     className={`rounded-full flex items-center justify-center h-10 w-10 ${
//                       campaign.status === "on-track"
//                         ? "bg-green-500"
//                         : campaign.status === "at-risk"
//                         ? "bg-orange-500"
//                         : "bg-gray-200"
//                     }`}
//                   >
//                     {campaign.icon}
//                   </div>
//                   <div className="flex -space-x-2">
//                     {campaign.members.map((member) => (
//                       <Avatar
//                         key={member.id}
//                         className="h-7 w-7 border-2 border-white"
//                       >
//                         <AvatarImage src={member.avatar} alt={member.name} />
//                         <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                     ))}
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                   {campaign.description}
//                 </p>
//               </CardContent>
//               <CardFooter className="flex justify-between items-center">
//                 <span className="text-sm text-gray-500">
//                   {campaign.dateRange}
//                 </span>
//                 <div className="flex items-center gap-2">
//                   <Badge
//                     variant="outline"
//                     className={statusVariants[campaign.status].color}
//                   >
//                     {statusVariants[campaign.status].label}
//                   </Badge>
//                   <Button variant="link" className="text-violet-500 p-0 h-auto">
//                     View →
//                   </Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center">
//           <nav className="flex items-center gap-1">
//             <Button variant="outline" size="icon">
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" className="font-semibold text-violet-600">
//               1
//             </Button>
//             <Button variant="outline">2</Button>
//             <Button variant="outline">3</Button>
//             <span className="px-3">...</span>
//             <Button variant="outline">9</Button>
//             <Button variant="outline" size="icon">
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </nav>
//         </div>
//       </div>
//     </main>
//   );
// }

// // import React from 'react'

// // export default function page() {
// //   return (
// //     <div>

// //     </div>
// //   )
// // }
