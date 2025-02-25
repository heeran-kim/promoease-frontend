"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mockAnalyticsData, mockPromotions } from "@/mocks/mockAnalyticsData";
import { FaChartLine, FaClipboardList, FaSync } from "react-icons/fa";
import PromotionCard from "@/components/promotion/PromotionCard";
import SearchBar from "@/components/common/SearchBar";

export default function AnalyticsDashboard() {

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
        </div>
    );
}
