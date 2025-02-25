// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/navigation/Logo";
import NavLinks from "@/components/navigation/NavLinks";
import AuthButtons from "@/components/navigation/AuthButtons";
import SubNavbar from "@/components/layout/SubNavbar";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Navbar() {
    const { user } = useAuth();
    const [showMainNav, setShowMainNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowMainNav(false);
            } else {
                setShowMainNav(true);
            }
            setLastScrollY(currentScrollY);
        };

        console.log(showMainNav);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);


    return (
        <nav
            className={`transition-colors duration-200 ${
                user ? "bg-white dark:bg-neutral-900" : "bg-gray-50 dark:bg-gray-900"
            }`}
        >
            <div
                className={`fixed top-0 left-0 w-full transition-transform duration-300 ${
                    showMainNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
                }`}
            >
                <div className="justify-between max-w-7xl mx-auto px-6 py-2 flex items-center h-14">
                    <div className="flex items-center gap-2">
                        <Logo />
                        {!user && <NavLinks />}
                    </div>
                    <AuthButtons />
                </div>
            </div>

            <SubNavbar />
        </nav>
    );
}