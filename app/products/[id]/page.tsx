import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Printer, Truck, Clock, Check, ChevronLeft, ShoppingCart, Heart } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // This would normally come from a database or API
  const productId = Number.parseInt(params.id)

  // Sample product data
  const products = {
    1: {
      name: "Business Cards",
      category: "Stationery",
      price: "$25",
      description:
        "High-quality business cards printed on premium card stock. Choose from various finishes including matte, glossy, or soft-touch lamination.",
      features: [
        "Premium 350gsm card stock",
        "Full color double-sided printing",
        "Multiple finish options",
        "Standard or custom sizes available",
        "Fast turnaround time",
      ],
      specifications: {
        Material: "350gsm premium card stock",
        Size: 'Standard 3.5" x 2" or custom',
        Printing: "Full color CMYK, double-sided",
        "Finish Options": "Matte, Glossy, Soft-touch lamination",
        "Minimum Order": "100 cards",
      },
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      relatedProducts: [2, 3, 5],
    },
    2: {
      name: "Banners & Posters",
      category: "Large Format",
      price: "$45",
      description:
        "Eye-catching banners and posters for indoor or outdoor use. Available in various sizes and materials to suit your specific needs.",
      features: [
        "High-resolution printing",
        "Weather-resistant options available",
        "Reinforced edges for durability",
        "Multiple hanging options",
        "Custom sizes available",
      ],
      specifications: {
        Material: "440gsm PVC or 210gsm poster paper",
        Size: "Custom sizes available",
        Printing: "Full color CMYK",
        Finish: "Matte or Glossy",
        Extras: "Grommets, pole pockets available",
      },
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      relatedProducts: [1, 3, 12],
    },
    3: {
      name: "Brochures",
      category: "Marketing",
      price: "$35",
      description:
        "Professional brochures to showcase your products or services. Available in bi-fold or tri-fold options with premium paper stocks.",
      features: [
        "High-quality paper options",
        "Full color printing",
        "Bi-fold or tri-fold options",
        "Custom sizes available",
        "Professional design assistance available",
      ],
      specifications: {
        Material: "150gsm - 250gsm art paper",
        Size: "A4, A5, or custom",
        Printing: "Full color CMYK, double-sided",
        "Fold Options": "Bi-fold, Tri-fold, Z-fold",
        "Minimum Order": "50 brochures",
      },
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      relatedProducts: [1, 7, 9],
    },
  }

  // Default to product 1 if ID doesn't exist in our sample data
  const product = products[productId as keyof typeof products] || products[1]

  // Get related products
  const relatedProductsData = product.relatedProducts.map((id) => products[id as keyof typeof products]).filter(Boolean) // Filter out any undefined products

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/products" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-white">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="overflow-hidden rounded-md border bg-white">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 2}`}
                    width={150}
                    height={150}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>

            <div className="text-2xl font-bold">{product.price}</div>

            <p className="text-gray-700">{product.description}</p>

            <div className="space-y-2">
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700">
                <ShoppingCart className="h-5 w-5" />
                Request Quote
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Heart className="h-5 w-5" />
                Save for Later
              </Button>
            </div> */}

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
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              <p>We offer various shipping options to meet your needs:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Standard Shipping (3-5 business days)</li>
                <li>Express Shipping (1-2 business days)</li>
                <li>Local Pickup (available at our location)</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6">Return Policy</h3>
              <p>
                Due to the custom nature of our printing products, we have a limited return policy. If your order
                arrives damaged or with printing errors, please contact us within 7 days of receiving your order.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="faq" className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">What file formats do you accept?</h3>
                <p className="text-gray-600">
                  We accept PDF, AI, PSD, JPG, and PNG files. For best results, we recommend using PDF files with at
                  least 300 DPI resolution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">How long does production take?</h3>
                <p className="text-gray-600">
                  Production time varies by product. Standard business cards typically take 2-3 business days, while
                  larger format items may take 3-5 business days.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Do you offer design services?</h3>
                <p className="text-gray-600">
                  Yes, we offer professional design services for an additional fee. Our designers can help create or
                  refine your artwork to ensure the best printing results.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mt-16">
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
        </section>
      </div>

      <Footer />
    </div>
  )
}
