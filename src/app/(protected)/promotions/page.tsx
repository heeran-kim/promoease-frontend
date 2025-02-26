"use client";

import { useState } from "react";
import { deletePosting } from "@/mocks/mockData";
import { getRestaurantPromotions, deletePromotion } from "@/mocks/mockPromotions";
import SearchBar from "@/components/common/SearchBar";
import DateRangePicker from "@/components/common/DateRangePicker";
import ListCard from "@/components/common/ListCard";
import Select from "@/components/common/Select";
import { TYPE_OPTIONS, STATUS_OPTIONS } from "@/mocks/mockPromotions";

export default function PromotionsDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const [promotions, setPromotions] = useState(getRestaurantPromotions());

    const handleDelete = (promotionId: string) => {
        const promotion = promotions.find((promo) => promo.id === promotionId);
        if (!promotion) return;
    
        const relatedPostings = promotion.postId || [];
    
        if (relatedPostings.length > 0) {
            const confirmDelete = window.confirm(
                `There are ${relatedPostings.length} linked posts for this promotion. Do you want to delete them as well?`
            );
    
            if (confirmDelete) {
                relatedPostings.forEach((postId) => deletePosting(postId));
            }
        }
        deletePromotion(promotionId);
        setPromotions((prevPromotions) => prevPromotions.filter((promo) => promo.id !== promotionId));
    };

    const handleCreatePost = (promotionId: string) => {
        console.log(`Create a new post for promotion ID: ${promotionId}`);
    };

    const ongoingPromotions = promotions.filter(promo => promo.status === "Ongoing");
    const upcomingPromotions = promotions.filter(promo => promo.status === "Upcoming");
    const endedPromotions = promotions.filter(promo => promo.status === "Ended");

    return (
        <div>
            <div className="flex items-center space-x-4 py-4 border-b">
                <SearchBar setSearchTerm={setSearchTerm} placeholder="Search promotions..." />
                <DateRangePicker onChange={(range) => console.log("Selected Range:", range)} />
                <Select value={selectedType} onChange={setSelectedType} options={TYPE_OPTIONS} placeholder="All Types"/>
                <Select value={selectedStatus} onChange={setSelectedStatus} options={STATUS_OPTIONS} placeholder="All Status"/>
            </div>

            <div className="space-y-4 mt-2">
                {[...upcomingPromotions, ...ongoingPromotions, ...endedPromotions].map((promo) => (
                    <ListCard 
                        key={promo.id} 
                        item={promo} 
                        type="promotion" 
                        actions={[
                            { label: "Create Post", onClick: () => handleCreatePost(promo.id) },
                            { label: "Duplicate", onClick: () => handleDuplicate(promo.id) },
                            { label: "Delete", onClick: () => handleDelete(promo.id) },
                        ]}
                    />
                ))}
            </div>
        </div>
    );
}