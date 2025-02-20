// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    console.log("🛠 Received Data from Frontend:Name:", name, "Email:", email, "Password:", password);

    fetch("https://backend-yiuo.onrender.com/api/users/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
    .then(response => {
      if (response.ok) {
          console.log('API 호출 성공');
      } else {
          console.error('API 호출 실패');
      }
      return response.json();
  })
  .then(data => {
      console.log('API 응답 데이터:', data);
  })
  .catch(error => {
      console.error('API 호출 에러:', error);
  });

    console.log("🛠 sending data to: ", process.env.NEXT_PUBLIC_API_URL, '/api/users/register/');
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