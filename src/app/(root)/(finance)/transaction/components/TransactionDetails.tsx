"use client";

import { Transaction } from "@/types/transaction";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { X } from "lucide-react";

interface TransactionDetailsProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDetails({
  transaction,
  isOpen,
  onClose,
}: TransactionDetailsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
      <div className="h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {transaction.type}
            </h2>
            <p className="text-sm text-gray-500">
              {transaction.date}, {transaction.time}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Transaction Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
          <div className="mx-auto mb-4">
            <Image
              src={transaction.image}
              width={48}
              height={48}
              alt={transaction.counterparty}
              className="rounded-full mx-auto"
            />
          </div>
          <div
            className={`text-2xl font-bold mb-2 ${
              transaction.amount > 0 ? "text-green-600" : "text-gray-800"
            }`}
          >
            {transaction.amount > 0 ? "+" : ""}$
            {Math.abs(transaction.amount).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-lg font-medium mb-3">
            {transaction.counterparty}
          </div>
          <Badge
            variant={
              transaction.status === "Completed"
                ? "default"
                : transaction.status === "Pending"
                ? "secondary"
                : "destructive"
            }
          >
            {transaction.status}
          </Badge>
        </div>

        {/* Transaction Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">IBAN:</span>
              <span className="font-medium">IT17 2207 1010 0504 0006 88</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">BIC:</span>
              <span className="font-medium">BARIT22</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Reference:</span>
              <span className="font-medium">Freelance Work</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Emitter:</span>
              <span className="font-medium">{transaction.counterparty}</span>
            </div>
          </div>
        </div>

        {/* Receipts */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Receipts</h3>
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="mx-auto mb-2">
              <svg
                className="w-8 h-8 text-gray-400 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              We accept PNG, JPEG, and PDF files.
            </p>
            <Input type="file" className="hidden" id="receipt-upload" />
            <label
              htmlFor="receipt-upload"
              className="text-sm font-medium text-primary cursor-pointer"
            >
              Upload Receipt
            </label>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Notes</h3>
          <Textarea
            placeholder="Write a note about this transaction..."
            rows={4}
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1">
            Download
          </Button>
          <Button variant="outline" className="flex-1">
            Report
          </Button>
        </div>
      </div>
    </div>
  );
}
