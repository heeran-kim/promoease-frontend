// src/components/settings/SettingsSidebar.tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/common/SearchBar";
import Link from "next/link";

const menuItems = [
    { name: "General Information", href: "/settings/general" },
    { name: "Upload Sales Data", href: "/settings/sales" },
    { name: "Billing", href: "/settings/billing" },
    { name: "Invoices", href: "/settings/invoices" },
    { name: "Social Media", href: "/settings/social" },
    { name: "Account", href: "/settings/account" },
];

export default function SettingsSidebar() {
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();

    return (
        <div className="sticky w-50 top-32 self-start h-[calc(100vh-4rem)] text-sm h-screen p-4 overflow-y-auto">
            {/* Search Bar */}
            <SearchBar setSearchTerm={setSearchTerm} placeholder="Search settings..." />

            {/* Menu List */}
            <ul className="mt-4 space-y-2">
                {menuItems
                    .filter((item) =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                                        isActive    
                                            ? "text-black font-bold"
                                            : "text-gray-700 "
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}