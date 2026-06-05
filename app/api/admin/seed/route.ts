import { NextResponse } from "next/server"
import { sql, ensureSchema } from "@/lib/db"
import { ensureDefaultAdmin } from "@/lib/auth"
import { products as seedProducts } from "@/lib/products"
import { slugify } from "@/lib/cms"

// Master cities (migrated from the hardcoded city -> WhatsApp map)
const SEED_CITIES = [
  { name: "Lahore", number: "0309-3336142" },
  { name: "Islamabad", number: "0326-8079985" },
  { name: "Karachi", number: "0333-6669828" },
  { name: "Faisalabad", number: "0309-7778646" },
  { name: "Rawalpindi", number: "0309-3336144" },
]

// Courses (migrated from app/courses/intensive-programs/[id]/page.tsx)
const SEED_COURSES = [
  {
    slug: "cake-decoration",
    title: "Cake Decoration & Fondant Art",
    description:
      "This 04-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demand. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute. The ultimate purpose of this 01-month course is to equip you with the basic and professional skills of handling fondant and buttercream.",
    image: "/images/courses/cake-decor.webp",
    duration: "1 month",
    level: "Beginner to Advanced",
    certification: "International Chocolate Academy",
    fee: 75000,
    register_url: "/courses/register?course=cake-decoration",
    highlights: [
      "Hands-on practical training",
      "Small batch sizes for personalized attention",
      "Industry-recognized certification: International Chocolate Academy",
      "Program Fee: PKR 75,000",
    ],
    program_overview:
      "<p>This 04-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demands. After the course, students will be able to design their own fondant cakes as a final project.</p>",
    detailed_curriculum:
      "<h4>Week 1</h4><ul><li>Baking a cake using the creamy method, making cake icing from scratch, leveling, filling, crumb coating and smooth frosting, stabilizing single heightened cake.</li></ul><h4>Week 2</h4><ul><li>Making fondant from scratch, coloring &amp; preserving fondant, covering the cake, sharpening edges, using fondant tools (roses, peony flowers, characters).</li></ul><h4>Week 3</h4><ul><li>Stabilizing two-tier cake with buttercream and fondant, gravity-defying cake, character molding and balancing, 3D cake.</li></ul><h4>Week 4</h4><ul><li>Professionally stable three-tier cake with a stand, costing &amp; business overview, two wedding cakes in three tiers, 3D cake.</li></ul><h4>Complementary Classes</h4><ul><li>Business Support</li><li>Social Media Marketing</li><li>Food Safety &amp; Hygiene</li></ul>",
  },
  {
    slug: "grand-diplome-en-chocolat-et-pattisserie",
    title: "Grand Diplome en Chocolat Et Pattisserie",
    description:
      "A comprehensive 4-month program covering everything from theory and techniques to advanced chocolate mastery and entrepreneurship. This intensive course includes 14 core modules and complementary business classes, preparing you for a successful career in the culinary arts industry.",
    image: "/images/courses/choc.webp",
    duration: "4 months",
    level: "Professional",
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    fee: 425000,
    register_url: "/courses/register?course=grand-diplome-en-chocolat-et-pattisserie",
    highlights: [
      "Hands-on practical training",
      "Small batch sizes for personalized attention",
      "Industry-recognized international certifications",
      "Program Fee: PKR 425,000",
    ],
    program_overview:
      "<p>A comprehensive 4-month program covering everything from theory and techniques to advanced chocolate mastery and entrepreneurship. This intensive course includes 14 core modules and complementary business classes.</p>",
    detailed_curriculum:
      "<h4>Course Modules</h4><ul><li>Theory and Techniques</li><li>Cakes</li><li>Pastry Passion</li><li>French Patisserie</li><li>Ice-Cream Delights</li><li>Modern Desserts and Entremets</li><li>Cake Decoration and Fondant Art</li><li>Chocolate Mastery</li><li>Artisan Bread</li><li>Quick Breads</li><li>Breakfast Creations</li><li>Hi-TEA Delights</li><li>Entrepreneurship Masterclasses</li><li>Patisserie Showcase and Challenges</li></ul><h4>Complementary Classes</h4><ul><li>Business Support</li><li>Social Media Marketing</li><li>Food Safety &amp; Hygiene</li></ul>",
  },
  {
    slug: "grand-diploma-culinary",
    title: "Grand Diplome en Culinary & Finishing Arts",
    description:
      "A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts. This intensive course includes 15 core modules and complementary business classes, preparing you for a successful career in the culinary arts industry.",
    image: "/images/courses/cul.webp",
    duration: "16 weeks",
    level: "Professional",
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    fee: 450000,
    register_url: "/courses/register?course=grand-diploma-culinary",
    highlights: [
      "Hands-on practical training",
      "Small batch sizes for personalized attention",
      "Industry-recognized international certifications",
      "Program Fee: PKR 450,000",
    ],
    program_overview:
      "<p>A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts. This intensive course includes 15 core modules and complementary business classes.</p>",
    detailed_curriculum:
      "<h4>Course Modules</h4><ul><li>Essential Techniques</li><li>Health-Focused Cuisine</li><li>Soups, Salads, Sandwiches</li><li>Taste of Asia</li><li>Mediterranean Marvels</li><li>Flavors of the World</li><li>South Asian Delicacies</li><li>Breakfast Globally</li><li>Seafood Mastery</li><li>Fast &amp; Flavorful Temptations</li><li>Art of Desserts</li><li>Hi-TEA Delights</li><li>Culinary Finesse</li><li>Entrepreneurship Classes</li><li>Culinary Showcase</li></ul><h4>Complementary Classes</h4><ul><li>Business Support</li><li>Social Media Marketing</li><li>Food Safety &amp; Hygiene</li></ul>",
  },
]

