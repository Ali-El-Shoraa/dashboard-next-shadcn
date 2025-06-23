"use client";

import { useState } from "react";
import { FilterSidebar } from "./FilterSidebar";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const products = [
  {
    id: "1",
    title: "Form Builder CP",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 39.0,
    originalPrice: 59.0,
    rating: 4.7,
    image: "/images/applications-image-21.jpg",
    isSpecialOffer: true,
  },
  {
    id: "2",
    title: "UI Design Kit",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 69.0,
    rating: 4.5,
    image: "/images/applications-image-22.jpg",
  },
  {
    id: "3",
    title: "Dashboard Template",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 39.0,
    originalPrice: 49.0,
    rating: 4.2,
    image: "/images/applications-image-23.jpg",
    isSpecialOffer: true,
  },
  {
    id: "4",
    title: "Illustration Pack",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 69.0,
    rating: 4.8,
    image: "/images/applications-image-24.jpg",
  },
  {
    id: "5",
    title: "Icon Set",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 29.0,
    rating: 4.3,
    image: "/images/applications-image-25.jpg",
  },
  {
    id: "6",
    title: "Wireframe Kit",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 39.0,
    originalPrice: 59.0,
    rating: 4.6,
    image: "/images/applications-image-26.jpg",
    isSpecialOffer: true,
  },
  {
    id: "7",
    title: "Mobile App Template",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 79.0,
    rating: 4.9,
    image: "/images/applications-image-27.jpg",
  },
  {
    id: "8",
    title: "Web Components",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 49.0,
    rating: 4.4,
    image: "/images/applications-image-28.jpg",
  },
  {
    id: "9",
    title: "Design System",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 89.0,
    rating: 4.7,
    image: "/images/applications-image-29.jpg",
  },
  {
    id: "10",
    title: "Illustration Pack",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 39.0,
    originalPrice: 59.0,
    rating: 4.5,
    image: "/images/applications-image-30.jpg",
    isSpecialOffer: true,
  },
  {
    id: "11",
    title: "UI Components",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 59.0,
    rating: 4.6,
    image: "/images/applications-image-31.jpg",
  },
  {
    id: "12",
    title: "Design Templates",
    description: "Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod.",
    price: 49.0,
    rating: 4.3,
    image: "/images/applications-image-32.jpg",
  },
];

const sortOptions = [
  "Featured",
  "Newest",
  "Price - Low To High",
  "Price - High to Low",
];

export function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 12;
  const totalItems = 467;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, you would fetch data for the new page here
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Find the right product for you
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant="default">View All</Button>
              {sortOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedSort === option ? "default" : "outline"}
                  onClick={() => setSelectedSort(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">67,975 Items</p>
              <Input
                placeholder="Search products..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-gray-900 rounded-lg p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">
                  Excepteur sint occaecat cupidatat 🎁
                </h3>
                <p className="text-sm text-gray-300">
                  Excepteur sint occaecat cupidatat non proidentsunt in culpa
                  qui officia deserunt mollit!
                </p>
              </div>
              <Button variant="secondary" className="text-gray-800">
                Redeem Now!
              </Button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">
                {1 + (currentPage - 1) * itemsPerPage}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
