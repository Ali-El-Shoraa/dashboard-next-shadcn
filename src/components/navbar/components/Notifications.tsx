"use client";
import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Notification {
  id: number;
  name: string;
  message: string;
  time: string;
  avatarSrc: string;
  status: "success" | "error" | "offline";
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      name: "Terry Franci",
      message: "requests permission to change Project – Nganter App",
      time: "5 min ago",
      avatarSrc: "/images/user/user-02.jpg",
      status: "success",
    },
    {
      id: 2,
      name: "Alena Franci",
      message: "requests permission to change Project – Nganter App",
      time: "8 min ago",
      avatarSrc: "/images/user/user-03.jpg",
      status: "success",
    },
    {
      id: 3,
      name: "Jocelyn Kenter",
      message: "requests permission to change Project – Nganter App",
      time: "15 min ago",
      avatarSrc: "/images/user/user-04.jpg",
      status: "success",
    },
    {
      id: 4,
      name: "Brandon Philips",
      message: "requests permission to change Project – Nganter App",
      time: "1 hr ago",
      avatarSrc: "/images/user/user-05.jpg",
      status: "error",
    },

    {
      id: 5,
      name: "Brandon Philips",
      message: "requests permission to change Project – Nganter App",
      time: "1 hr ago",
      avatarSrc: "/images/user/user-05.jpg",
      status: "error",
    },

    {
      id: 6,
      name: "Brandon Philips",
      message: "requests permission to change Project – Nganter App",
      time: "1 hr ago",
      avatarSrc: "/images/user/user-05.jpg",
      status: "error",
    },

    {
      id: 7,
      name: "Brandon Philips",
      message: "requests permission to change Project – Nganter App",
      time: "1 hr ago",
      avatarSrc: "/images/user/user-05.jpg",
      status: "error",
    },

    {
      id: 8,
      name: "Brandon Philips",
      message: "requests permission to change Project – Nganter App",
      time: "1 hr ago",
      avatarSrc: "/images/user/user-05.jpg",
      status: "error",
    },
  ]);

  const removeAll = () => setNotifications([]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Bell />
          <span className="sr-only">Open notifications</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="absolute right-0 mt-2 w-[350px] rounded-2xl border bg-white p-0 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Notifications
          </h5>
        </div>

        {/* List */}
        <div>
          <ScrollArea className="max-h-[340px] overflow-y-auto">
            <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
              {notifications.length === 0 && (
                <li className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </li>
              )}
              {notifications.map((n) => (
                <li key={n.id}>
                  <DropdownMenuItem
                    asChild
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <button className="flex items-start gap-3 w-full text-left">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={n.avatarSrc} alt={n.name} />
                          <AvatarFallback>{n.name[0]}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`
                          absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border border-white
                          ${
                            n.status === "success"
                              ? "bg-green-500"
                              : n.status === "error"
                              ? "bg-red-500"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          <span className="font-medium">{n.name}</span>{" "}
                          {n.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {n.time}
                        </p>
                      </div>
                    </button>
                  </DropdownMenuItem>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="px-2 py-2 border-t dark:border-gray-700 flex gap-4">
          <Link
            href="/notifications"
            // block w-full
            className="rounded-lg bg-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            View All Notifications
          </Link>

          <Button
            variant="destructive"
            // size="icon"
            onClick={removeAll}
            className="cursor-pointer"
          >
            <span className="sr-only">Clear all</span>
            Clear all
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
