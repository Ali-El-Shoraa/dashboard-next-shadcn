"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Gift,
  Sparkles,
  Cake,
  MessageCircle,
  PartyPopper,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type BirthdayPerson = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
  age?: number;
};

export default function BirthdayCard() {
  const [wishesSent, setWishesSent] = useState<Record<string, boolean>>({});
  const [customMessage, setCustomMessage] = useState("");
  const [activePerson, setActivePerson] = useState<BirthdayPerson | null>(null);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [Open, setOpen] = useState<boolean>(false);

  // Sample birthday people data with additional fields
  const birthdayPeople: BirthdayPerson[] = [
    {
      id: "1",
      name: "Liam Taylor",
      role: "JS Developer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      department: "Engineering",
      age: 28,
    },
    {
      id: "2",
      name: "Sophia Rodriguez",
      role: "Tester",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      department: "Quality Assurance",
      age: 31,
    },
    {
      id: "3",
      name: "Isabella Martinez",
      role: "UI Designer",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      department: "Design",
      age: 25,
    },
  ];

  const handleSendWishes = (person: BirthdayPerson) => {
    setActivePerson(person);
  };

  const handleSendCustomWish = () => {
    if (!activePerson) return;

    setWishesSent((prev) => ({ ...prev, [activePerson.id]: true }));
    setIsConfettiActive(true);

    toast("Wishes Sent!", {
      description: `Your birthday message to ${activePerson.name} has been delivered`,
      action: <PartyPopper className="text-yellow-500" />,
    });
    setCustomMessage("");

    setOpen(false);
    setTimeout(() => setIsConfettiActive(false), 3000);
  };

  return (
    <Card className="shadow-2xl gap-0 w-full h-full border-0 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 relative overflow-hidden transform transition-all duration-300 hover:shadow-xl">
      {/* Floating balloons */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <Cake className="absolute top-10 left-10 h-8 w-8 text-pink-300 animate-[float_6s_ease-in-out_infinite]" />
        <Cake className="absolute top-20 right-20 h-10 w-10 text-purple-300 animate-[float_7s_ease-in-out_infinite]" />
        <Cake className="absolute top-40 left-1/4 h-12 w-12 text-blue-300 animate-[float_5s_ease-in-out_infinite]" />
      </div>

      {/* Confetti effect */}
      {isConfettiActive && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                [
                  "bg-pink-400",
                  "bg-purple-400",
                  "bg-yellow-400",
                  "bg-blue-400",
                ][Math.floor(Math.random() * 4)]
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `confetti-fall ${
                  Math.random() * 3 + 2
                }s linear forwards`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 opacity-20 animate-[pulse_3s_ease-in-out_infinite]">
        <Sparkles className="h-24 w-24 text-pink-300" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-20 animate-[pulse_3s_ease-in-out_infinite]">
        <Cake className="h-24 w-24 text-purple-300" />
      </div>

      <CardHeader className="pb-3 relative">
        <CardTitle className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -top-1 -right-1">
              <div className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative rounded-full h-5 w-5 bg-pink-500 flex items-center justify-center">
                  <Gift className="h-3 w-3 text-white" />
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg animate-[wiggle_2s_ease-in-out_infinite]">
              <Cake className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Today&apos;s Celebration!
            </h2>
            <p className="text-sm text-muted-foreground">
              {birthdayPeople.length} celebrating today
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 relative h-[calc(100%-70px)]">
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full">
            {birthdayPeople.map((person) => (
              <CarouselItem key={person.id} className="h-full">
                <div className="p-4 h-full flex flex-col items-center justify-between">
                  <div className="relative mb-4 group">
                    <div className="animate-[scaleUp_0.5s_ease-out]">
                      <Avatar className="h-20 w-20 group-hover:scale-105 transition-transform duration-300 border-4 border-white shadow-lg">
                        <AvatarImage src={person.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-2xl">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg animate-[bounce_2s_ease-in-out_infinite]">
                        {person.age
                          ? `Turns ${person.age} today!`
                          : "Birthday!"}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-center w-full">
                    <h3 className="text-xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 animate-[fadeInUp_0.5s_ease-out]">
                      {person.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {person.role}
                    </p>
                  </div>

                  <div className="w-full mt-2">
                    <Dialog open={Open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <div className="hover:scale-102 active:scale-98 transition-transform">
                          <Button
                            variant={
                              wishesSent[person.id] ? "secondary" : "default"
                            }
                            size="sm"
                            className={`w-full ${
                              wishesSent[person.id]
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                            } shadow-lg transition-all duration-300`}
                            onClick={() => handleSendWishes(person)}
                          >
                            {wishesSent[person.id] ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Wishes Sent
                              </>
                            ) : (
                              <>
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Send Wishes
                              </>
                            )}
                          </Button>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                            Send wishes to {activePerson?.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="flex flex-col items-center gap-3">
                            <Avatar className="h-16 w-16 border-2 border-pink-200">
                              <AvatarImage src={activePerson?.avatar} />
                              <AvatarFallback>
                                {activePerson?.name?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                              <h4 className="font-semibold text-lg">
                                {activePerson ? activePerson.name : ""}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {activePerson
                                  ? `${activePerson.role} • ${activePerson.department}`
                                  : ""}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Personalize your message:
                            </p>
                            <Textarea
                              placeholder={`Happy birthday ${
                                activePerson?.name.split(" ")[0]
                              }!`}
                              value={customMessage}
                              onChange={(e) => setCustomMessage(e.target.value)}
                              className="min-h-[120px] text-base border-pink-200 focus:border-pink-400 focus:ring-pink-300"
                            />
                          </div>

                          <div className="hover:scale-101 active:scale-99 transition-transform">
                            <Button
                              size="lg"
                              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg"
                              onClick={handleSendCustomWish}
                            >
                              <PartyPopper className="h-5 w-5 mr-2" />
                              Send Birthday Wish
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 h-8 w-8" />
          <CarouselNext className="right-0 h-8 w-8" />
        </Carousel>
      </CardContent>

      {/* Add these styles to your global CSS */}
    </Card>
  );
}
