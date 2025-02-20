import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("🛠 Received Data from Frontend: Email:", email, "Password:", password);
    console.log("🛠 Django Backend URL:", process.env.NEXT_PUBLIC_API_URL);
    // Forward the login data to Django backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login/`, {
        method: "POST",
        credentials: "include", // ✅ 백엔드로 쿠키 포함하여 요청
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    // If login fails, return an error response
    if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json({ error: "Login failed", details: errorData }, { status: res.status });
    }

    // ✅ Django 백엔드에서 `Set-Cookie` 헤더를 받아서, 그대로 응답에 포함
    const setCookie = res.headers.get("set-cookie");

    // Login successful, return success response with cookies
    const data = await res.json();
    const response = NextResponse.json(data, { status: 200 });

    if (setCookie) {
        response.headers.set("Set-Cookie", setCookie);  // ✅ Next.js가 `Set-Cookie`를 전달하도록 설정
    }

    return response;
  } catch (error) {
    console.error("❌ Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}