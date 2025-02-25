"use client";

import { useState } from "react";
import { getRestaurantPromotions, deletePromotion } from "@/mocks/mockPromotions";
import SearchBar from "@/components/common/SearchBar";
import DateRangePicker from "@/components/common/DateRangePicker";
import ListCard from "@/components/common/ListCard";

export default function PromotionsDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const [promotions, setPromotions] = useState(getRestaurantPromotions());

    const handleDelete = (promotionId: string) => {
        deletePromotion(promotionId);
        setPromotions((prevPromotions) => prevPromotions.filter((promo) => promo.id !== promotionId)); // UI 반영
    };

    const ongoingPromotions = promotions.filter(promo => promo.status === "Ongoing");
    const upcomingPromotions = promotions.filter(promo => promo.status === "Upcoming");
    const endedPromotions = promotions.filter(promo => promo.status === "Ended");

    return (
        <div>
            {/* ✅ 필터 바 */}
            <div className="flex items-center space-x-4 py-4 border-b">
                <SearchBar setSearchTerm={setSearchTerm} placeholder="Search promotions..." />
                <DateRangePicker onChange={(range) => console.log("Selected Range:", range)} />

                {/* 📌 상태 선택 */}
                <select
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border rounded-md px-4 py-2 text-sm dark:bg-gray-800 dark:text-white"
                >
                    <option value="">All Status</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Ended">Ended</option>
                </select>
            </div>

            {/* ✅ 프로모션 목록 */}
            <div className="space-y-4 mt-2">
                {ongoingPromotions.map((promo) => (
                    <ListCard key={promo.id} item={promo} onDelete={handleDelete} type="promotion" />
                ))}

                {upcomingPromotions.map((promo) => (
                    <ListCard key={promo.id} item={promo} onDelete={handleDelete} type="promotion" />
                ))}

                {endedPromotions.length > 0 && (ongoingPromotions.length > 0 || upcomingPromotions.length > 0) && (
                    <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>
                )}

                {endedPromotions.map((promo) => (
                    <ListCard key={promo.id} item={promo} onDelete={handleDelete} type="promotion" />
                ))}
            </div>
        </div>
    );
}