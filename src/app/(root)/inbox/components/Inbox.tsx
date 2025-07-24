"use client";

import { useState, useMemo } from "react";
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
  // Info,
  // Check,
  Plus,
  Send,
  Mail,
  Search,
  Filter,
  Archive,
  AlertCircle,
  Clock,
  Tag,
  MailOpen,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 300);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

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
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
  priority?: "high" | "normal" | "low";
};

type Channel = {
  id: string;
  name: string;
  icon: string;
  unread?: number;
};

type Label = {
  id: string;
  name: string;
  color: string;
};

export default function Inbox() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [activeTab, setActiveTab] = useState("primary");
  const [activeChannel, setActiveChannel] = useState("marketing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  // const [replyContent, setReplyContent] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [composeEmail, setComposeEmail] = useState({
    to: "",
    subject: "",
    content: "",
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

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

  const labels: Label[] = [
    { id: "work", name: "Work", color: "bg-blue-500" },
    { id: "important", name: "Important", color: "bg-red-500" },
    { id: "personal", name: "Personal", color: "bg-green-500" },
    { id: "social", name: "Social", color: "bg-purple-500" },
  ];

  const emails: Email[] = useMemo(
    () => [
      {
        id: "1",
        sender: "Dominik Lamakani",
        senderAvatar: "/images/user-32-01.jpg",
        senderEmail: "dominiklama@acme.com",
        subject: "Chill your mind with this amazing offer 🎉",
        preview: "Limited time offer for our premium customers...",
        date: "4 Aug",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        label: "Exciting news",
        priority: "high",
        attachments: [
          { name: "Special_Offer.pdf", size: "2.4 MB", type: "pdf" },
          { name: "Product_Catalog.xlsx", size: "5.1 MB", type: "excel" },
        ],
      },
      {
        id: "2",
        sender: "Simona Lürwer",
        senderAvatar: "/images/user-32-05.jpg",
        subject: "🙌 Help us improve Mosaic by giving…",
        preview: "We value your feedback on our latest features...",
        date: "4 Aug",
        content:
          "We would love to get your feedback on our latest features. Please take a moment to complete our short survey.",
        priority: "normal",
      },
      {
        id: "3",
        sender: "Mary Roszczewski",
        senderAvatar: "/images/user-32-06.jpg",
        senderEmail: "mary@acme.com",
        subject: "[Urgent] Changes to links for public…",
        preview: "Important updates required for the public website...",
        date: "1 Aug",
        content:
          "We need to update all the links on the public website before the end of the day. Please review the changes and let me know if you have any questions.",
        unread: true,
        priority: "high",
      },
      {
        id: "4",
        sender: "Adrian Przetocki",
        senderAvatar: "/images/user-32-04.jpg",
        subject: "🙌 Help us improve Mosaic by giving…",
        preview: "Share your thoughts on our product improvements...",
        date: "1 Aug",
        content:
          "Your input is valuable to us. Please share your thoughts on how we can improve our product.",
        priority: "low",
      },
      {
        id: "5",
        sender: "Tisha Yanchev",
        senderAvatar: "/images/user-32-02.jpg",
        subject: "Re: Here's an extra 25% OFF 🎉",
        preview: "Exclusive discount for your next purchase...",
        date: "1 Aug",
        content:
          "Thank you for your recent purchase! As a valued customer, we're offering you an exclusive 25% discount on your next order.",
        starred: true,
        attachments: [
          { name: "Discount_Coupon.pdf", size: "1.2 MB", type: "pdf" },
        ],
      },
    ],
    []
  );

  const tabs = [
    { id: "primary", label: "Primary", icon: Mail },
    { id: "social", label: "Social", icon: Mail },
    { id: "promotions", label: "Promotions", icon: Mail },
    { id: "updates", label: "Updates", icon: Mail },
    { id: "forums", label: "Forums", icon: Mail },
  ];

  const filteredEmails = useMemo(() => {
    let result = emails;

    // Filter by tab/category
    if (activeTab === "starred") {
      result = result.filter((email) => email.starred);
    } else if (activeTab === "unread") {
      result = result.filter((email) => email.unread);
    }

    // Filter by search query
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (email) =>
          email.subject.toLowerCase().includes(query) ||
          email.sender.toLowerCase().includes(query) ||
          email.content.toLowerCase().includes(query) ||
          (email.senderEmail && email.senderEmail.toLowerCase().includes(query))
      );
    }

    return result;
  }, [emails, activeTab, debouncedSearchQuery]);

  const toggleEmailSelection = (id: string) => {
    const newSet = new Set(selectedEmails);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedEmails(newSet);
  };

  const markAsRead = (id: string) => {
    // In a real app, you would update the email's status in your state/API
    console.log(`Marking email ${id} as read`);
  };

  const starEmail = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, you would update the email's status in your state/API
    console.log(`Toggling star for email ${id}`);
  };

  // const deleteEmail = (id: string) => {
  //   // In a real app, you would remove the email from your state/API
  //   console.log(`Deleting email ${id}`);
  // };

  // const handleReply = () => {
  //   if (replyContent.trim() && selectedEmail) {
  //     // In a real app, you would send the reply
  //     console.log(`Replying to email ${selectedEmail.id}:`, replyContent);
  //     setReplyContent("");
  //   }
  // };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the email
    console.log("Sending email:", composeEmail);
    setIsComposing(false);
    setComposeEmail({ to: "", subject: "", content: "" });
  };

  return (
    <main className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-80 flex-shrink-0 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Compose Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Button className="w-full" onClick={() => setIsComposing(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </div>

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

        {/* Labels */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Collapsible defaultOpen>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800 dark:text-gray-100">
                Labels
              </span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="mt-2 space-y-1">
              {labels.map((label) => (
                <Button
                  key={label.id}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <span
                    className={`w-3 h-3 rounded-full ${label.color} mr-2`}
                  />
                  <div className="flex-1 text-left">{label.name}</div>
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search emails..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer">
              <MailOpen className="h-3 w-3 mr-1" />
              Unread
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              <Star className="h-3 w-3 mr-1" fill="currentColor" />
              Starred
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              <Paperclip className="h-3 w-3 mr-1" />
              Attachments
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              <AlertCircle className="h-3 w-3 mr-1" />
              Important
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`flex-1 rounded-none border-b-2 min-w-fit ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Email List */}
        <div className="overflow-y-auto h-[calc(100vh-380px)]">
          <div className="p-2">
            <div className="flex items-center justify-between px-2 py-1">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Inbox ({filteredEmails.length})
              </div>
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Filter className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Filter emails</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Archive className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Archive selected</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="space-y-1">
              {filteredEmails.length > 0 ? (
                filteredEmails.map((email) => (
                  <Card
                    key={email.id}
                    className={`cursor-pointer transition-all ${
                      email.unread ? "border-l-2 border-l-blue-500" : ""
                    } ${
                      selectedEmail?.id === email.id
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedEmail(email);
                      markAsRead(email.id);
                    }}
                  >
                    <div className="p-3">
                      <div className="flex items-start">
                        <div className="flex items-center mr-2">
                          <input
                            type="checkbox"
                            checked={selectedEmails.has(email.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleEmailSelection(email.id);
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
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
                            <div className="flex items-center">
                              <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                                {email.date}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-1"
                                onClick={(e) => starEmail(email.id, e)}
                              >
                                <Star
                                  className={`h-3 w-3 ${
                                    email.starred
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-400"
                                  }`}
                                />
                              </Button>
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
                          <div className="flex items-center mt-1 space-x-2">
                            {email.label && (
                              <Badge variant="outline" className="text-xs">
                                {email.label}
                              </Badge>
                            )}
                            {email.priority === "high" && (
                              <AlertCircle className="h-3 w-3 text-red-500" />
                            )}
                            {email.attachments &&
                              email.attachments.length > 0 && (
                                <Paperclip className="h-3 w-3 text-gray-400" />
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No emails found matching your search.
                </div>
              )}
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
            {selectedEmails.size > 0 ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedEmails.size} selected
                </span>
                <Button variant="ghost" size="sm">
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button variant="ghost" size="sm">
                  <Tag className="h-4 w-4 mr-1" />
                  Label
                </Button>
              </div>
            ) : (
              <div className="flex space-x-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Archive className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Archive</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <AlertCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mark as important</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MailOpen className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mark as read</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Clock className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Snooze</TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                {filteredEmails.length > 0 ? 1 : 0}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {filteredEmails.length}
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

        {/* Email Content or Compose New Email */}
        {isComposing ? (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <div className="p-6">
                  <form onSubmit={handleComposeSubmit}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">New Message</h2>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsComposing(false)}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </Button>
                      </div>
                      <div>
                        <Input
                          placeholder="To"
                          value={composeEmail.to}
                          onChange={(e) =>
                            setComposeEmail({
                              ...composeEmail,
                              to: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Subject"
                          value={composeEmail.subject}
                          onChange={(e) =>
                            setComposeEmail({
                              ...composeEmail,
                              subject: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <textarea
                          className="w-full min-h-[200px] p-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                          placeholder="Write your message here..."
                          value={composeEmail.content}
                          onChange={(e) =>
                            setComposeEmail({
                              ...composeEmail,
                              content: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button type="submit">
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </Button>
                          <Button variant="outline" type="button">
                            <Paperclip className="h-4 w-4 mr-2" />
                            Attach
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Smile className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() => setIsComposing(false)}
                        >
                          Discard
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        ) : selectedEmail ? (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {/* Email Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {selectedEmail.subject}
                  </h1>
                  {selectedEmail.label && (
                    <Badge variant="outline" className="mb-2">
                      {selectedEmail.label}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Archive className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Archive</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <MailOpen className="h-4 w-4 mr-2" />
                        Mark as unread
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="h-4 w-4 mr-2" />
                        Star
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="h-4 w-4 mr-2" />
                        Snooze
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Tag className="h-4 w-4 mr-2" />
                        Add label
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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

                      {/* Attachments */}
                      {selectedEmail.attachments &&
                        selectedEmail.attachments.length > 0 && (
                          <div className="mt-4 border-t pt-4">
                            <h4 className="text-sm font-medium mb-2">
                              Attachments ({selectedEmail.attachments.length})
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {selectedEmail.attachments.map(
                                (attachment, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                  >
                                    <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded mr-3">
                                      <Paperclip className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">
                                        {attachment.name}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {attachment.size}
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      <p className="mt-4">Cheers,</p>
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
              <Button className="mt-4" onClick={() => setIsComposing(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Compose New Email
              </Button>
            </div>
          </div>
        )}

        {/* Reply Box */}
        {selectedEmail && !isComposing && (
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
