"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { flexRowClass, borderedNavItemClass, primaryNavItemClass } from "@/components/styles";

export default function AuthButtons() {
    const { user, logout } = useAuth();

    return user ? (
        <div className={flexRowClass}>
            <Link href="/dashboard" className={borderedNavItemClass}>Dashboard</Link>
            <button onClick={logout} className={primaryNavItemClass}>Logout</button>
        </div>
    ) : (
        <div className={flexRowClass}>
            <Link href="/login" className={borderedNavItemClass}>Login</Link>
            <Link href="/register" className={primaryNavItemClass}>Get Started</Link>
        </div>
    );
}