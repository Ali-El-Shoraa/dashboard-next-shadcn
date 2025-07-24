"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const cardFormSchema = z.object({
  type: z.enum(["physical", "virtual"], {
    required_error: "You need to select a card type.",
  }),
  name: z.string().min(2, {
    message: "Card name must be at least 2 characters.",
  }),
  lastDigits: z.string().length(4, {
    message: "Last digits must be 4 characters.",
  }),
  owner: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  expDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: "Please enter a valid expiration date (MM/YY).",
  }),
  color: z.string(),
  spentLimit: z.coerce.number().min(100, {
    message: "Spending limit must be at least $100.",
  }),
  withdrawnLimit: z.coerce.number().min(100, {
    message: "Withdrawal limit must be at least $100.",
  }),
});

type CardFormValues = z.infer<typeof cardFormSchema>;

const defaultValues: Partial<CardFormValues> = {
  type: "virtual",
  name: "",
  lastDigits: "",
  owner: "",
  expDate: "",
  color: "bg-gradient-to-r from-blue-600 to-blue-400",
  spentLimit: 1000,
  withdrawnLimit: 500,
};

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

interface AddCardFormProps {
  onSubmit: (data: Omit<CardData, "id">) => void;
}

export default function AddCardForm({ onSubmit }: AddCardFormProps) {
  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues,
  });

  const cardType = form.watch("type");
  const cardColor = form.watch("color");

  function handleSubmit(data: CardFormValues) {
    onSubmit({
      ...data,
      spent: 0,
      limit: data.spentLimit,
      status: "active",
      spentAmount: 0,
      withdrawnAmount: 0,
    });
  }

  const colorOptions = [
    {
      value: "bg-gradient-to-r from-blue-600 to-blue-400",
      label: "Blue",
      preview: "bg-blue-500",
    },
    {
      value: "bg-gradient-to-r from-purple-600 to-purple-400",
      label: "Purple",
      preview: "bg-purple-500",
    },
    {
      value: "bg-gradient-to-r from-gray-700 to-gray-900",
      label: "Black",
      preview: "bg-gray-800",
    },
    {
      value: "bg-gradient-to-r from-green-600 to-green-400",
      label: "Green",
      preview: "bg-green-500",
    },
    {
      value: "bg-gradient-to-r from-red-600 to-red-400",
      label: "Red",
      preview: "bg-red-500",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Card Preview */}
        <Card
          className={cn(
            "p-6 text-white shadow-lg transition-all",
            cardColor,
            cardType === "virtual" && "border-dashed"
          )}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="text-sm font-semibold tracking-wider">
              MASTERCARD
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="text-sm opacity-80">Card Number</div>
            <div className="flex space-x-3 font-mono text-lg tracking-wider">
              <span>••••</span>
              <span>••••</span>
              <span>••••</span>
              <span>{form.watch("lastDigits") || "••••"}</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div>
              <div className="opacity-80">Expires</div>
              <div className="font-medium">
                {form.watch("expDate") || "••/••"}
              </div>
            </div>
            <div>
              <div className="opacity-80">Type</div>
              <div className="font-medium capitalize">{form.watch("type")}</div>
            </div>
          </div>
        </Card>

        {/* Card Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Card Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="physical" />
                    </FormControl>
                    <FormLabel className="font-normal">Physical</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="virtual" />
                    </FormControl>
                    <FormLabel className="font-normal">Virtual</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Card Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Business Card" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last 4 Digits */}
        <FormField
          control={form.control}
          name="lastDigits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last 4 Digits</FormLabel>
              <FormControl>
                <Input placeholder="1234" {...field} maxLength={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Card Owner */}
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Owner</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expiration Date */}
        <FormField
          control={form.control}
          name="expDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration Date</FormLabel>
              <FormControl>
                <Input placeholder="MM/YY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Card Color */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full ${color.preview}`}
                        />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Spending Limit */}
        <FormField
          control={form.control}
          name="spentLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Spending Limit</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Withdrawal Limit */}
        <FormField
          control={form.control}
          name="withdrawnLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Withdrawal Limit</FormLabel>
              <FormControl>
                <Input type="number" placeholder="500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset(defaultValues)}
          >
            Reset
          </Button>
          <Button type="submit">Add Card</Button>
        </div>
      </form>
    </Form>
  );
}
