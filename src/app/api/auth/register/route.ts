import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload provided" },
        { status: 400 }
      );
    }

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password, role, phone, address } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    try {
      // Check if user already exists in PostgreSQL database
      const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 409 }
        );
      }

      // Hash password with bcrypt
      const passwordHash = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          name,
          email: normalizedEmail,
          passwordHash,
          role: role || "CUSTOMER",
          phone,
          address,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          address: true,
          createdAt: true,
        },
      });

      return NextResponse.json(
        {
          message: "User registered successfully",
          user: newUser,
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.warn("Database connection issue during registration:", dbError);
      return NextResponse.json(
        {
          error:
            "Database unavailable. Please verify your PostgreSQL connection in .env (DATABASE_URL).",
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while registering user" },
      { status: 500 }
    );
  }
}
