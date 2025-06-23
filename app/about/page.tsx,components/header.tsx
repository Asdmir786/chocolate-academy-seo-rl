\`\`\`tsx
// app/about/page.tsx
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Chocolate Academy Pakistan",
  description:
    "Learn more about Chocolate Academy Pakistan and our mission to provide world-class chocolate education.",
  openGraph: {
    title: "About Us - Chocolate Academy Pakistan",
    description:
      "Learn more about Chocolate Academy Pakistan and our mission to provide world-class chocolate education.",
    images: [
      {
        url: "/images/about/about-us.jpg",
        width: 1200,
        height: 630,
        alt: "Chocolate Academy Pakistan - About Us",
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <div className="relative h-[500px] w-full">
      <Image
        src="/images/about/about-us.jpg"
        alt="Chocolate Academy Pakistan – About us banner"
        fill
        className="object-cover brightness-75"
      />
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-white">About Us</h1>
      </div>
      <div className="container mx-auto mt-8 px-4">
        <p className="text-lg">
          Welcome to Chocolate Academy Pakistan, a leading institution dedicated to providing world-class chocolate
          education. Our mission is to empower pastry chefs, chocolatiers, and culinary enthusiasts with the knowledge
          and skills they need to excel in the art of chocolate.
        </p>
        <p className="text-lg mt-4">
          We offer a wide range of courses and workshops, from basic chocolate techniques to advanced pastry creations.
          Our experienced instructors are passionate about chocolate and committed to helping our students achieve their
          full potential.
        </p>
        <p className="text-lg mt-4">
          Join us at Chocolate Academy Pakistan and embark on a journey of chocolate discovery!
        </p>
      </div>
    </div>
  )
}
\`\`\`

\`\`\`tsx
// components/header.tsx
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-gray-800">
          Chocolate Academy Pakistan
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-600 hover:text-gray-800">
                About
              </a>
            </li>
            <li>
              <a href="/courses" className="text-gray-600 hover:text-gray-800">
                Courses
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-600 hover:text-gray-800">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="relative h-64 w-full">
        <Image
          src="/images/about/about-us.jpg"
          alt="Chocolate Academy Pakistan Hero"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Welcome to Chocolate Academy</h1>
        </div>
      </div>
    </header>
  );
}
\`\`\`
