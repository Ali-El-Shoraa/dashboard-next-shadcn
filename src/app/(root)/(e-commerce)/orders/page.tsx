import OrdersPage from "./components/OrdersPage";

export default function InvoicesPage() {
  return <OrdersPage />;
}
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   MoreHorizontal,
//   Plus,
//   Search,
// } from "lucide-react";
// import Link from "next/link";

// const orders = [
//   {
//     id: "#123567",
//     customer: "Patricia Semklo",
//     date: "2023-10-15",
//     status: "Delivered",
//     total: "$289.66",
//     payment: "Credit Card",
//   },
//   {
//     id: "#779912",
//     customer: "Dominik Lamakani",
//     date: "2023-10-14",
//     status: "Processing",
//     total: "$1,476.04",
//     payment: "PayPal",
//   },
//   {
//     id: "#889923",
//     customer: "Maria Garcia",
//     date: "2023-10-13",
//     status: "Pending",
//     total: "$543.21",
//     payment: "Bank Transfer",
//   },
//   {
//     id: "#990134",
//     customer: "John Smith",
//     date: "2023-10-12",
//     status: "Shipped",
//     total: "$765.43",
//     payment: "Credit Card",
//   },
//   {
//     id: "#001245",
//     customer: "Emma Johnson",
//     date: "2023-10-11",
//     status: "Cancelled",
//     total: "$123.45",
//     payment: "PayPal",
//   },
// ];

// const statuses = {
//   Delivered: "text-green-800 bg-green-100/60",
//   Processing: "text-blue-800 bg-blue-100/60",
//   Pending: "text-yellow-800 bg-yellow-100/60",
//   Shipped: "text-purple-800 bg-purple-100/60",
//   Cancelled: "text-red-800 bg-red-100/60",
// };

// export default function OrdersPage() {
//   return (
//     <div className="space-y-6 p-6">
//       {/* Page header */}
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//             Orders
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Manage your orders and view order details
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Date range dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <span>Last Month</span>
//                 <ChevronDown className="h-4 w-4 opacity-50" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Date Range</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Today</DropdownMenuItem>
//               <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
//               <DropdownMenuItem>Last Month</DropdownMenuItem>
//               <DropdownMenuItem>Last 12 Months</DropdownMenuItem>
//               <DropdownMenuItem>All Time</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* Filter button */}
//           <Button variant="outline" className="hidden sm:flex">
//             <Filter className="h-4 w-4 mr-2" />
//             Filter
//           </Button>

//           {/* Add order button */}
//           <Button asChild>
//             <Link href="#">
//               <Plus className="h-4 w-4 mr-2" />
//               <span className="hidden sm:inline">Add Order</span>
//               <span className="sm:hidden">Add</span>
//             </Link>
//           </Button>
//         </div>
//       </div>

//       {/* Search and filters */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="relative w-full sm:max-w-sm">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//           <Input placeholder="Search orders..." className="pl-9" />
//         </div>

//         <div className="flex items-center gap-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <span>Status</span>
//                 <ChevronDown className="h-4 w-4 opacity-50" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>All</DropdownMenuItem>
//               <DropdownMenuItem>Pending</DropdownMenuItem>
//               <DropdownMenuItem>Processing</DropdownMenuItem>
//               <DropdownMenuItem>Shipped</DropdownMenuItem>
//               <DropdownMenuItem>Delivered</DropdownMenuItem>
//               <DropdownMenuItem>Cancelled</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <span>Payment</span>
//                 <ChevronDown className="h-4 w-4 opacity-50" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Filter by Payment</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>All</DropdownMenuItem>
//               <DropdownMenuItem>Credit Card</DropdownMenuItem>
//               <DropdownMenuItem>PayPal</DropdownMenuItem>
//               <DropdownMenuItem>Bank Transfer</DropdownMenuItem>
//               <DropdownMenuItem>Cash on Delivery</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-lg border bg-white dark:bg-gray-900 shadow-sm">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[120px]">Order ID</TableHead>
//               <TableHead>Customer</TableHead>
//               <TableHead className="w-[120px]">Date</TableHead>
//               <TableHead className="w-[120px]">Status</TableHead>
//               <TableHead className="w-[120px] text-right">Total</TableHead>
//               <TableHead className="w-[150px]">Payment</TableHead>
//               <TableHead className="w-[50px]"></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell className="font-medium">
//                   <Link href="#" className="hover:underline">
//                     {order.id}
//                   </Link>
//                 </TableCell>
//                 <TableCell>{order.customer}</TableCell>
//                 <TableCell>
//                   {new Date(order.date).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>
//                   <span
//                     className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                       statuses[order.status as keyof typeof statuses]
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </TableCell>
//                 <TableCell className="text-right">{order.total}</TableCell>
//                 <TableCell>{order.payment}</TableCell>
//                 <TableCell>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                       <DropdownMenuItem asChild>
//                         <Link href="#">View</Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>Edit</DropdownMenuItem>
//                       <DropdownMenuItem>Print Invoice</DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem className="text-red-600">
//                         Cancel Order
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
//         <div className="text-sm text-gray-500">
//           Showing <span className="font-medium">1</span> to{" "}
//           <span className="font-medium">5</span> of{" "}
//           <span className="font-medium">25</span> orders
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" disabled>
//             <ChevronLeft className="h-4 w-4" />
//             <span className="sr-only">Previous</span>
//           </Button>
//           <Button variant="outline" size="sm">
//             1
//           </Button>
//           <Button variant="ghost" size="sm">
//             2
//           </Button>
//           <Button variant="ghost" size="sm">
//             3
//           </Button>
//           <Button variant="outline" size="sm">
//             <ChevronRight className="h-4 w-4" />
//             <span className="sr-only">Next</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
