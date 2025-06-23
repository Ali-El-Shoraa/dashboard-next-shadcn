import { Transactions } from "./components/Transactions";

export default function page() {
  return <Transactions />;
}

// "use client";

// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// // import { Transaction } from "@/types/transaction";
// import TransactionDetails from "./TransactionDetails";

// interface TransactionTableProps {
//   transactions: Transaction[];
// }

// export function TransactionTable({ transactions }: TransactionTableProps) {
//   const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false);

//   const toggleSelectAll = (checked: boolean) => {
//     if (checked) {
//       setSelectedTransactions(transactions.map(t => t.id));
//     } else {
//       setSelectedTransactions([]);
//     }
//   };

//   const toggleTransactionSelect = (id: string, checked: boolean) => {
//     if (checked) {
//       setSelectedTransactions([...selectedTransactions, id]);
//     } else {
//       setSelectedTransactions(selectedTransactions.filter(t => t !== id));
//     }
//   };

//   const handleRowClick = (transaction: Transaction) => {
//     setSelectedTransaction(transaction);
//     setIsDetailsOpen(true);
//   };

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow-sm">
//         {/* Table Actions */}
//         {selectedTransactions.length > 0 && (
//           <div className="flex items-center p-4 border-b">
//             <div className="text-sm mr-4">
//               <span className="font-medium">{selectedTransactions.length}</span> items selected
//             </div>
//             <Button variant="outline">Delete</Button>
//           </div>
//         )}

//         {/* Table */}
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">
//                 <Checkbox
//                   checked={selectedTransactions.length === transactions.length}
//                   onCheckedChange={toggleSelectAll}
//                 />
//               </TableHead>
//               <TableHead>Counterparty</TableHead>
//               <TableHead>Payment Date</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Amount</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {transactions.map((transaction) => (
//               <TableRow
//                 key={transaction.id}
//                 className="cursor-pointer hover:bg-gray-50"
//                 onClick={() => handleRowClick(transaction)}
//               >
//                 <TableCell>
//                   <Checkbox
//                     checked={selectedTransactions.includes(transaction.id)}
//                     onCheckedChange={(checked) =>
//                       toggleTransactionSelect(transaction.id, checked as boolean)
//                     }
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center">
//                     <div className="mr-3">
//                       <Image
//                         src={transaction.image}
//                         width={36}
//                         height={36}
//                         alt={transaction.counterparty}
//                         className="rounded-full"
//                       />
//                     </div>
//                     <div>{transaction.counterparty}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>{transaction.date}</TableCell>
//                 <TableCell>
//                   <Badge
//                     variant={
//                       transaction.status === "Completed" ? "default" :
//                       transaction.status === "Pending" ? "secondary" :
//                       "destructive"
//                     }
//                   >
//                     {transaction.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className={`text-right font-medium ${
//                   transaction.amount > 0 ? "text-green-600" : "text-gray-800"
//                 }`}>
//                   {transaction.amount > 0 ? "+" : ""}
//                   ${Math.abs(transaction.amount).toLocaleString("en-US", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Transaction Details Panel */}
//       {selectedTransaction && (
//         <TransactionDetails
//           transaction={selectedTransaction}
//           isOpen={isDetailsOpen}
//           onClose={() => setIsDetailsOpen(false)}
//         />
//       )}
//     </>
//   );
// }
