import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Calendar, User, Clock, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next/types"

// Add specific metadata for the Blog listing page.
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore the Chocolate Academy Pakistan blog for articles on chocolate tempering, pastry recipes, academy life, chocolate history, and health benefits.",
  keywords: [
    "Chocolate Blog Pakistan",
    "Chocolate Making Tips",
    "Pastry Recipes",
    "Chocolate History",
    "Culinary Articles",
    "Baking Blog",
  ],
  openGraph: {
    title: "Our Blog | Chocolate Academy Pakistan",
    description:
      "Explore the Chocolate Academy Pakistan blog for articles on chocolate tempering, pastry recipes, academy life, chocolate history, and health benefits.",
    url: "https://chocolateacademy.com.pk/blog",
    images: [
      {
        url: "/images/blog/blog-banner.png", // Use a relevant image for the Blog page
        width: 1200,
        height: 630,
        alt: "Chocolate Academy Blog",
      },
    ],
    type: "website",
  },
}

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Art of Chocolate Tempering: A Beginner's Guide",
    slug: "art-of-chocolate-tempering",
    excerpt:
      "Learn the essential techniques for perfectly tempered chocolate that has a beautiful shine and satisfying snap.",
    content: "",
    image: "/images/blog/tempering-chocolate.png",
    author: "Chef Faiza",
    date: "April 15, 2025",
    category: "Techniques",
    tags: ["Tempering", "Basics", "Chocolate Making"],
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "5 Creative Chocolate Bonbon Fillings to Try This Season",
    slug: "creative-bonbon-fillings",
    excerpt:
      "Explore innovative flavor combinations that will elevate your chocolate bonbons from ordinary to extraordinary.",
    content: "",
    image: "/images/blog/bonbon-fillings.png",
    author: "Chef Simran",
    date: "April 10, 2025",
    category: "Recipes",
    tags: ["Bonbons", "Fillings", "Creative"],
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Behind the Scenes: A Day in the Life of a Chocolate Academy Student",
    slug: "day-in-life-chocolate-student",
    excerpt:
      "Follow along as we document a typical day for students enrolled in our Grand Diploma in Chocolate & Pastry program.",
    content: "",
    image: "/images/blog/student-life.png",
    author: "Marketing Team",
    date: "April 5, 2025",
    category: "Academy Life",
    tags: ["Student Experience", "Education", "Behind the Scenes"],
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 4,
    title: "The History of Chocolate: From Ancient Mesoamerica to Modern Confections",
    slug: "history-of-chocolate",
    excerpt:
      "Discover the fascinating journey of chocolate through time and how it evolved from a bitter ceremonial drink to the sweet treat we love today.",
    content: "",
    image: "/images/blog/chocolate-history.png",
    author: "Dr. Ahmed Khan",
    date: "March 28, 2025",
    category: "History",
    tags: ["History", "Culture", "Education"],
    readTime: "12 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Sustainable Chocolate: How to Make Ethical Choices",
    slug: "sustainable-chocolate",
    excerpt:
      "Learn about the environmental and social impact of chocolate production and how to choose sustainably sourced chocolate.",
    content: "",
    image: "/images/blog/sustainable-chocolate.png",
    author: "Sustainability Team",
    date: "March 20, 2025",
    category: "Sustainability",
    tags: ["Ethical", "Sustainable", "Environment"],
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Chocolate and Health: Separating Fact from Fiction",
    slug: "chocolate-and-health",
    excerpt:
      "Explore the scientific research behind chocolate's health benefits and learn how to incorporate it into a balanced diet.",
    content: "",
    image: "/images/blog/chocolate-health.png",
    author: "Nutritionist Fatima",
    date: "March 15, 2025",
    category: "Health",
    tags: ["Nutrition", "Health Benefits", "Wellness"],
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 7,
    title: "Chocolate Pairing Guide: Finding Perfect Flavor Companions",
    slug: "chocolate-pairing-guide",
    excerpt:
      "Discover how to pair different types of chocolate with wines, cheeses, fruits, and more for an elevated tasting experience.",
    content: "",
    image: "/images/blog/chocolate-pairing.png",
    author: "Chef Abdul Rahman",
    date: "March 8, 2025",
    category: "Tasting",
    tags: ["Pairing", "Flavors", "Gourmet"],
    readTime: "8 min read",
    featured: false,
  },
  {
    id: 8,
    title: "Chocolate Decoration Techniques for Special Occasions",
    slug: "decoration-techniques",
    excerpt:
      "Master the art of chocolate decorations with these professional techniques that will impress your guests at any celebration.",
    content: "",
    image: "/images/blog/chocolate-decoration.png",
    author: "Chef Sameer",
    date: "March 1, 2025",
    category: "Techniques",
    tags: ["Decoration", "Special Occasions", "Advanced"],
    readTime: "11 min read",
    featured: false,
  },
]

