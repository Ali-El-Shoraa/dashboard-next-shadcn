"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Star,
  Trash2,
  Info,
  Check,
  Plus,
  Send,
  Mail,
  Search,
} from "lucide-react";
import Image from "next/image";

type Email = {
  id: string;
  sender: string;
  senderAvatar: string;
  senderEmail?: string;
  subject: string;
  preview: string;
  date: string;
  content: string;
  unread?: boolean;
  starred?: boolean;
  label?: string;
};

type Channel = {
  id: string;
  name: string;
  icon: string;
  unread?: number;
};

export default function Inbox() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  // const [expandedEmails, setExpandedEmails] = useState<Set<string>>(
  //   new Set(["3"])
  // );
  const [activeTab, setActiveTab] = useState("primary");
  const [activeChannel, setActiveChannel] = useState("marketing");

  const channels: Channel[] = [
    {
      id: "marketing",
      name: "#Marketing",
      icon: "/images/channel-01.png",
      unread: 44,
    },
    { id: "developing", name: "#Developing", icon: "/images/channel-02.png" },
    {
      id: "product-support",
      name: "#ProductSupport",
      icon: "/images/channel-03.png",
    },
  ];

  const emails: Email[] = [
    {
      id: "1",
      sender: "Dominik Lamakani",
      senderAvatar: "/images/user-32-01.jpg",
      senderEmail: "dominiklama@acme.com",
      subject: "Chill your mind with this amazing offer 🎉",
      preview:
        "Lorem ipsum dolor sit amet, consecte adipiscing elit aute irure dolor…",
      date: "4 Aug",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      label: "Exciting news",
    },
    {
      id: "2",
      sender: "Simona Lürwer",
      senderAvatar: "/images/user-32-05.jpg",
      subject: "🙌 Help us improve Mosaic by giving…",
      preview:
        "Lorem ipsum dolor sit amet, consecte adipiscing elit aute irure dolor…",
      date: "4 Aug",
      content:
        "We would love to get your feedback on our latest features. Please take a moment to complete our short survey.",
    },
    {
      id: "3",
      sender: "Mary Roszczewski",
      senderAvatar: "/images/user-32-06.jpg",
      senderEmail: "mary@acme.com",
      subject: "[Urgent] Changes to links for public…",
      preview:
        "👋 Lorem ipsum dolor sit amet, consecte adipiscing elit aute irure dolor…",
      date: "1 Aug",
      content:
        "We need to update all the links on the public website before the end of the day. Please review the changes and let me know if you have any questions.",
      unread: true,
    },
    {
      id: "4",
      sender: "Adrian Przetocki",
      senderAvatar: "/images/user-32-04.jpg",
      subject: "🙌 Help us improve Mosaic by giving…",
      preview:
        "Lorem ipsum dolor sit amet, consecte adipiscing elit aute irure dolor…",
      date: "1 Aug",
      content:
        "Your input is valuable to us. Please share your thoughts on how we can improve our product.",
    },
    {
      id: "5",
      sender: "Tisha Yanchev",
      senderAvatar: "/images/user-32-02.jpg",
      subject: "Re: Here's an extra 25% OFF 🎉",
      preview:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui deserunt…",
      date: "1 Aug",
      content:
        "Thank you for your recent purchase! As a valued customer, we're offering you an exclusive 25% discount on your next order.",
      starred: true,
    },
  ];

  // const toggleEmailExpansion = (id: string) => {
  //   const newSet = new Set(expandedEmails);
  //   if (newSet.has(id)) {
  //     newSet.delete(id);
  //   } else {
  //     newSet.add(id);
  //   }
  //   setExpandedEmails(newSet);
  // };

  const tabs = [
    { id: "primary", label: "Primary" },
    { id: "social", label: "Social" },
    { id: "promotions", label: "Promotions" },
  ];

  return (
    <main className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-80 flex-shrink-0 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Channel Selection */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Collapsible defaultOpen>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/images/channel-01.png" />
                  <AvatarFallback>#</AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  #Marketing
                </span>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="mt-2 space-y-1">
              {channels.map((channel) => (
                <Button
                  key={channel.id}
                  variant={activeChannel === channel.id ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    activeChannel === channel.id
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => setActiveChannel(channel.id)}
                >
                  <Avatar className="h-7 w-7 mr-2">
                    <AvatarImage src={channel.icon} />
                    <AvatarFallback>#</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">{channel.name}</div>
                  {channel.unread && (
                    <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Email List */}
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1">
              Inbox (44)
            </div>
            <div className="space-y-1">
              {emails.map((email) => (
                <Card
                  key={email.id}
                  className={`cursor-pointer ${
                    email.unread ? "border-l-2 border-l-blue-500" : ""
                  } ${
                    selectedEmail?.id === email.id
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="p-3">
                    <div className="flex items-start">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={email.senderAvatar} />
                        <AvatarFallback>
                          {email.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-sm truncate ${
                              email.unread
                                ? "font-semibold text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {email.sender}
                          </h3>
                          <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                            {email.date}
                          </div>
                        </div>
                        <h4
                          className={`text-sm truncate ${
                            email.unread
                              ? "font-semibold text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {email.subject}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {email.preview}
                        </p>
                        {email.label && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {email.label}
                          </span>
                        )}
                      </div>
                      {email.starred && (
                        <Star
                          className="h-4 w-4 text-yellow-400 ml-2"
                          fill="currentColor"
                        />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-0" : "-ml-80"
        }`}
      >
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon">
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Star className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Check className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                10
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                467
              </span>
            </span>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Email Content */}
        {selectedEmail ? (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {/* Email Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {selectedEmail.subject}
                </h1>
                {selectedEmail.label && (
                  <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {selectedEmail.label}
                  </span>
                )}
              </div>

              {/* Email Messages */}
              <div className="space-y-6">
                {/* Original Message */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={selectedEmail.senderAvatar} />
                        <AvatarFallback>
                          {selectedEmail.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">
                              {selectedEmail.sender}
                            </h3>
                            {selectedEmail.senderEmail && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {selectedEmail.senderEmail}
                              </p>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedEmail.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="prose dark:prose-invert max-w-none text-sm text-gray-800 dark:text-gray-100">
                      <p>{selectedEmail.content}</p>
                      <p>Cheers,</p>
                      <p className="font-medium">{selectedEmail.sender}</p>
                    </div>
                  </div>
                </Card>

                {/* Reply from Acme */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/images/user-avatar-80.png" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">
                              Acme Inc.
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              acmeinc@acme.com
                            </p>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Sep 3, 3:18 PM
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="prose dark:prose-invert max-w-none text-sm text-gray-800 dark:text-gray-100">
                      <p>
                        Dominik, lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p>Cheers,</p>
                      <p className="font-medium">Acme Inc.</p>
                    </div>
                  </div>
                </Card>

                {/* Reply from User */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={selectedEmail.senderAvatar} />
                        <AvatarFallback>
                          {selectedEmail.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">
                              {selectedEmail.sender}
                            </h3>
                            {selectedEmail.senderEmail && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {selectedEmail.senderEmail}
                              </p>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Sep 4, 3:37 AM
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="prose dark:prose-invert max-w-none text-sm text-gray-800 dark:text-gray-100">
                      <p>Hey Acme 👋</p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis{" "}
                        <span className="font-bold">
                          nostrud exercitation ullamco
                        </span>{" "}
                        laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p>
                        Consectetur adipiscing elit, sed do eiusmod{" "}
                        <a
                          href="#0"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          tempor magna
                        </a>{" "}
                        aliqua? Check below:
                      </p>
                      <Image
                        width={600}
                        height={400}
                        src="/images/inbox-image.jpg"
                        alt="Sample"
                        className="my-4 rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
                      </p>
                      <p>Cheers,</p>
                      <p className="font-medium">{selectedEmail.sender}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No email selected
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select an email from the sidebar to view it here.
              </p>
            </div>
          </div>
        )}

        {/* Reply Box */}
        {selectedEmail && (
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="max-w-4xl mx-auto flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
                <Plus className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button className="ml-2 bg-gray-900 text-white">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
