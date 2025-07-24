"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import {
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Box,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/formatCurrency";

type StockItem = {
  image: string;
  name: string;
  productId: string;
  qty: number;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  category: string;
  lastUpdated: string;
};

// Expanded dataset with more Unsplash images
// interface StockItem {
//   image: string;
//   name: string;
//   productId: string;
//   qty: number;
//   price: number;
//   status: string;
//   category: string;
//   lastUpdated: string;
// }

const stockData: StockItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop",
    name: "Leather Backpack",
    productId: "#357896",
    qty: 45,
    price: 1256,
    status: "In Stock",
    category: "Accessories",
    lastUpdated: "2023-10-15",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=80&h=80&fit=crop",
    name: "Ergonomic Office Chair",
    productId: "#698789",
    qty: 10,
    price: 1200,
    status: "Low Stock",
    category: "Furniture",
    lastUpdated: "2023-10-10",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop",
    name: "Modern Leather Sofa",
    productId: "#245987",
    qty: 0,
    price: 3061,
    status: "Out of Stock",
    category: "Furniture",
    lastUpdated: "2023-09-28",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=80&h=80&fit=crop",
    name: "Minimalist Desk Lamp",
    productId: "#785412",
    qty: 32,
    price: 899,
    status: "In Stock",
    category: "Lighting",
    lastUpdated: "2023-10-12",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&h=80&fit=crop",
    name: "Mechanical Keyboard",
    productId: "#963258",
    qty: 5,
    price: 1499,
    status: "Low Stock",
    category: "Electronics",
    lastUpdated: "2023-10-14",
  },
  {
    image:
      "https://images.unsplash.com/photo-1546538915-a9e2c8d0a0df?w=80&h=80&fit=crop",
    name: '27" 4K Monitor',
    productId: "#159753",
    qty: 18,
    price: 2499,
    status: "In Stock",
    category: "Electronics",
    lastUpdated: "2023-10-16",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=80&h=80&fit=crop",
    name: "Wireless Mouse",
    productId: "#753951",
    qty: 2,
    price: 599,
    status: "Low Stock",
    category: "Electronics",
    lastUpdated: "2023-10-17",
  },
  {
    image:
      "https://images.unsplash.com/photo-1468994716465-19d33e7a9cdd?w=80&h=80&fit=crop",
    name: "Premium Notebook Set",
    productId: "#852456",
    qty: 0,
    price: 349,
    status: "Out of Stock",
    category: "Stationery",
    lastUpdated: "2023-10-05",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
    name: "Noise-Canceling Headphones",
    productId: "#456123",
    qty: 15,
    price: 1999,
    status: "In Stock",
    category: "Electronics",
    lastUpdated: "2023-10-18",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
    name: "Smart Watch Pro",
    productId: "#789654",
    qty: 8,
    price: 1599,
    status: "Low Stock",
    category: "Wearables",
    lastUpdated: "2023-10-19",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=80&h=80&fit=crop",
    name: "Standing Desk",
    productId: "#321654",
    qty: 4,
    price: 3599,
    status: "Low Stock",
    category: "Furniture",
    lastUpdated: "2023-10-20",
  },
  {
    image:
      "https://images.unsplash.com/photo-1491147334573-44cbb4602274?w=80&h=80&fit=crop",
    name: "Office Plant",
    productId: "#654987",
    qty: 25,
    price: 299,
    status: "In Stock",
    category: "Decor",
    lastUpdated: "2023-10-21",
  },
  {
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop",
    name: "Bluetooth Speaker",
    productId: "#147852",
    qty: 12,
    price: 799,
    status: "In Stock",
    category: "Electronics",
    lastUpdated: "2023-10-22",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=80&h=80&fit=crop",
    name: "Vintage Camera",
    productId: "#369852",
    qty: 3,
    price: 1899,
    status: "Low Stock",
    category: "Photography",
    lastUpdated: "2023-10-23",
  },
  {
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop",
    name: "Designer Sunglasses",
    productId: "#258741",
    qty: 7,
    price: 1299,
    status: "Low Stock",
    category: "Accessories",
    lastUpdated: "2023-10-24",
  },
  {
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=80&h=80&fit=crop",
    name: "Wireless Earbuds",
    productId: "#951753",
    qty: 0,
    price: 899,
    status: "Out of Stock",
    category: "Electronics",
    lastUpdated: "2023-10-25",
  },
  {
    image:
      "https://images.unsplash.com/photo-1578932750355-5eb30ece487a?w=80&h=80&fit=crop",
    name: "Coffee Maker",
    productId: "#357159",
    qty: 9,
    price: 1499,
    status: "Low Stock",
    category: "Appliances",
    lastUpdated: "2023-10-26",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=80&h=80&fit=crop",
    name: "Electric Kettle",
    productId: "#753159",
    qty: 14,
    price: 499,
    status: "In Stock",
    category: "Appliances",
    lastUpdated: "2023-10-27",
  },
  {
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=80&h=80&fit=crop",
    name: "Leather Wallet",
    productId: "#456789",
    qty: 22,
    price: 399,
    status: "In Stock",
    category: "Accessories",
    lastUpdated: "2023-10-28",
  },
  {
    image:
      "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=80&h=80&fit=crop",
    name: "Yoga Mat",
    productId: "#987123",
    qty: 17,
    price: 599,
    status: "In Stock",
    category: "Fitness",
    lastUpdated: "2023-10-29",
  },
  {
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=80&h=80&fit=crop",
    name: "Dumbbell Set",
    productId: "#321987",
    qty: 6,
    price: 1299,
    status: "Low Stock",
    category: "Fitness",
    lastUpdated: "2023-10-30",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "In Stock":
      return "success";
    case "Low Stock":
      return "warning";
    case "Out of Stock":
      return "destructive";
    default:
      return "secondary";
  }
}

