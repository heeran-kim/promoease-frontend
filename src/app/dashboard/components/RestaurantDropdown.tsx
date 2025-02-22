"use client";

import clsx from "clsx";
import { baseContainerClass } from "@/components/styles";
import { useRouter } from "next/navigation";

export default function RestaurantDropdown({
    restaurant,
    closeDropdown,
}: {
    restaurant: { slug: string };
    closeDropdown: () => void;
}) {
    const router = useRouter();

    const menuItems = [
        { label: "Manage Posts", path: `/${restaurant.slug}` },
        { label: "New Posting", path: `/${restaurant.slug}/new-post` },
        { label: "Promotion Suggestions", path: `/${restaurant.slug}/promotions` },
        { label: "Analytics Report", path: `/${restaurant.slug}/analytics` },
        { label: "Restaurant Settings", path: `/${restaurant.slug}/settings` },
    ];

    return (
        <div className={clsx("absolute top-12 right-2 w-48 text-sm z-50 shadow-md rounded", baseContainerClass)}>
            {menuItems.map((item) => (
                <button
                    key={item.label}
                    onClick={() => {
                        router.push(item.path);
                        closeDropdown();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}