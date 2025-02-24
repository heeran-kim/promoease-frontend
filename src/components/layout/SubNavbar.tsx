// src/components/layout/SubNavbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { NAV_ITEMS } from "@/constants/navItems";

export default function SubNavbar() {
    const pathname = usePathname();
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="w-full bg-white dark:bg-neutral-900 border-b border-gray-300 dark:border-gray-700 shadow-sm relative">
            <div className="max-w-7xl mx-auto px-6 flex items-center h-12 space-x-8">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm font-medium ${
                            pathname.startsWith(item.href)
                                ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                                : "text-gray-500 hover:text-black"
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}