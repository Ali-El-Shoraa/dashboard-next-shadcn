import CustomersPage from "./components/CustomersPage";

export default function Page() {
  return <CustomersPage />;
}

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Star,
//   MoreHorizontal,
//   ChevronDown,
//   Filter,
//   Plus,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUpDown,
//   User,
//   Mail,
//   MapPin,
//   ShoppingCart,
//   Receipt,
//   DollarSign,
//   RefreshCw,
//   Trash2,
//   Edit,
//   Eye,
// } from "lucide-react";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const customers = [
//   {
//     id: 1,
//     name: "Patricia Semklo",
//     email: "patricia.semklo@app.com",
//     location: "London, UK",
//     country: "GB",
//     orders: 24,
//     lastOrder: "#123567",
//     totalSpent: 2890.66,
//     refunds: 0,
//     favorite: true,
//     avatar: "/images/user-40-01.jpg",
//     status: "active",
//   },
//   {
//     id: 2,
//     name: "Dominik Lamakani",
//     email: "dominik.lamakani@gmail.com",
//     location: "Dortmund, DE",
//     country: "DE",
//     orders: 77,
//     lastOrder: "#779912",
//     totalSpent: 14767.04,
//     refunds: 4,
//     favorite: false,
//     avatar: "/images/user-40-02.jpg",
//     status: "active",
//   },
//   {
//     id: 3,
//     name: "Ivan Mesaros",
//     email: "ivan.mesaros@example.com",
//     location: "Bratislava, SK",
//     country: "SK",
//     orders: 12,
//     lastOrder: "#889923",
//     totalSpent: 890.5,
//     refunds: 1,
//     favorite: true,
//     avatar: "/images/user-40-03.jpg",
//     status: "inactive",
//   },
//   // يمكن إضافة المزيد من العملاء حسب الحاجة
// ];

// const statusVariants = {
//   active:
//     "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
//   inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
// };

// export default function CustomersPage() {
//   return (
//     <div className="space-y-6">
//       {/* Page header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//             Customers
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Manage your customers and their orders
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//           {/* Search bar */}
//           <div className="relative w-full sm:w-64">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search customers..."
//               className="pl-10 bg-white dark:bg-gray-800"
//             />
//           </div>

//           {/* Filter and add buttons */}
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
//                   <User className="mr-2 h-4 w-4" />
//                   <span>Active Customers</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <RefreshCw className="mr-2 h-4 w-4" />
//                   <span>With Returns</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <DollarSign className="mr-2 h-4 w-4" />
//                   <span>High Value</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <Button asChild>
//               <Link href="#" className="flex items-center gap-2">
//                 <Plus className="h-4 w-4" />
//                 <span className="hidden sm:inline">Add Customer</span>
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
//                 Total Customers
//               </p>
//               <p className="text-2xl font-bold mt-1">248</p>
//             </div>
//             <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
//               <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Active</p>
//               <p className="text-2xl font-bold mt-1">192</p>
//             </div>
//             <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
//               <User className="h-5 w-5 text-green-600 dark:text-green-400" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Avg. Orders</p>
//               <p className="text-2xl font-bold mt-1">4.2</p>
//             </div>
//             <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
//               <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Avg. Spend</p>
//               <p className="text-2xl font-bold mt-1">$1,248</p>
//             </div>
//             <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/20">
//               <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-lg border bg-white dark:bg-gray-900 overflow-hidden">
//         <div className="p-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-lg font-semibold flex items-center gap-2">
//             <span>All Customers</span>
//             <Badge variant="secondary" className="px-2 py-1">
//               248
//             </Badge>
//           </h2>

//           <div className="flex items-center gap-2">
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
//         </div>

