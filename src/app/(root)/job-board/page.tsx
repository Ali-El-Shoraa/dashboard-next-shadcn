"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Globe,
  Star,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

// Types
type JobStatus = "featured" | "new" | "popular" | null;
type JobType = "Full-time" | "Part-time" | "Contract" | "Freelance";

interface Job {
  id: string;
  title: string;
  company: string;
  type: JobType;
  location: string;
  date: string;
  status: JobStatus;
  bookmarked: boolean;
  companyLogo: string;
  salary: string;
  description: string;
  skills: string[];
  experience?: string;
  applicants?: number;
  benefits?: string[];
}

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  checked: boolean;
}

// Sample data
const jobTypes: FilterOption[] = [
  {
    id: "Full-time",
    label: "Full-time",
    icon: <Briefcase className="h-4 w-4 mr-2" />,
    checked: true,
  },
  {
    id: "Part-time",
    label: "Part-time",
    icon: <Clock className="h-4 w-4 mr-2" />,
    checked: false,
  },
  {
    id: "Contract",
    label: "Contract",
    icon: <DollarSign className="h-4 w-4 mr-2" />,
    checked: false,
  },
  {
    id: "Freelance",
    label: "Freelance",
    icon: <Globe className="h-4 w-4 mr-2" />,
    checked: false,
  },
];

const salaryRanges: FilterOption[] = [
  { id: "20k-50k", label: "$20K - $50K", checked: true },
  { id: "50k-100k", label: "$50K - $100K", checked: false },
  { id: "100k+", label: "> $100K", checked: false },
];

const experienceLevels: FilterOption[] = [
  { id: "intern", label: "Internship", checked: false },
  { id: "entry", label: "Entry Level", checked: true },
  { id: "mid", label: "Mid Level", checked: true },
  { id: "senior", label: "Senior", checked: false },
  { id: "lead", label: "Lead", checked: false },
];

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Senior Web App Designer",
    company: "TechCorp",
    type: "Contract",
    location: "New York, NYC",
    date: "Jan 4",
    status: "featured",
    bookmarked: true,
    companyLogo: "https://picsum.photos/seed/techcorp/300/300",
    salary: "$80K - $120K",
    description:
      "We're looking for a talented web designer to join our team and help create beautiful user experiences for our clients.",
    skills: ["UI/UX", "Figma", "Adobe XD", "HTML/CSS"],
  },
  {
    id: "2",
    title: "Senior Full Stack Engineer",
    company: "DevStudio",
    type: "Full-time",
    location: "Remote",
    date: "Jan 7",
    status: "popular",
    bookmarked: false,
    companyLogo: "https://picsum.photos/seed/devstudio/300/300",
    salary: "$100K - $150K",
    description:
      "Join our engineering team to build scalable web applications using modern technologies.",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    id: "3",
    title: "Ruby on Rails Engineer",
    company: "StartupXYZ",
    type: "Contract",
    location: "San Francisco, CA",
    date: "Jan 7",
    status: "new",
    bookmarked: true,
    companyLogo: "https://picsum.photos/seed/startupxyz/300/300",
    salary: "$90K - $130K",
    description:
      "Help us build the next generation of our SaaS platform with Ruby on Rails.",
    skills: ["Ruby", "Rails", "PostgreSQL", "RSpec"],
  },
  {
    id: "4",
    title: "Senior Software Engineer Backend",
    company: "CloudTech",
    type: "Full-time",
    location: "Remote",
    date: "Jan 7",
    status: "new",
    bookmarked: true,
    companyLogo: "https://picsum.photos/seed/cloudtech/300/300",
    salary: "$110K - $160K",
    description:
      "Design and implement scalable backend services for our cloud platform.",
    skills: ["Java", "Spring", "Kubernetes", "Microservices"],
  },
  {
    id: "5",
    title: "React.js Software Developer",
    company: "WebFlow",
    type: "Full-time",
    location: "London, UK",
    date: "Jan 6",
    status: "new",
    bookmarked: false,
    companyLogo: "https://picsum.photos/seed/webflow/300/300",
    salary: "$70K - $100K",
    description:
      "Build interactive user interfaces with React for our client applications.",
    skills: ["React", "Redux", "JavaScript", "CSS"],
  },
  {
    id: "6",
    title: "Senior Full Stack Rails Developer",
    company: "DataCorp",
    type: "Part-time",
    location: "Remote",
    date: "Jan 6",
    status: "new",
    bookmarked: true,
    companyLogo: "https://picsum.photos/seed/datacorp/300/300",
    salary: "$60K - $90K",
    description:
      "Work on both frontend and backend components of our data visualization platform.",
    skills: ["Ruby on Rails", "JavaScript", "D3.js", "PostgreSQL"],
  },
  {
    id: "7",
    title: "Principal Software Engineer",
    company: "InnovateLab",
    type: "Freelance",
    location: "Remote",
    date: "Jan 6",
    status: "popular",
    bookmarked: true,
    companyLogo: "https://picsum.photos/seed/innovatelab/300/300",
    salary: "$130K - $180K",
    description:
      "Lead technical architecture decisions and mentor junior engineers on our team.",
    skills: ["System Design", "Architecture", "Mentoring", "Python"],
  },
  {
    id: "8",
    title: "Contract React Native Engineer",
    company: "MobileTech",
    type: "Contract",
    location: "Miami, FL",
    date: "Jan 6",
    status: "new",
    bookmarked: true,
    companyLogo: "https://picsum.photos/seed/mobiletech/300/300",
    salary: "$80 - $100/hr",
    description: "Help us build cross-platform mobile apps with React Native.",
    skills: ["React Native", "TypeScript", "Mobile Development", "iOS/Android"],
  },
  {
    id: "9",
    title: "Senior Client Engineer (React & React Native)",
    company: "AppStudio",
    type: "Full-time",
    location: "Remote",
    date: "Jan 5",
    status: "new",
    bookmarked: true,
    companyLogo: "https://picsum.photos/seed/appstudio/300/300",
    salary: "$95K - $140K",
    description:
      "Develop both web and mobile applications using React technologies.",
    skills: ["React", "React Native", "GraphQL", "Jest"],
  },
  {
    id: "10",
    title: "QA Automation Engineer",
    company: "QualityFirst",
    type: "Contract",
    location: "Remote",
    date: "Jan 5",
    status: "new",
    bookmarked: true,
    companyLogo: "https://picsum.photos/seed/qualityfirst/300/300",
    salary: "$70K - $95K",
    description:
      "Implement automated testing solutions for our software products.",
    skills: ["Selenium", "Cypress", "Test Automation", "JavaScript"],
  },
];

