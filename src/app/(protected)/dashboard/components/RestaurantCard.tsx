"use client";

import clsx from "clsx";
import { baseContainerClass } from "@/components/styles";
import { Restaurant } from "@/mocks/mockData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import RestaurantDropdown from "./RestaurantDropdown";
import SocialMediaLinks from "./SocialMediaLinks";
import { FaLink } from "react-icons/fa";
import RestaurantStatus from "./RestaurantStatus";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const defaultLogo = "/globe.svg";

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
        <div className={clsx("relative p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col cursor-pointer", baseContainerClass)}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                }}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-black"
            >
                <span className="text-lg font-bold">⋮</span>
            </button>

            <div onClick={() => router.push(`/${restaurant.slug}`)} className="flex items-center space-x-4">
                <Image 
                    src={restaurant.logo || defaultLogo} 
                    alt={`${restaurant.name} Logo`} 
                    width={60} 
                    height={60} 
                    className="rounded-full" 
                />
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                        <h3 className="text-md font-semibold text-gray-900 dark:text-gray-200">{restaurant.name}</h3> 
                        <SocialMediaLinks links={restaurant.socialMediaLinks} />
                    </div>

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

                    <RestaurantStatus 
                        upcomingPosts={restaurant.upcomingPosts} 
                        uploadedPosts={restaurant.uploadedPosts} 
                        failedPosts={restaurant.failedPosts} 
                    />
                </div>
            </div>

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