function getStockPercentage(qty: number) {
  return Math.min((qty / 50) * 100, 100);
}

export default function StockReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  // const [isSummaryExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Get all unique categories for filter dropdown
  const categories = [...new Set(stockData.map((item) => item.category))];

  const filteredData = stockData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const inStockItems = filteredData.filter(
    (item) => item.status === "In Stock"
  ).length;
  const lowStockItems = filteredData.filter(
    (item) => item.status === "Low Stock"
  ).length;
  const outOfStockItems = filteredData.filter(
    (item) => item.status === "Out of Stock"
  ).length;

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <Card className="shadow-lg border rounded-xl flex flex-col py-0">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2 py-2">
              <span className="bg-primary/10 p-2 rounded-lg">
                <Box />
              </span>
              <span>Stock Report</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Real-time inventory levels and product status
            </CardDescription>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Product</span>
          </Button>
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex gap-2">
            <div className="">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 w-[180px] sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={() => {
                    setStatusFilter(null);
                    setCategoryFilter(null);
                  }}
                >
                  Clear All Filters
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Status
                  </p>
                </div>
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("In Stock")}>
                  In Stock
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Low Stock")}>
                  Low Stock
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("Out of Stock")}
                >
                  Out of Stock
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Category
                  </p>
                </div>
                <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col">
        <div
          // ${isSummaryExpanded ? "max-h-40" : "max-h-0 p-0 opacity-0"}
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 mb-3.5 bg-muted/20 transition-all duration-300 `}
        >
          <div className="bg-background p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Items
            </h3>
            <p className="text-2xl font-bold mt-1">{totalItems}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {statusFilter ? `Filtered by ${statusFilter}` : "All items"}
            </p>
          </div>
          <div className="bg-background p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">
              In Stock
            </h3>
            <p className="text-2xl font-bold mt-1 text-success">
              {inStockItems}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((inStockItems / totalItems) * 100)}% of total
            </p>
          </div>
          <div className="bg-background p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">
              Low Stock
            </h3>
            <p className="text-2xl font-bold mt-1 text-warning">
              {lowStockItems}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Needs restocking
            </p>
          </div>
          <div className="bg-background p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">
              Out of Stock
            </h3>
            <p className="text-2xl font-bold mt-1 text-destructive">
              {outOfStockItems}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Urgent attention needed
            </p>
          </div>
        </div>

        {/* <Separator/> */}
        {/* <ScrollArea className="flex-1 w-full"> */}
        <Table className="w-full border-t">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[200px]">Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded-lg border shadow-sm object-cover"
                        priority={idx < 3}
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <Progress
                          value={getStockPercentage(item.qty)}
                          className={`h-2 mt-2 hidden sm:block ${
                            item.status === "In Stock"
                              ? "progress-success"
                              : item.status === "Low Stock"
                              ? "progress-warning"
                              : "progress-destructive"
                          }`}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.category}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.productId}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.qty} PCS
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${formatCurrency(item.price, "currency")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusColor(item.status)}
                      className="flex items-center gap-1 w-fit"
                    >
                      {item.status === "In Stock" && (
                        <span className="h-2 w-2 rounded-full bg-success-foreground"></span>
                      )}
                      {item.status === "Low Stock" && (
                        <span className="h-2 w-2 rounded-full bg-warning-foreground"></span>
                      )}
                      {item.status === "Out of Stock" && (
                        <span className="h-2 w-2 rounded-full bg-destructive-foreground"></span>
                      )}
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No products found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-muted/10 border-t">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
          <span className="font-medium">{endIndex}</span> of{" "}
          <span className="font-medium">{totalItems}</span> products
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "outline" : "ghost"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={currentPage === pageNum ? "bg-primary/10" : ""}
                >
                  {pageNum}
                </Button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="flex items-center px-2">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
