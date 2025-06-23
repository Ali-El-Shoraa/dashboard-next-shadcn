import InvoicesPage from "./components/InvoicesPage";

export default function Page() {
  return <InvoicesPage />;
}

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
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
//   Filter,
//   Plus,
//   Download,
//   MoreHorizontal,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   FileText,
//   // User,
//   Calendar,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   XCircle,
//   Send,
//   Printer,
//   Copy,
// } from "lucide-react";
// import Link from "next/link";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// type InvoiceStatus = "paid" | "pending" | "overdue" | "cancelled";

// type Invoice = {
//   id: string;
//   customer: string;
//   customerAvatar: string;
//   date: string;
//   amount: number;
//   status: InvoiceStatus;
//   dueDate: string;
//   paymentMethod: string;
// };

// const invoices: Invoice[] = [
//   {
//     id: "INV-001",
//     customer: "Patricia Semklo",
//     customerAvatar: "/images/user-40-01.jpg",
//     date: "2023-10-15",
//     amount: 289.66,
//     status: "paid",
//     dueDate: "2023-10-22",
//     paymentMethod: "Credit Card",
//   },
//   {
//     id: "INV-002",
//     customer: "Dominik Lamakani",
//     customerAvatar: "/images/user-40-02.jpg",
//     date: "2023-10-14",
//     amount: 1476.04,
//     status: "pending",
//     dueDate: "2023-10-21",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     id: "INV-003",
//     customer: "Ivan Mesaros",
//     customerAvatar: "/images/user-40-03.jpg",
//     date: "2023-10-10",
//     amount: 890.5,
//     status: "overdue",
//     dueDate: "2023-10-17",
//     paymentMethod: "PayPal",
//   },
//   {
//     id: "INV-004",
//     customer: "Maria Lopez",
//     customerAvatar: "/images/user-40-04.jpg",
//     date: "2023-10-05",
//     amount: 1250.0,
//     status: "cancelled",
//     dueDate: "2023-10-12",
//     paymentMethod: "Credit Card",
//   },
// ];

// const statusVariants = {
//   paid: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
//   pending:
//     "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
//   overdue: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
//   cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
// };

// const statusIcons = {
//   paid: <CheckCircle className="h-4 w-4 mr-1.5" />,
//   pending: <Clock className="h-4 w-4 mr-1.5" />,
//   overdue: <AlertCircle className="h-4 w-4 mr-1.5" />,
//   cancelled: <XCircle className="h-4 w-4 mr-1.5" />,
// };

// export default function InvoicesPage() {
//   return (
//     <div className="space-y-6">
//       {/* Page header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//             Invoices
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage and track your invoices
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//           {/* Search bar */}
//           <div className="relative w-full sm:w-64">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search invoices..."
//               className="pl-10 bg-white dark:bg-gray-800"
//             />
//           </div>

//           {/* Action buttons */}
//           <div className="flex items-center gap-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="flex items-center gap-2">
//                   <Filter className="h-4 w-4" />
//                   <span className="hidden sm:inline">Filters</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56">
//                 <DropdownMenuItem>
//                   <CheckCircle className="mr-2 h-4 w-4" />
//                   <span>Paid</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Clock className="mr-2 h-4 w-4" />
//                   <span>Pending</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <AlertCircle className="mr-2 h-4 w-4" />
//                   <span>Overdue</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <XCircle className="mr-2 h-4 w-4" />
//                   <span>Cancelled</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <Button asChild>
//               <Link href="#" className="flex items-center gap-2">
//                 <Plus className="h-4 w-4" />
//                 <span className="hidden sm:inline">Create Invoice</span>
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Total Invoices
//               </p>
//               <p className="text-2xl font-bold mt-1">87</p>
//             </div>
//             <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
//               <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Paid</p>
//               <p className="text-2xl font-bold mt-1">52</p>
//             </div>
//             <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
//               <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Pending</p>
//               <p className="text-2xl font-bold mt-1">23</p>
//             </div>
//             <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
//               <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Overdue</p>
//               <p className="text-2xl font-bold mt-1">12</p>
//             </div>
//             <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20">
//               <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-lg border bg-white dark:bg-gray-900 overflow-hidden">
//         <div className="p-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <h2 className="text-lg font-semibold flex items-center gap-2">
//               <FileText className="h-5 w-5" />
//               <span>Recent Invoices</span>
//             </h2>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="flex items-center gap-2">
//                   <span>Last Month</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>Today</DropdownMenuItem>
//                 <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
//                 <DropdownMenuItem>Last Month</DropdownMenuItem>
//                 <DropdownMenuItem>Last 12 Months</DropdownMenuItem>
//                 <DropdownMenuItem>All Time</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           <Button variant="outline" size="sm">
//             <Download className="h-4 w-4 mr-2" />
//             Export
//           </Button>
//         </div>

