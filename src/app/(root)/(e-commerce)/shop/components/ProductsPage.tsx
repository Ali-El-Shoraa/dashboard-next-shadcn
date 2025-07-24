"use client";

import { useState, useEffect } from "react";
// import { FilterSidebar } from "./FilterSidebar";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// أنواع البيانات
type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  isSpecialOffer?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  category: string;
  brand?: string;
  stock: number;
  colors?: string[];
  sizes?: string[];
  reviews: number;
};

// بيانات الفئات
const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Beauty",
  "Sports",
  "Toys",
  "Automotive",
  "Furniture",
  "Grocery",
  "Health",
  "Jewelry",
];

// العلامات التجارية
// const brands = [
//   "Apple",
//   "Samsung",
//   "Nike",
//   "Adidas",
//   "Sony",
//   "LG",
//   "Dell",
//   "HP",
//   "Lenovo",
//   "Canon",
// ];

// خيارات الترتيب
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
  { value: "popular", label: "Most Popular" },
  { value: "discount", label: "Best Discount" },
];

// خيارات عدد العناصر لكل صفحة
const itemsPerPageOptions = [12, 24, 36, 48];

// بيانات المنتجات الموسعة
const realProducts: Product[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    description: "Latest iPhone with A17 Pro chip and advanced camera system",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1709114108061-7a3b648eba80",
    isSpecialOffer: true,
    isBestSeller: true,
    isNew: true,
    category: "Electronics",
    brand: "Apple",
    stock: 50,
    colors: ["Space Black", "White", "Gold"],
    sizes: ["128GB", "256GB", "512GB", "1TB"],
    reviews: 1245,
  },
  {
    id: "2",
    title: "Samsung Galaxy S23 Ultra",
    description: "Powerful Android phone with S Pen and 200MP camera",
    price: 1099,
    originalPrice: 1199,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1709744722656-9b850470293f",
    isBestSeller: true,
    category: "Electronics",
    brand: "Samsung",
    stock: 75,
    colors: ["Phantom Black", "Green", "Lavender"],
    sizes: ["256GB", "512GB", "1TB"],
    reviews: 987,
  },
  {
    id: "3",
    title: "MacBook Pro 16-inch M2 Max",
    description: "Professional laptop with stunning Retina display",
    price: 2499,
    originalPrice: 2699,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
    isSpecialOffer: true,
    category: "Electronics",
    brand: "Apple",
    stock: 30,
    colors: ["Space Gray", "Silver"],
    sizes: ["32GB/512GB", "32GB/1TB", "64GB/2TB"],
    reviews: 876,
  },
  {
    id: "4",
    title: "Nike Air Jordan 1 Retro",
    description: "Classic basketball shoes with original design",
    price: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
    isNew: true,
    category: "Clothing",
    brand: "Nike",
    stock: 120,
    colors: ["Black/Red", "Black/White", "Blue/White"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    reviews: 654,
  },
  {
    id: "5",
    title: "Adidas Ultraboost 22",
    description: "Running shoes with responsive cushioning",
    price: 160,
    originalPrice: 180,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    isSpecialOffer: true,
    category: "Clothing",
    brand: "Adidas",
    stock: 90,
    colors: ["Black", "White", "Blue", "Red"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    reviews: 543,
  },
  {
    id: "6",
    title: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise canceling headphones",
    price: 399,
    originalPrice: 449,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1655720828013-33e0a1e1594c",
    isBestSeller: true,
    category: "Electronics",
    brand: "Sony",
    stock: 60,
    colors: ["Black", "Silver"],
    reviews: 765,
  },
  {
    id: "7",
    title: "Dyson V15 Detect Vacuum Cleaner",
    description: "Powerful cordless vacuum with laser dust detection",
    price: 699,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1631729371254-42d2890b9a8f",
    isNew: true,
    category: "Home & Kitchen",
    brand: "Dyson",
    stock: 40,
    colors: ["Gold", "Nickel"],
    reviews: 432,
  },
  {
    id: "8",
    title: "Instant Pot Duo 7-in-1",
    description: "Electric pressure cooker with multiple functions",
    price: 99,
    originalPrice: 129,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a",
    isSpecialOffer: true,
    isBestSeller: true,
    category: "Home & Kitchen",
    stock: 150,
    colors: ["Black", "Stainless Steel"],
    reviews: 876,
  },
  {
    id: "9",
    title: "The Psychology of Money",
    description: "Timeless lessons on wealth, greed, and happiness",
    price: 14.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    isBestSeller: true,
    category: "Books",
    stock: 200,
    reviews: 987,
  },
  {
    id: "10",
    title: "Atomic Habits",
    description: "An easy way to build good habits and break bad ones",
    price: 11.99,
    originalPrice: 14.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    isSpecialOffer: true,
    category: "Books",
    stock: 180,
    reviews: 1234,
  },
  {
    id: "11",
    title: "Apple Watch Series 9",
    description: "Advanced smartwatch with health monitoring",
    price: 399,
    originalPrice: 429,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1695048137563-7d1a7e3df4e1",
    isNew: true,
    category: "Electronics",
    brand: "Apple",
    stock: 80,
    colors: ["Midnight", "Starlight", "Silver", "Red"],
    sizes: ["41mm", "45mm"],
    reviews: 654,
  },
  {
    id: "12",
    title: "Sony PlayStation 5",
    description: "Next-gen gaming console with ultra-high speed SSD",
    price: 499,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e",
    isBestSeller: true,
    category: "Electronics",
    brand: "Sony",
    stock: 25,
    colors: ["White"],
    sizes: ["Standard", "Digital Edition"],
    reviews: 876,
  },
  {
    id: "13",
    title: "Xbox Series X",
    description: "Fastest, most powerful Xbox ever",
    price: 499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1637775292249-18211e134c0d",
    category: "Electronics",
    brand: "Microsoft",
    stock: 35,
    colors: ["Black"],
    reviews: 765,
  },
  {
    id: "14",
    title: "Nintendo Switch OLED",
    description: "Handheld gaming console with vibrant OLED screen",
    price: 349,
    originalPrice: 379,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1638549814985-6f5f1d5a6b3e",
    isSpecialOffer: true,
    category: "Electronics",
    brand: "Nintendo",
    stock: 60,
    colors: ["White", "Neon Blue/Red"],
    reviews: 543,
  },
  {
    id: "15",
    title: "Canon EOS R5 Mirrorless Camera",
    description: "Professional full-frame mirrorless camera",
    price: 3799,
    originalPrice: 3999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
    category: "Electronics",
    brand: "Canon",
    stock: 15,
    colors: ["Black"],
    reviews: 321,
  },
  {
    id: "16",
    title: "Sony A7 IV Mirrorless Camera",
    description: "Full-frame mirrorless camera with 33MP sensor",
    price: 2499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    isNew: true,
    category: "Electronics",
    brand: "Sony",
    stock: 20,
    colors: ["Black"],
    reviews: 432,
  },
  {
    id: "17",
    title: "DJI Mavic 3 Pro Drone",
    description: "Professional drone with triple camera system",
    price: 2199,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31",
    category: "Electronics",
    brand: "DJI",
    stock: 10,
    colors: ["Gray"],
    reviews: 210,
  },
  {
    id: "18",
    title: "Bose QuietComfort 45 Headphones",
    description: "Premium noise-canceling wireless headphones",
    price: 329,
    originalPrice: 379,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9",
    isSpecialOffer: true,
    category: "Electronics",
    brand: "Bose",
    stock: 45,
    colors: ["Black", "White"],
    reviews: 543,
  },
  {
    id: "19",
    title: "LG C2 65-inch OLED TV",
    description: "4K Smart TV with stunning picture quality",
    price: 1799,
    originalPrice: 1999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    isBestSeller: true,
    category: "Electronics",
    brand: "LG",
    stock: 25,
    colors: ["Black"],
    sizes: ["55-inch", "65-inch", "77-inch"],
    reviews: 654,
  },
  {
    id: "20",
    title: "Samsung 85-inch QLED TV",
    description: "Massive 4K Smart TV with Quantum Dot technology",
    price: 2499,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
    category: "Electronics",
    brand: "Samsung",
    stock: 15,
    colors: ["Black"],
    sizes: ["75-inch", "85-inch"],
    reviews: 321,
  },
  {
    id: "21",
    title: "Levi's 501 Original Fit Jeans",
    description: "Classic straight leg jeans in rigid wash",
    price: 69.5,
    originalPrice: 79.5,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    isSpecialOffer: true,
    category: "Clothing",
    brand: "Levi's",
    stock: 200,
    colors: ["Dark Blue", "Black", "Light Blue"],
    sizes: ["28x30", "30x30", "32x30", "34x30", "36x30"],
    reviews: 876,
  },
  {
    id: "22",
    title: "Calvin Klein Modern Cotton Bralette",
    description: "Comfortable wireless bralette with logo waistband",
    price: 29,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
    isNew: true,
    category: "Clothing",
    brand: "Calvin Klein",
    stock: 150,
    colors: ["Black", "White", "Nude"],
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: 543,
  },
  {
    id: "23",
    title: "North Face Thermoball Eco Jacket",
    description: "Lightweight synthetic insulated jacket",
    price: 199,
    originalPrice: 229,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
    isSpecialOffer: true,
    category: "Clothing",
    brand: "The North Face",
    stock: 80,
    colors: ["Black", "Blue", "Red"],
    sizes: ["S", "M", "L", "XL"],
    reviews: 432,
  },
  {
    id: "24",
    title: "Patagonia Better Sweater Fleece Jacket",
    description: "Eco-conscious fleece made from recycled materials",
    price: 139,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4",
    category: "Clothing",
    brand: "Patagonia",
    stock: 90,
    colors: ["Gray", "Navy", "Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: 321,
  },
  {
    id: "25",
    title: "All-Clad Stainless Steel Cookware Set",
    description: "10-piece professional cookware set",
    price: 799,
    originalPrice: 899,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1583778176476-4a8b02b64e00",
    isBestSeller: true,
    category: "Home & Kitchen",
    brand: "All-Clad",
    stock: 30,
    reviews: 210,
  },
  {
    id: "26",
    title: "Vitamix 5200 Blender",
    description: "Professional-grade blender with 64-oz container",
    price: 449,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a",
    category: "Home & Kitchen",
    brand: "Vitamix",
    stock: 40,
    colors: ["Black", "Red", "White"],
    reviews: 543,
  },
  {
    id: "27",
    title: "Breville Barista Express Espresso Machine",
    description: "Semi-automatic espresso machine with grinder",
    price: 699,
    originalPrice: 799,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1560869713-9d9a3b8ad0a8",
    isSpecialOffer: true,
    category: "Home & Kitchen",
    brand: "Breville",
    stock: 25,
    colors: ["Stainless Steel", "Black"],
    reviews: 432,
  },
  {
    id: "28",
    title: "Casper Original Mattress",
    description: "Memory foam mattress with premium support",
    price: 995,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    category: "Home & Kitchen",
    brand: "Casper",
    stock: 20,
    sizes: ["Twin", "Full", "Queen", "King", "California King"],
    reviews: 654,
  },
  {
    id: "29",
    title: "Dyson Supersonic Hair Dryer",
    description: "Professional hair dryer with intelligent heat control",
    price: 429,
    originalPrice: 449,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266",
    isSpecialOffer: true,
    category: "Beauty",
    brand: "Dyson",
    stock: 35,
    colors: ["Fuchsia", "Black", "White"],
    reviews: 543,
  },
  {
    id: "30",
    title: "Oral-B iO Series 9 Electric Toothbrush",
    description: "Advanced electric toothbrush with AI technology",
    price: 229,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    isNew: true,
    category: "Beauty",
    brand: "Oral-B",
    stock: 60,
    colors: ["Black", "White", "Rose Gold"],
    reviews: 432,
  },
  {
    id: "31",
    title: "Peloton Bike+",
    description: "Interactive exercise bike with rotating HD touchscreen",
    price: 2495,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    category: "Sports",
    brand: "Peloton",
    stock: 15,
    colors: ["Black"],
    reviews: 321,
  },
  {
    id: "32",
    title: "Yeti Rambler 20 oz Tumbler",
    description: "Vacuum insulated stainless steel tumbler",
    price: 34.99,
    originalPrice: 39.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    isBestSeller: true,
    category: "Sports",
    brand: "Yeti",
    stock: 200,
    colors: ["Black", "White", "Blue", "Red"],
    reviews: 876,
  },
  {
    id: "33",
    title: "LEGO Star Wars Millennium Falcon",
    description: "Iconic Star Wars spaceship building set",
    price: 159.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
    category: "Toys",
    brand: "LEGO",
    stock: 50,
    reviews: 543,
  },
  {
    id: "34",
    title: "Fisher-Price Baby Gym",
    description: "Play gym with lights, music and developmental toys",
    price: 59.99,
    originalPrice: 69.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f",
    isSpecialOffer: true,
    category: "Toys",
    brand: "Fisher-Price",
    stock: 80,
    colors: ["Multicolor"],
    reviews: 432,
  },
  {
    id: "35",
    title: "Carhartt Men's Work Gloves",
    description: "Durable work gloves with reinforced palm",
    price: 24.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1595341595379-cf0f2a6d3f38",
    category: "Automotive",
    brand: "Carhartt",
    stock: 150,
    sizes: ["S", "M", "L", "XL"],
    reviews: 321,
  },
  {
    id: "36",
    title: "Michelin Defender T+H Tires (Set of 4)",
    description: "Long-lasting all-season tires with 80,000 mile warranty",
    price: 699.96,
    originalPrice: 799.96,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1554744512-d6c603f27a54",
    isSpecialOffer: true,
    category: "Automotive",
    brand: "Michelin",
    stock: 25,
    sizes: ["P215/55R17", "P225/60R17", "P235/55R18"],
    reviews: 210,
  },
];

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  // const [wishlist, setWishlist] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // جلب البيانات عند التحميل
  useEffect(() => {
    setLoading(true);
    // محاكاة جلب البيانات من API
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const totalItems = realProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // تصفية وترتيب المنتجات
  const filteredProducts = realProducts
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
    )
    .sort((a, b) => {
      switch (selectedSort) {
        case "newest":
          return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default: // featured
          return (
            (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) ||
            (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
          );
      }
    });

  // المنتجات المعروضة للصفحة الحالية
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const toggleWishlist = (productId: string) => {
  //   setWishlist((prev) =>
  //     prev.includes(productId)
  //       ? prev.filter((id) => id !== productId)
  //       : [...prev, productId]
  //   );
  // };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const renderSidebar = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-6">
      <h3 className="font-semibold mb-4 dark:text-white">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category}
            className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
              selectedCategories.includes(category)
                ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
            onClick={() => toggleCategory(category)}
          >
            <span className="mr-2 dark:text-white">
              {selectedCategories.includes(category) ? "✓" : ""}
            </span>
            <span className="dark:text-gray-200">{category}</span>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              ({realProducts.filter((p) => p.category === category).length})
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="">
      {/* شريط البحث للأجهزة المحمولة */}
      {isMobile && (
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog
            open={isMobileFilterOpen}
            onOpenChange={setIsMobileFilterOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="dark:bg-gray-800 dark:border-gray-700"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle className="dark:text-white">Filters</DialogTitle>
              </DialogHeader>
              {renderSidebar()}
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - للأجهزة الكبيرة فقط */}
        {!isMobile && (
          <div className="w-full md:w-72 flex-shrink-0">
            {/* شريط البحث للأجهزة الكبيرة */}

            {renderSidebar()}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="dark:text-white"
              >
                <Grid2X2 className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="dark:text-white"
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div> */}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  Sort by:
                </span>
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-[180px] dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    {sortOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="dark:hover:bg-gray-700 dark:text-white"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  Show:
                </span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[120px] dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    <SelectValue placeholder="Items" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    {itemsPerPageOptions.map((option) => (
                      <SelectItem
                        key={option}
                        value={option.toString()}
                        className="dark:hover:bg-gray-700 dark:text-white"
                      >
                        {option} per page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  selectedCategories.includes(category) ? "default" : "outline"
                }
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Showing{" "}
              <span className="font-medium dark:text-white">
                {filteredProducts.length}
              </span>{" "}
              products
              {searchQuery && (
                <span>
                  {" "}
                  for &quot;
                  <span className="font-medium dark:text-white">
                    {searchQuery}
                  </span>
                  &quot;
                </span>
              )}
              {selectedCategories.length > 0 && (
                <span>
                  {" "}
                  in{" "}
                  <span className="font-medium dark:text-white">
                    {selectedCategories.join(", ")}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: itemsPerPage }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-80 w-full rounded-lg dark:bg-gray-700"
                />
              ))}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  // onWishlistToggle={toggleWishlist}
                  // isInWishlist={wishlist.includes(product.id)}
                  // viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  // onWishlistToggle={toggleWishlist}
                  // isInWishlist={wishlist.includes(product.id)}
                  // viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                    className={cn(
                      "dark:text-white dark:hover:bg-gray-700",
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    )}
                    // className="dark:text-white dark:hover:bg-gray-700"
                  />
                </PaginationItem>

                {/* First Page */}
                {currentPage > 2 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(1)}
                      className="dark:text-white dark:hover:bg-gray-700"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Ellipsis */}
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis className="dark:text-white" />
                  </PaginationItem>
                )}

                {/* Previous Page */}
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="dark:text-white dark:hover:bg-gray-700"
                    >
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Current Page */}
                <PaginationItem>
                  <PaginationLink
                    isActive
                    className="dark:bg-gray-700 dark:text-white"
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>

                {/* Next Page */}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="dark:text-white dark:hover:bg-gray-700"
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Ellipsis */}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis className="dark:text-white" />
                  </PaginationItem>
                )}

                {/* Last Page */}
                {currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(totalPages)}
                      className="dark:text-white dark:hover:bg-gray-700"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-disabled={currentPage === totalPages}
                    className={cn(
                      "dark:text-white dark:hover:bg-gray-700",
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    )}
                    // className="dark:text-white dark:hover:bg-gray-700"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
