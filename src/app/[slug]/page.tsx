"use client";

import clsx from "clsx";
import { baseContainerClass } from "@/components/styles";
import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { getRestaurantPostings, Posting } from "@/mocks/mockData";
import SearchBar from "@/components/common/SearchBar"; 
import DateRangePicker from "@/components/common/DateRangePicker";
import PostingCard from "./PostingCard";

export default function PostingsDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleDateChange = (range: { start: Date | null; end: Date | null }) => {
        console.log("Selected Range:", range);
    };

    const postings = getRestaurantPostings("the-great-steakhouse");

    // ✅ "Posted" 게시물과 "Scheduled/Failed" 게시물 분리
    const postedPosts = postings.filter((post) => post.status === "Posted");
    const scheduledOrFailedPosts = postings.filter((post) => post.status !== "Posted");

    return (
        <div className="max-w-4xl mx-auto px-6 py-6">
            {/* ✅ 제목 + 설정 버튼 */}
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-2xl font-semibold dark:text-white">Postings Management</h1>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 border bg-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <FaEllipsisV className="btext-gray-500 dark:text-gray-300" />
                    </button>
                    {menuOpen && (
                        <div className={clsx("absolute right-0 mt-2 w-40 p-2 shadow-lg rounded-lg", baseContainerClass)}>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700">New Posting</button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Restaurant Settings</button>
                        </div>
                    )}
                </div>
            </div>

            {/* ✅ 필터 바 */}
            <div className="flex items-center space-x-4 py-4 border-b">
                <SearchBar setSearchTerm={setSearchTerm} placeholder="Search posts..." />

                {/* 📅 날짜 선택 */}
                <DateRangePicker onChange={handleDateChange} />
                
                {/* 🌐 소셜미디어 선택 */}
                <select
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="border rounded-md px-4 py-2 text-sm dark:bg-gray-800 dark:text-white"
                >
                    <option value="">All Social Media</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Instagram">Instagram</option>
                </select>

                {/* 📌 상태 선택 */}
                <select
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border rounded-md px-4 py-2 text-sm dark:bg-gray-800 dark:text-white"
                >
                    <option value="">All Status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Posted">Posted</option>
                    <option value="Failed">Failed</option>
                </select>
            </div>

            {/* ✅ 게시물 목록 */}
            <div className="space-y-4">
                {/* ✅ 아직 게시되지 않은 (Scheduled/Failed) 콘텐츠 */}
                {scheduledOrFailedPosts.map((post) => (
                    <PostingCard key={post.id} posting={post} />
                ))}

                {/* ✅ 구분선 (Posted가 있고, Scheduled/Failed가 있을 때만 표시) */}
                {postedPosts.length > 0 && scheduledOrFailedPosts.length > 0 && (
                    <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>
                )}

                {/* ✅ 이미 게시된 (Posted) 콘텐츠 */}
                {postedPosts.map((post) => (
                    <PostingCard key={post.id} posting={post} />
                ))}
            </div>
        </div>
    );
}