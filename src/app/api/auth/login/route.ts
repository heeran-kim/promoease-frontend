// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("🛠 Received Data from Frontend:Email:", email, "Password:", password);

    // Forward the registration data to Django backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    // If login fails, return an error response
    if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json({ error: "Login failed", details: errorData }, { status: res.status });
    }

    // Login successful, return success response
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}