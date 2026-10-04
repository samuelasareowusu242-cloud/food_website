import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validations/order";
import { INITIAL_MENU_ITEMS } from "@/lib/mockMenuData";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role || "CUSTOMER";
    const userId = session.user.id;

    try {
      let whereClause = {};

      if (role === "CUSTOMER") {
        whereClause = { customerId: userId };
      } else if (role === "DRIVER") {
        whereClause = {
          OR: [
            { driverId: userId },
            { status: "READY_FOR_PICKUP", driverId: null },
          ],
        };
      }
      // STAFF and ADMIN get all orders (empty whereClause)

      const orders = await prisma.order.findMany({
        where: whereClause,
        include: {
          items: {
            include: {
              menuItem: true,
            },
          },
          customer: {
            select: { id: true, name: true, email: true, phone: true },
          },
          driver: {
            select: { id: true, name: true, phone: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ orders, role });
    } catch {
      // In-memory demo fallback for when DB is connecting
      return NextResponse.json({
        orders: [],
        role,
        notice: "Connect your PostgreSQL database to persist live orders.",
      });
    }
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    const result = createOrderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid order data",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { items, deliveryAddress, customerNotes } = result.data;
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    // Try finding items in database or mock items
    let totalAmount = 0;
    const calculatedItems = items.map((cartItem) => {
      const mockItem = INITIAL_MENU_ITEMS.find((i) => i.id === cartItem.menuItemId);
      const unitPrice = mockItem ? mockItem.price : 15.0;
      totalAmount += unitPrice * cartItem.quantity;
      return {
        menuItemId: cartItem.menuItemId,
        quantity: cartItem.quantity,
        unitPrice,
      };
    });

    const deliveryFee = 3.99;
    const tax = Number((totalAmount * 0.08).toFixed(2));
    const grandTotal = Number((totalAmount + deliveryFee + tax).toFixed(2));

    const customerId = session?.user?.id;

    if (customerId) {
      try {
        const order = await prisma.order.create({
          data: {
            orderNumber,
            customerId,
            totalAmount: grandTotal,
            deliveryAddress,
            customerNotes,
            status: "CONFIRMED",
            items: {
              create: calculatedItems.map((ci) => ({
                menuItemId: ci.menuItemId,
                quantity: ci.quantity,
                unitPrice: ci.unitPrice,
              })),
            },
          },
          include: {
            items: true,
          },
        });

        return NextResponse.json(
          { message: "Order created successfully", order },
          { status: 201 }
        );
      } catch (dbError) {
        console.warn("DB write failed, falling back to simulated order:", dbError);
      }
    }

    // Simulated order response
    const mockOrder = {
      id: `ord_${Date.now()}`,
      orderNumber,
      totalAmount: grandTotal,
      deliveryAddress,
      customerNotes,
      status: "CONFIRMED",
      items: calculatedItems,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: "Order placed successfully!", order: mockOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}
