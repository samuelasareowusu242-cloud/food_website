import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding TasteWave database...");

  const defaultPassword = await bcrypt.hash("password123", 10);

  // 1. Seed demo users for each role
  const users = [
    {
      name: "Alice Johnson",
      email: "customer@food.com",
      passwordHash: defaultPassword,
      role: Role.CUSTOMER,
      phone: "+1 (555) 234-5678",
      address: "742 Evergreen Terrace, Springfield",
    },
    {
      name: "Chef Marco Valenti",
      email: "staff@food.com",
      passwordHash: defaultPassword,
      role: Role.STAFF,
      phone: "+1 (555) 345-6789",
      address: "12 Kitchen Blvd, Culinary District",
    },
    {
      name: "Dave Rider (Courier)",
      email: "driver@food.com",
      passwordHash: defaultPassword,
      role: Role.DRIVER,
      phone: "+1 (555) 456-7890",
      address: "88 Velocity Way, Metro Hub",
    },
    {
      name: "Elena Vance (Owner)",
      email: "admin@food.com",
      passwordHash: defaultPassword,
      role: Role.ADMIN,
      phone: "+1 (555) 567-8901",
      address: "100 Executive Tower, Suite 500",
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        role: u.role,
        passwordHash: u.passwordHash,
      },
      create: u,
    });
    console.log(`Seeded user: ${u.email} [${u.role}]`);
  }

  // 2. Seed Categories
  const categories = [
    {
      id: "cat-burgers",
      name: "Artisan Burgers",
      slug: "burgers",
      description: "Flame-grilled wagyu, brioche buns, and house-crafted sauces",
      icon: "UtensilsCrossed",
    },
    {
      id: "cat-pizza",
      name: "Neapolitan Pizza",
      slug: "pizza",
      description: "Slow-fermented sourdough, San Marzano tomatoes, fior di latte",
      icon: "Flame",
    },
    {
      id: "cat-bowls",
      name: "Bowls & Asian Fusion",
      slug: "bowls",
      description: "Fresh poke, teriyaki glazed grains, and vibrant crisp greens",
      icon: "Salad",
    },
    {
      id: "cat-desserts",
      name: "Pastry & Sweets",
      slug: "desserts",
      description: "Decadent desserts made fresh daily by our pastry artisans",
      icon: "Sparkles",
    },
    {
      id: "cat-drinks",
      name: "Craft Drinks",
      slug: "drinks",
      description: "Cold pressed botanicals, iced matcha, and artisan sodas",
      icon: "Coffee",
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }

  // 3. Seed Menu Items
  const menuItems = [
    {
      id: "item-truffle-burger",
      name: "The Truffle Umami Wagyu",
      description:
        "A5 Wagyu patty, black truffle emulsion, caramelized shallots, Gruyère cheese on toasted brioche.",
      price: 18.5,
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      categoryId: "cat-burgers",
      isAvailable: true,
      isFeatured: true,
      calories: 820,
      preparationTime: 14,
    },
    {
      id: "item-smoked-bacon-burger",
      name: "Smokey Maple & Bacon Burger",
      description:
        "Dry-aged beef blend, applewood smoked bacon, maple BBQ glaze, sharp Vermont cheddar, crispy onion haystack.",
      price: 16.0,
      imageUrl:
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
      categoryId: "cat-burgers",
      isAvailable: true,
      isFeatured: false,
      calories: 780,
      preparationTime: 12,
    },
    {
      id: "item-margherita-bufala",
      name: "Margherita di Bufala D.O.P.",
      description:
        "Campania buffalo mozzarella, San Marzano tomato reduction, cold-pressed olive oil, garden basil.",
      price: 17.0,
      imageUrl:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
      categoryId: "cat-pizza",
      isAvailable: true,
      isFeatured: true,
      calories: 690,
      preparationTime: 10,
    },
    {
      id: "item-diavola-hot-honey",
      name: "Diavola Hot Honey Fire",
      description:
        "Spicy Calabrian salami, smoked scamorza, crushed red pepper, and habanero-infused wildflower honey.",
      price: 19.0,
      imageUrl:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      categoryId: "cat-pizza",
      isAvailable: true,
      isFeatured: false,
      calories: 740,
      preparationTime: 10,
    },
    {
      id: "item-salmon-poke-bowl",
      name: "Wild Salmon Poke & Edamame",
      description:
        "Sashimi wild salmon, sushi rice, avocado, pickled radish, wakame, tobiko caviar, ponzu sesame dressing.",
      price: 19.5,
      imageUrl:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      categoryId: "cat-bowls",
      isAvailable: true,
      isFeatured: true,
      calories: 540,
      preparationTime: 8,
    },
    {
      id: "item-basque-cheesecake",
      name: "Caramelized Basque Cheesecake",
      description:
        "Creamy scorched crust cheesecake with Madagascar vanilla bean and warm tart raspberry coulis.",
      price: 9.5,
      imageUrl:
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
      categoryId: "cat-desserts",
      isAvailable: true,
      isFeatured: true,
      calories: 460,
      preparationTime: 5,
    },
    {
      id: "item-matcha-lemonade",
      name: "Ceremonial Iced Matcha Yuzu",
      description:
        "First-harvest Uji matcha layered with Japanese yuzu juice, sparkling mineral water, and mint.",
      price: 6.5,
      imageUrl:
        "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
      categoryId: "cat-drinks",
      isAvailable: true,
      isFeatured: false,
      calories: 120,
      preparationTime: 4,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
