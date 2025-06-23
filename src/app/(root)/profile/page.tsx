import CardList from "@/components/CardList";
import { Badge } from "@/components/ui/badge";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Citrus, Shield } from "lucide-react";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EditUser from "@/components/EditUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLineChart from "@/components/chart/AppLineChart";
// import HederDirect from "@/components/HederDirect";

export default async function SingleUserPage() {
  return (
    <div>
      {/* CONTAINER */}
      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        {/* LEFT */}
        <div className="w-full xl:w-1/3 space-y-6">
          {/* USER BADGES CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h1 className="text-xl font-semibold">User Badge</h1>

            <div className="flex gap-4 mt-4">
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeCheck
                    size={36}
                    className="rounded-full bg-blue-500/30 border border-blue-500/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1>Verified User</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been Verified by the admin.
                  </p>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger>
                  <Shield
                    size={36}
                    className="rounded-full bg-green-800/30 border border-green-800/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1>Admin</h1>
                  <p className="text-sm text-muted-foreground">
                    Admin Users have access to all features and can manage
                    users.
                  </p>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger>
                  <BadgeCheck
                    size={36}
                    className="rounded-full bg-yellow-500/30 border border-yellow-500/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1>Awarded</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been awarded for their contributions.
                  </p>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger>
                  <Citrus
                    size={36}
                    className="rounded-full bg-orange-500/30 border border-orange-500/50 p-2"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1>Popular</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been Popular in the community
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* INFORMATION CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">User Information</h1>

              <Sheet>
                <SheetTrigger asChild>
                  <Button>Edit User</Button>
                </SheetTrigger>
                <EditUser />
              </Sheet>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-2 mb-8">
                <p className="text-sm text-muted-foreground">
                  Profile Completion
                </p>
                <Progress value={66} />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">Username:</span>
                <span>ali_el_shoraa</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">Email:</span>
                <span>ali@example.com</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">Phone:</span>
                <span>+2 123 456</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">Location:</span>
                <span>Cairo, Egypt</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">Role:</span>
                <Badge>Admin</Badge>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Joind on 2025.01.01
            </p>
          </div>
          {/* CARD LIST CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <CardList title="Recent Transactions" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full xl:w-2/3 space-y-6">
          {/* USER CARD CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-12">
                <AvatarImage src={`/ali-eui1.jpg`} />
                <AvatarFallback>AE</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-semibold">Ali El-Shoraa</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              consequuntur dolorem nostrum hic distinctio veritatis earum
              deserunt voluptatibus repellat aspernatur repellendus provident
              velit, culpa consequatur vitae deleniti. Mollitia, necessitatibus
              cum.
            </p>
          </div>

          {/* CHART CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h1 className="text-xl font-semibold">User Activity</h1>
            <AppLineChart />
          </div>
        </div>
      </div>
    </div>
  );
}
