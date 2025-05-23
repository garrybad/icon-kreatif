import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProductsPage() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Business Cards",
      category: "Stationery",
      image: "/placeholder.svg?height=300&width=400",
      price: "$25",
    },
    {
      id: 2,
      name: "Banners & Posters",
      category: "Large Format",
      image: "/placeholder.svg?height=300&width=400",
      price: "$45",
    },
    { id: 3, name: "Brochures", category: "Marketing", image: "/placeholder.svg?height=300&width=400", price: "$35" },
    {
      id: 4,
      name: "Custom T-Shirts",
      category: "Apparel",
      image: "/placeholder.svg?height=300&width=400",
      price: "$20",
    },
    {
      id: 5,
      name: "Stickers & Labels",
      category: "Promotional",
      image: "/placeholder.svg?height=300&width=400",
      price: "$15",
    },
    {
      id: 6,
      name: "Promotional Items",
      category: "Promotional",
      image: "/placeholder.svg?height=300&width=400",
      price: "$30",
    },
    { id: 7, name: "Flyers", category: "Marketing", image: "/placeholder.svg?height=300&width=400", price: "$20" },
    { id: 8, name: "Calendars", category: "Stationery", image: "/placeholder.svg?height=300&width=400", price: "$18" },
    {
      id: 9,
      name: "Greeting Cards",
      category: "Stationery",
      image: "/placeholder.svg?height=300&width=400",
      price: "$12",
    },
    {
      id: 10,
      name: "Vinyl Banners",
      category: "Large Format",
      image: "/placeholder.svg?height=300&width=400",
      price: "$60",
    },
    {
      id: 11,
      name: "Custom Mugs",
      category: "Promotional",
      image: "/placeholder.svg?height=300&width=400",
      price: "$15",
    },
    {
      id: 12,
      name: "Canvas Prints",
      category: "Large Format",
      image: "/placeholder.svg?height=300&width=400",
      price: "$75",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

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
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="group">
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-0">
                    <Image
                      src={product.image || "/placeholder.svg"}
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
        </div>
      </section>

      <Footer />
    </div>
  )
}
