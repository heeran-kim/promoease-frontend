import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}