// Newsletters (migrated from app/newsletter/page.tsx)
const SEED_NEWSLETTERS = [
  {
    title: "CA Journal - December 2025",
    month: "December",
    year: 2025,
    pdf_url: "/images/pdfs/CA Journel Final.pdf",
    download_name: "CA-Journal-December-2025.pdf",
  },
  {
    title: "CA Journal - March 2026",
    month: "March",
    year: 2026,
    pdf_url: "/images/pdfs/CA-Journal-March-2026.pdf",
    download_name: "CA-Journal-March-2026.pdf",
  },
  {
    title: "CA Journal - April 2026",
    month: "April",
    year: 2026,
    pdf_url: "/images/pdfs/CA-Journal-April-2026.pdf",
    download_name: "CA-Journal-April-2026.pdf",
  },
]

async function runSeed() {
  await ensureSchema()
  await ensureDefaultAdmin()

  const result: Record<string, number> = {}

  // Cities
  const cityCount = await sql`SELECT COUNT(*)::int AS c FROM cities`
  if ((cityCount[0]?.c ?? 0) === 0) {
    let order = 0
    for (const c of SEED_CITIES) {
      await sql`
        INSERT INTO cities (name, slug, whatsapp_number, is_active, sort_order)
        VALUES (${c.name}, ${slugify(c.name)}, ${c.number}, TRUE, ${order++})
        ON CONFLICT (slug) DO NOTHING
      `
    }
    result.cities = SEED_CITIES.length
  }

  const allCitySlugs = SEED_CITIES.map((c) => slugify(c.name))

  // Categories (derived from product list)
  const catCount = await sql`SELECT COUNT(*)::int AS c FROM categories`
  if ((catCount[0]?.c ?? 0) === 0) {
    const categories = Array.from(new Set(seedProducts.map((p) => p.category)))
    let order = 0
    for (const name of categories) {
      await sql`
        INSERT INTO categories (name, slug, is_active, sort_order)
        VALUES (${name}, ${slugify(name)}, TRUE, ${order++})
        ON CONFLICT (slug) DO NOTHING
      `
    }
    result.categories = categories.length
  }

  // Products
  const prodCount = await sql`SELECT COUNT(*)::int AS c FROM products`
  if ((prodCount[0]?.c ?? 0) === 0) {
    let order = 0
    for (const p of seedProducts) {
      await sql`
        INSERT INTO products (name, slug, description, price, image, category, weight, sku, rating, discount, is_new, featured, is_active, city_slugs, sort_order)
        VALUES (
          ${p.name}, ${p.slug}, ${p.description}, ${p.price}, ${p.image}, ${p.category},
          ${p.weight ?? null}, ${p.sku ?? null}, ${p.rating ?? 5}, ${p.discount ?? 0},
          ${p.isNew ?? false}, ${p.featured ?? false}, TRUE, ${allCitySlugs}, ${order++}
        )
      `
    }
    result.products = seedProducts.length
  }

  // Courses
  const courseCount = await sql`SELECT COUNT(*)::int AS c FROM courses`
  if ((courseCount[0]?.c ?? 0) === 0) {
    let order = 0
    for (const c of SEED_COURSES) {
      await sql`
        INSERT INTO courses (slug, title, description, image, duration, level, certification, fee, register_url, highlights, program_overview, detailed_curriculum, is_active, sort_order)
        VALUES (
          ${c.slug}, ${c.title}, ${c.description}, ${c.image}, ${c.duration}, ${c.level}, ${c.certification},
          ${c.fee}, ${c.register_url}, ${c.highlights}, ${c.program_overview}, ${c.detailed_curriculum}, TRUE, ${order++}
        )
        ON CONFLICT (slug) DO NOTHING
      `
    }
    result.courses = SEED_COURSES.length
  }

  // Newsletters
  const nlCount = await sql`SELECT COUNT(*)::int AS c FROM newsletters`
  if ((nlCount[0]?.c ?? 0) === 0) {
    for (const n of SEED_NEWSLETTERS) {
      await sql`
        INSERT INTO newsletters (title, month, year, pdf_url, download_name, is_active)
        VALUES (${n.title}, ${n.month}, ${n.year}, ${n.pdf_url}, ${n.download_name}, TRUE)
        ON CONFLICT (month, year) DO NOTHING
      `
    }
    result.newsletters = SEED_NEWSLETTERS.length
  }

  return result
}

export async function GET() {
  try {
    const seeded = await runSeed()
    const counts = await Promise.all([
      sql`SELECT COUNT(*)::int AS c FROM products`,
      sql`SELECT COUNT(*)::int AS c FROM courses`,
      sql`SELECT COUNT(*)::int AS c FROM newsletters`,
      sql`SELECT COUNT(*)::int AS c FROM cities`,
      sql`SELECT COUNT(*)::int AS c FROM categories`,
    ])
    return NextResponse.json({
      success: true,
      seeded,
      totals: {
        products: counts[0][0].c,
        courses: counts[1][0].c,
        newsletters: counts[2][0].c,
        cities: counts[3][0].c,
        categories: counts[4][0].c,
      },
    })
  } catch (error) {
    console.error("[v0] Seed error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export const POST = GET
