import { getCourses, getProducts } from "@/lib/cms"

export const dynamic = "force-dynamic"

const SITE_URL = "https://chocolateacademy.com.pk"

export async function GET() {
  let courseLines = ""
  let categoryLines = ""

  try {
    const courses = await getCourses(true)
    courseLines = courses
      .map(
        (c) =>
          `- [${c.title}](${SITE_URL}/courses/intensive-programs/${c.slug}): ${c.description?.slice(0, 160) || ""} (Duration: ${c.duration}, Level: ${c.level}${c.fee ? `, Fee: PKR ${Number(c.fee).toLocaleString()}` : ""})`,
      )
      .join("\n")

    const products = await getProducts(true)
    const categories = Array.from(new Set(products.map((p) => p.category)))
    categoryLines = categories.map((cat) => `- ${cat}`).join("\n")
  } catch {
    // If the DB is unavailable, still return the static overview.
  }

  const body = `# Chocolate Academy Pakistan

> Chocolate Academy Pakistan is a premier institute offering professional chocolate making and culinary courses, intensive diploma programs, and a shop of premium handcrafted chocolates, custom cakes, and artisan treats. We serve students and customers across major cities in Pakistan including Lahore, Islamabad, Karachi, Faisalabad and Rawalpindi.

## About
- Official website: ${SITE_URL}
- Focus: Professional chocolate making courses, culinary diplomas, and a premium chocolate & cake shop
- Audience: Aspiring chocolatiers, pastry chefs, home bakers, culinary entrepreneurs, and chocolate lovers
- Country: Pakistan

## Courses & Intensive Programs
${courseLines || "- Visit " + SITE_URL + "/courses/intensive-programs for the current list of programs."}

## Shop Product Categories
${categoryLines || "- Visit " + SITE_URL + "/shop for the current product catalog."}

## Key Pages
- [Home](${SITE_URL}/): Overview of the academy, courses, and shop
- [Shop](${SITE_URL}/shop): Browse and order premium chocolates and cakes via WhatsApp by city
- [Intensive Programs](${SITE_URL}/courses/intensive-programs): Professional diploma and certification courses
- [Monthly Newsletter](${SITE_URL}/newsletter): Downloadable monthly newsletters in PDF format
- [Sitemap](${SITE_URL}/sitemap.xml): Full list of indexable pages

## How to Order or Enroll
- Products are ordered through WhatsApp; the contact number is selected based on the customer's city.
- Course enrollment is available through the "Register Now" action on each program page.

## Contact
- Customer service phone: +92-309-3336142
- Cities served: Lahore, Islamabad, Karachi, Faisalabad, Rawalpindi
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
