// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    console.log("🛠 Received Data from Frontend:Name:", name, "Email:", email, "Password:", password);

    // Forward the registration data to Django backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    // If registration fails, return an error response
    if (!res.ok) {
      return NextResponse.json({ error: "Registration failed" }, { status: res.status });
    }

    // Registration successful, return success response
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("❌ Register API Error:", error); 
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}