export interface Transaction {
  id: string;
  counterparty: string;
  date: string;
  time: string;
  status: "Completed" | "Pending" | "Canceled";
  amount: number;
  type: string;
  image: string;
}
