import { ChartBarStacked } from "@/components/chart/chart-bar-stacked";
import ActiveUsersRightNow from "./ActiveUsersRightNow";
import AverageDailySalesCard from "./AverageDailySalesCard";
import CompletionRate from "./CompletionRate";
import EarningReportsCard from "./EarningReportsCard";
import HeaderSection from "./HeaderSection";
import LinechartAnalytics from "./LinechartAnalytics";
import MonthlyCampaignStateCard from "./MonthlyCampaignStateCard";
import SalesbyCountriesCard from "./SalesbyCountriesCard";
import SalesOverviewCard from "./SalesOverviewCard";
import WebsiteAnalyticsCard from "./WebsiteAnalyticsCard";
import { ChartBarLabelCustom } from "@/components/chart/chart-bar-label-custom";
import TopChannels from "./TopChannels";
import TopPages from "./TopPages";
import TopCountries from "./TopCountries";
import TopProductsTable from "./TopProductsTable";
import TodoList from "./TodoList";

export default function IndexPage() {
  return (
    <div className="space-y-6">
      {/* Header Section - Fixed Height */}
      <div className="">
        <HeaderSection />
      </div>

      {/* Main Grid Layout with Consistent Card Heights */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Row 1 - Top Cards */}
        <div className="lg:col-span-4 h-52">
          <WebsiteAnalyticsCard />
        </div>
        <div className="lg:col-span-4 h-52">
          <AverageDailySalesCard />
        </div>
        <div className="lg:col-span-4 h-52">
          <SalesOverviewCard />
        </div>

        {/* Row 2 - Middle Cards */}
        <div className="lg:col-span-8">
          <EarningReportsCard />
        </div>
        <div className="lg:col-span-4">
          <CompletionRate />
        </div>

        {/* Row 3 - Bottom Cards */}
        <div className="lg:col-span-4 h-full">
          <SalesbyCountriesCard />
        </div>
        <div className="lg:col-span-4 h-full">
          <MonthlyCampaignStateCard />
        </div>

        <div className="lg:col-span-4 h-full">
          <TodoList />
        </div>
      </div>

      {/* Charts Section with Equal Height */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="min-h-[400px]">
          <LinechartAnalytics />
        </div>
        <div className="min-h-[400px]">
          <ActiveUsersRightNow />
        </div>
      </div>

      {/* Stacked Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-h-[350px]">
          <ChartBarStacked />
        </div>
        <div className="min-h-[350px]">
          <ChartBarLabelCustom />
        </div>
      </div>

      {/* Top Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="min-h-[300px]">
          <TopChannels />
        </div>
        <div className="min-h-[300px]">
          <TopPages />
        </div>
        <div className="min-h-[300px]">
          <TopCountries />
        </div>
      </div>

      {/* Table Section */}
      <div className="min-h-[400px]">
        <TopProductsTable />
      </div>
    </div>
  );
}
