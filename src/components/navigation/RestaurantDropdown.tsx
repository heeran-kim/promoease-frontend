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
        <div className="absolute top-8 left-20 bg-white shadow-md border rounded-lg z-50">
            {restaurants.map((restaurant) => (
                <button
                    key={restaurant.id}
                    onClick={() => {
                        router.push(`/${restaurant.slug}`);
                        closeDropdown();
                    }}
                    className={`flex items-center w-full text-left ps-2 pe-8 py-2 text-sm hover:bg-gray-100 space-x-2 truncate ${
                        restaurant.slug === selectedSlug ? "bg-gray-100" : ""
                    }`}
                >
                    <Image
                        src={restaurant.logo || "/globe.svg"}
                        alt={restaurant.name}
                        width={16}
                        height={16}
                        className="rounded-full"
                    />
                    <span className="text-sm">{restaurant.name}</span>
                </button>
            ))}
        </div>
    );
}