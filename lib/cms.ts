import "server-only"
import { sql, ensureSchema } from "./db"

// ---------- Types ----------
export type City = {
  id: number
  name: string
  slug: string
  whatsapp_number: string
  is_active: boolean
  sort_order: number
}

export type Category = {
  id: number
  name: string
  slug: string
  is_active: boolean
  sort_order: number
}

export type CmsProduct = {
  id: number
  name: string
  slug: string
  description: string
  price: number
  image: string
  category: string
  weight: string | null
  sku: string | null
  rating: number
  discount: number
  is_new: boolean
  featured: boolean
  is_active: boolean
  city_slugs: string[]
  sort_order: number
}

export type CmsCourse = {
  id: number
  slug: string
  title: string
  description: string
  image: string
  duration: string
  level: string
  certification: string
  fee: number
  register_url: string
  highlights: string[]
  program_overview: string
  detailed_curriculum: string
  is_active: boolean
  sort_order: number
}

export type Newsletter = {
  id: number
  title: string
  month: string
  year: number
  pdf_url: string
  download_name: string
  description: string
  is_active: boolean
}

export type CourseInquiry = {
  id: number
  full_name: string | null
  email: string | null
  phone: string | null
  city: string | null
  course: string | null
  payment_method: string | null
  message: string | null
  created_at: string
}

// ---------- Cities ----------
export async function getCities(activeOnly = false): Promise<City[]> {
  await ensureSchema()
  const rows = activeOnly
    ? await sql`SELECT * FROM cities WHERE is_active = TRUE ORDER BY sort_order, name`
    : await sql`SELECT * FROM cities ORDER BY sort_order, name`
  return rows as City[]
}

export async function createCity(data: { name: string; whatsapp_number: string; is_active?: boolean }) {
  await ensureSchema()
  const slug = slugify(data.name)
  const rows = await sql`
    INSERT INTO cities (name, slug, whatsapp_number, is_active)
    VALUES (${data.name}, ${slug}, ${data.whatsapp_number}, ${data.is_active ?? true})
    RETURNING *
  `
  return rows[0] as City
}

export async function updateCity(
  id: number,
  data: { name: string; whatsapp_number: string; is_active: boolean },
) {
  await ensureSchema()
  const slug = slugify(data.name)
  const rows = await sql`
    UPDATE cities
    SET name = ${data.name}, slug = ${slug}, whatsapp_number = ${data.whatsapp_number}, is_active = ${data.is_active}
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] as City
}

export async function deleteCity(id: number) {
  await ensureSchema()
  await sql`DELETE FROM cities WHERE id = ${id}`
}

// ---------- Categories ----------
export async function getCategories(activeOnly = false): Promise<Category[]> {
  await ensureSchema()
  const rows = activeOnly
    ? await sql`SELECT * FROM categories WHERE is_active = TRUE ORDER BY sort_order, name`
    : await sql`SELECT * FROM categories ORDER BY sort_order, name`
  return rows as Category[]
}

export async function createCategory(data: { name: string; is_active?: boolean }) {
  await ensureSchema()
  const slug = slugify(data.name)
  const rows = await sql`
    INSERT INTO categories (name, slug, is_active)
    VALUES (${data.name}, ${slug}, ${data.is_active ?? true})
    RETURNING *
  `
  return rows[0] as Category
}

export async function updateCategory(id: number, data: { name: string; is_active: boolean }) {
  await ensureSchema()
  const slug = slugify(data.name)
  const rows = await sql`
    UPDATE categories
    SET name = ${data.name}, slug = ${slug}, is_active = ${data.is_active}
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] as Category
}

export async function deleteCategory(id: number) {
  await ensureSchema()
  await sql`DELETE FROM categories WHERE id = ${id}`
}

// ---------- Products ----------
export async function getProducts(activeOnly = false): Promise<CmsProduct[]> {
  await ensureSchema()
  const rows = activeOnly
    ? await sql`SELECT * FROM products WHERE is_active = TRUE ORDER BY sort_order, id`
    : await sql`SELECT * FROM products ORDER BY sort_order, id`
  return rows as CmsProduct[]
}

export async function getProductBySlug(slug: string): Promise<CmsProduct | null> {
  await ensureSchema()
  const rows = await sql`SELECT * FROM products WHERE slug = ${slug} AND is_active = TRUE LIMIT 1`
  return (rows[0] as CmsProduct) ?? null
}

type ProductInput = {
  name: string
  slug?: string
  description: string
  price: number
  image: string
  category: string
  weight?: string | null
  sku?: string | null
  rating?: number
  discount?: number
  is_new?: boolean
  featured?: boolean
  is_active?: boolean
  city_slugs?: string[]
}

export async function createProduct(data: ProductInput) {
  await ensureSchema()
  const slug = data.slug ? slugify(data.slug) : slugify(data.name)
  const rows = await sql`
    INSERT INTO products (name, slug, description, price, image, category, weight, sku, rating, discount, is_new, featured, is_active, city_slugs)
    VALUES (
      ${data.name}, ${slug}, ${data.description}, ${data.price}, ${data.image}, ${data.category},
      ${data.weight ?? null}, ${data.sku ?? null}, ${data.rating ?? 5}, ${data.discount ?? 0},
      ${data.is_new ?? false}, ${data.featured ?? false}, ${data.is_active ?? true}, ${data.city_slugs ?? []}
    )
    RETURNING *
  `
  return rows[0] as CmsProduct
}

