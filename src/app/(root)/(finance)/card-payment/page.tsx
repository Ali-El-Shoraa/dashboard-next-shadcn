import { Button } from "@/components/ui/button";
import { CardList } from "./components/card-list";
import { CardDetails } from "./components/card-details";

type Card = {
  id: string;
  type: "physical" | "virtual";
  name: string;
  lastDigits: string;
  owner: string;
  spent: number;
  limit: number;
  status: "active" | "blocked";
  color: string;
  expDate: string;
  spentAmount: number;
  spentLimit: number;
  withdrawnAmount: number;
  withdrawnLimit: number;
};

export default function CardsPage() {
  const cards: Card[] = [
    {
      id: "card1",
      type: "physical",
      name: "Metal",
      lastDigits: "7328",
      owner: "Dominik Lamakani",
      spent: 780,
      limit: 20000,
      status: "active",
      color: "bg-gradient-to-r from-gray-700 to-gray-900",
      expDate: "12/24",
      spentAmount: 780,
      spentLimit: 1500,
      withdrawnAmount: 100,
      withdrawnLimit: 1500,
    },
    {
      id: "card2",
      type: "virtual",
      name: "Virtual",
      lastDigits: "7377",
      owner: "Dominik Lamakani",
      spent: 0,
      limit: 20000,
      status: "blocked",
      color: "bg-gradient-to-r from-purple-800 to-indigo-200",
      expDate: "10/25",
      spentAmount: 0,
      spentLimit: 20000,
      withdrawnAmount: 0,
      withdrawnLimit: 20000,
    },
  ];

  const selectedCard = cards[0]; // In a real app, this would come from state

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Cards
            </h1>
            <Button>Add Card</Button>
          </div>

          {/* Card List */}
          <CardList />
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          <CardDetails card={selectedCard} />
        </div>
      </div>
    </div>
  );
}
