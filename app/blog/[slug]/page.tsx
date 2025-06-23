import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Calendar, Tag, Clock, Facebook, Twitter, Instagram, Share2 } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Blog posts data (simplified version of what would be in a database)
export const blogPosts = [
  {
    id: 1,
    title: "The Art of Chocolate Tempering: A Beginner's Guide",
    slug: "art-of-chocolate-tempering",
    excerpt:
      "Learn the essential techniques for perfectly tempered chocolate that has a beautiful shine and satisfying snap.",
    content: `
      <p>Chocolate tempering is one of the most crucial skills for any chocolate maker to master. Properly tempered chocolate has a beautiful shine, a satisfying snap, and melts smoothly in your mouth. In this guide, we'll walk you through the process step by step.</p>
      
      <h2>What is Tempering?</h2>
      
      <p>Tempering is the process of heating and cooling chocolate to specific temperatures to ensure that the cocoa butter crystals form in a stable, uniform way. When chocolate is properly tempered, it:</p>
      
      <ul>
        <li>Has a glossy, smooth appearance</li>
        <li>Breaks with a clean snap</li>
        <li>Contracts slightly when cooling, making it easy to remove from molds</li>
        <li>Doesn't melt immediately when touched</li>
        <li>Has a longer shelf life and better resistance to bloom</li>
      </ul>
      
      <h2>The Science Behind Tempering</h2>
      
      <p>Cocoa butter can crystallize in six different forms (I through VI), but only Form V produces the characteristics we desire in fine chocolate. Each crystal form has a different melting point, which is why temperature control is so important in the tempering process.</p>
      
      <h2>The Tempering Process</h2>
      
      <h3>Method 1: Seeding Method</h3>
      
      <p>This is the most common method used by professionals and home chocolatiers alike.</p>
      
      <ol>
        <li><strong>Melting:</strong> Heat your chocolate to 45-50°C (113-122°F) for dark chocolate, or 40-45°C (104-113°F) for milk and white chocolate. This melts all six crystal forms.</li>
        <li><strong>Cooling:</strong> Add finely chopped, already tempered chocolate (the "seed") to your melted chocolate. Stir continuously until the temperature drops to about 27-28°C (80-82°F) for dark chocolate, or 26-27°C (78-80°F) for milk and white chocolate.</li>
        <li><strong>Reheating:</strong> Gently warm the chocolate to 31-32°C (88-90°F) for dark chocolate, or 29-30°C (84-86°F) for milk and white chocolate. This eliminates any unstable crystals while preserving the Form V crystals.</li>
      </ol>
      
      <h3>Method 2: Tabling Method</h3>
      
      <p>This traditional method involves working the chocolate on a cool surface.</p>
      
      <ol>
        <li><strong>Melting:</strong> Heat your chocolate as in the seeding method.</li>
        <li><strong>Cooling:</strong> Pour about 2/3 of the melted chocolate onto a cool marble or granite surface. Using a scraper and palette knife, spread and gather the chocolate repeatedly until it begins to thicken.</li>
        <li><strong>Mixing:</strong> Return the thickened chocolate to the bowl with the remaining melted chocolate and stir until smooth.</li>
        <li><strong>Testing:</strong> Check the temperature to ensure it's in the correct working range.</li>
      </ol>
      
      <h2>Testing Your Temper</h2>
      
      <p>To check if your chocolate is properly tempered, dip a clean knife tip or piece of parchment paper into the chocolate and let it set at room temperature (not in the refrigerator). If it sets within 5 minutes, becomes glossy, and doesn't show streaks or spots, your chocolate is well-tempered.</p>
      
      <h2>Common Tempering Problems</h2>
      
      <ul>
        <li><strong>Blooming:</strong> White or grayish streaks on the surface, caused by improper tempering or temperature fluctuations during storage.</li>
        <li><strong>Soft texture:</strong> Chocolate doesn't snap cleanly, indicating insufficient Form V crystals.</li>
        <li><strong>Dull appearance:</strong> Lack of shine suggests improper crystal formation.</li>
      </ul>
      
      <h2>Practice Makes Perfect</h2>
      
      <p>Tempering chocolate is as much an art as it is a science. Don't be discouraged if your first few attempts aren't perfect. With practice and attention to detail, you'll soon be creating beautifully tempered chocolate creations that look and taste professional.</p>
      
      <p>Join us at Chocolate Academy Pakistan for hands-on tempering workshops where our expert instructors will guide you through the process and help you master this essential chocolate-making skill.</p>
    `,
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
    content: `
      <p>Chocolate bonbons are the perfect canvas for creative flavor combinations. While traditional fillings like caramel and ganache are always delicious, experimenting with unique ingredients can elevate your chocolate creations to new heights. Here are five innovative bonbon fillings to try this season.</p>
      
      <h2>1. Cardamom-Infused Honey Caramel</h2>
      
      <p>This Middle Eastern-inspired filling combines the warm, aromatic notes of cardamom with the natural sweetness of honey for a sophisticated twist on classic caramel.</p>
      
      <h3>Key Ingredients:</h3>
      <ul>
        <li>High-quality honey (preferably a floral variety)</li>
        <li>Freshly ground cardamom</li>
        <li>Heavy cream</li>
        <li>A pinch of sea salt</li>
      </ul>
      
      <p>The cardamom should be toasted lightly before being steeped in the cream to extract maximum flavor. The honey adds complexity and reduces the risk of crystallization in your caramel.</p>
      
      <h2>2. Matcha and White Chocolate Ganache</h2>
      
      <p>The earthy, slightly bitter notes of matcha green tea powder create a beautiful contrast with sweet white chocolate. This filling not only tastes unique but also adds a stunning green color to your bonbons.</p>
      
      <h3>Key Ingredients:</h3>
      <ul>
        <li>Ceremonial grade matcha powder</li>
        <li>High-quality white chocolate</li>
        <li>Heavy cream</li>
        <li>A touch of vanilla</li>
      </ul>
      
      <p>For best results, sift the matcha powder before incorporating it into your ganache to avoid any lumps. The intensity of the matcha flavor can be adjusted according to your preference.</p>
      
      <h2>3. Saffron and Pistachio Praline</h2>
      
      <p>This luxurious filling combines two treasured ingredients from Persian cuisine. The floral notes of saffron complement the nutty richness of pistachio praline for an indulgent experience.</p>
      
      <h3>Key Ingredients:</h3>
      <ul>
        <li>Saffron threads</li>
        <li>Roasted pistachios</li>
        <li>Sugar</li>
        <li>A hint of rosewater (optional)</li>
      </ul>
      
      <p>Steep the saffron in warm cream before incorporating it into your white chocolate base. The pistachio praline should be made separately and then folded into the ganache for texture contrast.</p>
      
      <h2>4. Balsamic Fig Reduction</h2>
      
      <p>The complex sweetness of figs paired with the tangy depth of aged balsamic vinegar creates a sophisticated filling that pairs beautifully with dark chocolate shells.</p>
      
      <h3>Key Ingredients:</h3>
      <ul>
        <li>Dried or fresh figs</li>
        <li>Aged balsamic vinegar</li>
        <li>Brown sugar</li>
        <li>A sprig of rosemary</li>
      </ul>
      
      <p>Cook the figs down with the balsamic vinegar and sugar until you achieve a thick, jam-like consistency. The rosemary adds an aromatic note that elevates the entire composition.</p>
      
      <h2>5. Spiced Mango and Passion Fruit Caramel</h2>
      
      <p>This tropical filling brings a burst of sunshine to your bonbons with its vibrant flavors and slight acidity that cuts through the richness of chocolate.</p>
      
      <h3>Key Ingredients:</h3>
      <ul>
        <li>Ripe mango puree</li>
        <li>Passion fruit pulp</li>
        <li>Sugar</li>
        <li>A pinch of chili powder or Tajin seasoning</li>
      </ul>
      
      <p>The slight heat from the chili enhances the tropical fruit flavors without overwhelming them. This filling works particularly well with milk chocolate shells for a balanced flavor profile.</p>
      
      <h2>Tips for Working with Creative Fillings</h2>
      
      <ul>
        <li><strong>Water content:</strong> Be mindful of the water content in fruit-based fillings, as excess moisture can cause your chocolate to seize.</li>
        <li><strong>Shelf life:</strong> Some ingredients may reduce the shelf life of your bonbons. Consider adding natural preservatives like alcohol or increasing the sugar content for stability.</li>
        <li><strong>Balancing flavors:</strong> Always aim for balance in your flavor combinations. Even the most creative filling should complement, not overpower, the chocolate.</li>
        <li><strong>Testing:</strong> Before filling an entire batch of bonbons, test your filling with a small amount of chocolate to ensure the flavors work well together.</p>
      </ul>
      
      <p>Experimenting with unique bonbon fillings allows you to express your creativity and develop signature chocolates that stand out. Don't be afraid to combine unexpected ingredients—some of the most delightful culinary discoveries come from bold experimentation!</p>
    `,
    image: "/images/blog/bonbon-fillings.png",
    author: "Chef Simran",
    date: "April 10, 2025",
    category: "Recipes",
    tags: ["Bonbons", "Fillings", "Creative"],
    readTime: "6 min read",
    featured: true,
  },
]

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Not Found",
      description: "The blog post you are looking for does not exist.",
    }
  }

  const keywords = [...post.tags, post.category, "Chocolate Academy Blog", post.title, post.author].join(", ")

  return {
    title: post.title,
    description: post.excerpt,
    keywords: keywords,
    alternates: {
      canonical: `https://chocolateacademy.com.pk/blog/${post.slug}`, // Canonical tag
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://chocolateacademy.com.pk/blog/${post.slug}`,
      images: [
        {
          url: post.image || "/placeholder.svg", // Use the post's image
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      authors: [post.author],
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/placeholder.svg"],
    },
  }
}

// Related posts function
const getRelatedPosts = (currentSlug: string, category: string) => {
  return blogPosts.filter((post) => post.slug !== currentSlug && post.category === category).slice(0, 3)
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the post that matches the slug
  const post = blogPosts.find((post) => post.slug === params.slug)

  // If no post is found, return 404
  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPosts = getRelatedPosts(post.slug, post.category)

  // Structured Data for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image
      ? `https://chocolateacademy.com.pk${post.image}`
      : "https://chocolateacademy.com.pk/placeholder.svg",
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(), // Assuming no modification date, use published date
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Chocolate Academy Pakistan",
      logo: {
        "@type": "ImageObject",
        url: "https://chocolateacademy.com.pk/images/logo.png", // Replace with your actual logo URL
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://chocolateacademy.com.pk/blog/${post.slug}`,
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Add JSON-LD Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Page Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <Badge className="bg-amber-500 hover:bg-amber-600 mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-4xl">{post.title}</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/blog" className="hover:text-amber-400 transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">{post.title}</span>
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

      {/* Blog Post Content */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Post Meta */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-10 h-10 bg-[#3c2415] rounded-full flex items-center justify-center text-white mr-3">
                    <span>{post.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#3c2415]">{post.author}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-sm text-gray-500 mr-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full w-8 h-8 border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full w-8 h-8 border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full w-8 h-8 border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                    >
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full w-8 h-8 border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-8">
              <div
                className="prose prose-lg max-w-none prose-headings:text-[#3c2415] prose-a:text-amber-800 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-[#3c2415] mr-2" />
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-[#fdf6f0] text-[#3c2415] text-xs px-3 py-1 rounded-full hover:bg-[#3c2415] hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 bg-[#3c2415] rounded-full flex items-center justify-center text-white text-3xl">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#3c2415]">{post.author}</h3>
                <p className="text-gray-700 mb-4">
                  {post.author === "Chef Faiza"
                    ? "Chef Faiza is the head instructor at Chocolate Academy Pakistan with over 15 years of experience in chocolate making. She trained in Belgium and Switzerland before returning to Pakistan to share her expertise."
                    : post.author === "Chef Simran"
                      ? "Chef Simran specializes in creative chocolate and pastry designs. With a background in fine arts and culinary training from France, she brings a unique perspective to chocolate making."
                      : "A passionate chocolate expert at Chocolate Academy Pakistan, dedicated to sharing knowledge and inspiring creativity in the art of chocolate making."}
                </p>
                <Button className="bg-[#3c2415] hover:bg-[#5a3a28] text-white">View All Posts</Button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-8 text-[#3c2415]">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{relatedPost.date}</span>
                      </div>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <h3 className="font-bold mb-2 text-[#3c2415] hover:text-amber-800 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 text-[#3c2415] border-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#3c2415] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Enjoyed this article?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest chocolate-making tips, recipes, and news directly in your
            inbox.
          </p>
          <Link href="/blog">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">Back to Blog</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
