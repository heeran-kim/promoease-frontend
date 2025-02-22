"use client";

import PromotionCard from "./PromotionCard";

interface Promotion {
    id: string;
    title: string;
    description: string;
    discount: string;
    startDate: string;
    endDate: string;
}

export default function PromotionList({ promotions }: { promotions: Promotion[] }) {
    return (
        <div className="mt-4 space-y-4">
            {promotions.length === 0 ? (
                <p className="text-gray-500 text-center">No promotions available.</p>
            ) : (
                promotions.map((promotion) => <PromotionCard key={promotion.id} promotion={promotion} />)
            )}
        </div>
    );
}