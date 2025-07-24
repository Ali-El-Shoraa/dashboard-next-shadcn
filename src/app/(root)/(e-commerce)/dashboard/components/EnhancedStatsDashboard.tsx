"use client";

import HeaderDashboard from "./HeaderDashboard";
import StatsCards from "./StatsCards";
import TopCustomers from "./TopCustomers";
import OrdersChart from "./OrdersChart";
import TotalEarnings from "./TotalEarnings";
import RecentTransactions from "./RecentTransactions";
import MonthlyProfits from "./MonthlyProfits";
import RecentOrders from "./RecentOrders";
import PaymentGatewayCard from "./PaymentGatewayCard";
import WebsiteTrafficCard from "./WebsiteTraffic";
import OrderOverview from "./OrderOverview";
import StockReport from "./StockReport";

export default function EnhancedStatsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <HeaderDashboard />
      {/* Stats Cards */}
      <StatsCards />

      {/* Unified Chart Card */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <TotalEarnings />
        <TopCustomers />
        <OrdersChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <RecentTransactions />
        </div>

        <div className="md:col-span-1">
          <MonthlyProfits />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <PaymentGatewayCard />
        <WebsiteTrafficCard />
        <RecentOrders />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="md:col-span-2">
          <OrderOverview />
        </div>

        <div className="md:col-span-2">
          <StockReport />
        </div>
      </div>
    </div>
  );
}
