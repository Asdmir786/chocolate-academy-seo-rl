"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

// Workshop data type
type Workshop = {
  id: string
  title: string
  duration: string
  charges: number
  certification: string
  instructor: string
  workshopDate: string
  city: string
  description?: string
  culinary: string[]
  baking: string[]
  modules?: string[]
  complementaryClasses?: string[]
  weeklySchedule?: { week: string; topics: string[] }[]
}

// Workshop data
const workshops: Workshop[] = [
  // Intensive Programs - Lahore Campus
  {
    id: "grand-diplome-chocolat-pattisserie-lhr",
    title: "Grand Diplome en Chocolat et Pattisserie",
    duration: "4 months",
    charges: 425000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Lahore",
    description: "A comprehensive 4-month program covering theory, techniques, advanced chocolate mastery, and entrepreneurship, preparing you for a successful culinary career.",
    modules: [
      "Theory and Techniques",
      "Cakes",
      "Pastry Passion",
      "French Patisserie",
      "Ice-Cream Delights",
      "Modern Desserts and Entremets",
      "Cake Decoration and Fondant Art",
      "Chocolate Mastery",
      "Artisan Bread",
      "Quick Breads",
      "Breakfast Creations",
      "Hi-TEA Delights",
      "Entrepreneurship Masterclasses",
      "Patisserie Showcase and Challenges"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "grand-diplome-culinary-finishing-lhr",
    title: "Grand Diplome en Culinary & Finishing Arts",
    duration: "16 weeks",
    charges: 450000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Pierre",
    workshopDate: "(Dec-January)24",
    city: "Lahore",
    description: "A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts.",
    modules: [
      "Essential Techniques",
      "Health-Focused Cuisine",
      "Soups, Salads, Sandwiches",
      "Taste of Asia",
      "Mediterranean Marvels",
      "Flavors of the World",
      "South Asian Delicacies",
      "Breakfast Globally",
      "Seafood Mastery",
      "Fast & Flavorful Temptations",
      "Art of Desserts",
      "Hi-TEA Delights",
      "Culinary Finesse",
      "Entrepreneurship Classes",
      "Culinary Showcase"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "barista-skills-lhr",
    title: "Barista Skills",
    duration: "5 weeks",
    charges: 75000,
    certification: "International Chocolate Academy",
    instructor: "Chef Sarah",
    workshopDate: "(Dec-January)24",
    city: "Lahore",
    description: "A comprehensive 5-week program covering essential barista skills, coffee techniques, and beverage preparation.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: ["Foundation of Barista Skills"]
      },
      {
        week: "Week 2",
        topics: ["Advanced Coffee Techniques"]
      },
      {
        week: "Week 3",
        topics: ["Specialty Beverages and Smoothies"]
      },
      {
        week: "Week 4",
        topics: ["Modern Dessert"]
      },
      {
        week: "Week 5",
        topics: ["Fast Food Fusion"]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "cake-decoration-fondant-lhr",
    title: "Cake Decoration and Fondant Art",
    duration: "1 month",
    charges: 75000,
    certification: "International Chocolate Academy",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Lahore",
    description: "This 4-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demands. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: [
          "Baking a cake using the creamy method",
          "Making cake icing from scratch",
          "Leveling cake layer, cake filling, crumb coating, and smooth frosting of cakes",
          "Stabilizing single heightened cake"
        ]
      },
      {
        week: "Week 2",
        topics: [
          "Making Fondant from Scratch",
          "Coloring the fondant",
          "Preserving the fondant",
          "Covering the cake with fondant",
          "Sharpening the fondant cake edges",
          "Using fondant tools in fondant decoration (roses, peony flowers, characters)"
        ]
      },
      {
        week: "Week 3",
        topics: [
          "Stabilizing two-tier cake with buttercream and fondant",
          "Making gravity-defying cake",
          "Character Molding and balancing",
          "3D Cake"
        ]
      },
      {
        week: "Week 4",
        topics: [
          "Learning to professionally stable three-tier cake with a stand",
          "Costing an overview of the business of baking",
          "The participants will cover two wedding cakes in three tiers",
          "3D Cake"
        ]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  // Lahore Campus Workshops
  {
    id: "kids-summer-camp-lhr",
    title: "Kids Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Lahore",
    description: "A fun and educational summer program designed for kids to learn basic cooking and baking skills in a safe and engaging environment.",
    culinary: [],
    baking: []
  },
  {
    id: "kids-teen-splash-lhr",
    title: "Kids Teen Splash",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Lahore",
    description: "An exciting program for teenagers to explore their culinary creativity and develop essential cooking and baking skills.",
    culinary: [],
    baking: []
  },
  {
    id: "winter-summer-camp-lhr",
    title: "Winter Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Lahore",
    description: "A comprehensive camp program combining winter and summer culinary activities for young aspiring chefs.",
    culinary: [],
    baking: []
  },
  // Islamabad Campus Programs
  {
    id: "grand-diplome-chocolat-pattisserie-isl",
    title: "Grand Diplome en Chocolat et Pattisserie",
    duration: "4 months",
    charges: 425000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Islamabad",
    description: "A comprehensive 4-month program covering theory, techniques, advanced chocolate mastery, and entrepreneurship, preparing you for a successful culinary career.",
    modules: [
      "Theory and Techniques",
      "Cakes",
      "Pastry Passion",
      "French Patisserie",
      "Ice-Cream Delights",
      "Modern Desserts and Entremets",
      "Cake Decoration and Fondant Art",
      "Chocolate Mastery",
      "Artisan Bread",
      "Quick Breads",
      "Breakfast Creations",
      "Hi-TEA Delights",
      "Entrepreneurship Masterclasses",
      "Patisserie Showcase and Challenges"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "grand-diplome-culinary-finishing-isl",
    title: "Grand Diplome en Culinary & Finishing Arts",
    duration: "16 weeks",
    charges: 450000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Pierre",
    workshopDate: "(Dec-January)24",
    city: "Islamabad",
    description: "A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts.",
    modules: [
      "Essential Techniques",
      "Health-Focused Cuisine",
      "Soups, Salads, Sandwiches",
      "Taste of Asia",
      "Mediterranean Marvels",
      "Flavors of the World",
      "South Asian Delicacies",
      "Breakfast Globally",
      "Seafood Mastery",
      "Fast & Flavorful Temptations",
      "Art of Desserts",
      "Hi-TEA Delights",
      "Culinary Finesse",
      "Entrepreneurship Classes",
      "Culinary Showcase"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "cake-decoration-fondant-isl",
    title: "Cake Decoration and Fondant Art",
    duration: "1 month",
    charges: 75000,
    certification: "International Chocolate Academy",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Islamabad",
    description: "This 4-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demands. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: [
          "Baking a cake using the creamy method",
          "Making cake icing from scratch",
          "Leveling cake layer, cake filling, crumb coating, and smooth frosting of cakes",
          "Stabilizing single heightened cake"
        ]
      },
      {
        week: "Week 2",
        topics: [
          "Making Fondant from Scratch",
          "Coloring the fondant",
          "Preserving the fondant",
          "Covering the cake with fondant",
          "Sharpening the fondant cake edges",
          "Using fondant tools in fondant decoration (roses, peony flowers, characters)"
        ]
      },
      {
        week: "Week 3",
        topics: [
          "Stabilizing two-tier cake with buttercream and fondant",
          "Making gravity-defying cake",
          "Character Molding and balancing",
          "3D Cake"
        ]
      },
      {
        week: "Week 4",
        topics: [
          "Learning to professionally stable three-tier cake with a stand",
          "Costing an overview of the business of baking",
          "The participants will cover two wedding cakes in three tiers",
          "3D Cake"
        ]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "certificate-chocolate-patisserie-isl",
    title: "Certificate in Chocolate and Patisserie",
    duration: "3 months",
    charges: 245000,
    certification: "GPDP DUBAI, TYPSY AUSTRALIA, HIGHFIELD UK, INTERNATIONAL CHOCOLATE ACADEMY",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Islamabad",
    description: "This 3-month course is designed for aspiring pastry chefs and dessert lovers, combining classic French techniques with modern trends. It covers a wide range of skills—from cakes and chocolates to breads and ice creams—offering both technical training and creative development.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: ["Theory & Techniques"]
      },
      {
        week: "Week 2",
        topics: ["Theory & Technique"]
      },
      {
        week: "Week 3",
        topics: ["Cakes"]
      },
      {
        week: "Week 4",
        topics: ["Fondant Art and Decoration"]
      },
      {
        week: "Week 5",
        topics: ["Pastry Passion & French Patisserie"]
      },
      {
        week: "Week 6",
        topics: ["Modern Desserts & Entremets"]
      },
      {
        week: "Week 7",
        topics: ["Ice-Cream Delights"]
      },
      {
        week: "Week 8",
        topics: ["Chocolate Mastery"]
      },
      {
        week: "Week 9",
        topics: ["Artisan Bread & Quick Bread"]
      },
      {
        week: "Week 10",
        topics: ["Breakfast & Hi-TEA Delights"]
      },
      {
        week: "Week 11",
        topics: ["Complementary Classes"]
      },
      {
        week: "Week 12",
        topics: ["Patisserie Showcase and Challenges"]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  // Islamabad Kids Camps
  {
    id: "kids-summer-camp-isl",
    title: "Kids Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Islamabad",
    description: "A fun and educational summer program designed for kids to learn basic cooking and baking skills in a safe and engaging environment.",
    culinary: [],
    baking: []
  },
  {
    id: "kids-teen-splash-isl",
    title: "Kids Teen Splash",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Islamabad",
    description: "An exciting program for teenagers to explore their culinary creativity and develop essential cooking and baking skills.",
    culinary: [],
    baking: []
  },
  {
    id: "winter-summer-camp-isl",
    title: "Winter Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Islamabad",
    description: "A comprehensive camp program combining winter and summer culinary activities for young aspiring chefs.",
    culinary: [],
    baking: []
  },
  // Rawalpindi Campus Programs
  {
    id: "grand-diplome-chocolat-pattisserie-rwp",
    title: "Grand Diplome en Chocolat et Pattisserie",
    duration: "4 months",
    charges: 425000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Rawalpindi",
    description: "A comprehensive 4-month program covering theory, techniques, advanced chocolate mastery, and entrepreneurship, preparing you for a successful culinary career.",
    modules: [
      "Theory and Techniques",
      "Cakes",
      "Pastry Passion",
      "French Patisserie",
      "Ice-Cream Delights",
      "Modern Desserts and Entremets",
      "Cake Decoration and Fondant Art",
      "Chocolate Mastery",
      "Artisan Bread",
      "Quick Breads",
      "Breakfast Creations",
      "Hi-TEA Delights",
      "Entrepreneurship Masterclasses",
      "Patisserie Showcase and Challenges"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "grand-diplome-culinary-finishing-rwp",
    title: "Grand Diplome en Culinary & Finishing Arts",
    duration: "16 weeks",
    charges: 450000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Pierre",
    workshopDate: "(Dec-January)24",
    city: "Rawalpindi",
    description: "A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts.",
    modules: [
      "Essential Techniques",
      "Health-Focused Cuisine",
      "Soups, Salads, Sandwiches",
      "Taste of Asia",
      "Mediterranean Marvels",
      "Flavors of the World",
      "South Asian Delicacies",
      "Breakfast Globally",
      "Seafood Mastery",
      "Fast & Flavorful Temptations",
      "Art of Desserts",
      "Hi-TEA Delights",
      "Culinary Finesse",
      "Entrepreneurship Classes",
      "Culinary Showcase"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "cake-decoration-fondant-rwp",
    title: "Cake Decoration and Fondant Art",
    duration: "1 month",
    charges: 75000,
    certification: "International Chocolate Academy",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Rawalpindi",
    description: "This 4-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demands. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: [
          "Baking a cake using the creamy method",
          "Making cake icing from scratch",
          "Leveling cake layer, cake filling, crumb coating, and smooth frosting of cakes",
          "Stabilizing single heightened cake"
        ]
      },
      {
        week: "Week 2",
        topics: [
          "Making Fondant from Scratch",
          "Coloring the fondant",
          "Preserving the fondant",
          "Covering the cake with fondant",
          "Sharpening the fondant cake edges",
          "Using fondant tools in fondant decoration (roses, peony flowers, characters)"
        ]
      },
      {
        week: "Week 3",
        topics: [
          "Stabilizing two-tier cake with buttercream and fondant",
          "Making gravity-defying cake",
          "Character Molding and balancing",
          "3D Cake"
        ]
      },
      {
        week: "Week 4",
        topics: [
          "Learning to professionally stable three-tier cake with a stand",
          "Costing an overview of the business of baking",
          "The participants will cover two wedding cakes in three tiers",
          "3D Cake"
        ]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "certificate-chocolate-patisserie-rwp",
    title: "Certificate in Chocolate and Patisserie",
    duration: "3 months",
    charges: 245000,
    certification: "GPDP DUBAI, TYPSY AUSTRALIA, HIGHFIELD UK, INTERNATIONAL CHOCOLATE ACADEMY",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Rawalpindi",
    description: "This 3-month course is designed for aspiring pastry chefs and dessert lovers, combining classic French techniques with modern trends. It covers a wide range of skills—from cakes and chocolates to breads and ice creams—offering both technical training and creative development.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: ["Theory & Techniques"]
      },
      {
        week: "Week 2",
        topics: ["Theory & Technique"]
      },
      {
        week: "Week 3",
        topics: ["Cakes"]
      },
      {
        week: "Week 4",
        topics: ["Fondant Art and Decoration"]
      },
      {
        week: "Week 5",
        topics: ["Pastry Passion & French Patisserie"]
      },
      {
        week: "Week 6",
        topics: ["Modern Desserts & Entremets"]
      },
      {
        week: "Week 7",
        topics: ["Ice-Cream Delights"]
      },
      {
        week: "Week 8",
        topics: ["Chocolate Mastery"]
      },
      {
        week: "Week 9",
        topics: ["Artisan Bread & Quick Bread"]
      },
      {
        week: "Week 10",
        topics: ["Breakfast & Hi-TEA Delights"]
      },
      {
        week: "Week 11",
        topics: ["Complementary Classes"]
      },
      {
        week: "Week 12",
        topics: ["Patisserie Showcase and Challenges"]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  // Rawalpindi Kids Camps
  {
    id: "kids-summer-camp-rwp",
    title: "Kids Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Rawalpindi",
    description: "A fun and educational summer program designed for kids to learn basic cooking and baking skills in a safe and engaging environment.",
    culinary: [],
    baking: []
  },
  {
    id: "kids-teen-splash-rwp",
    title: "Kids Teen Splash",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Rawalpindi",
    description: "An exciting program for teenagers to explore their culinary creativity and develop essential cooking and baking skills.",
    culinary: [],
    baking: []
  },
  {
    id: "winter-summer-camp-rwp",
    title: "Winter Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Rawalpindi",
    description: "A comprehensive camp program combining winter and summer culinary activities for young aspiring chefs.",
    culinary: [],
    baking: []
  },
  // Faisalabad Campus Programs
  {
    id: "grand-diplome-chocolat-pattisserie-fsd",
    title: "Grand Diplome en Chocolat et Pattisserie",
    duration: "4 months",
    charges: 425000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Faisalabad",
    description: "A comprehensive 4-month program covering theory, techniques, advanced chocolate mastery, and entrepreneurship, preparing you for a successful culinary career.",
    modules: [
      "Theory and Techniques",
      "Cakes",
      "Pastry Passion",
      "French Patisserie",
      "Ice-Cream Delights",
      "Modern Desserts and Entremets",
      "Cake Decoration and Fondant Art",
      "Chocolate Mastery",
      "Artisan Bread",
      "Quick Breads",
      "Breakfast Creations",
      "Hi-TEA Delights",
      "Entrepreneurship Masterclasses",
      "Patisserie Showcase and Challenges"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "grand-diplome-culinary-finishing-fsd",
    title: "Grand Diplome en Culinary & Finishing Arts",
    duration: "16 weeks",
    charges: 450000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Pierre",
    workshopDate: "(Dec-January)24",
    city: "Faisalabad",
    description: "A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts.",
    modules: [
      "Essential Techniques",
      "Health-Focused Cuisine",
      "Soups, Salads, Sandwiches",
      "Taste of Asia",
      "Mediterranean Marvels",
      "Flavors of the World",
      "South Asian Delicacies",
      "Breakfast Globally",
      "Seafood Mastery",
      "Fast & Flavorful Temptations",
      "Art of Desserts",
      "Hi-TEA Delights",
      "Culinary Finesse",
      "Entrepreneurship Classes",
      "Culinary Showcase"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "cake-decoration-fondant-fsd",
    title: "Cake Decoration and Fondant Art",
    duration: "1 month",
    charges: 75000,
    certification: "International Chocolate Academy",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Faisalabad",
    description: "This 4-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demands. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute. The ultimate purpose of this 01-month course is to equip you with the basic and professional skills of handling fondant and buttercream.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: [
          "Baking a cake using the creamy method",
          "Making cake icing from scratch",
          "Leveling cake layer, cake filling, crumb coating, and smooth frosting of cakes",
          "Stabilizing single heightened cake"
        ]
      },
      {
        week: "Week 2",
        topics: [
          "Making Fondant from Scratch",
          "Coloring the fondant",
          "Preserving the fondant",
          "Covering the cake with fondant",
          "Sharpening the fondant cake edges",
          "Using fondant tools in fondant decoration (roses, peony flowers, characters)"
        ]
      },
      {
        week: "Week 3",
        topics: [
          "Stabilizing two-tier cake with buttercream and fondant",
          "Making gravity-defying cake",
          "Character Molding and balancing",
          "3D Cake"
        ]
      },
      {
        week: "Week 4",
        topics: [
          "Learning to professionally stable three-tier cake with a stand",
          "Costing an overview of the business of baking",
          "The participants will cover two wedding cakes in three tiers",
          "3D Cake"
        ]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "certificate-chocolate-patisserie-fsd",
    title: "Certificate in Chocolate and Patisserie",
    duration: "3 months",
    charges: 245000,
    certification: "GPDP DUBAI, TYPSY AUSTRALIA, HIGHFIELD UK, INTERNATIONAL CHOCOLATE ACADEMY",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Faisalabad",
    description: "This 3-month course is designed for aspiring pastry chefs and dessert lovers, combining classic French techniques with modern trends. It covers a wide range of skills—from cakes and chocolates to breads and ice creams—offering both technical training and creative development. Whether you're a beginner or experienced, the course helps you master pastry arts and explore the world of handcrafted desserts.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: ["Theory & Techniques"]
      },
      {
        week: "Week 2",
        topics: ["Theory & Techniques"]
      },
      {
        week: "Week 3",
        topics: ["Cakes"]
      },
      {
        week: "Week 4",
        topics: ["Fondant Art and Decoration"]
      },
      {
        week: "Week 5",
        topics: ["Pastry Passion & French Patisserie"]
      },
      {
        week: "Week 6",
        topics: ["Modern Desserts & Entremets"]
      },
      {
        week: "Week 7",
        topics: ["Ice-Cream Delights"]
      },
      {
        week: "Week 8",
        topics: ["Chocolate Mastery"]
      },
      {
        week: "Week 9",
        topics: ["Artisan Bread & Quick Bread"]
      },
      {
        week: "Week 10",
        topics: ["Breakfast & Hi-TEA Delights"]
      },
      {
        week: "Week 11",
        topics: ["Complementary Classes"]
      },
      {
        week: "Week 12",
        topics: ["Patisserie Showcase and Challenges"]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  // Faisalabad Kids Camps
  {
    id: "kids-summer-camp-fsd",
    title: "Kids Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Faisalabad",
    description: "A fun and educational summer program designed for kids to learn basic cooking and baking skills in a safe and engaging environment.",
    culinary: [],
    baking: []
  },
  {
    id: "kids-teen-splash-fsd",
    title: "Kids Teen Splash",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Faisalabad",
    description: "An exciting program for teenagers to explore their culinary creativity and develop essential cooking and baking skills.",
    culinary: [],
    baking: []
  },
  {
    id: "winter-summer-camp-fsd",
    title: "Winter Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Faisalabad",
    description: "A comprehensive camp program combining winter and summer culinary activities for young aspiring chefs.",
    culinary: [],
    baking: []
  },
  // Sarai Alamgir Campus Workshops
  {
    id: "kids-summer-camp-sarai",
    title: "Kids Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Sarai Alamgir",
    description: "A fun and educational summer program designed for kids to learn basic cooking and baking skills in a safe and engaging environment.",
    culinary: [],
    baking: []
  },
  {
    id: "kids-teen-splash-sarai",
    title: "Kids Teen Splash",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Sarai Alamgir",
    description: "An exciting program for teenagers to explore their culinary creativity and develop essential cooking and baking skills.",
    culinary: [],
    baking: []
  },
  {
    id: "winter-summer-camp-sarai",
    title: "Winter Summer Camp",
    duration: "1 month",
    charges: 40000,
    certification: "International Chocolate Academy",
    instructor: "Amna",
    workshopDate: "(Dec-January)24",
    city: "Sarai Alamgir",
    description: "A comprehensive camp program combining winter and summer culinary activities for young aspiring chefs.",
    culinary: [],
    baking: []
  },
  // Karachi Campus Programs
  {
    id: "grand-diplome-chocolat-pattisserie-khi",
    title: "Grand Diplome en Chocolat et Pattisserie",
    duration: "4 months",
    charges: 450000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Karachi",
    description: "A comprehensive 4-month program covering theory, techniques, advanced chocolate mastery, and entrepreneurship, preparing you for a successful culinary career.",
    modules: [
      "Theory and Techniques",
      "Cakes",
      "Pastry Passion",
      "French Patisserie",
      "Ice-Cream Delights",
      "Modern Desserts and Entremets",
      "Cake Decoration and Fondant Art",
      "Chocolate Mastery",
      "Artisan Bread",
      "Quick Breads",
      "Breakfast Creations",
      "Hi-TEA Delights",
      "Entrepreneurship Masterclasses",
      "Patisserie Showcase and Challenges"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "grand-diplome-culinary-finishing-khi",
    title: "Grand Diplome en Culinary & Finishing Arts",
    duration: "16 weeks",
    charges: 450000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Pierre",
    workshopDate: "(Dec-January)24",
    city: "Karachi",
    description: "A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts.",
    modules: [
      "Essential Techniques",
      "Health-Focused Cuisine",
      "Soups, Salads, Sandwiches",
      "Taste of Asia",
      "Mediterranean Marvels",
      "Flavors of the World",
      "South Asian Delicacies",
      "Breakfast Globally",
      "Seafood Mastery",
      "Fast & Flavorful Temptations",
      "Art of Desserts",
      "Hi-TEA Delights",
      "Culinary Finesse",
      "Entrepreneurship Classes",
      "Culinary Showcase"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "cake-decoration-fondant-khi",
    title: "Cake Decoration and Fondant Art",
    duration: "1 month",
    charges: 80000,
    certification: "International Chocolate Academy",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Karachi",
    description: "This 4-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demands. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: [
          "Baking a cake using the creamy method",
          "Making cake icing from scratch",
          "Leveling cake layer, cake filling, crumb coating, and smooth frosting of cakes",
          "Stabilizing single heightened cake"
        ]
      },
      {
        week: "Week 2",
        topics: [
          "Making Fondant from Scratch",
          "Coloring the fondant",
          "Preserving the fondant",
          "Covering the cake with fondant",
          "Sharpening the fondant cake edges",
          "Using fondant tools in fondant decoration (roses, peony flowers, characters)"
        ]
      },
      {
        week: "Week 3",
        topics: [
          "Stabilizing two-tier cake with buttercream and fondant",
          "Making gravity-defying cake",
          "Character Molding and balancing",
          "3D Cake"
        ]
      },
      {
        week: "Week 4",
        topics: [
          "Learning to professionally stable three-tier cake with a stand",
          "Costing an overview of the business of baking",
          "The participants will cover two wedding cakes in three tiers",
          "3D Cake"
        ]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "basic-baking-khi",
    title: "Basic Baking Course",
    duration: "1 month",
    charges: 42000,
    certification: "International Chocolate Academy",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Karachi",
    description: "A comprehensive one-month course covering essential baking techniques and recipes.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: [
          "British Butter Biscuits/NYC Cookies",
          "Marble Cake/Banana Cake/Fruit Cake/Lemon Cake",
          "Cupcake (Chocolate/Vanilla/Red Velvet)"
        ]
      },
      {
        week: "Week 2",
        topics: [
          "Brownie (Fudgy/Lotus)",
          "Tarts (Lemon/Fudge)",
          "Bento Pineapple Cake"
        ]
      },
      {
        week: "Week 3",
        topics: [
          "Puff Pastry (From Scratch)",
          "Puff Pastry (Chicken Patties/Veg/Tie Puff)",
          "Donuts (Glazed/Chocolate/Oreo)"
        ]
      },
      {
        week: "Week 4",
        topics: [
          "Biscuit Zeera/Ginger/Coconut Cookie",
          "Eclairs (Caramel/Coffee)",
          "Chocolate Fudge Cake"
        ]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "certificate-baking-mastery-khi",
    title: "Certificate in International Baking Mastery",
    duration: "2 months",
    charges: 105000,
    certification: "International Chocolate Academy",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Karachi",
    description: "An advanced 2-month program covering international baking techniques and specialized desserts.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: [
          "Gourmet Bakes & Fusion Treats",
          "Coffee Loaf Cake with Glazed and Almond Loaf Cake",
          "Brookie and Original and Almond Naan Khatai",
          "Basbousa and Crepe with Whipped Cream and Fresh Fruit Toppings"
        ]
      },
      {
        week: "Week 2",
        topics: [
          "The Art of Pastry: Sweet & Savory Creations",
          "Tart Crust with Apple Pie Filling and Lemon Meringue Filling",
          "Quiche Spinach/Chicken Filling and Churros with Sugar Coating and Dipping Sauce",
          "Mini Fruit Tarts with Pastry Cream Fresh Fruit and Glazed"
        ]
      },
      {
        week: "Week 3",
        topics: [
          "Velvet Layers & Piped Perfection",
          "Tiramisu Cake with Lady Finger",
          "Eclairs, Pistachio/Mango/Chocolate Filling",
          "Triple Layer Mousse Cake (Chocolate/Cappuccino/Vanilla)"
        ]
      },
      {
        week: "Week 4",
        topics: [
          "Cakes & Styling",
          "Honey Cake",
          "Swiss Roll (Mango/Cherry)",
          "Bombay Coffee Cake"
        ]
      },
      {
        week: "Week 5",
        topics: [
          "Pastry & Puff Adventure",
          "Handmade Puff Pastry, Chicken Pot Pie",
          "Palmier, Bakarkhani, Danish",
          "Waffles and Pancakes with Sauces and Fresh Fruit Toppings"
        ]
      },
      {
        week: "Week 6",
        topics: [
          "World Tour of Cheesecakes",
          "New York Cheesecake",
          "Japanese Cheesecake",
          "German Cheesecake"
        ]
      },
      {
        week: "Week 7",
        topics: [
          "Decorative Desserts",
          "Macarons Different Colors and Filling",
          "Panna Cotta (Strawberry/Banana/Mango)",
          "Boston Cream Doughnut Topped with Chocolate and Different Toppings"
        ]
      },
      {
        week: "Week 8",
        topics: [
          "Dough & Breads",
          "Handmade Dough of Stuffed Crust Pizza and Calzone",
          "Focaccia and French Baguette",
          "Papparoti Bun and Nutella Bread"
        ]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "graduate-diploma-khi",
    title: "Graduate Diploma",
    duration: "1 year",
    charges: 850000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Karachi",
    description: "A comprehensive one-year program covering advanced culinary and pastry techniques.",
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  // Add Sarai Alamgir Campus Programs after the existing Sarai Alamgir kids camps
  {
    id: "grand-diplome-chocolat-pattisserie-sarai",
    title: "Grand Diplome en Chocolat et Pattisserie",
    duration: "4 months",
    charges: 425000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Sarai Alamgir",
    description: "A comprehensive 4-month program covering theory, techniques, advanced chocolate mastery, and entrepreneurship, preparing you for a successful culinary career.",
    modules: [
      "Theory and Techniques",
      "Cakes",
      "Pastry Passion",
      "French Patisserie",
      "Ice-Cream Delights",
      "Modern Desserts and Entremets",
      "Cake Decoration and Fondant Art",
      "Chocolate Mastery",
      "Artisan Bread",
      "Quick Breads",
      "Breakfast Creations",
      "Hi-TEA Delights",
      "Entrepreneurship Masterclasses",
      "Patisserie Showcase and Challenges"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "grand-diplome-culinary-finishing-sarai",
    title: "Grand Diplome en Culinary & Finishing Arts",
    duration: "16 weeks",
    charges: 450000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Pierre",
    workshopDate: "(Dec-January)24",
    city: "Sarai Alamgir",
    description: "A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts.",
    modules: [
      "Essential Techniques",
      "Health-Focused Cuisine",
      "Soups, Salads, Sandwiches",
      "Taste of Asia",
      "Mediterranean Marvels",
      "Flavors of the World",
      "South Asian Delicacies",
      "Breakfast Globally",
      "Seafood Mastery",
      "Fast & Flavorful Temptations",
      "Art of Desserts",
      "Hi-TEA Delights",
      "Culinary Finesse",
      "Entrepreneurship Classes",
      "Culinary Showcase"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "barista-skills-sarai",
    title: "Barista Skills",
    duration: "5 weeks",
    charges: 75000,
    certification: "International Chocolate Academy",
    instructor: "Chef Sarah",
    workshopDate: "(Dec-January)24",
    city: "Sarai Alamgir",
    description: "A comprehensive 5-week program covering essential barista skills, coffee techniques, and beverage preparation.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: ["Foundation of Barista Skills"]
      },
      {
        week: "Week 2",
        topics: ["Advanced Coffee Techniques"]
      },
      {
        week: "Week 3",
        topics: ["Specialty Beverages and Smoothies"]
      },
      {
        week: "Week 4",
        topics: ["Modern Dessert"]
      },
      {
        week: "Week 5",
        topics: ["Fast Food Fusion"]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "cake-decoration-fondant-sarai",
    title: "Cake Decoration and Fondant Art",
    duration: "1 month",
    charges: 75000,
    certification: "International Chocolate Academy",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Sarai Alamgir",
    description: "This 4-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demands. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: [
          "Baking a cake using the creamy method",
          "Making cake icing from scratch",
          "Leveling cake layer, cake filling, crumb coating, and smooth frosting of cakes",
          "Stabilizing single heightened cake"
        ]
      },
      {
        week: "Week 2",
        topics: [
          "Making Fondant from Scratch",
          "Coloring the fondant",
          "Preserving the fondant",
          "Covering the cake with fondant",
          "Sharpening the fondant cake edges",
          "Using fondant tools in fondant decoration (roses, peony flowers, characters)"
        ]
      },
      {
        week: "Week 3",
        topics: [
          "Stabilizing two-tier cake with buttercream and fondant",
          "Making gravity-defying cake",
          "Character Molding and balancing",
          "3D Cake"
        ]
      },
      {
        week: "Week 4",
        topics: [
          "Learning to professionally stable three-tier cake with a stand",
          "Costing an overview of the business of baking",
          "The participants will cover two wedding cakes in three tiers",
          "3D Cake"
        ]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "certificate-chocolate-patisserie-sarai",
    title: "Certificate in Chocolate and Patisserie",
    duration: "3 months",
    charges: 245000,
    certification: "GPDP DUBAI, TYPSY AUSTRALIA, HIGHFIELD UK, INTERNATIONAL CHOCOLATE ACADEMY",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "Sarai Alamgir",
    description: "This 3-month course is designed for aspiring pastry chefs and dessert lovers, combining classic French techniques with modern trends. It covers a wide range of skills—from cakes and chocolates to breads and ice creams—offering both technical training and creative development.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: ["Theory & Techniques"]
      },
      {
        week: "Week 2",
        topics: ["Theory & Techniques"]
      },
      {
        week: "Week 3",
        topics: ["Cakes"]
      },
      {
        week: "Week 4",
        topics: ["Fondant Art and Decoration"]
      },
      {
        week: "Week 5",
        topics: ["Pastry Passion & French Patisserie"]
      },
      {
        week: "Week 6",
        topics: ["Modern Desserts & Entremets"]
      },
      {
        week: "Week 7",
        topics: ["Ice-Cream Delights"]
      },
      {
        week: "Week 8",
        topics: ["Chocolate Mastery"]
      },
      {
        week: "Week 9",
        topics: ["Artisan Bread & Quick Bread"]
      },
      {
        week: "Week 10",
        topics: ["Breakfast & Hi-TEA Delights"]
      },
      {
        week: "Week 11",
        topics: ["Complementary Classes"]
      },
      {
        week: "Week 12",
        topics: ["Patisserie Showcase and Challenges"]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  // Add DHA Campus Programs
  {
    id: "grand-diplome-chocolat-pattisserie-dha",
    title: "Grand Diplome en Chocolat et Pattisserie",
    duration: "4 months",
    charges: 425000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "DHA",
    description: "A comprehensive 4-month program covering theory, techniques, advanced chocolate mastery, and entrepreneurship, preparing you for a successful culinary career.",
    modules: [
      "Theory and Techniques",
      "Cakes",
      "Pastry Passion",
      "French Patisserie",
      "Ice-Cream Delights",
      "Modern Desserts and Entremets",
      "Cake Decoration and Fondant Art",
      "Chocolate Mastery",
      "Artisan Bread",
      "Quick Breads",
      "Breakfast Creations",
      "Hi-TEA Delights",
      "Entrepreneurship Masterclasses",
      "Patisserie Showcase and Challenges"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "grand-diplome-culinary-finishing-dha",
    title: "Grand Diplome en Culinary & Finishing Arts",
    duration: "16 weeks",
    charges: 450000,
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    instructor: "Chef Pierre",
    workshopDate: "(Dec-January)24",
    city: "DHA",
    description: "A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts.",
    modules: [
      "Essential Techniques",
      "Health-Focused Cuisine",
      "Soups, Salads, Sandwiches",
      "Taste of Asia",
      "Mediterranean Marvels",
      "Flavors of the World",
      "South Asian Delicacies",
      "Breakfast Globally",
      "Seafood Mastery",
      "Fast & Flavorful Temptations",
      "Art of Desserts",
      "Hi-TEA Delights",
      "Culinary Finesse",
      "Entrepreneurship Classes",
      "Culinary Showcase"
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "barista-skills-dha",
    title: "Barista Skills",
    duration: "5 weeks",
    charges: 75000,
    certification: "International Chocolate Academy",
    instructor: "Chef Sarah",
    workshopDate: "(Dec-January)24",
    city: "DHA",
    description: "A comprehensive 5-week program covering essential barista skills, coffee techniques, and beverage preparation.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: ["Foundation of Barista Skills"]
      },
      {
        week: "Week 2",
        topics: ["Advanced Coffee Techniques"]
      },
      {
        week: "Week 3",
        topics: ["Specialty Beverages and Smoothies"]
      },
      {
        week: "Week 4",
        topics: ["Modern Dessert"]
      },
      {
        week: "Week 5",
        topics: ["Fast Food Fusion"]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "cake-decoration-fondant-dha",
    title: "Cake Decoration and Fondant Art",
    duration: "1 month",
    charges: 75000,
    certification: "International Chocolate Academy",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "DHA",
    description: "This 4-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demands. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: [
          "Baking a cake using the creamy method",
          "Making cake icing from scratch",
          "Leveling cake layer, cake filling, crumb coating, and smooth frosting of cakes",
          "Stabilizing single heightened cake"
        ]
      },
      {
        week: "Week 2",
        topics: [
          "Making Fondant from Scratch",
          "Coloring the fondant",
          "Preserving the fondant",
          "Covering the cake with fondant",
          "Sharpening the fondant cake edges",
          "Using fondant tools in fondant decoration (roses, peony flowers, characters)"
        ]
      },
      {
        week: "Week 3",
        topics: [
          "Stabilizing two-tier cake with buttercream and fondant",
          "Making gravity-defying cake",
          "Character Molding and balancing",
          "3D Cake"
        ]
      },
      {
        week: "Week 4",
        topics: [
          "Learning to professionally stable three-tier cake with a stand",
          "Costing an overview of the business of baking",
          "The participants will cover two wedding cakes in three tiers",
          "3D Cake"
        ]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  },
  {
    id: "certificate-chocolate-patisserie-dha",
    title: "Certificate in Chocolate and Patisserie",
    duration: "3 months",
    charges: 245000,
    certification: "GPDP DUBAI, TYPSY AUSTRALIA, HIGHFIELD UK, INTERNATIONAL CHOCOLATE ACADEMY",
    instructor: "Chef Marie",
    workshopDate: "(Dec-January)24",
    city: "DHA",
    description: "This 3-month course is designed for aspiring pastry chefs and dessert lovers, combining classic French techniques with modern trends. It covers a wide range of skills—from cakes and chocolates to breads and ice creams—offering both technical training and creative development.",
    weeklySchedule: [
      {
        week: "Week 1",
        topics: ["Theory & Techniques"]
      },
      {
        week: "Week 2",
        topics: ["Theory & Techniques"]
      },
      {
        week: "Week 3",
        topics: ["Cakes"]
      },
      {
        week: "Week 4",
        topics: ["Fondant Art and Decoration"]
      },
      {
        week: "Week 5",
        topics: ["Pastry Passion & French Patisserie"]
      },
      {
        week: "Week 6",
        topics: ["Modern Desserts & Entremets"]
      },
      {
        week: "Week 7",
        topics: ["Ice-Cream Delights"]
      },
      {
        week: "Week 8",
        topics: ["Chocolate Mastery"]
      },
      {
        week: "Week 9",
        topics: ["Artisan Bread & Quick Bread"]
      },
      {
        week: "Week 10",
        topics: ["Breakfast & Hi-TEA Delights"]
      },
      {
        week: "Week 11",
        topics: ["Complementary Classes"]
      },
      {
        week: "Week 12",
        topics: ["Patisserie Showcase and Challenges"]
      }
    ],
    complementaryClasses: [
      "Business Support",
      "Social Media Marketing",
      "Food Safety & Hygiene"
    ],
    culinary: [],
    baking: []
  }
]

// Workshop Categories
const workshopCategories = {
  intensive: [
    "Grand Diplome en Chocolat et Pattisserie",
    "Grand Diplome en Culinary & Finishing Arts",
    "Certificate in Chocolate and Patisserie",
    "Certificate in International Baking Mastery",
    "Graduate Diploma",
    "Basic Baking Course",
    "Cake Decoration and Fondant Art"
  ],
  camps: [
    "Kids Summer Camp",
    "Kids Teen Splash",
    "Winter Summer Camp"
  ]
}

// Available Cities
const cities = ["Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Karachi", "DHA", "Sarai Alamgir"]

export default function WorkshopsPage() {
  const [selectedCity, setSelectedCity] = useState("All Campuses")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/Workshops-&-Courses.jpg"
          alt="Workshops"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Workshops</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
            Explore our range of professional chocolate and culinary workshops designed to enhance your skills
            and knowledge. From beginner to advanced levels, we offer courses for all skill levels.
          </p>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/courses" className="hover:text-amber-400 transition-colors">
              Courses
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Workshops</span>
          </div>
        </div>
      </section>

      {/* Workshop Categories */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          {/* Removed Workshop Categories */}
          {/*
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="bg-[#3c2415] hover:bg-[#5a3a28] text-white"
            >
              All Programs
            </Button>
            <Button
              variant={selectedCategory === "intensive" ? "default" : "outline"}
              onClick={() => setSelectedCategory("intensive")}
              className="border-[#3c2415] hover:bg-[#3c2415] hover:text-white"
            >
              Intensive Programs
            </Button>
            <Button
              variant={selectedCategory === "camps" ? "default" : "outline"}
              onClick={() => setSelectedCategory("camps")}
              className="border-[#3c2415] hover:bg-[#3c2415] hover:text-white"
            >
              Kids Camps
            </Button>
                </div>
          */}

          {/* City Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button
              variant={selectedCity === "All Campuses" ? "default" : "outline"}
              onClick={() => setSelectedCity("All Campuses")}
              className="bg-[#3c2415] hover:bg-[#5a3a28] text-white"
            >
              All Campuses
            </Button>
            {cities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                onClick={() => setSelectedCity(city)}
                className="border-[#3c2415] hover:bg-[#3c2415] hover:text-white"
              >
                {city}
              </Button>
            ))}
                        </div>

          {/* Workshop Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {workshops
              .filter((workshop: Workshop) => 
                (selectedCity === "All Campuses" || workshop.city === selectedCity) &&
                (selectedCategory === "all" || 
                 (selectedCategory === "intensive" && workshopCategories.intensive.includes(workshop.title)) ||
                 (selectedCategory === "camps" && workshopCategories.camps.includes(workshop.title)))
              )
              .map((workshop: Workshop) => (
                <div key={workshop.id} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-bold text-[#3c2415] mb-2 line-clamp-2">{workshop.title}</h3>
                    <p className="text-gray-700 mb-3 text-sm line-clamp-3">{workshop.description}</p>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{workshop.duration}</span>
                            </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Charges:</span>
                        <span className="font-semibold">PKR {workshop.charges.toLocaleString()}</span>
                            </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Certification:</span>
                        <span className="font-semibold line-clamp-1">{workshop.certification}</span>
                            </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-semibold">{workshop.city}</span>
                          </div>
                        </div>

                    {/* Display Modules if available */}
                    {workshop.modules && (
                      <div className="mt-3">
                        <h4 className="font-semibold text-[#3c2415] text-sm mb-1">Course Modules:</h4>
                        <ul className="list-disc pl-4 text-xs text-gray-700 line-clamp-4">
                          {workshop.modules.map((module, index) => (
                            <li key={index} className="truncate">{module}</li>
                            ))}
                          </ul>
                        </div>
                    )}

                    {/* Display Weekly Schedule if available */}
                    {workshop.weeklySchedule && (
                      <div className="mt-3">
                        <h4 className="font-semibold text-[#3c2415] text-sm mb-1">Weekly Schedule:</h4>
                        <div className="space-y-1">
                          {workshop.weeklySchedule.slice(0, 2).map((week, index) => (
                            <div key={index} className="mb-1">
                              <h5 className="font-medium text-[#3c2415] text-xs">{week.week}:</h5>
                              <ul className="list-disc pl-4 text-xs text-gray-700">
                                {week.topics.slice(0, 2).map((topic, topicIndex) => (
                                  <li key={topicIndex} className="truncate">{topic}</li>
                                ))}
                                {week.topics.length > 2 && (
                                  <li className="text-amber-600">+{week.topics.length - 2} more topics</li>
                                )}
                          </ul>
                        </div>
                          ))}
                          {workshop.weeklySchedule.length > 2 && (
                            <p className="text-xs text-amber-600">+{workshop.weeklySchedule.length - 2} more weeks</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Display Complementary Classes if available */}
                    {workshop.complementaryClasses && (
                      <div className="mt-3">
                        <h4 className="font-semibold text-[#3c2415] text-sm mb-1">Complementary Classes:</h4>
                        <ul className="list-disc pl-4 text-xs text-gray-700">
                          {workshop.complementaryClasses.map((cls, index) => (
                            <li key={index} className="truncate">{cls}</li>
                          ))}
                        </ul>
                </div>
                    )}
                  </div>
                  <div className="p-4 bg-gray-50 border-t">
                    <Link href={`/courses/register?course=${workshop.id}`}>
                      <Button className="w-full bg-[#3c2415] hover:bg-[#5a3a28] text-white text-sm">
                        Register Now
                  </Button>
                    </Link>
                </div>
            </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#3c2415] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Workshops?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Take the first step towards enhancing your culinary skills. Our workshops are available across all campuses.
            Limited seats available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses/register">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">Register Now</Button>
            </Link>
            <a
              href="https://wa.me/923248842000?text=Hello,%20I'd%20like%20to%20learn%20more%20about%20your%20workshops."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#3c2415] text-lg px-8 py-6"
              >
                Contact an Advisor
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
