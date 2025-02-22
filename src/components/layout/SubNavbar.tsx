"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

const subNavItems = [
    { name: "Overview", href: "/dashboard" },
    { name: "Support", href: "/dashboard/support" },
    { name: "Settings", href: "/dashboard/settings" },
];

export default function SubNavbar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const { slug } = useParams();

    if (!user) return null;

    const restaurantNavItems = slug
        ? [
              { name: "Dashboard", href: `/${slug}` },
              { name: "New Post", href: `/${slug}/new-post` },
              { name: "Promotion", href: `/${slug}/promotion` },
              { name: "Analytics", href: `/${slug}/analytics` },
              { name: "Settings", href: `/${slug}/settings` },
          ]
        : [];

    const navItems = slug ? restaurantNavItems : subNavItems;

    return (
        <div className="w-full bg-white dark:bg-neutral-900 border-b border-gray-300 dark:border-gray-700 shadow-sm relative">
            <div className="max-w-7xl mx-auto px-6 flex items-center h-12 space-x-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm font-medium ${
                            pathname === item.href ? "text-black dark:text-white border-b-2 border-black dark:border-white" : "text-gray-500 hover:text-black"
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}