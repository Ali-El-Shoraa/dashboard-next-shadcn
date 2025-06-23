import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  //  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
// import React from "react";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function FintechDashboard() {
  return (
    <main className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Fintech
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Calendar
              mode="range"
              className="rounded-md border"
              selected={{
                from: new Date(2025, 5, 14),
                to: new Date(2025, 5, 20),
              }}
            />
          </div>

          <Button className="bg-gray-900 text-white">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Balance Card */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="text-lg">
              Hey Mary 👋, this is your current balance:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/images/user-64-14.jpg" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-3xl font-bold">$47,347.09</div>
                </div>
              </div>

              <div className="flex space-x-2">
                {[
                  "/images/company-icon-06.svg",
                  "/images/company-icon-02.svg",
                  "/images/company-icon-03.svg",
                ].map((src, i) => (
                  <Avatar key={i}>
                    <AvatarImage src={src} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                ))}

                <Button variant="outline" size="icon" className="rounded-full">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Returns */}
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-bold">244.7%</div>
              <div className="text-sm text-gray-500">
                <span className="text-gray-800 dark:text-gray-100 font-medium">
                  17.4%
                </span>{" "}
                AVG
              </div>
            </div>
            {/* Chart would go here */}
            <div className="h-80 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
          </CardContent>
        </Card>

        {/* Active Card */}
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle>Active Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-violet-600 text-white p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start mb-6">
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="text-sm">•••• •••• •••• 7328</div>
              </div>

              <div className="flex justify-between items-end">
                <div className="text-sm">
                  <div>EXP 12/24</div>
                  <div>CVC ***</div>
                </div>
                <div className="w-12 h-8 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Payment Limits</span>
                  <span>$780.00 / $1,500.00</span>
                </div>
                <Progress value={52} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>ATM Limits</span>
                  <span>$179.00 / $1,000.00</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cash Flow */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-bold">$1,347.09</div>
              <div className="text-sm text-gray-500">Net</div>
            </div>
            {/* Chart would go here */}
            <div className="h-80 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Counterparty</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Form Builder CP",
                    account: "Revolut",
                    date: "22/01/2024",
                    amount: "-$1,299.22",
                    icon: "text-blue-500",
                  },
                  {
                    name: "PublicOne Inc.",
                    account: "Qonto",
                    date: "22/01/2024",
                    amount: "-$272.88",
                    icon: "text-gray-900",
                  },
                  {
                    name: "Imperial Hotel ****",
                    account: "Revolut",
                    date: "22/01/2024",
                    amount: "-$999.44",
                    icon: "text-green-500",
                  },
                  {
                    name: "Uber",
                    account: "N26",
                    date: "22/01/2024",
                    amount: "-$1,029.77",
                    icon: "text-yellow-500",
                  },
                  {
                    name: "Google Limited UK",
                    account: "N26",
                    date: "22/01/2024",
                    amount: "-$1,921.26",
                    icon: "text-red-500",
                  },
                ].map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${item.icon}`}
                        >
                          <Avatar className="w-6 h-6">
                            <AvatarFallback>
                              {item.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell>{item.account}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="text-right font-medium text-red-500">
                      {item.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Earnings */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Recent Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Counterparty</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Acme LTD UK",
                    account: "Revolut",
                    date: "22/01/2024",
                    amount: "+$1,299.22",
                    icon: "text-purple-500",
                  },
                  {
                    name: "Web.com",
                    account: "Qonto",
                    date: "22/01/2024",
                    amount: "+$1,200.88",
                    icon: "text-blue-500",
                  },
                  {
                    name: "Github Inc.",
                    account: "N26",
                    date: "22/01/2024",
                    amount: "+$499.99",
                    icon: "text-gray-500",
                  },
                  {
                    name: "Aprilynne Pills",
                    account: "Revolut",
                    date: "22/01/2024",
                    amount: "+$2,179.36",
                    icon: "text-pink-500",
                  },
                  {
                    name: "Form Builder PRO",
                    account: "Revolut",
                    date: "22/01/2024",
                    amount: "+$249.88",
                    icon: "text-indigo-500",
                  },
                ].map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${item.icon}`}
                        >
                          <Avatar className="w-6 h-6">
                            <AvatarFallback>
                              {item.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell>{item.account}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="text-right font-medium text-green-500">
                      {item.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
