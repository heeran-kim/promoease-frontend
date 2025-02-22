"use client";

import { Restaurant, getMockRestaurants } from "@/mocks/mockData";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
    selectedSlug: string;
    closeDropdown: () => void;
}

export default function RestaurantsDropdown({ selectedSlug, closeDropdown }: Props) {
    const [restaurants] = useState<Restaurant[]>(getMockRestaurants());
    const router = useRouter();

    return (
        <div className="absolute top-8 left-20 bg-white shadow-md border rounded-lg w-48 text-sm z-50">
            {restaurants.map((restaurant) => (
                <button
                    key={restaurant.id}
                    onClick={() => {
                        router.push(`/${restaurant.slug}`);
                        closeDropdown();
                    }}
                    className={`flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 space-x-2 truncate ${
                        restaurant.slug === selectedSlug ? "bg-gray-200 font-semibold" : ""
                    }`}
                >
                    <Image
                        src={restaurant.logo || "/globe.svg"}
                        alt={restaurant.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                    />
                    <span className="truncate w-full">{restaurant.name}</span>
                </button>
            ))}
        </div>
    );
}