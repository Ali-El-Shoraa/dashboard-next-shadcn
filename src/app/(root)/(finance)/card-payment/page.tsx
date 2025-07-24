// app/(root)/(finance)/card-payment/page.tsx

import AddCardForm from "./components/AddCardForm";

// import AddCardForm from './AddCardForm';

interface CardData {
  type: "physical" | "virtual";
  name: string;
  lastDigits: string;
  owner: string;
  expDate: string;
  color: string;
  spentLimit: number;
  withdrawnLimit: number;
  spent?: number;
  limit?: number;
  status?: string;
  spentAmount?: number;
  withdrawnAmount?: number;
}

export default function CardPaymentPage() {
  // دالة المعالجة
  const handleSubmit = (data: Omit<CardData, "id">) => {
    console.log("Received card data:", data);
    // افعل أي شيء هنا مثل حفظ البيانات أو استدعاء API
  };

  return <AddCardForm onSubmit={handleSubmit} />;
}
