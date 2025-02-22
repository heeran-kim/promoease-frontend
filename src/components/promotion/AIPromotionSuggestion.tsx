"use client";

import { useEffect, useState } from "react";
import { mockAiPromotions } from "@/mocks/mockAiPromotions";

export default function AiPromotionSuggestion() {
    const [aiPromotions, setAiPromotions] = useState(mockAiPromotions);

    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-semibold">🔮 AI Suggested Promotions</h3>
            {aiPromotions.length === 0 ? (
                <p className="text-gray-500 text-sm">No AI recommendations yet.</p>
            ) : (
                aiPromotions.map((promo, index) => (
                    <div key={index} className="mb-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
                        <p className="text-sm text-gray-800 dark:text-gray-300">
                            <strong>📌 {promo.platform}</strong>
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                            {promo.text}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}