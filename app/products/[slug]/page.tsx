'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Printer, Truck, Clock, Check, ChevronLeft, ShoppingCart, Heart, Phone } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { products } from "@/public/data/products";
import { useEffect, useState, use } from "react"
import { Skeleton } from "@/components/ui/skeleton"
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

// Skeleton Components
function ProductImagesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border bg-white">
        <Skeleton className="aspect-square w-full" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="overflow-hidden rounded-md border bg-white">
            <Skeleton className="aspect-square w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      <Skeleton className="h-8 w-1/3" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <div className="space-y-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start gap-2">
              <Skeleton className="h-5 w-5 shrink-0 mt-0.5" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-lg border bg-white p-4 text-center"
          >
            <Skeleton className="h-6 w-6 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductTabsSkeleton() {
  return (
    <div className="mt-12">
      <div className="flex space-x-1 border-b">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-24" />
        ))}
      </div>
      <div className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // This would normally come from a database or API
  // const productId = Number.parseInt(params.id)
  // let dataProducts = products;
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  async function getProductBySlug(slug: string) {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`http://localhost:3001/api/products/${slug}`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Product not found")
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Product:", data)
      setProduct(data)
      setSelectedImageIndex(0)
    } catch (error) {
      console.error("Error fetching product:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index)
  }

  useEffect(() => {
    getProductBySlug(slug)
  }, [slug])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/products" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Default to product 1 if ID doesn't exist in our sample data
  // const product = dataProducts[params.slug as keyof typeof products] || dataProducts[0];
  // const product = dataProducts.find((item) => item.slug === params.slug);

  // Get related products
  // const relatedProductsData = product.relatedProducts.map((id) => products[id as keyof typeof products]).filter(Boolean) // Filter out any undefined products

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}

      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/products" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        {loading ? (
          <>
            <div className="grid gap-8 lg:grid-cols-2">
              <ProductImagesSkeleton />
              <ProductDetailsSkeleton />
            </div>
            <ProductTabsSkeleton />
          </>
        ) : product ? (
          <>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image with Zoom Effect */}
                <div className="overflow-hidden rounded-lg border bg-white">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.images[selectedImageIndex] || "/placeholder.svg"}
                      alt={`${product.name} image`}
                      width={600}
                      height={600}
                      className="aspect-square w-full object-cover transition-transform duration-300 ease-in-out"
                    />
                  </div>
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageSelect(index)}
                      className={`overflow-hidden rounded-md border-2 transition-all duration-200 hover:border-purple-400 ${selectedImageIndex === index ? "border-purple-600 ring-2 ring-purple-200" : "border-gray-200"
                        }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} view ${index + 1}`}
                        width={150}
                        height={150}
                        className="aspect-square w-full object-cover transition-transform duration-200 hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">{product?.name}</h1>
                  <p className="text-sm text-gray-500">{product?.category}</p>
                </div>

                <div className="text-2xl font-bold">{formatPrice(product?.price)}</div>

                <p className="text-gray-700">{product?.description}</p>

                <div className="space-y-2">
                  <h3 className="font-semibold">Key Features:</h3>
                  <ul className="space-y-1">
                    {product?.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Us
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-4 text-center">
                    <Printer className="h-6 w-6 text-purple-600 mb-2" />
                    <span className="text-sm font-medium">High Quality</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-4 text-center">
                    <Truck className="h-6 w-6 text-purple-600 mb-2" />
                    <span className="text-sm font-medium">Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-4 text-center">
                    <Clock className="h-6 w-6 text-purple-600 mb-2" />
                    <span className="text-sm font-medium">Quick Turnaround</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <Tabs defaultValue="specifications" className="mt-12">
              <TabsList className="w-full justify-start border-b pb-px">
                <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
                <TabsTrigger value="shipping">Pengiriman & Pengembalian</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="specifications" className="pt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(product?.specifications!).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-medium">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informasi Pengiriman</h3>
                  <p>Kami menawarkan berbagai pilihan pengiriman untuk memenuhi kebutuhan Anda:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Pengiriman Standar (3-5 hari kerja)</li>
                    <li>Pengiriman Ekspres (1-2 hari kerja)</li>
                    <li>Pengambilan Langsung (tersedia di lokasi kami)</li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-6">Kebijakan Pengembalian</h3>
                  <p>
                    Karena produk cetak kami bersifat khusus, kami memiliki kebijakan pengembalian yang terbatas. Jika pesanan Anda rusak atau terdapat kesalahan cetak, harap hubungi kami dalam waktu 7 hari setelah menerima pesanan Anda.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="faq" className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Format file apa yang Anda terima?</h3>
                    <p className="text-gray-600">
                      Kami menerima berkas PDF, AI, PSD, JPG, dan PNG. Untuk hasil terbaik, kami sarankan untuk menggunakan berkas PDF dengan resolusi minimal 300 DPI.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Berapa lama waktu produksi?</h3>
                    <p className="text-gray-600">
                      Waktu produksi bervariasi tergantung pada produknya. Kartu nama standar biasanya memerlukan waktu 2-3 hari kerja, sedangkan barang dengan format yang lebih besar mungkin memerlukan waktu 3-5 hari kerja.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Apakah Anda menawarkan layanan desain?</h3>
                    <p className="text-gray-600">
                      Ya, kami menawarkan layanan desain profesional dengan biaya tambahan. Desainer kami dapat membantu membuat atau menyempurnakan karya seni Anda untuk memastikan hasil cetak terbaik.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Related Products */}
            {/* <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProductsData.map((relatedProduct, i) => {
                // Find the original index to get the correct product ID
                const originalIndex = product.relatedProducts.findIndex(
                  (id) => products[id as keyof typeof products] === relatedProduct,
                )
                const productId = product.relatedProducts[originalIndex]

                return (
                  <Link href={`/products/${productId}`} key={i} className="group">
                    <Card className="overflow-hidden transition-all hover:shadow-lg">
                      <CardContent className="p-0">
                        <Image
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          width={400}
                          height={300}
                          className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-bold">{relatedProduct.name}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">{relatedProduct.category}</span>
                            <span className="font-medium">{relatedProduct.price}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section> */}
          </>
        ) : null}
      </div>

      {/* <Footer /> */}
    </div>
  )
}
