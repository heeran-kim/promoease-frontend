"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

// 더미 데이터
const mockRestaurants = [
  { id: "1", name: "The Great Steakhouse", slug: "the-great-steakhouse", lastActivity: "2024-02-20", logo: "/vercel.svg" },
  { id: "2", name: "Ocean's Fresh Sushi", slug: "oceans-fresh-sushi", lastActivity: "2024-02-18", logo: "/vercel.svg" },
  { id: "3", name: "Italian Delights", slug: "italian-delights", lastActivity: "2024-02-19", logo: "/vercel.svg" },
];

export default function RestaurantDetailPage() {
    const { slug } = useParams(); // ✅ Slug를 URL에서 가져옴
    const restaurant = mockRestaurants.find((r) => r.slug === slug); // ✅ Slug로 데이터 찾기

    // 📌 데이터가 없으면 404 메시지 표시
    if (!restaurant) {
        return (
            <div className="max-w-7xl mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold text-red-500">Restaurant Not Found</h1>
                <p className="text-gray-500 mt-2">해당 레스토랑을 찾을 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* 레스토랑 정보 */}
            <div className="flex items-center space-x-4">
                <Image src={restaurant.logo} alt={restaurant.name} width={64} height={64} className="rounded-full" />
                <div>
                    <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                    <p className="text-gray-500 text-sm">Last Activity: {restaurant.lastActivity}</p>
                </div>
            </div>
        </div>
    );
}