import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chocolate Academy Master - Premium Chocolate Making Courses & Artisan Products",
  description:
    "Learn professional chocolate making with our comprehensive courses. Shop premium handcrafted chocolates, custom cakes, and artisan treats. Expert-led workshops in Karachi.",
  keywords:
    "chocolate making courses, artisan chocolate, custom cakes, chocolate workshops, premium chocolates, Karachi",
  authors: [{ name: "Chocolate Academy Master" }],
  creator: "Chocolate Academy Master",
  publisher: "Chocolate Academy Master",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://chocolateacademy.com.pk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chocolate Academy Master - Premium Chocolate Making Courses",
    description:
      "Learn professional chocolate making with our comprehensive courses. Shop premium handcrafted chocolates and custom cakes.",
    url: "https://chocolateacademy.com.pk",
    siteName: "Chocolate Academy Master",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Chocolate Academy Master",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chocolate Academy Master - Premium Chocolate Making Courses",
    description:
      "Learn professional chocolate making with our comprehensive courses. Shop premium handcrafted chocolates and custom cakes.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chocolate Academy Pakistan",
    alternateName: "Chocolate Academy Master",
    url: "https://chocolateacademy.com.pk",
    logo: "https://chocolateacademy.com.pk/images/logo.png",
    description:
      "Chocolate Academy Pakistan offers professional chocolate making courses, intensive culinary diplomas, and premium handcrafted chocolates, cakes, and artisan treats.",
    sameAs: ["https://www.instagram.com/", "https://www.facebook.com/"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-309-3336142",
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressLocality: "Lahore",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chocolate Academy Pakistan",
    url: "https://chocolateacademy.com.pk",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://chocolateacademy.com.pk/shop?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
