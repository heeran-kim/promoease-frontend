"use client";

import { Restaurant } from "@/mocks/mockData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import RestaurantDropdown from "./RestaurantDropdown"; // 드롭다운 컴포넌트
import SocialMediaLinks from "./SocialMediaLinks";
import { FaLink } from "react-icons/fa";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const defaultLogo = "/globe.svg";

    // ✅ 드롭다운 바깥을 클릭하면 자동으로 닫히도록 감지
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    return (
        <div className="relative p-4 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col cursor-pointer">
            {/* 점점점 버튼 (우측 상단 고정) */}
            <button
                onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트 방지
                    setDropdownOpen(!dropdownOpen);
                }}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-black"
            >
                {/* ✅ 원래 쓰던 점점점 스타일 (세로 점점점) */}
                <span className="text-lg font-bold">⋮</span>
            </button>

            {/* 업장 로고 & 정보 */}
            <div onClick={() => router.push(`/${restaurant.slug}`)} className="flex items-center space-x-4">
                <Image 
                    src={restaurant.logo || defaultLogo} 
                    alt={`${restaurant.name} Logo`} 
                    width={40} 
                    height={40} 
                    className="rounded-full" 
                />
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                        <h3 className="text-md font-semibold text-gray-900 dark:text-gray-200">{restaurant.name}</h3> 
                        <SocialMediaLinks links={restaurant.socialMediaLinks} />
                    </div>

                    {/* ✅ Last Post (시간 + 링크 통합) */}
                    {restaurant.lastActivity && (
                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 flex items-center">
                            Last Post: {new Date(restaurant.lastActivity).toLocaleString()}
                            {restaurant.lastPostLink && (
                                <a
                                    href={restaurant.lastPostLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaLink className="inline-block text-xs" /> {/* 🔗 링크 아이콘 */}
                                </a>
                            )}
                        </p>
                    )}

                    {restaurant.upcomingPosts > 0 && (
                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                            ⏳ {restaurant.upcomingPosts} pending posts
                        </p>
                    )}
                </div>
            </div>

            {/* 드롭다운 메뉴 (바깥 클릭 감지 추가) */}
            {dropdownOpen && (
                <div ref={dropdownRef}>
                    <RestaurantDropdown
                        restaurant={restaurant}
                        closeDropdown={() => setDropdownOpen(false)}
                    />
                </div>
            )}
        </div>
    );
}