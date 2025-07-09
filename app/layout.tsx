import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import TrackingScript from "./track-script"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Chocolate Academy Pakistan | Master the Art of Chocolate & Pastry",
    template: "%s | Chocolate Academy Pakistan",
  },
  description:
    "Discover the art of fine chocolate making, professional pastry courses, and gourmet chocolate gifts at Chocolate Academy Pakistan. Elevate your skills with expert chefs.",
  keywords: [
    "Chocolate Academy Pakistan",
    "Chocolate Making Courses",
    "Baking Classes Lahore",
    "Pastry School Karachi",
    "Chocolate Workshops Islamabad",
    "Gourmet Chocolate Gifts",
    "Wedding Chocolate Favors",
    "Corporate Chocolate Gifts",
    "Professional Culinary Training",
    "Dessert Classes",
    "Bonbon Making",
    "Cake Decoration",
    "Culinary Arts Pakistan",
  ],
  openGraph: {
    title: "Chocolate Academy Pakistan | Master the Art of Chocolate & Pastry",
    description:
      "Discover the art of fine chocolate making, professional pastry courses, and gourmet chocolate gifts at Chocolate Academy Pakistan. Elevate your skills with expert chefs.",
    url: "https://chocolateacademy.com.pk",
    siteName: "Chocolate Academy Pakistan",
    images: [
      {
        url: "/images/og-image-default.jpg", // Replace with a high-quality, relevant image for your site
        width: 1200,
        height: 630,
        alt: "Chocolate Academy Pakistan - Where Cocoa & Creativity Collide",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chocolate Academy Pakistan | Master the Art of Chocolate & Pastry",
    description:
      "Discover the art of fine chocolate making, professional pastry courses, and gourmet chocolate gifts at Chocolate Academy Pakistan. Elevate your skills with expert chefs.",
    images: ["/images/og-image-default.jpg"], // Replace with a high-quality, relevant image for your site
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.webp" type="image/webp" />
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        <meta name="google-site-verification" content="ivZoh3YSYQomi9mczqzTURYbflQ5EhXfaCjfkY1JdFE" />
        {/* Google Analytics (GA4) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-50D19VH9C0" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-50D19VH9C0');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <TrackingScript />
        </ThemeProvider>
      </body>
    </html>
  )
}
