import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import ThemeProvider from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Icon Kreatif - Modern Digital Printing Solutions",
  description:
    "Transform your ideas into reality with our high-quality digital printing services on various media including paper, cloth, and plastic.",
  generator: 'v0.dev',
  icons: {
    icon: '/icon.png', // /public path
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
