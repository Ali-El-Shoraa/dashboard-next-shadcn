"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  ArrowUpDown,
  BadgeX,
  SquarePen,
  Trash2,
} from "lucide-react";

export type Payment = {
  id: number;
  amount: number;
  name: string;
  status: "active" | "inactive" | "pending" | "archived";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center"
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs text-center mx-auto`,
            status === "pending" && "bg-yellow-500/40",
            status === "active" && "bg-green-500/40",
            status === "archived" && "bg-red-500/40",
            status === "inactive" && "bg-gray-500/40"
          )}
        >
          {status as string}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      return <div className="font-medium text-center">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          {/* تحرير */}
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <SquarePen
                    size={26}
                    className="rounded-full bg-yellow-500 border border-white p-1 cursor-pointer"
                  />
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit row {data.name}</DialogTitle>
                <DialogDescription asChild>
                  <div className="">
                    <div className="relative flex items-center justify-center mb-7">
                      <svg
                        className="fill-yellow-50 dark:fill-yellow-500/15"
                        width="90"
                        height="90"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z"
                          fillOpacity="1"
                        />
                      </svg>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <AlertCircle
                          size={38}
                          className="text-yellow-600 dark:text-orange-400"
                        />
                      </div>
                    </div>
                    الآن تستطيع تعديل البيانات: <br />
                    الاسم: {data.name} <br />
                    الإيميل: {data.email} <br />
                    الحالة: {data.status} <br />
                    الكمية: {data.amount}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Trash2
                    size={26}
                    className="rounded-full bg-red-500 border border-white p-1 cursor-pointer"
                  />
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm delete?</DialogTitle>
                <DialogDescription asChild>
                  <div className="">
                    <div className="relative flex items-center justify-center mb-7">
                      <svg
                        className="fill-red-300 dark:fill-red-500/15"
                        width="90"
                        height="90"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z"
                          fillOpacity="1"
                        />
                      </svg>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <BadgeX
                          size={44}
                          className="text-red-600 dark:text-amber-700"
                        />
                      </div>
                    </div>
                    {/* <BadgeX /> */}
                    ستُحذف البيانات نهائيًا: <br />
                    ID: {data.id}, Name: {data.name}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
