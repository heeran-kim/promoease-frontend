"use client";

import { FaTrash, FaEdit } from "react-icons/fa";

interface PromotionProps {
    promotion: {
        id: string;
        title: string;
        description: string;
        discount: string;
        startDate: string;
        endDate: string;
    };
}

export default function PromotionCard({ promotion }: PromotionProps) {
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-900 flex justify-between items-center">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{promotion.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{promotion.description}</p>
                <p className="text-sm text-gray-500">💰 Discount: {promotion.discount}</p>
                <p className="text-xs text-gray-400">📅 {promotion.startDate} - {promotion.endDate}</p>
            </div>
            <div className="flex space-x-2">
                <button className="p-2 text-blue-500 hover:text-blue-700">
                    <FaEdit />
                </button>
                <button className="p-2 text-red-500 hover:text-red-700">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}