export default function JobSearchBoard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest" | "Featured">(
    "Newest"
  );
  const [filters, setFilters] = useState({
    remoteOnly: false,
    companyCulture: false,
    immigration: false,
    jobTypes: jobTypes,
    salaryRanges: salaryRanges,
    experienceLevels: experienceLevels,
  });
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Toggle bookmark
  const toggleBookmark = (jobId: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, bookmarked: !job.bookmarked } : job
      )
    );
  };

  // Toggle filter option
  const toggleFilter = (filterType: keyof typeof filters, optionId: string) => {
    setFilters((prev) => {
      const filterValue = prev[filterType];
      if (Array.isArray(filterValue)) {
        // Special case for "clear-all" option
        if (optionId === "clear-all") {
          return {
            ...prev,
            [filterType]: filterValue.map((option) => ({
              ...option,
              checked: false,
            })),
          };
        }
        return {
          ...prev,
          [filterType]: filterValue.map((option) =>
            option.id === optionId
              ? { ...option, checked: !option.checked }
              : option
          ),
        };
      }
      // If not an array, do nothing
      return prev;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      remoteOnly: false,
      companyCulture: false,
      immigration: false,
      jobTypes: jobTypes.map((opt) => ({ ...opt, checked: false })),
      salaryRanges: salaryRanges.map((opt) => ({ ...opt, checked: false })),
      experienceLevels: experienceLevels.map((opt) => ({
        ...opt,
        checked: false,
      })),
    });
  };

  // Filter and sort jobs
  const filteredJobs = jobs.filter((job) => {
    // Search query
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery?.toLowerCase())
      );

    // Job type
    const selectedJobTypes = filters.jobTypes
      .filter((t) => t.checked)
      .map((t) => t.id);
    const matchesJobType =
      selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type);

    // Remote
    const matchesRemote =
      !filters.remoteOnly || job.location.toLowerCase().includes("remote");

    // Salary
    const selectedSalaries = filters.salaryRanges
      .filter((s) => s.checked)
      .map((s) => s.id);
    const matchesSalary =
      selectedSalaries.length === 0 ||
      selectedSalaries.some((range) => {
        if (range === "20k-50k")
          return parseInt(job.salary.replace(/\D/g, "")) >= 20000;
        if (range === "50k-100k")
          return parseInt(job.salary.replace(/\D/g, "")) >= 50000;
        if (range === "100k+")
          return parseInt(job.salary.replace(/\D/g, "")) >= 100000;
        return true;
      });

    return matchesSearch && matchesJobType && matchesRemote && matchesSalary;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "Newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "Oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      if (a.status === "featured" && b.status !== "featured") return -1;
      if (b.status === "featured" && a.status !== "featured") return 1;
      return 0;
    }
  });

  // Pagination
  const jobsPerPage = 5;
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Find Your Dream Job
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {jobs.length} tech jobs from top companies
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Post A Job
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filters Button */}
          <div className="lg:hidden flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters Sidebar - Desktop */}
          <FilterSidebar
            filters={filters}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
            setRemoteOnly={(value) =>
              setFilters((prev) => ({ ...prev, remoteOnly: value }))
            }
            setCompanyCulture={(value) =>
              setFilters((prev) => ({ ...prev, companyCulture: value }))
            }
            setImmigration={(value) =>
              setFilters((prev) => ({ ...prev, immigration: value }))
            }
          />

          {/* Job Listings */}
          <div className="flex-1 space-y-6">
            {/* Desktop Search */}
            <div className="hidden lg:block relative">
              <Input
                placeholder="Search job title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.remoteOnly && (
                <Badge variant="secondary" className="gap-1">
                  Remote only
                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, remoteOnly: false }))
                    }
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.jobTypes.filter((t) => t.checked).length > 0 && (
                <Badge variant="secondary" className="gap-1">
                  {filters.jobTypes.filter((t) => t.checked).length} job types
                  <button onClick={() => toggleFilter("jobTypes", "clear-all")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {/* More filter badges... */}
            </div>

            {/* Jobs Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Sort by:
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-1">
                      {sortBy}
                      <ChevronDown className="h-4 w-4" />
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
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSelect={setSelectedJob}
                    onBookmark={toggleBookmark}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md">
                    <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      className="text-primary"
                    >
                      Clear all filters
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {paginatedJobs.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>

      {/* Job Details Dialog */}
      <JobDetailsDialog
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onBookmark={toggleBookmark}
      />
    </div>
  );
}

