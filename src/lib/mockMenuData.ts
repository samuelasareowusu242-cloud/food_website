export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  categoryName: string;
  isAvailable: boolean;
  isFeatured: boolean;
  calories: number;
  preparationTime: number; // minutes
  tags: string[];
}

export const INITIAL_CATEGORIES: CategoryData[] = [
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

export const INITIAL_MENU_ITEMS: MenuItemData[] = [
  {
    id: "item-truffle-burger",
    name: "The Truffle Umami Wagyu",
    description:
      "A5 Wagyu patty, black truffle emulsion, caramelized shallots, Gruyère cheese on toasted brioche.",
    price: 18.5,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    categoryId: "cat-burgers",
    categoryName: "Artisan Burgers",
    isAvailable: true,
    isFeatured: true,
    calories: 820,
    preparationTime: 14,
    tags: ["Chef Special", "Wagyu", "Best Seller"],
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
    categoryName: "Artisan Burgers",
    isAvailable: true,
    isFeatured: false,
    calories: 780,
    preparationTime: 12,
    tags: ["Smoked", "Hearty"],
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
    categoryName: "Neapolitan Pizza",
    isAvailable: true,
    isFeatured: true,
    calories: 690,
    preparationTime: 10,
    tags: ["Vegetarian", "Classic", "Wood Fired"],
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
    categoryName: "Neapolitan Pizza",
    isAvailable: true,
    isFeatured: false,
    calories: 740,
    preparationTime: 10,
    tags: ["Spicy", "Hot Honey"],
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
    categoryName: "Bowls & Asian Fusion",
    isAvailable: true,
    isFeatured: true,
    calories: 540,
    preparationTime: 8,
    tags: ["High Protein", "Omega-3", "Fresh"],
  },
  {
    id: "item-crispy-tofu-bowl",
    name: "Golden Tofu Teriyaki Bowl",
    description:
      "Organic flash-fried tofu, steamed jasmine rice, charred broccolini, sesame ginger drizzle, crushed cashews.",
    price: 15.0,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    categoryId: "cat-bowls",
    categoryName: "Bowls & Asian Fusion",
    isAvailable: true,
    isFeatured: false,
    calories: 480,
    preparationTime: 10,
    tags: ["Vegan", "Nutritious"],
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
    categoryName: "Pastry & Sweets",
    isAvailable: true,
    isFeatured: true,
    calories: 460,
    preparationTime: 5,
    tags: ["Chef Special", "Sweet"],
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
    categoryName: "Craft Drinks",
    isAvailable: true,
    isFeatured: false,
    calories: 120,
    preparationTime: 4,
    tags: ["Antioxidant", "Refreshing"],
  },
];
