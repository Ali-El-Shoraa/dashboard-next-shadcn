"use client";

import {
  BaggageClaim,
  Calendar,
  ChartLine,
  ChevronDown,
  ChevronUp,
  Home,
  Inbox,
  Projector,
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
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Separator } from "./ui/separator";

interface SidebarItem {
  header?: string;
  title?: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string | number;
  children?: Array<{
    title: string;
    href: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    badge?: string | number;
  }>;
  group?: Array<{
    title: string;
    href: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    badge?: string | number;
  }>;
}

const items: SidebarItem[] = [
  {
    header: "Dashboard",
    // title: "Dashboard",
    children: [
      {
        title: "Main",
        href: "/",
        icon: Home,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: ChartLine,
      },
    ],
  },

  {
    header: "Calendar",
    title: "Calender",
    href: "/calender",
    icon: Calendar,
  },

  {
    header: "Campaigns",
    title: "Campaigns",
    href: "/campaigns",
    icon: Inbox,
  },
  {
    header: "Cards",
    children: [
      {
        title: "Payments",
        href: "/payments",
        icon: Home,
      },
      {
        title: "Card Payment",
        href: "/card-payment",
        icon: ChartLine,
      },
    ],
  },
  {
    header: "Finance",
    children: [
      {
        title: "Card Payment",
        href: "/card-payment",
        icon: Home,
      },
      {
        title: "transaction",
        href: "/transaction",
        icon: ChartLine,
      },
    ],
  },
  {
    header: "Fintech",
    title: "Fintech",
    href: "/fintech",
    icon: Inbox,
  },
  {
    header: "Chat",
    title: "Inbox",
    href: "/inbox",
    icon: Inbox,
  },

  {
    header: "Job Board",
    title: "Search",
    href: "/job-board",
    icon: Inbox,
  },

  {
    header: "Tasks",
    children: [
      {
        title: "Task List",
        href: "/task-list",
        icon: Home,
      },
      {
        title: "Kanban",
        href: "/kanban",
        icon: ChartLine,
      },
      {
        title: "Sales",
        href: "/sales",
        icon: ChartLine,
      },
    ],
  },
  {
    header: "E-Commerce",
    title: "E-Commerce",
    icon: ShoppingBag,
    group: [
      {
        title: "Shop",
        href: "/shop",
        icon: BaggageClaim,
      },
      {
        title: "Cart",
        href: "/cart",
        icon: BaggageClaim,
      },
      {
        title: "Invoices",
        href: "/invoices",
        icon: Projector,
      },
      {
        title: "Orders",
        href: "/orders",
        icon: Projector,
      },
      {
        title: "Customers",
        href: "/customers",
        icon: User2,
      },
    ],
  },
];
export default function AppSidebar() {
  const { open } = useSidebar();
  console.log("open&&", open);
  return (
    <Sidebar collapsible="icon">
      {/* SIDEBAR HEADER */}
      <SidebarHeader className="py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Image
                  src={`/ali-eui1.jpg`}
                  alt="logo"
                  width={30}
                  height={30}
                />
                <h1 className="text-lg font-semibold">Ali El-Shoraa</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="ml-0" />
      {/* SIDEBAR CONTENT */}
      <SidebarContent>
        {items?.map((item, index) => (
          <SidebarGroup className="py-0" key={index}>
            <Collapsible
              defaultOpen={item?.group ? true : false}
              className="group/collapsible"
            >
              <SidebarGroupLabel asChild>
                {open && <h3 className="">{item?.header}</h3>}
              </SidebarGroupLabel>

              {item?.title && (
                <SidebarMenuButton asChild>
                  <Link
                    href={item?.href ?? ""}
                    onClick={(e) => {
                      if (item?.group) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <CollapsibleTrigger
                      className={
                        "flex items-center justify-between w-full cursor-pointer"
                      }
                    >
                      <div className="flex items-center gap-2 w-full">
                        {item.icon && <item.icon className={`size-4`} />}
                        <div className="flex items-center justify-between w-full">
                          {open && <span>{item?.title}</span>}
                          {item?.group && (
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </Link>
                </SidebarMenuButton>
              )}

              {item?.children &&
                item?.children.map((child, index) => (
                  <SidebarMenuButton asChild key={index}>
                    <Link href={child?.href ?? ""}>
                      <CollapsibleTrigger
                        className={
                          "flex items-center justify-between w-full cursor-pointer"
                        }
                      >
                        <div className="flex items-center gap-2 w-full">
                          {child.icon && <child.icon className={`size-4`} />}
                          <div className="flex items-center justify-between w-full">
                            {open && <span>{child?.title}</span>}
                          </div>
                        </div>
                      </CollapsibleTrigger>
                    </Link>
                  </SidebarMenuButton>
                ))}

              {item?.group && (
                <CollapsibleContent>
                  <SidebarGroupContent className="bg-white dark:bg-gray-800 rounded-xl p-2">
                    <SidebarMenu>
                      {item?.group?.map((child, childIndex) => (
                        <SidebarMenuItem key={childIndex}>
                          <SidebarMenuButton asChild>
                            <Link href={child?.href}>
                              {child?.icon && <child.icon />}
                              {open && <span>{child?.title}</span>}
                              {child?.badge && (
                                <SidebarMenuBadge>
                                  {child?.badge}
                                </SidebarMenuBadge>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              )}

              {items.length - 1 != index && <Separator className="my-2.5" />}
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* SIDEBAR FOOTER */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  <span>Settings</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-(--radix-popper-anchor-width)"
                align="end"
              >
                <DropdownMenuItem className="p-2">
                  <Link className="block" href={`/profile`}>
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
