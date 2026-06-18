import type { MetadataRoute } from "next"

const BASE_URL = "https://chocolateacademy.com.pk"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default rule for all crawlers (Google, Bing, etc.)
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
      // Explicitly welcome AI assistants / answer engines so the brand is
      // discoverable from ChatGPT, Claude, Gemini, Perplexity, etc.
      { userAgent: "GPTBot", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "Claude-Web", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "Applebot-Extended", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "CCBot", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "Bytespider", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
