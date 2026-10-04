import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INITIAL_CATEGORIES, INITIAL_MENU_ITEMS } from "@/lib/mockMenuData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const query = searchParams.get("q")?.toLowerCase();

    // Try fetching from Prisma DB
    try {
      const dbCategories = await prisma.category.findMany({
        include: {
          menuItems: {
            where: { isAvailable: true },
          },
        },
      });

      if (dbCategories.length > 0) {
        let items = dbCategories.flatMap((c) =>
          c.menuItems.map((item) => ({
            ...item,
            categoryName: c.name,
          }))
        );

        if (categorySlug && categorySlug !== "all") {
          items = items.filter(
            (item) =>
              dbCategories.find((c) => c.id === item.categoryId)?.slug ===
              categorySlug
          );
        }

        if (query) {
          items = items.filter(
            (item) =>
              item.name.toLowerCase().includes(query) ||
              item.description.toLowerCase().includes(query)
          );
        }

        return NextResponse.json({
          categories: dbCategories.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            icon: c.icon,
          })),
          items,
          source: "database",
        });
      }
    } catch {
      // Prisma DB might not be configured/migrated yet; fallback cleanly to memory catalog
    }

    // Graceful fallback for initial preview
    let filteredItems = INITIAL_MENU_ITEMS;

    if (categorySlug && categorySlug !== "all") {
      filteredItems = filteredItems.filter((item) => {
        const cat = INITIAL_CATEGORIES.find((c) => c.slug === categorySlug);
        return cat ? item.categoryId === cat.id : true;
      });
    }

    if (query) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      categories: INITIAL_CATEGORIES,
      items: filteredItems,
      source: "fallback",
    });
  } catch (error) {
    console.error("Menu fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}
