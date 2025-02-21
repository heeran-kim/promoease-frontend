// src/components/layout/Navbar.tsx
"use client";

import Logo from "@/components/navigation/Logo";
import NavLinks from "@/components/navigation/NavLinks";
// import RestaurantSelector from "@/components/navigation/RestaurantSelector";
import AuthButtons from "@/components/navigation/AuthButtons";
import SubNavbar from "@/components/layout/SubNavbar";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="h-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Main Navbar */}
            <div className="justify-between max-w-7xl mx-auto px-6 flex items-center h-full">
                {/* Left section: Logo, RestaurantSelector, NavLinks */}
                <div className="flex items-center gap-2">
                    <Logo />
                    {/* <RestaurantSelector /> */}
                    {!user && <NavLinks />}
                </div>

                {/* Right section: Auth Buttons */}
                <AuthButtons />
            </div>

            {/* SubNavbar */}
            <SubNavbar />
        </nav>
    );
}