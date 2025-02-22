"use client";

import clsx from "clsx";
import { baseContainerClass } from "@/components/styles";
import { getMockRestaurants, Restaurant } from "@/mocks/mockData";
import { useState, useEffect } from "react";
import RestaurantCard from "@/app/dashboard/components/RestaurantCard"
import SearchBar from "@/components/common/SearchBar"; 
import SortDropdown from "@/app/dashboard/components/SortDropdown";

export default function Dashboard() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");

    useEffect(() => {
        setRestaurants(getMockRestaurants());
    }, []);

    // 🔍 검색 필터링
    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🔄 정렬 로직
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6 gap-4">
                <SearchBar setSearchTerm={setSearchTerm} placeholder="Search restaurants..." />
                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                <button className="text-sm px-4 py-2 rounded-lg text-white bg-black hover:bg-gray-800
                                    dark:bg-white dark:hover:bg-gray-700 dark:text-black">
                    + Add New
                </button>
            </div>

            {/* 레스토랑 목록 */}
            <div className="grid grid-cols-3 gap-6">
                {sortedRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}