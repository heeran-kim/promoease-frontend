"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaChevronUp, FaRobot, FaChartLine, FaLightbulb, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ onSignIn }: { onSignIn: () => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const pathname = usePathname();

    // Common navigation item styling
    const navItemClass = "px-3 py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800";
    const dropdownItemClass = "flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg";
    const mobileNavItemClass = "block py-3 px-4 text-gray-600 dark:text-gray-300 hover;bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition";

    // Close menu when pathname changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Close menu on Escape key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Toggle dropdown for mobile navigation
    const toggleMobileDropdown = () => setIsMobileDropdownOpen(prev => !prev);


    return (
        <nav className="fixed top-0 left-0 w-full h-16 z-50
                        bg-gray-50 dark:bg-gray-900 shadow-md transition-colors duration-200"
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
                <Link href="/" className="text-2xl font-bold text-black dark:text-white">
                    Promoease
                </Link>

                {/* Descktop Navigation */}
                <div className="hidden md:flex space-x-6 items-center">
                    <div 
                        className="relative group"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button 
                            className={`${navItemClass} flex items-center space-x-1 ${
                                isDropdownOpen ? "bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400" 
                                            : "hover:text-indigo-500 dark:hover:text-indigo-400"
                            }`}
                        >
                            <span>Products</span>
                            {isDropdownOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 w-72 bg-white
                                            dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-2 
                                            transition-all duration-200"
                            >
                                <div className="space-y-3">
                                    <Link href="/feature1" className={dropdownItemClass}>
                                        <FaRobot className="text-indigo-500 text-xl" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">AI Captions</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Generate captions with AI</p>
                                        </div>
                                    </Link>
                                    <Link href="/feature2" className={dropdownItemClass}>
                                        <FaChartLine className="text-indigo-500 text-xl" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Marketing Insights</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Analyze your marketing impact</p>
                                        </div>
                                    </Link>
                                    <Link href="/feature3" className={dropdownItemClass}>
                                        <FaLightbulb className="text-indigo-500 text-xl" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Promotion Suggestion</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Get AI-powered promotion ideas</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/about" className={navItemClass}>About</Link>
                    <button onClick={() => {
                        console.log("Login button clicked");
                        onSignIn();
                    }} className={navItemClass}>Login</button>
                    <Link href="/register" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden border rounded-full p-2 hover:bg-gray-100
                                dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 transition"
                >
                    {isOpen ? <FaTimes size={12} /> : <FaBars size={12} />}
                </button>
            </div>

            {/* Mobile Full-Screen Navigation */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-50 flex flex-col">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
                        <Link href="/" className="text-2xl font-bold text-black dark:text-white">
                            Promoease
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 text-gray-600
                                        hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 transition"
                        >
                            <FaTimes size={16} />
                        </button>
                    </div>

                    {/* 메뉴 리스트 */}
                    <div className="flex flex-col space-y-4 px-6 py-6">
                        {/* Sign Up & Login */}
                        <Link href="/register" className="block w-full text-center px-4 py-2 bg-black text-white 
                                                        rounded-lg hover:bg-gray-800 transition">
                            Sign Up
                        </Link>
                        <button onClick={() => {
                            console.log("Mobile login button clicked");
                            onSignIn();
                        }} className="block w-full text-center px-4 py-2 border border-gray-300 text-black 
                                                        rounded-lg hover:bg-gray-100 transition">
                            Log In
                        </button>

                        {/* 네비게이션 아이템 */}
                        <button 
                            className="flex justify-between w-full py-3 px-4 text-gray-600 dark:text-gray-300 
                                        hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                        >
                            <span>Products</span>
                            <FaChevronDown size={16} className={isMobileDropdownOpen ? "rotate-180 transition-transform" : "transition-transform"} />
                        </button>

                        {/* Products Dropdown (아이콘 + 제목만 표시) */}
                        {isMobileDropdownOpen && (
                            <div className="space-y-2 pl-4">
                                <button className="flex items-center w-full py-3 px-4 text-gray-700 dark:text-gray-300 
                                                    hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                                    <FaRobot className="mr-3 text-gray-500" size={18} />
                                    <span className="text-base">AI Captions</span>
                                </button>
                                <button className="flex items-center w-full py-3 px-4 text-gray-700 dark:text-gray-300 
                                                    hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                                    <FaChartLine className="mr-3 text-gray-500" size={18} />
                                    <span className="text-base">Marketing Insights</span>
                                </button>
                                <button className="flex items-center w-full py-3 px-4 text-gray-700 dark:text-gray-300 
                                                    hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                                    <FaLightbulb className="mr-3 text-gray-500" size={18} />
                                    <span className="text-base">Promotion Suggestion</span>
                                </button>
                            </div>
                        )}

                        {/* 기타 네비게이션 메뉴 */}
                        <Link href="/docs" className="block py-3 px-4 text-gray-600 dark:text-gray-300 
                                                    hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                            Docs
                        </Link>
                        <Link href="/pricing" className="block py-3 px-4 text-gray-600 dark:text-gray-300 
                                                        hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                            Pricing
                        </Link>
                        <Link href="/contact" className="block py-3 px-4 text-gray-600 dark:text-gray-300 
                                                        hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};