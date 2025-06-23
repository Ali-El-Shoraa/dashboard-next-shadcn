"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  date: string;
  status: "featured" | "new" | null;
  bookmarked: boolean;
  companyLogo: string;
}

const jobTypes = [
  { id: "programming", label: "Programming", checked: true },
  { id: "design", label: "Design", checked: false },
  { id: "management", label: "Management / Finance", checked: false },
  { id: "support", label: "Customer Support", checked: false },
  { id: "marketing", label: "Sales / Marketing", checked: false },
];

const salaryRanges = [
  { id: "20k-50k", label: "$20K - $50K", checked: true },
  { id: "50k-100k", label: "$50K - $100K", checked: false },
  { id: "100k+", label: "> $100K", checked: false },
  { id: "drawing", label: "Drawing / Painting", checked: false },
];

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Senior Web App Designer",
    company: "TechCorp",
    type: "Contract / Remote",
    location: "New York, NYC",
    date: "Jan 4",
    status: "featured",
    bookmarked: true,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "2",
    title: "Senior Full Stack Engineer",
    company: "DevStudio",
    type: "Contract / Remote",
    location: "New York, NYC",
    date: "Jan 7",
    status: "new",
    bookmarked: false,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "3",
    title: "Ruby on Rails Engineer",
    company: "StartupXYZ",
    type: "Contract / Remote",
    location: "New York, NYC",
    date: "Jan 7",
    status: "new",
    bookmarked: true,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "4",
    title: "Senior Software Engineer Backend",
    company: "CloudTech",
    type: "Full-time / Remote",
    location: "Anywhere",
    date: "Jan 7",
    status: "new",
    bookmarked: true,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "5",
    title: "React.js Software Developer",
    company: "WebFlow",
    type: "Full-time / Remote",
    location: "London, UK",
    date: "Jan 6",
    status: "new",
    bookmarked: false,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "6",
    title: "Senior Full Stack Rails Developer",
    company: "DataCorp",
    type: "Part-time / Remote",
    location: "Milan, IT",
    date: "Jan 6",
    status: "new",
    bookmarked: true,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "7",
    title: "Principal Software Engineer",
    company: "InnovateLab",
    type: "Freelance / Remote",
    location: "London, UK",
    date: "Jan 6",
    status: "new",
    bookmarked: true,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "8",
    title: "Contract React Native Engineer",
    company: "MobileTech",
    type: "Contract / Remote",
    location: "Miami, FL",
    date: "Jan 6",
    status: "new",
    bookmarked: true,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "9",
    title: "Senior Client Engineer (React & React Native)",
    company: "AppStudio",
    type: "Full-time / Remote",
    location: "Lincoln, NE",
    date: "Jan 5",
    status: "new",
    bookmarked: true,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
  {
    id: "10",
    title: "QA Automation Engineer",
    company: "QualityFirst",
    type: "Contract / Remote",
    location: "Anywhere",
    date: "Jan 5",
    status: "new",
    bookmarked: true,
    companyLogo: "/placeholder.svg?height=36&width=36",
  },
];

export default function JobSearchBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [companyCulture, setCompanyCulture] = useState(true);
  const [immigration, setImmigration] = useState(false);
  const [jobs, setJobs] = useState(sampleJobs);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleBookmark = (jobId: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, bookmarked: !job.bookmarked } : job
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Search For Jobs
          </h1>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            Post A Job
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Alert */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-11 h-10 bg-gradient-to-b from-violet-400 to-purple-500 rounded transform rotate-12 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white/20 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    Remember to keep track of your job research.
                  </p>
                  <a
                    href="#"
                    className="text-sm text-violet-500 hover:text-violet-600 font-medium"
                  >
                    Create Alert →
                  </a>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
              {/* Job Types */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Job Types
                </h3>
                <div className="space-y-3">
                  {jobTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox id={type.id} defaultChecked={type.checked} />
                      <label
                        htmlFor={type.id}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Culture */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Company Culture
                </h3>
                <div className="flex items-center justify-between">
                  <Switch
                    checked={companyCulture}
                    onCheckedChange={setCompanyCulture}
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {companyCulture ? "On" : "Off"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Only show companies that are creating a positive culture
                </p>
              </div>

              {/* Salary Range */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Salary Range
                </h3>
                <div className="space-y-3">
                  {salaryRanges.map((range) => (
                    <div key={range.id} className="flex items-center space-x-2">
                      <Checkbox id={range.id} defaultChecked={range.checked} />
                      <label
                        htmlFor={range.id}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Immigration */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Immigration
                </h3>
                <div className="flex items-center justify-between">
                  <Switch
                    checked={immigration}
                    onCheckedChange={setImmigration}
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {immigration ? "On" : "Off"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Only show companies that can sponsor a visa
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search Form */}
            <div className="relative">
              <Input
                type="search"
                placeholder="Search job title or keyword…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1 bottom-1 px-3 bg-gray-100 hover:bg-gray-200 text-gray-600"
                variant="ghost"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Jobs Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing 289 Jobs
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Sort by
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-medium text-violet-500 hover:text-violet-600"
                    >
                      {sortBy}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("Newest")}>
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Oldest")}>
                      Oldest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Featured")}>
                      Featured
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Job List */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                      <Image
                        width={36}
                        height={36}
                        src={job.companyLogo || "/placeholder.svg"}
                        alt={job.company}
                        className="w-9 h-9 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 hover:text-violet-600 cursor-pointer">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {job.type} / {job.location}
                        </p>
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {job.date}
                      </span>
                      {job.status && (
                        <Badge
                          variant={
                            job.status === "featured" ? "default" : "secondary"
                          }
                          className={
                            job.status === "featured"
                              ? "bg-violet-100 text-violet-700 hover:bg-violet-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }
                        >
                          {job.status === "featured" ? "Featured" : "New"}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(job.id)}
                        className={`p-2 ${
                          job.bookmarked
                            ? "text-violet-600 hover:text-violet-700"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            job.bookmarked ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-8">
              <nav className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-violet-600 hover:bg-violet-700 text-white"
                          : "hover:bg-gray-50"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                  <span className="px-2 text-gray-500">…</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(9)}
                    className="hover:bg-gray-50"
                  >
                    9
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 9}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="flex items-center gap-1 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