// Blog categories
const categories = [
  { name: "Techniques", count: 12 },
  { name: "Recipes", count: 18 },
  { name: "Academy Life", count: 7 },
  { name: "History", count: 5 },
  { name: "Sustainability", count: 6 },
  { name: "Health", count: 9 },
  { name: "Tasting", count: 8 },
]

// Popular tags
const popularTags = [
  "Chocolate Making",
  "Tempering",
  "Recipes",
  "Bonbons",
  "Sustainability",
  "Health Benefits",
  "Techniques",
  "Pairing",
  "Education",
]

export default function BlogPage() {
  // Featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured)
  // Regular posts (non-featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/images/blog/blog-banner.png"
          alt="Chocolate Academy Blog"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Blog</span>
          </div>
        </div>
        {/* Decorative chocolate drip */}
        <div className="absolute -bottom-3 left-0 w-full overflow-hidden h-3">
          <div
            className="w-full h-12"
            style={{
              backgroundImage: "url('/images/chocolate-drip.png')",
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
            }}
          ></div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3c2415]">Featured Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-500 hover:bg-amber-600">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold mb-3 text-[#3c2415] hover:text-amber-800 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button className="bg-[#3c2415] hover:bg-[#5a3a28] text-white">Read More</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-8 text-[#3c2415]">Latest Articles</h2>

              <div className="space-y-8">
                {regularPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col md:flex-row gap-6 bg-[#fdf6f0] rounded-lg overflow-hidden"
                  >
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Badge className="bg-amber-500 hover:bg-amber-600 mr-3">{post.category}</Badge>
                        <div className="flex items-center mr-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-bold mb-3 text-[#3c2415] hover:text-amber-800 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-700 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#3c2415] rounded-full flex items-center justify-center text-white mr-2">
                            <span>{post.author.charAt(0)}</span>
                          </div>
                          <span className="text-sm text-gray-700">{post.author}</span>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button
                            variant="outline"
                            className="text-[#3c2415] border-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                          >
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                    disabled
                  >
                    Previous
                  </Button>
                  <Button className="bg-[#3c2415] text-white">1</Button>
                  <Button
                    variant="outline"
                    className="border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                  >
                    3
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3">
              {/* Search */}
              <div className="bg-[#fdf6f0] p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-lg font-bold mb-4 text-[#3c2415]">Search</h3>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pr-10 border-[#3c2415] focus-visible:ring-amber-500"
                  />
                  <Button className="absolute right-0 top-0 h-full bg-[#3c2415] hover:bg-[#5a3a28] rounded-l-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-[#fdf6f0] p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-lg font-bold mb-4 text-[#3c2415]">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex justify-between items-center text-gray-700 hover:text-amber-800 transition-colors"
                      >
                        <span>{category.name}</span>
                        <span className="bg-[#3c2415] text-white text-xs px-2 py-1 rounded-full">{category.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="bg-[#fdf6f0] p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-lg font-bold mb-4 text-[#3c2415]">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-white text-[#3c2415] text-xs px-3 py-1 rounded-full hover:bg-[#3c2415] hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-[#3c2415] p-6 rounded-lg shadow-md text-white">
                <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-sm mb-4">
                  Stay updated with our latest articles, recipes, and chocolate-making tips.
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-white/90 text-black placeholder:text-gray-500"
                  />
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#3c2415]">Want to Learn More?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Join our chocolate-making workshops and courses to deepen your knowledge and skills in the art of chocolate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses/workshops">
              <Button className="bg-[#3c2415] hover:bg-[#5a3a28] text-white">Explore Our Courses</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
