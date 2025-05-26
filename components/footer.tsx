'use client'

import Link from "next/link"
import { Printer, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { Dela_Gothic_One } from 'next/font/google'

const delaGothicOne = Dela_Gothic_One({
  subsets: ['latin'], // required
  // display: 'swap', // optional
  weight: '400',
  variable: '--font-dela-gothic-one', // optional: for using as CSS variable
})

interface BusinessDetails {
  whatsapp_number: string
  address: string
  email: string
}

export default function Footer() {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>();

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
    getBusinessDetails()
  }, [])

  return (
    <footer className="w-full bg-gray-900 text-gray-200">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-1 md:col-span-3">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Printer className="h-6 w-6 text-purple-400" />
              <span className={`text-xl font-bold text-white ${delaGothicOne.className}`}>ICON KREATIF</span>
            </Link>
            <p className="mb-4 max-w-xs text-gray-400">
              Modern digital printing solutions for businesses and individuals. Transform your ideas into reality with
              our high-quality printing services.
            </p>
            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              {/* <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link> */}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-gray-400 hover:text-white">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">{businessDetails?.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-purple-400 shrink-0" />
                <Link href="tel:+1234567890" className="text-gray-400 hover:text-white">
                  {businessDetails?.whatsapp_number}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-400 shrink-0" />
                <Link href="mailto:info@iconkreatif.com" className="text-gray-400 hover:text-white">
                  {businessDetails?.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Icon Kreatif. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