// Component: JobCard
interface JobCardProps {
  job: Job;
  onSelect: (job: Job) => void;
  onBookmark: (jobId: string) => void;
}

const JobCard = ({ job, onSelect, onBookmark }: JobCardProps) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(job)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <Image
            width={48}
            height={48}
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {job.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 truncate">
              {job.company} • {job.salary}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="outline">{job.type}</Badge>
              <Badge variant="outline">{job.location}</Badge>
              {job.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 3 && (
                <Badge variant="secondary">+{job.skills.length - 3}</Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(job.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          {job.status && (
            <Badge
              variant={job.status === "featured" ? "default" : "secondary"}
            >
              {job.status}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(job.id);
            }}
            className={`p-1 ${
              job.bookmarked ? "text-primary" : "text-gray-400"
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${job.bookmarked ? "fill-current" : ""}`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Component: JobDetailsDialog
interface JobDetailsDialogProps {
  job: Job | null;
  onClose: () => void;
  onBookmark: (jobId: string) => void;
}

const JobDetailsDialog = ({
  job,
  onClose,
  onBookmark,
}: JobDetailsDialogProps) => {
  if (!job) return null;

  return (
    <Dialog open={!!job} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
          <div className="flex items-center gap-4 pt-4">
            <Image
              width={48}
              height={48}
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium">{job.company}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
                <span>•</span>
                <span>{job.salary}</span>
                {job.experience && (
                  <>
                    <span>•</span>
                    <span>{job.experience}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-medium mb-2">Job Description</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {job.description}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {job.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => onBookmark(job.id)}
                className={job.bookmarked ? "text-primary" : ""}
              >
                <Bookmark
                  className={`h-4 w-4 mr-2 ${
                    job.bookmarked ? "fill-current" : ""
                  }`}
                />
                {job.bookmarked ? "Saved" : "Save"}
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Component: Pagination
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="flex justify-center pt-8">
      <nav className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-2 py-1">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};

type FilterType =
  | "remoteOnly"
  | "companyCulture"
  | "immigration"
  | "jobTypes"
  | "salaryRanges"
  | "experienceLevels";

interface FilterSidebarProps {
  filters: {
    remoteOnly: boolean;
    companyCulture: boolean;
    immigration: boolean;
    jobTypes: {
      id: string;
      label: string;
      icon?: React.ReactNode;
      checked: boolean;
    }[];
    salaryRanges: {
      id: string;
      label: string;
      checked: boolean;
    }[];
    experienceLevels: {
      id: string;
      label: string;
      checked: boolean;
    }[];
  };
  toggleFilter: (filterType: FilterType, optionId: string) => void;
  clearFilters: () => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  setRemoteOnly: (value: boolean) => void;
  setCompanyCulture: (value: boolean) => void;
  setImmigration: (value: boolean) => void;
}

function FilterSidebar({
  filters,
  toggleFilter,
  clearFilters,
  showMobileFilters,
  setShowMobileFilters,
  setRemoteOnly,
  setCompanyCulture,
  setImmigration,
}: FilterSidebarProps) {
  return (
    <div
      className={`
        ${
          showMobileFilters
            ? "block fixed inset-0 z-50 bg-black/50 lg:hidden"
            : "hidden"
        }
        lg:block w-full lg:w-80 space-y-6
      `}
    >
      {/* Mobile overlay and close button */}
      {showMobileFilters && (
        <div className="absolute right-4 top-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileFilters(false)}
            className="rounded-full bg-white text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Filters container */}
      <div
        className={`
          bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 
          h-full lg:h-auto overflow-y-auto lg:overflow-visible
          ${showMobileFilters ? "absolute inset-y-0 left-0 w-80" : ""}
        `}
      >
        {/* Filters Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-primary hover:text-primary/80"
          >
            Clear all
          </Button>
        </div>

        <div className="space-y-8">
          {/* Job Types Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Job Types
            </h3>
            <div className="space-y-3">
              {filters.jobTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type.id}`}
                    checked={type.checked}
                    onCheckedChange={() => toggleFilter("jobTypes", type.id)}
                  />
                  <label
                    htmlFor={`type-${type.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </h3>
            <div className="flex items-center space-x-2">
              <Switch
                id="remote-only"
                checked={filters.remoteOnly}
                onCheckedChange={setRemoteOnly}
              />
              <label
                htmlFor="remote-only"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remote only
              </label>
            </div>
          </div>

          {/* Salary Range Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Salary Range
            </h3>
            <div className="space-y-3">
              {filters.salaryRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`salary-${range.id}`}
                    checked={range.checked}
                    onCheckedChange={() =>
                      toggleFilter("salaryRanges", range.id)
                    }
                  />
                  <label
                    htmlFor={`salary-${range.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Level Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Experience Level
            </h3>
            <div className="space-y-3">
              {filters.experienceLevels.map((level) => (
                <div key={level.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exp-${level.id}`}
                    checked={level.checked}
                    onCheckedChange={() =>
                      toggleFilter("experienceLevels", level.id)
                    }
                  />
                  <label
                    htmlFor={`exp-${level.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {level.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Company Culture Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Company Culture
            </h3>
            <div className="flex items-center space-x-2">
              <Switch
                id="company-culture"
                checked={filters.companyCulture}
                onCheckedChange={setCompanyCulture}
              />
              <label
                htmlFor="company-culture"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Positive culture only
              </label>
            </div>
          </div>

          {/* Immigration Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Immigration
            </h3>
            <div className="flex items-center space-x-2">
              <Switch
                id="immigration"
                checked={filters.immigration}
                onCheckedChange={setImmigration}
              />
              <label
                htmlFor="immigration"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Visa sponsorship
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Apply Filters Button */}
        {showMobileFilters && (
          <div className="mt-8 lg:hidden">
            <Button
              className="w-full"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
