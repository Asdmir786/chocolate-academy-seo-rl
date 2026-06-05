import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard, { type CityOption } from "@/components/product-card"
import ProductOrderBox from "@/components/product-order-box"
import { getProductBySlug, getProducts, getCities, toPublicProduct } from "@/lib/cms"

export const dynamic = "force-dynamic"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [cmsProduct, cmsCities, allCmsProducts] = await Promise.all([
    getProductBySlug(slug),
    getCities(true),
    getProducts(true),
  ])

  if (!cmsProduct) {
    notFound()
  }

  const product = toPublicProduct(cmsProduct)

  const allCities: CityOption[] = cmsCities.map((c) => ({
    name: c.name,
    slug: c.slug,
    whatsapp_number: c.whatsapp_number,
  }))
  const productCities =
    product.city_slugs && product.city_slugs.length > 0
      ? allCities.filter((c) => product.city_slugs.includes(c.slug))
      : allCities
  const cities = productCities.length > 0 ? productCities : allCities

  // Get related products (same category, excluding current product)
  const relatedProducts = allCmsProducts
    .map(toPublicProduct)
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Title Image with Centered Title and Breadcrumb */}
      <div className="w-full relative h-48 md:h-64 mb-4 flex items-center justify-center">
        <Image src="/images/shop.jpg" alt="Shop Page Title" fill className="object-cover" priority />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2 text-center">
            {product.name}
          </h1>
          <nav className="flex items-center space-x-2 text-lg">
            <Link href="/" className="text-white hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-5 w-5 text-white" />
            <Link href="/shop" className="text-white hover:text-amber-400 transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-5 w-5 text-white" />
            <Link
              href={`/shop#${product.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white hover:text-amber-400 transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-5 w-5 text-white" />
            <span className="text-amber-400">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden h-[400px]">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-[#3c2415] mb-2">{product.name}</h1>
                <div className="text-2xl font-bold text-amber-800 mb-6">Rs. {product.price.toLocaleString()}</div>

                <p className="text-gray-700 mb-6">{product.description}</p>

                <ProductOrderBox
                  productId={product.id}
                  productName={product.name}
                  productSlug={product.slug}
                  cities={cities}
                />

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col space-y-2">
                    <div className="flex">
                      <span className="text-gray-700 font-semibold w-24">Category:</span>
                      <span className="text-gray-600">{product.category}</span>
                    </div>
                    {product.weight && (
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-24">Weight:</span>
                        <span className="text-gray-600">{product.weight}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[#3c2415] relative inline-block">
            Related Products
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400"></span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <ProductCard
                key={rp.id}
                product={rp}
                cities={
                  rp.city_slugs && rp.city_slugs.length > 0
                    ? allCities.filter((c) => rp.city_slugs.includes(c.slug))
                    : allCities
                }
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
