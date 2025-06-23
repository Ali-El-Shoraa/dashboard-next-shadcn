import AppAreaChart from "@/components/chart/AppAreaChart";
import AppBarChart from "@/components/chart/AppBarChart";
import AppPieChart from "@/components/chart/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2 border">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg border">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg border">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg border">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2 border">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg border">
        <CardList title="Popular Content" />
      </div>
    </div>
  );
}
