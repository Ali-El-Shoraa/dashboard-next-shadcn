"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react"

interface InvoiceStatsProps {
  totalInvoices: number
  totalRevenue: number
  paidInvoices: number
  pendingInvoices: number
  overdueInvoices: number
  draftInvoices: number
  averageAmount: number
  monthlyGrowth: number
}

export function InvoiceStats({
  totalInvoices,
  totalRevenue,
  paidInvoices,
  pendingInvoices,
  overdueInvoices,
  draftInvoices,
  averageAmount,
  monthlyGrowth,
}: InvoiceStatsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalRevenue),
      icon: DollarSign,
      change: `${monthlyGrowth > 0 ? "+" : ""}${monthlyGrowth}%`,
      changeType: monthlyGrowth > 0 ? "positive" : "negative",
      description: "from last month",
      color: "blue",
    },
    {
      title: "Total Invoices",
      value: totalInvoices.toLocaleString(),
      icon: FileText,
      change: "+12%",
      changeType: "positive",
      description: "this month",
      color: "purple",
    },
    {
      title: "Paid Invoices",
      value: paidInvoices.toLocaleString(),
      icon: CheckCircle,
      change: "+8%",
      changeType: "positive",
      description: `${Math.round((paidInvoices / totalInvoices) * 100)}% of total`,
      color: "green",
    },
    {
      title: "Pending Payment",
      value: pendingInvoices.toLocaleString(),
      icon: Clock,
      change: "-3%",
      changeType: "negative",
      description: `${Math.round((pendingInvoices / totalInvoices) * 100)}% of total`,
      color: "yellow",
    },
    {
      title: "Overdue",
      value: overdueInvoices.toLocaleString(),
      icon: AlertTriangle,
      change: "+2%",
      changeType: "negative",
      description: "needs attention",
      color: "red",
    },
    {
      title: "Average Amount",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(averageAmount),
      icon: TrendingUp,
      change: "+5.2%",
      changeType: "positive",
      description: "per invoice",
      color: "indigo",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
      purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600",
      green: "bg-green-50 dark:bg-green-900/20 text-green-600",
      yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600",
      red: "bg-red-50 dark:bg-red-900/20 text-red-600",
      indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`${
                    stat.changeType === "positive"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                  }`}
                >
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
                <span className="text-xs text-gray-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Payment Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Paid ({paidInvoices})</span>
                <span>{Math.round((paidInvoices / totalInvoices) * 100)}%</span>
              </div>
              <Progress value={(paidInvoices / totalInvoices) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pending ({pendingInvoices})</span>
                <span>{Math.round((pendingInvoices / totalInvoices) * 100)}%</span>
              </div>
              <Progress value={(pendingInvoices / totalInvoices) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overdue ({overdueInvoices})</span>
                <span>{Math.round((overdueInvoices / totalInvoices) * 100)}%</span>
              </div>
              <Progress value={(overdueInvoices / totalInvoices) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Draft ({draftInvoices})</span>
                <span>{Math.round((draftInvoices / totalInvoices) * 100)}%</span>
              </div>
              <Progress value={(draftInvoices / totalInvoices) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Invoice #INV-001 paid</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <Badge variant="outline" className="text-green-600">
                  $289.66
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New invoice created</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
                <Badge variant="outline" className="text-blue-600">
                  #INV-045
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment reminder sent</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
                <Badge variant="outline" className="text-yellow-600">
                  #INV-032
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Invoice overdue</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <Badge variant="outline" className="text-red-600">
                  #INV-028
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
