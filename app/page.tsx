'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Printer, Layers, Award, ChevronRight, Phone } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
// import { products } from "@/public/data/products";
import { Dela_Gothic_One } from 'next/font/google'

const delaGothicOne = Dela_Gothic_One({
  subsets: ['latin'], // required
  // display: 'swap', // optional
  weight: '400',
  variable: '--font-dela-gothic-one', // optional: for using as CSS variable
})

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

interface BusinessDetails {
  whatsapp_number: string
  address: string
  email: string
}

// Skeleton component for individual product cards
function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
        </div>
      </CardContent>
    </Card>
  )
}

// Skeleton grid component
function ProductsGridSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  )
}

export default function Home() {
  // let dataProducts = products;
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>();

  async function getAllProducts() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`http://localhost:3001/api/products`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('All Products:', data)
      setProducts(data || [])
      // Expected response: Array of products
    } catch (error) {
      console.error('Error fetching products:', error)
      setError(error instanceof Error ? error.message : "An error occurred while fetching products")
    } finally {
      setLoading(false)
    }
  }

  async function getBusinessDetails() {
    try {
      const response = await fetch(`http://localhost:3001/api/business-details`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Business Details:', data)
      setBusinessDetails(data);
      // return data

      // Expected response:
      // {
      //   whatsapp_number: "08973748344",
      //   address: "Jl. Jend. Sudirman No.296...",
      //   email: "garry@gmail.com"
      // }
    } catch (error) {
      console.error('Error fetching business details:', error)
      throw error
    }
  }

  useEffect(() => {
    getAllProducts()
    getBusinessDetails();
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Modern Digital Printing Solutions
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Transform your ideas into reality with our high-quality digital printing services on various media.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {/* <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Get Started
                </Button> */}
                <Button asChild variant="outline" size="lg" className="gap-1">
                  <Link href={`https://wa.me/${businessDetails?.whatsapp_number}`} target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Link href="/products">
                    View Products
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Digital Printing Machine"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover why Icon Kreatif is the preferred choice for digital printing
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Printer className="h-8 w-8 text-purple-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">High-Quality Printing</h3>
                <p className="text-gray-500">
                  State-of-the-art digital printing technology for crisp, vibrant results on any media.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Layers className="h-8 w-8 text-purple-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Versatile Media Options</h3>
                <p className="text-gray-500">
                  Print on various materials including paper, fabric, vinyl, plastic, and more.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Fast Turnaround</h3>
                <p className="text-gray-500">
                  Quick production times without compromising on quality or attention to detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our range of high-quality printing products
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
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
              <>
                {products.slice(0, 6).map((product, index) => (
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
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </>
            )}
          </div>
          <div className="flex justify-center">
            <Button asChild className="gap-1">
              <Link href="/products">
                See All Products
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Clients Say</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our satisfied customers about their experience with Icon Kreatif
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                company: "Fashion Boutique",
                quote:
                  "The quality of our promotional materials has significantly improved since we started working with Icon Kreatif. Their attention to detail is impressive!",
              },
              {
                name: "Michael Chen",
                company: "Tech Startup",
                quote:
                  "Fast turnaround times and excellent customer service. Our business cards and brochures always look professional and polished.",
              },
              {
                name: "Aisha Patel",
                company: "Event Planner",
                quote:
                  "Icon Kreatif has been our go-to printing partner for all our event materials. Their banners and posters always exceed our expectations.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="text-left">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-gray-500 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=500&width=500"
                width={500}
                height={500}
                alt="Icon Kreatif Team"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About <span className={delaGothicOne.className}>ICON KREATIF</span></h2>
                <p className="text-gray-500 md:text-xl">
                  Icon Kreatif is a modern digital printing company dedicated to bringing your creative visions to life.
                </p>
              </div>
              <div className="space-y-4 text-gray-500">
                <p>
                  Founded in 2015, we've been at the forefront of digital printing technology, offering high-quality
                  printing services on various media including paper, fabric, vinyl, and plastic.
                </p>
                <p>
                  Our team of experienced professionals is committed to delivering exceptional results with quick
                  turnaround times and personalized customer service.
                </p>
                <p>
                  Whether you're a small business looking for marketing materials or an individual with a creative
                  project, Icon Kreatif is your trusted partner for all your printing needs.
                </p>
              </div>
              <div>
                <Button asChild variant="outline" size="lg" className="gap-1">
                  <Link href={`https://wa.me/${businessDetails?.whatsapp_number}`} target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
