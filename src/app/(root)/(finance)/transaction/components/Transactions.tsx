"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TransactionTable } from "./TransactionTable";
import { AccountDropdown } from "./AccountDropdown";
import { Transaction } from "@/types/transaction";

const accounts = [
  { id: "personal", name: "My Personal Account" },
  { id: "business", name: "Business Account" },
  { id: "family", name: "Family Account" },
];

const statusFilters = ["All", "Completed", "Pending", "Canceled"];

const transactions: Transaction[] = [
  {
    id: "1",
    counterparty: "Form Builder CP",
    date: "22/01/2024",
    time: "8:56 PM",
    status: "Pending",
    amount: -1299.22,
    type: "Bank Transfer",
    image: "/images/transactions-image-01.svg",
  },
  {
    id: "2",
    counterparty: "Imperial Hotel ****",
    date: "22/01/2024",
    time: "2:45 PM",
    status: "Completed",
    amount: -1029.77,
    type: "Hotel Payment",
    image: "/images/transactions-image-02.svg",
  },
  {
    id: "3",
    counterparty: "Aprilynne Pills",
    date: "22/01/2024",
    time: "11:20 AM",
    status: "Pending",
    amount: 499.99,
    type: "Payment Received",
    image: "/images/user-36-05.jpg",
  },
  {
    id: "4",
    counterparty: "Google Limited UK",
    date: "22/01/2024",
    time: "10:15 AM",
    status: "Completed",
    amount: -1029.77,
    type: "Service Payment",
    image: "/images/transactions-image-03.svg",
  },
  {
    id: "5",
    counterparty: "Acme LTD UK",
    date: "22/01/2024",
    time: "9:30 AM",
    status: "Pending",
    amount: 2179.36,
    type: "Payment Received",
    image: "/images/transactions-image-04.svg",
  },
  {
    id: "6",
    counterparty: "Google Limited UK",
    date: "22/01/2024",
    time: "8:10 AM",
    status: "Canceled",
    amount: -1029.77,
    type: "Service Payment",
    image: "/images/transactions-image-03.svg",
  },
  {
    id: "7",
    counterparty: "Uber",
    date: "21/01/2024",
    time: "11:45 PM",
    status: "Completed",
    amount: -272.88,
    type: "Transport",
    image: "/images/transactions-image-05.svg",
  },
  {
    id: "8",
    counterparty: "PublicOne Inc.",
    date: "21/01/2024",
    time: "7:30 PM",
    status: "Completed",
    amount: -199.87,
    type: "Service Payment",
    image: "/images/transactions-image-06.svg",
  },
  {
    id: "9",
    counterparty: "Github Inc.",
    date: "21/01/2024",
    time: "4:15 PM",
    status: "Completed",
    amount: -42.87,
    type: "Subscription",
    image: "/images/transactions-image-07.svg",
  },
  {
    id: "10",
    counterparty: "Form Builder PRO",
    date: "21/01/2024",
    time: "2:00 PM",
    status: "Completed",
    amount: -112.44,
    type: "Software Purchase",
    image: "/images/transactions-image-08.svg",
  },
];

export function Transactions() {
  const [selectedAccount, setSelectedAccount] = useState("personal");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesAccount = true; // In a real app, filter by account
    const matchesStatus =
      selectedStatus === "All" || transaction.status === selectedStatus;
    const matchesSearch = transaction.counterparty
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesAccount && matchesStatus && matchesSearch;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">$47,347.09</h1>
          <div className="mt-2">
            <span>Transactions from </span>
            <AccountDropdown
              accounts={accounts}
              selectedAccount={selectedAccount}
              onSelect={setSelectedAccount}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search transactions..."
            className="w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="bg-gray-900 hover:bg-gray-800">
            Export Transactions
          </Button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionTable transactions={filteredTransactions} />

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">10</span> of{" "}
          <span className="font-medium">467</span> results
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </main>
  );
}
