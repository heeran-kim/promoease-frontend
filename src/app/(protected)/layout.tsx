// src/app/(protected)/layout.tsx
"use client";

import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { NAV_ITEMS } from "@/constants/navItems";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();

    if (!user) return <>{children}</>;

    const currentNav = NAV_ITEMS.find((item) => pathname.startsWith(item.href));

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Header title={currentNav?.name || "Page"} description={currentNav?.description} />
            {children}
        </div>
    );
}