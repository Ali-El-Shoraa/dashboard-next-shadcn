import { SidebarTrigger } from "../ui/sidebar";

import UserMenu from "./components/UserMenu";
import Notifications from "./components/Notifications";
import DarkTheme from "./components/DarkTheme";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 z-10 bg-background">
      {/* LEFT */}
      <Button asChild variant={"secondary"} size="icon">
        <SidebarTrigger />
      </Button>
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* THEME MENU */}

        <DarkTheme />

        {/* NOTIFICATION */}
        <Notifications />

        {/* USER MENU */}
        <UserMenu />
      </div>
    </nav>
  );
}