//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-12">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
//                   />
//                 </TableHead>
//                 <TableHead className="w-12">
//                   <Star className="h-4 w-4" />
//                 </TableHead>
//                 <TableHead>
//                   <button className="flex items-center gap-1">
//                     <span>Customer</span>
//                     <ArrowUpDown className="h-3 w-3 opacity-50" />
//                   </button>
//                 </TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Location</TableHead>
//                 <TableHead className="text-right">Orders</TableHead>
//                 <TableHead>Last Order</TableHead>
//                 <TableHead className="text-right">Total Spent</TableHead>
//                 <TableHead className="text-center">Status</TableHead>
//                 <TableHead className="w-12">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {customers.map((customer) => (
//                 <TableRow
//                   key={customer.id}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
//                 >
//                   <TableCell>
//                     <input
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <button>
//                       <Star
//                         className={`h-4 w-4 ${
//                           customer.favorite
//                             ? "text-yellow-500 fill-yellow-500"
//                             : "text-gray-300 hover:text-yellow-500"
//                         }`}
//                       />
//                     </button>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <Avatar className="h-9 w-9">
//                         <AvatarImage
//                           src={customer.avatar}
//                           alt={customer.name}
//                         />
//                         <AvatarFallback>
//                           {customer.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-medium">{customer.name}</p>
//                         <p className="text-sm text-gray-500">
//                           ID: {customer.id}
//                         </p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <a
//                       href={`mailto:${customer.email}`}
//                       className="hover:underline flex items-center gap-1"
//                     >
//                       <Mail className="h-4 w-4 opacity-50" />
//                       {customer.email}
//                     </a>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-1">
//                       <MapPin className="h-4 w-4 opacity-50" />
//                       <span>{customer.location}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <Badge variant="outline" className="px-2 py-1">
//                       {customer.orders}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-1">
//                       <Receipt className="h-4 w-4 opacity-50" />
//                       <span>{customer.lastOrder}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-right font-medium">
//                     $
//                     {customer.totalSpent.toLocaleString("en-US", {
//                       minimumFractionDigits: 2,
//                     })}
//                   </TableCell>
//                   <TableCell className="text-center">
//                     <Badge
//                       className={`px-2 py-1 text-xs ${
//                         statusVariants[customer.status]
//                       }`}
//                     >
//                       {customer.status.charAt(0).toUpperCase() +
//                         customer.status.slice(1)}
//                     </Badge>
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
//                           <Eye className="mr-2 h-4 w-4" />
//                           <span>View</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                           <Edit className="mr-2 h-4 w-4" />
//                           <span>Edit</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem className="text-red-600">
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           <span>Delete</span>
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
//           <span className="font-medium">10</span> of{" "}
//           <span className="font-medium">248</span> customers
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
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Star, MoreHorizontal, ChevronDown, Filter, Plus } from "lucide-react";
// import Link from "next/link";

// const customers = [
//   {
//     id: 1,
//     name: "Patricia Semklo",
//     email: "patricia.semklo@app.com",
//     location: "🇬🇧 London, UK",
//     orders: 24,
//     lastOrder: "#123567",
//     totalSpent: "$2,890.66",
//     refunds: "-",
//     favorite: true,
//     avatar: "/images/user-40-01.jpg",
//   },
//   {
//     id: 2,
//     name: "Dominik Lamakani",
//     email: "dominik.lamakani@gmail.com",
//     location: "🇩🇪 Dortmund, DE",
//     orders: 77,
//     lastOrder: "#779912",
//     totalSpent: "$14,767.04",
//     refunds: 4,
//     favorite: false,
//     avatar: "/images/user-40-02.jpg",
//   },
//   // Add more customers as needed
// ];

// export default function CustomersPage() {
//   return (
//     <div className="space-y-6">
//       {/* Page header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//             Customers
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

//           {/* Add customer button */}
//           <Button asChild>
//             <Link href="#">
//               <Plus className="h-4 w-4 mr-2" />
//               Add Customer
//             </Link>
//           </Button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-md border bg-white dark:bg-gray-900">
//         <div className="p-4 border-b">
//           <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//             All Customers <span className="text-gray-500">248</span>
//           </h2>
//         </div>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">
//                 <input type="checkbox" className="h-4 w-4" />
//               </TableHead>
//               <TableHead className="w-[50px]">Favourite</TableHead>
//               <TableHead>Customer</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Location</TableHead>
//               <TableHead>Orders</TableHead>
//               <TableHead>Last Order</TableHead>
//               <TableHead>Total Spent</TableHead>
//               <TableHead>Refunds</TableHead>
//               <TableHead className="w-[50px]">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {customers.map((customer) => (
//               <TableRow key={customer.id}>
//                 <TableCell>
//                   <input type="checkbox" className="h-4 w-4" />
//                 </TableCell>
//                 <TableCell>
//                   <button>
//                     <Star
//                       className={`h-4 w-4 ${
//                         customer.favorite
//                           ? "text-yellow-500 fill-yellow-500"
//                           : "text-gray-400"
//                       }`}
//                     />
//                   </button>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center">
//                     <img
//                       src={customer.avatar}
//                       alt={customer.name}
//                       className="h-10 w-10 rounded-full mr-3"
//                     />
//                     <span className="font-medium">{customer.name}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>{customer.email}</TableCell>
//                 <TableCell>{customer.location}</TableCell>
//                 <TableCell>{customer.orders}</TableCell>
//                 <TableCell>{customer.lastOrder}</TableCell>
//                 <TableCell>{customer.totalSpent}</TableCell>
//                 <TableCell>{customer.refunds}</TableCell>
//                 <TableCell>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>View</DropdownMenuItem>
//                       <DropdownMenuItem>Edit</DropdownMenuItem>
//                       <DropdownMenuItem className="text-red-600">
//                         Delete
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
//       <div className="flex items-center justify-between">
//         <div className="text-sm text-gray-500">
//           Showing <span className="font-medium">1</span> to{" "}
//           <span className="font-medium">10</span> of{" "}
//           <span className="font-medium">467</span> results
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
