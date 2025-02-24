"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mockAnalyticsData, mockPromotions } from "@/mocks/mockAnalyticsData";
import { FaChartLine, FaClipboardList, FaSync } from "react-icons/fa";
import PromotionCard from "@/components/promotion/PromotionCard";
import SearchBar from "@/components/common/SearchBar";

export default function AnalyticsDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPromotions, setFilteredPromotions] = useState(mockPromotions);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setFilteredPromotions(
            mockPromotions.filter((promo) =>
                promo.title.toLowerCase().includes(term.toLowerCase())
            )
        );
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-6">
            {/* ✅ 헤더 */}
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-2xl font-semibold dark:text-white flex items-center gap-2">
                    <FaChartLine /> Analytics Dashboard
                </h1>
                <button className="p-2 border bg-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FaSync className="text-gray-500 dark:text-gray-300" />
                </button>
            </div>

            {/* ✅ 필터 바 */}
            <div className="flex items-center space-x-4 py-4 border-b">
                <SearchBar setSearchTerm={handleSearch} placeholder="Search Promotions..." />
            </div>

            {/* ✅ 프로모션 성과 분석 차트 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-lg font-semibold dark:text-white mb-4">Promotion Performance</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockAnalyticsData}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis stroke="#8884d8" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="engagement" fill="#82ca9d" name="Engagement" />
                        <Bar dataKey="clicks" fill="#8884d8" name="Clicks" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ✅ AI 추천 프로모션 */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                    <FaClipboardList /> AI Suggested Promotions
                </h2>
                <div className="space-y-4">
                    {filteredPromotions.map((promo) => (
                        <PromotionCard key={promo.id} promotion={promo} />
                    ))}
                </div>
            </div>
        </div>
    );
}
