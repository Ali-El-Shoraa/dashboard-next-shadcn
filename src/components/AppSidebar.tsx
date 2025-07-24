"use client";

import type React from "react";

import {
  BaggageClaim,
  Calendar,
  LineChartIcon as ChartLine,
  ChevronDown,
  ChevronUp,
  Home,
  Inbox,
  Projector,
  Search,
  ShoppingBag,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string | number;
}

interface SidebarSection {
  label: string;
  items: Array<
    MenuItem & {
      children?: MenuItem[];
    }
  >;
}

const sidebarData: SidebarSection[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: Home,
        children: [
          { title: "Main", href: "/", icon: Home },
          { title: "Analytics", href: "/analytics", icon: ChartLine },
          { title: "HR", href: "/hr-dashboard", icon: ChartLine },
        ],
      },
      {
        title: "Calendar",
        href: "/calendar",
        icon: Calendar,
      },
      {
        title: "Campaigns",
        href: "/campaigns",
        icon: Inbox,
      },
    ],
  },

  {
    label: "E-Commerce",
    items: [
      {
        title: "Shop",
        href: "/shop",
        icon: ShoppingBag,
        children: [
          { title: "Dashboard", href: "/dashboard", icon: BaggageClaim },
          { title: "Products", href: "/shop", icon: BaggageClaim },
          { title: "Cart", href: "/cart", icon: BaggageClaim },
          { title: "Orders", href: "/orders", icon: Projector },
          { title: "Customers", href: "/customers", icon: User2 },
          { title: "Invoices", href: "/invoices", icon: Projector },
        ],
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        title: "Payments",
        href: "/payments",
        icon: ChartLine,
        children: [
          { title: "Card Payment", href: "/card-payment", icon: ChartLine },
          { title: "Transaction", href: "/transaction", icon: Home },
        ],
      },
      {
        title: "Fintech",
        href: "/fintech",
        icon: Inbox,
      },
    ],
  },
  {
    label: "Communication",
    items: [
      // {
      //   title: "Inbox",
      //   href: "/inbox",
      //   icon: Inbox,
      //   badge: 12,
      // },
      {
        title: "Job Board",
        href: "/job-board",
        icon: Search,
      },
    ],
  },
  {
    label: "Project Management",
    items: [
      {
        title: "Tasks",
        href: "/tasks",
        icon: Home,
        children: [
          { title: "Task List", href: "/task-list", icon: Home },
          { title: "Kanban", href: "/kanban", icon: ChartLine },
          { title: "Sales", href: "/sales", icon: ChartLine },
        ],
      },
    ],
  },
];

function SidebarNavItem({
  item,
}: {
  item: MenuItem & { children?: MenuItem[] };
}) {
  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={item.title}>
          <Link href={item.href}>
            <item.icon className="size-4" />
            <span>{item.title}</span>
            {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            <item.icon className="size-4" />
            <span>{item.title}</span>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent
          className={cn(
            "overflow-hidden",
            "data-[state=closed]:animate-collapsible-up data-[state=closed]:duration-300",
            "data-[state=open]:animate-collapsible-down data-[state=open]:duration-300"
          )}
        >
          <SidebarMenuSub>
            {item.children.map((child) => (
              <SidebarMenuSubItem key={child.href}>
                <SidebarMenuSubButton asChild>
                  <Link href={child.href}>
                    <child.icon className="size-4" />
                    <span>{child.title}</span>
                    {child.badge && (
                      <SidebarMenuBadge>{child.badge}</SidebarMenuBadge>
                    )}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src="/ali-eui1.jpg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="rounded"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Ali El-Shoraa</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <ScrollArea className="h-full">
          {sidebarData.map((section, index) => (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarNavItem key={item.href} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <User2 className="size-4" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Settings</span>
                    <span className="truncate text-xs">Manage account</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User2 className="mr-2 size-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="mr-2 size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="mr-2 size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
