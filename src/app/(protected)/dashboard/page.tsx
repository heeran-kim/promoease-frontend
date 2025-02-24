// src/app/dashboard/page.tsx
"use client";

import { getMockRestaurant, Restaurant } from "@/mocks/mockData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RestaurantCard from "./components/RestaurantCard";
import { primaryNavItemClass } from "@/components/styles";

export default function Dashboard() {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const router = useRouter();

    useEffect(() => {
        setRestaurant(getMockRestaurant());
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">
            {restaurant ? (
                <RestaurantCard restaurant={restaurant} />
            ) : (
                <div className="flex flex-col items-center justify-center h-64 border border-gray-300 bg-white rounded-lg">
                    <p className="text-md text-gray-700 mb-8 text-center">
                        You haven’t set up your business yet! <br />
                        Get started by adding your restaurant details now.
                    </p>
                    <button 
                        className={primaryNavItemClass}
                        onClick={() => router.push("/settings/general")}
                    >
                        Add Your Business
                    </button>
                </div>
            )}
        </div>
    );
}