export async function updateProduct(id: number, data: ProductInput) {
  await ensureSchema()
  const slug = data.slug ? slugify(data.slug) : slugify(data.name)
  const rows = await sql`
    UPDATE products SET
      name = ${data.name}, slug = ${slug}, description = ${data.description}, price = ${data.price},
      image = ${data.image}, category = ${data.category}, weight = ${data.weight ?? null}, sku = ${data.sku ?? null},
      rating = ${data.rating ?? 5}, discount = ${data.discount ?? 0}, is_new = ${data.is_new ?? false},
      featured = ${data.featured ?? false}, is_active = ${data.is_active ?? true}, city_slugs = ${data.city_slugs ?? []},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] as CmsProduct
}

export async function setProductActive(id: number, isActive: boolean) {
  await ensureSchema()
  await sql`UPDATE products SET is_active = ${isActive}, updated_at = NOW() WHERE id = ${id}`
}

export async function deleteProduct(id: number) {
  await ensureSchema()
  await sql`DELETE FROM products WHERE id = ${id}`
}

// ---------- Courses ----------
export async function getCourses(activeOnly = false): Promise<CmsCourse[]> {
  await ensureSchema()
  const rows = activeOnly
    ? await sql`SELECT * FROM courses WHERE is_active = TRUE ORDER BY sort_order, id`
    : await sql`SELECT * FROM courses ORDER BY sort_order, id`
  return rows as CmsCourse[]
}

export async function getCourseBySlug(slug: string): Promise<CmsCourse | null> {
  await ensureSchema()
  const rows = await sql`SELECT * FROM courses WHERE slug = ${slug} AND is_active = TRUE LIMIT 1`
  return (rows[0] as CmsCourse) ?? null
}

type CourseInput = {
  slug?: string
  title: string
  description: string
  image: string
  duration: string
  level: string
  certification: string
  fee: number
  register_url: string
  highlights: string[]
  program_overview: string
  detailed_curriculum: string
  is_active?: boolean
}

export async function createCourse(data: CourseInput) {
  await ensureSchema()
  const slug = data.slug ? slugify(data.slug) : slugify(data.title)
  const rows = await sql`
    INSERT INTO courses (slug, title, description, image, duration, level, certification, fee, register_url, highlights, program_overview, detailed_curriculum, is_active)
    VALUES (
      ${slug}, ${data.title}, ${data.description}, ${data.image}, ${data.duration}, ${data.level},
      ${data.certification}, ${data.fee}, ${data.register_url}, ${data.highlights}, ${data.program_overview},
      ${data.detailed_curriculum}, ${data.is_active ?? true}
    )
    RETURNING *
  `
  return rows[0] as CmsCourse
}

export async function updateCourse(id: number, data: CourseInput) {
  await ensureSchema()
  const slug = data.slug ? slugify(data.slug) : slugify(data.title)
  const rows = await sql`
    UPDATE courses SET
      slug = ${slug}, title = ${data.title}, description = ${data.description}, image = ${data.image},
      duration = ${data.duration}, level = ${data.level}, certification = ${data.certification}, fee = ${data.fee},
      register_url = ${data.register_url}, highlights = ${data.highlights}, program_overview = ${data.program_overview},
      detailed_curriculum = ${data.detailed_curriculum}, is_active = ${data.is_active ?? true}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] as CmsCourse
}

export async function setCourseActive(id: number, isActive: boolean) {
  await ensureSchema()
  await sql`UPDATE courses SET is_active = ${isActive}, updated_at = NOW() WHERE id = ${id}`
}

export async function deleteCourse(id: number) {
  await ensureSchema()
  await sql`DELETE FROM courses WHERE id = ${id}`
}

// ---------- Newsletters ----------
export async function getNewsletters(activeOnly = false): Promise<Newsletter[]> {
  await ensureSchema()
  const rows = activeOnly
    ? await sql`SELECT * FROM newsletters WHERE is_active = TRUE ORDER BY year DESC, created_at DESC`
    : await sql`SELECT * FROM newsletters ORDER BY year DESC, created_at DESC`
  return rows as Newsletter[]
}

type NewsletterInput = {
  title: string
  month: string
  year: number
  pdf_url: string
  download_name: string
  description?: string
  is_active?: boolean
}

export async function createNewsletter(data: NewsletterInput) {
  await ensureSchema()
  const rows = await sql`
    INSERT INTO newsletters (title, month, year, pdf_url, download_name, description, is_active)
    VALUES (${data.title}, ${data.month}, ${data.year}, ${data.pdf_url}, ${data.download_name}, ${data.description ?? ""}, ${data.is_active ?? true})
    ON CONFLICT (month, year) DO UPDATE SET
      title = EXCLUDED.title, pdf_url = EXCLUDED.pdf_url, download_name = EXCLUDED.download_name,
      description = EXCLUDED.description, is_active = EXCLUDED.is_active, updated_at = NOW()
    RETURNING *
  `
  return rows[0] as Newsletter
}

