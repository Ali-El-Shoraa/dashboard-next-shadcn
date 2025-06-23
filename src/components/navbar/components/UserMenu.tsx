import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/111380218?v=4" />
          <AvatarFallback>AE</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="h-[1.2rem] w-[1.2rem] mr-2" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