//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[120px]">Invoice ID</TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead className="w-[120px]">Date</TableHead>
//                 <TableHead className="text-right w-[120px]">Amount</TableHead>
//                 <TableHead className="w-[120px]">Status</TableHead>
//                 <TableHead className="w-[120px]">Due Date</TableHead>
//                 <TableHead className="w-[120px]">Payment</TableHead>
//                 <TableHead className="w-[50px]">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {invoices.map((invoice) => (
//                 <TableRow
//                   key={invoice.id}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
//                 >
//                   <TableCell className="font-medium">
//                     <Link
//                       href="#"
//                       className="hover:underline flex items-center gap-2"
//                     >
//                       <FileText className="h-4 w-4 opacity-50" />
//                       {invoice.id}
//                     </Link>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <Avatar className="h-8 w-8">
//                         <AvatarImage
//                           src={invoice.customerAvatar}
//                           alt={invoice.customer}
//                         />
//                         <AvatarFallback>
//                           {invoice.customer
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <span>{invoice.customer}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-1">
//                       <Calendar className="h-4 w-4 opacity-50" />
//                       {new Date(invoice.date).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-right font-medium">
//                     $
//                     {invoice.amount.toLocaleString("en-US", {
//                       minimumFractionDigits: 2,
//                     })}
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       className={`px-2 py-1 text-xs flex items-center ${
//                         statusVariants[invoice.status]
//                       }`}
//                     >
//                       {statusIcons[invoice.status]}
//                       {invoice.status.charAt(0).toUpperCase() +
//                         invoice.status.slice(1)}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-1">
//                       <Calendar className="h-4 w-4 opacity-50" />
//                       {new Date(invoice.dueDate).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <span className="text-sm text-gray-500 dark:text-gray-400">
//                       {invoice.paymentMethod}
//                     </span>
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="h-8 w-8">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end" className="w-40">
//                         <DropdownMenuItem>
//                           <FileText className="mr-2 h-4 w-4" />
//                           <span>View</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                           <Send className="mr-2 h-4 w-4" />
//                           <span>Send</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                           <Printer className="mr-2 h-4 w-4" />
//                           <span>Print</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                           <Copy className="mr-2 h-4 w-4" />
//                           <span>Duplicate</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem className="text-red-600">
//                           <XCircle className="mr-2 h-4 w-4" />
//                           <span>Cancel</span>
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//         <div className="text-sm text-gray-500">
//           Showing <span className="font-medium">1</span> to{" "}
//           <span className="font-medium">4</span> of{" "}
//           <span className="font-medium">87</span> invoices
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" disabled>
//             <ChevronLeft className="h-4 w-4 mr-1" />
//             Previous
//           </Button>
//           <div className="flex items-center gap-1">
//             {[1, 2, 3, 4, 5].map((page) => (
//               <Button
//                 key={page}
//                 variant={page === 1 ? "default" : "outline"}
//                 size="sm"
//                 className="h-8 w-8 p-0"
//               >
//                 {page}
//               </Button>
//             ))}
//           </div>
//           <Button variant="outline" size="sm">
//             Next
//             <ChevronRight className="h-4 w-4 ml-1" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
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
//   Filter,
//   Plus,
//   Download,
//   MoreHorizontal,
// } from "lucide-react";
// import Link from "next/link";

// const invoices = [
//   {
//     id: "#INV-001",
//     customer: "Patricia Semklo",
//     date: "2023-10-15",
//     amount: "$289.66",
//     status: "Paid",
//     dueDate: "2023-10-22",
//   },
//   {
//     id: "#INV-002",
//     customer: "Dominik Lamakani",
//     date: "2023-10-14",
//     amount: "$1,476.04",
//     status: "Pending",
//     dueDate: "2023-10-21",
//   },
//   // Add more invoices as needed
// ];

// export default function InvoicesPage() {
//   return (
//     <div className="space-y-6">
//       {/* Page header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//             Invoices
//           </h1>
//         </div>

//         <div className="flex items-center space-x-4">
//           {/* Date range dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <span>Last Month</span>
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>Today</DropdownMenuItem>
//               <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
//               <DropdownMenuItem>Last Month</DropdownMenuItem>
//               <DropdownMenuItem>Last 12 Months</DropdownMenuItem>
//               <DropdownMenuItem>All Time</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* Filter button */}
//           <Button variant="outline">
//             <Filter className="h-4 w-4 mr-2" />
//             Filter
//           </Button>

//           {/* Create invoice button */}
//           <Button asChild>
//             <Link href="#">
//               <Plus className="h-4 w-4 mr-2" />
//               Create Invoice
//             </Link>
//           </Button>
//         </div>
//       </div>

//       {/* Search and filters */}
//       <div className="flex items-center justify-between">
//         <Input placeholder="Search invoices..." className="max-w-sm" />
//         <div className="flex space-x-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">
//                 Status
//                 <ChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>All</DropdownMenuItem>
//               <DropdownMenuItem>Paid</DropdownMenuItem>
//               <DropdownMenuItem>Pending</DropdownMenuItem>
//               <DropdownMenuItem>Overdue</DropdownMenuItem>
//               <DropdownMenuItem>Cancelled</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-md border bg-white dark:bg-gray-900">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Invoice ID</TableHead>
//               <TableHead>Customer</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Due Date</TableHead>
//               <TableHead className="w-[50px]">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {invoices.map((invoice) => (
//               <TableRow key={invoice.id}>
//                 <TableCell className="font-medium">{invoice.id}</TableCell>
//                 <TableCell>{invoice.customer}</TableCell>
//                 <TableCell>{invoice.date}</TableCell>
//                 <TableCell>{invoice.amount}</TableCell>
//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       invoice.status === "Paid"
//                         ? "bg-green-100 text-green-800"
//                         : invoice.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {invoice.status}
//                   </span>
//                 </TableCell>
//                 <TableCell>{invoice.dueDate}</TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     <Button variant="ghost" size="icon">
//                       <Download className="h-4 w-4" />
//                     </Button>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>View</DropdownMenuItem>
//                         <DropdownMenuItem>Edit</DropdownMenuItem>
//                         <DropdownMenuItem>Send</DropdownMenuItem>
//                         <DropdownMenuItem className="text-red-600">
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between">
//         <div className="text-sm text-gray-500">
//           Showing <span className="font-medium">1</span> to{" "}
//           <span className="font-medium">10</span> of{" "}
//           <span className="font-medium">87</span> results
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="outline" disabled>
//             Previous
//           </Button>
//           <Button variant="outline">Next</Button>
//         </div>
//       </div>
//     </div>
//   );
// }
