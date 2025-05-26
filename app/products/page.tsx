"use client"

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
import { useEffect, useState } from "react"

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

  async function getAllProducts() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`http://localhost:3001/api/products`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("All Products:", data)
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setError(error instanceof Error ? error.message : "An error occurred while fetching products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}

      {/* Hero Banner */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our wide range of high-quality printing products and services
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
            <div className="grid gap-4 md:grid-cols-3 lg:gap-8">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search products..." className="w-full bg-white pl-8 shadow-none" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="stationery">Stationery</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="large-format">Large Format</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              <Button onClick={getAllProducts} variant="outline">
                Try Again
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h2>
              <p className="text-gray-600">We couldn't find any products at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
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
                          <span className="font-medium">{product.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
