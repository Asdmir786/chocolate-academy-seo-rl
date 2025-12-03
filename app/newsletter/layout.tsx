import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Newsletter Archive",
  description:
    "Download our monthly newsletters featuring the latest updates, recipes, tips, and news from Chocolate Academy Pakistan.",
  keywords: [
    "Chocolate Academy Newsletter",
    "Monthly Newsletter",
    "Chocolate Recipes",
    "Pastry Tips",
    "Academy Updates",
  ],
  openGraph: {
    title: "Newsletter Archive | Chocolate Academy Pakistan",
    description:
      "Download our monthly newsletters featuring the latest updates, recipes, tips, and news from Chocolate Academy Pakistan.",
    url: "https://chocolateacademy.com.pk/newsletter",
    images: [
      {
        url: "/images/Our-Gallery.jpg",
        width: 1200,
        height: 630,
        alt: "Chocolate Academy Newsletter",
      },
    ],
    type: "website",
  },
}

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

