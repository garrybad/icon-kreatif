"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useEffect, useState, useMemo } from "react"
import { formatPrice } from "@/lib/utils"

interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  features: string[]
  specifications: Record<string, string>
  images: string[]
  created_at: string
  slug: string
}

// Skeleton component for individual product cards
function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <div className="flex items-center justify-between mt-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Skeleton grid component
function ProductsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(12)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

// Filter section skeleton
function FilterSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortOption, setSortOption] = useState<string>("newest")

  async function fetchAllData() {
    setLoading(true)
    setError(null)

    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch(`http://localhost:3001/api/products`),
        fetch(`http://localhost:3001/api/categories`),
      ])

      // Handle Products
      if (!productsResponse.ok) {
        throw new Error(`Failed to fetch products. Status: ${productsResponse.status}`)
      }
      const productsData = await productsResponse.json()
      setProducts(productsData || [])

      // Handle Categories
      if (!categoriesResponse.ok) {
        console.error("Error fetching categories")
        setCategories([
          "Electronics",
          "Furniture",
          "Clothing",
          "Books",
          "Home & Garden",
          "Sports",
          "Toys",
          "Beauty",
          "Automotive",
          "Other",
        ])
      } else {
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData || [])
      }
    } catch (err) {
      console.error("Error fetching data:", err)
      setError(err instanceof Error ? err.message : "An error occurred while fetching data")

      // Default categories fallback on any error
      setCategories([
        "Electronics",
        "Furniture",
        "Clothing",
        "Books",
        "Home & Garden",
        "Sports",
        "Toys",
        "Beauty",
        "Automotive",
        "Other",
      ])
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort products using useMemo for performance
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          // Handle both string and Date formats for created_at
          const dateA = new Date(a.created_at).getTime()
          const dateB = new Date(b.created_at).getTime()
          // If dates are invalid, fall back to ID comparison
          if (isNaN(dateA) || isNaN(dateB)) {
            return b.id - a.id
          }
          return dateB - dateA
        case "oldest":
          const dateA2 = new Date(a.created_at).getTime()
          const dateB2 = new Date(b.created_at).getTime()
          // If dates are invalid, fall back to ID comparison
          if (isNaN(dateA2) || isNaN(dateB2)) {
            return a.id - b.id
          }
          return dateA2 - dateB2
        case "price-low":
          // Ensure price is treated as number
          const priceA = typeof a.price === "string" ? Number.parseFloat(a.price) : a.price
          const priceB = typeof b.price === "string" ? Number.parseFloat(b.price) : b.price
          return priceA - priceB
        case "price-high":
          // Ensure price is treated as number
          const priceA2 = typeof a.price === "string" ? Number.parseFloat(a.price) : a.price
          const priceB2 = typeof b.price === "string" ? Number.parseFloat(b.price) : b.price
          return priceB2 - priceA2
        default:
          return 0
      }
    })

    console.log("Sort option:", sortOption)
    console.log(
      "First few products after sorting:",
      filtered.slice(0, 3).map((p) => ({
        name: p.name,
        price: p.price,
        created_at: p.created_at,
      })),
    )

    return filtered
  }, [products, searchTerm, selectedCategory, sortOption])

  // Handle filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSortOption("newest")
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}

      {/* Hero Banner */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Produk Kami</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Jelajahi berbagai macam produk dan layanan pencetakan berkualitas tinggi kami
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full py-6 md:py-8 lg:py-10 border-b">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <FilterSkeleton />
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full bg-white pl-8 shadow-none"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter Summary and Clear Button */}
              {(searchTerm || selectedCategory !== "all" || sortOption !== "newest") && (
                <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Filters applied:</span>
                    {searchTerm && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Search: "{searchTerm}"</span>
                    )}
                    {selectedCategory !== "all" && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        Category: {selectedCategory}
                      </span>
                    )}
                    {sortOption !== "newest" && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        Sort:{" "}
                        {sortOption === "oldest"
                          ? "Oldest"
                          : sortOption === "price-low"
                            ? "Price: Low to High"
                            : sortOption === "price-high"
                              ? "Price: High to Low"
                              : sortOption}
                      </span>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <ProductsGridSkeleton />
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button onClick={fetchAllData} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h2>
              <p className="text-gray-600 mb-4">
                {products.length === 0
                  ? "We couldn't find any products at the moment. Please check back later."
                  : "No products match your current filters. Try adjusting your search criteria."}
              </p>
              {products.length > 0 && (
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredAndSortedProducts.length} of {products.length} products
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAndSortedProducts.map((product) => (
                  <Link href={`/products/${product.slug}`} key={product.id} className="group">
                    <Card className="overflow-hidden transition-all hover:shadow-lg">
                      <CardContent className="p-0">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={300}
                          className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-bold">{product.name}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">{product.category}</span>
                            <span className="font-medium">{formatPrice(product.price)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
