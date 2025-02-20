"use client";

import Link from "next/link";
import NavLinks from "@/components/navigation/NavLinks";
import AuthButtons from "@/components/navigation/AuthButtons";

export default function Navbar() {
    return (
        <nav className="navbar fixed top-0 left-0 w-full h-16 z-50 bg-gray-50 dark:bg-gray-900 shadow-md transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-6 flex items-center h-full">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-black dark:text-white mr-6">
                    Promoease
                </Link>

                {/* Desktop Navigation */}
                <div className="flex flex-1">
                    <NavLinks />
                </div>

                {/* Desktop Auth Buttons */}
                <div>
                    <AuthButtons />
                </div>
            </div>
        </nav>
    );
}