export async function updateNewsletter(id: number, data: NewsletterInput) {
  await ensureSchema()
  const rows = await sql`
    UPDATE newsletters SET
      title = ${data.title}, month = ${data.month}, year = ${data.year}, pdf_url = ${data.pdf_url},
      download_name = ${data.download_name}, description = ${data.description ?? ""}, is_active = ${data.is_active ?? true},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] as Newsletter
}

export async function setNewsletterActive(id: number, isActive: boolean) {
  await ensureSchema()
  await sql`UPDATE newsletters SET is_active = ${isActive}, updated_at = NOW() WHERE id = ${id}`
}

export async function deleteNewsletter(id: number) {
  await ensureSchema()
  await sql`DELETE FROM newsletters WHERE id = ${id}`
}

// ---------- Inquiries / Reports ----------
export async function getCourseInquiries(limit = 500): Promise<CourseInquiry[]> {
  await ensureSchema()
  const rows = await sql`SELECT * FROM course_inquiries ORDER BY created_at DESC LIMIT ${limit}`
  return rows as CourseInquiry[]
}

export async function createCourseInquiry(data: {
  full_name?: string
  email?: string
  phone?: string
  city?: string
  course?: string
  payment_method?: string
  message?: string
}) {
  await ensureSchema()
  const rows = await sql`
    INSERT INTO course_inquiries (full_name, email, phone, city, course, payment_method, message)
    VALUES (${data.full_name ?? null}, ${data.email ?? null}, ${data.phone ?? null}, ${data.city ?? null},
      ${data.course ?? null}, ${data.payment_method ?? null}, ${data.message ?? null})
    RETURNING *
  `
  return rows[0] as CourseInquiry
}

// ---------- Dashboard stats ----------
export type DashboardStats = {
  totalProducts: number
  activeProducts: number
  totalCourses: number
  activeCourses: number
  totalNewsletters: number
  totalWhatsappClicks: number
  totalInquiries: number
  clicksByCity: { city: string; count: number }[]
  clicksByDay: { day: string; count: number }[]
  topProducts: { product_name: string; count: number }[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await ensureSchema()

  const [
    productCounts,
    courseCounts,
    newsletterCount,
    clickCount,
    inquiryCount,
    clicksByCity,
    clicksByDay,
    topProducts,
  ] = await Promise.all([
    sql`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE is_active)::int AS active FROM products`,
    sql`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE is_active)::int AS active FROM courses`,
    sql`SELECT COUNT(*)::int AS total FROM newsletters`,
    sql`SELECT COUNT(*)::int AS total FROM whatsapp_clicks`,
    sql`SELECT COUNT(*)::int AS total FROM course_inquiries`,
    sql`SELECT COALESCE(NULLIF(city, ''), 'not-specified') AS city, COUNT(*)::int AS count
         FROM whatsapp_clicks GROUP BY 1 ORDER BY count DESC LIMIT 8`,
    sql`SELECT TO_CHAR(DATE_TRUNC('day', timestamp), 'YYYY-MM-DD') AS day, COUNT(*)::int AS count
         FROM whatsapp_clicks WHERE timestamp > NOW() - INTERVAL '30 days' GROUP BY 1 ORDER BY 1`,
    sql`SELECT COALESCE(NULLIF(product_name, ''), 'Unknown') AS product_name, COUNT(*)::int AS count
         FROM whatsapp_clicks GROUP BY 1 ORDER BY count DESC LIMIT 6`,
  ])

  return {
    totalProducts: productCounts[0]?.total ?? 0,
    activeProducts: productCounts[0]?.active ?? 0,
    totalCourses: courseCounts[0]?.total ?? 0,
    activeCourses: courseCounts[0]?.active ?? 0,
    totalNewsletters: newsletterCount[0]?.total ?? 0,
    totalWhatsappClicks: clickCount[0]?.total ?? 0,
    totalInquiries: inquiryCount[0]?.total ?? 0,
    clicksByCity: clicksByCity as { city: string; count: number }[],
    clicksByDay: clicksByDay as { day: string; count: number }[],
    topProducts: topProducts as { product_name: string; count: number }[],
  }
}

// ---------- Mappers (DB -> legacy public component shapes) ----------
export type PublicProduct = {
  id: number
  name: string
  slug: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  isNew: boolean
  featured: boolean
  discount: number
  sku: string
  weight?: string
  city_slugs: string[]
}

export function toPublicProduct(p: CmsProduct): PublicProduct {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: Number(p.price),
    image: p.image || "/placeholder.svg",
    category: p.category,
    rating: p.rating ?? 5,
    isNew: p.is_new,
    featured: p.featured,
    discount: p.discount ?? 0,
    sku: p.sku ?? "",
    weight: p.weight ?? undefined,
    city_slugs: p.city_slugs ?? [],
  }
}

// ---------- Utils ----------
export function slugify(input: string): string {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
