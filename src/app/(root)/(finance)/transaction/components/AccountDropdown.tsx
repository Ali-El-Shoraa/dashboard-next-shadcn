"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountDropdownProps {
  accounts: { id: string; name: string }[];
  selectedAccount: string;
  onSelect: (account: string) => void;
}

export function AccountDropdown({
  accounts,
  selectedAccount,
  onSelect,
}: AccountDropdownProps) {
  const selected = accounts.find((account) => account.id === selectedAccount);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-violet-600 hover:text-violet-700"
        >
          {selected?.name}
          <ChevronDown className="ml-2 h-4 w-4 text-violet-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {accounts.map((account) => (
          <DropdownMenuItem
            key={account.id}
            onClick={() => onSelect(account.id)}
          >
            {account.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
