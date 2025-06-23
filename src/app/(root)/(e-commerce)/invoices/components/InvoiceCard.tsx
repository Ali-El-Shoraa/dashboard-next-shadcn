"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Download,
  Eye,
  Edit,
  Send,
  Copy,
  Trash2,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface Invoice {
  id: string
  customer: {
    name: string
    email: string
    avatar: string
    company?: string
  }
  date: string
  dueDate: string
  amount: number
  status: "paid" | "pending" | "overdue" | "draft" | "cancelled"
  items: number
  paymentMethod?: string
  currency: string
  description?: string
  tags?: string[]
}

interface InvoiceCardProps {
  invoice: Invoice
  isSelected: boolean
  onSelect: (id: string) => void
  viewMode: "grid" | "list"
}

export function InvoiceCard({ invoice, isSelected, onSelect, viewMode }: InvoiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "paid":
        return {
          color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
          icon: CheckCircle,
          label: "Paid",
        }
      case "pending":
        return {
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
          icon: Clock,
          label: "Pending",
        }
      case "overdue":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
          icon: AlertTriangle,
          label: "Overdue",
        }
      case "draft":
        return {
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
          icon: Edit,
          label: "Draft",
        }
      case "cancelled":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
          icon: XCircle,
          label: "Cancelled",
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
          icon: Clock,
          label: "Unknown",
        }
    }
  }

  const statusConfig = getStatusConfig(invoice.status)
  const StatusIcon = statusConfig.icon

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntilDue = () => {
    const today = new Date()
    const dueDate = new Date(invoice.dueDate)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilDue = getDaysUntilDue()

  if (viewMode === "list") {
    return (
      <Card
        className={`transition-all duration-200 hover:shadow-md ${
          isSelected ? "ring-2 ring-blue-500 shadow-md" : ""
        } ${isHovered ? "scale-[1.01]" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Checkbox checked={isSelected} onCheckedChange={() => onSelect(invoice.id)} />

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={invoice.customer.avatar || "/placeholder.svg"} alt={invoice.customer.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {invoice.customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{invoice.id}</div>
                  <div className="text-sm text-gray-500">{invoice.customer.name}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="font-semibold text-lg">{formatAmount(invoice.amount, invoice.currency)}</div>
                <div className="text-sm text-gray-500">{invoice.items} items</div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">Due {formatDate(invoice.dueDate)}</div>
                {daysUntilDue < 0 && invoice.status !== "paid" && (
                  <div className="text-xs text-red-600">{Math.abs(daysUntilDue)} days overdue</div>
                )}
                {daysUntilDue >= 0 && daysUntilDue <= 7 && invoice.status !== "paid" && (
                  <div className="text-xs text-yellow-600">Due in {daysUntilDue} days</div>
                )}
              </div>

              <Badge className={statusConfig.color} variant="secondary">
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig.label}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Invoice
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send to Customer
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Invoice
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                    <Trash2 className="h-4 w-4" />
                    Delete Invoice
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-lg ${
        isSelected ? "ring-2 ring-blue-500 shadow-md" : ""
      } ${isHovered ? "scale-[1.02]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Checkbox checked={isSelected} onCheckedChange={() => onSelect(invoice.id)} className="mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{invoice.id}</h3>
              <Badge className={statusConfig.color} variant="secondary">
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig.label}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send to Customer
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Invoice
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete Invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
            <AvatarImage src={invoice.customer.avatar || "/placeholder.svg"} alt={invoice.customer.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {invoice.customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">{invoice.customer.name}</h4>
            <p className="text-sm text-gray-500">{invoice.customer.email}</p>
            {invoice.customer.company && <p className="text-xs text-gray-400">{invoice.customer.company}</p>}
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
            <span className="font-semibold text-lg">{formatAmount(invoice.amount, invoice.currency)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Items</span>
            <span className="text-sm">{invoice.items}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Created</span>
            <span className="text-sm">{formatDate(invoice.date)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Due Date</span>
            <div className="text-right">
              <span className="text-sm">{formatDate(invoice.dueDate)}</span>
              {daysUntilDue < 0 && invoice.status !== "paid" && (
                <div className="text-xs text-red-600">{Math.abs(daysUntilDue)} days overdue</div>
              )}
              {daysUntilDue >= 0 && daysUntilDue <= 7 && invoice.status !== "paid" && (
                <div className="text-xs text-yellow-600">Due in {daysUntilDue} days</div>
              )}
            </div>
          </div>
        </div>

        {invoice.tags && invoice.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {invoice.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
