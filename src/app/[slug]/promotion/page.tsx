"use client";

import { useState } from "react";
import PromotionList from "@/components/promotion/PromotionList";
import NewPromotionModal from "@/components/promotion/NewPromotionModal";
import AiPromotionSuggestion from "@/components/promotion/AiPromotionSuggestion";
import { mockPromotions } from "@/mocks/mockPromotions";

export default function PromotionDashboard() {
    const [promotions, setPromotions] = useState(mockPromotions);
    const [isModalOpen, setModalOpen] = useState(false);

    const addPromotion = (newPromotion: any) => {
        setPromotions([...promotions, { id: String(promotions.length + 1), ...newPromotion }]);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-2xl font-semibold dark:text-white">Promotions Management</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    + New Promotion
                </button>
            </div>

            {/* AI 추천 프로모션 */}
            <AiPromotionSuggestion />

            {/* Promotion 리스트 */}
            <PromotionList promotions={promotions} />

            {/* 새 프로모션 추가 모달 */}
            {isModalOpen && <NewPromotionModal onClose={() => setModalOpen(false)} onAdd={addPromotion} />}
        </div>
    );
}