"use client";

import { getMockRestaurants } from "@/mocks/mockData";
import { useState, useEffect } from "react";
import RestaurantCard from "@/app/dashboard/components/RestaurantCard"
import SearchBar from "@/app/dashboard/components/SearchBar";
import SortDropdown from "@/app/dashboard/components/SortDropdown";

export default function Dashboard() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");

    useEffect(() => {
        setRestaurants(getMockRestaurants());
        // async function fetchRestaurants() {
        //     try {
        //         const res = await fetch("/api/restaurants/", {
        //             method: "GET",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         });

        //         if (!res.ok) throw new Error("Failed to fetch restaurants");

        //         const data = await res.json();
        //         setRestaurants(data);
        //     } catch (error) {
        //         console.error("Error fetching restaurants:", error);
        //     }
        // }

        // fetchRestaurants();
    }, []);

    // 🔍 검색 필터링
    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🔄 정렬 로직
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
        return a.name.localeCompare(b.name); // 🔄 기본 정렬은 이름 기준
    });

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* 검색 & 정렬 & 추가 버튼 */}
            <div className="flex justify-between items-center mb-6 gap-4">
                <SearchBar setSearchTerm={setSearchTerm} />
                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                <button className="bg-black text-white px-4 py-2 rounded-lg">+ Add New</button>
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