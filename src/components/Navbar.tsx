"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaChevronDown, FaChevronUp, FaRobot, FaChartLine, FaLightbulb } from "react-icons/fa";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [bgWhite, setBgWhite] = useState(false);
    const router = useRouter();
    let dropdownTimeout: NodeJS.Timeout;

    {/* 내비게이션 버튼 공통 스타일 */}
    const navItemClass = "px-3 py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800";


    useEffect(() => {
        axios.get("/api/check-auth", { withCredentials: true })
            .then((response) => setIsAuthenticated(response.data.isAuthenticated))
            .catch(() => setIsAuthenticated(false));

        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // ✅ 로그인 페이지에서 네비게이션 바 글자 안 보이는 문제 해결
        setBgWhite(window.location.pathname.includes("/login"));
    }, [router]);

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout", {}, { withCredentials: true });
            setIsAuthenticated(false);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleMouseEnter = () => {
        clearTimeout(dropdownTimeout);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeout = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 400); // ✅ 400ms로 줄임 (자연스러우면서도 빠르게)
    };

    return (
        <nav className={`fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
                {/* 로고 */}
                <Link href="/" className="text-2xl font-bold text-black dark:text-white">
                    Promoease
                </Link>

                {/* 데스크탑 메뉴 */}
                <div className="hidden md:flex space-x-6 items-center">
                    {/* 드롭다운 메뉴 */}
                    <div 
                        className="relative group"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button 
                            className={`${navItemClass} flex items-center space-x-1 ${
                                isDropdownOpen ? "bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400" 
                                            : "hover:text-indigo-500 dark:hover:text-indigo-400"
                            }`}
                        >
                            <span>Products</span>
                            <span className="transition-transform duration-200 ease-in-out">
                                {isDropdownOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                            </span>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-2 
                                transition-all duration-300 opacity-100 scale-100 translate-y-0 
                                ease-in-out"
                                style={{ opacity: isDropdownOpen ? 1 : 0, transform: isDropdownOpen ? "translateY(0)" : "translateY(-5px)" }} // ✅ 자연스럽게 서서히 사라지게
                            >
                                <div className="space-y-3">
                                    <Link href="/feature1" className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                        <FaRobot className="text-indigo-500 text-xl" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">AI Captions</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Generate captions with AI</p>
                                        </div>
                                    </Link>
                                    <Link href="/feature2" className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                        <FaChartLine className="text-indigo-500 text-xl" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Marketing Insights</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Analyze your marketing impact</p>
                                        </div>
                                    </Link>
                                    <Link href="/feature3" className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
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

                    <Link href="/about" className={`${navItemClass} hover:text-indigo-500 dark:hover:text-indigo-400`}>
                        About
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link href="/login" className={`${navItemClass} hover:text-indigo-500 dark:hover:text-indigo-400`}>
                                Dashboard
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={`${navItemClass} hover:text-indigo-500 dark:hover:text-indigo-400`}>
                                Login
                            </Link>
                            <Link href="/register" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* 모바일 메뉴 버튼 */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        {isOpen ? "✖️" : "☰"}
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            <div className={`md:hidden bg-white dark:bg-gray-900 transition-all duration-300 ${
                isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}>
                <div className="px-6 py-4 space-y-2">
                    <Link href="/" className="block hover:text-indigo-500 transition">Home</Link>
                    <Link href="/about" className="block hover:text-indigo-500 transition">About</Link>
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" className="block hover:text-indigo-500 transition">Dashboard</Link>
                            <button 
                                onClick={handleLogout} 
                                className="block w-full text-left hover:text-indigo-500 transition">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="block hover:text-indigo-500 transition">Login</Link>
                            <Link href="/register" className="block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;