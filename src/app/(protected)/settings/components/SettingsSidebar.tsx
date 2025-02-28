// src/app/(protected)/settings/components/SettingsSidebar.tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/common/SearchBar";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/navItems";

export default function SettingsSidebar() {
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();
    const settingsNav = NAV_ITEMS.find((item) => item.name === "Settings");
    const menuItems = settingsNav?.subPages || [];

    return (
        <div className="sticky w-64 top-32 self-start h-[calc(100vh-4rem)] text-sm h-screen p-4 overflow-y-auto">
            {/* Search Bar */}
            <SearchBar setSearchTerm={setSearchTerm} placeholder="Search settings..." />

            {/* Menu List */}
            <ul className="mt-4 space-y-2">
                {menuItems
                    .filter((item) =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item) => {
                        const isActive = pathname === item.href;
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