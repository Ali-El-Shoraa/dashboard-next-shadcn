import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/utils/formatCurrency";
import { CreditCard } from "lucide-react";
import CardItem from "./components/CardItem";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export default async function CartPage() {
  const res = await fetch(`${process.env.API_BASE_URL}/data/cartItems.json`);
  const cartItems = await res.json();

  console.log("Cart Items:", cartItems);
  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price,
    0
  );

  const tax = subtotal * 0.2;
  const total = subtotal + tax;

  return (
    <main className="py-8 content">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="lg:w-2/3">
          {/* Cart header */}
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Shopping Cart ({cartItems.length})
            </h1>
          </header>

          {/* Cart items list */}
          <div className="space-y-6">
            {cartItems.map((item: CartItem) => (
              <CardItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Order summary and payment */}
        <div className="lg:w-1/3">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Review & Pay
            </h2>

            {/* Order summary */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Order Summary
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between py-2 border-b">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(total, "currency")}
                  </span>
                </li>
                <li className="flex justify-between py-2 border-b">
                  <span>Tax (20%)</span>
                  <span className="font-medium">
                    ${formatCurrency(tax, "currency")}
                  </span>
                </li>
                <li className="flex justify-between py-2 font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total, "currency")}</span>
                </li>
              </ul>
            </div>

            {/* Payment details */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                Payment Details
              </h3>

              <div className="space-y-4">
                {/* Card number */}
                <div>
                  <Label htmlFor="card-number">Card Number *</Label>
                  <Input
                    id="card-number"
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className="mt-1"
                  />
                </div>

                {/* Expiry and CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="card-expiry">Expiry Date *</Label>
                    <Input
                      id="card-expiry"
                      type="text"
                      placeholder="MM/YY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-cvc">CVC *</Label>
                    <Input
                      id="card-cvc"
                      type="text"
                      placeholder="CVC"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Name on card */}
                <div>
                  <Label htmlFor="card-name">Name on Card *</Label>
                  <Input
                    id="card-name"
                    type="text"
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Additional details */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                Additional Details
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    className="mt-1"
                  />
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">Italy</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Pay button */}
            <Button className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Pay {formatCurrency(total, "currency")}
            </Button>

            <p className="text-sm text-gray-500 mt-2 text-center">
              You will be charged {formatCurrency(total, "currency")}, including{" "}
              {formatCurrency(tax, "currency")} for VAT in Italy
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
