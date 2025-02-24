"use client";

import clsx from "clsx";
import { baseContainerClass } from "@/components/styles";
import { useState } from "react";
import { FaEllipsisV, FaThLarge, FaList } from "react-icons/fa";
import { getRestaurantPostings } from "@/mocks/mockData";
import SearchBar from "@/components/common/SearchBar"; 
import DateRangePicker from "@/components/common/DateRangePicker";
import PostingCard from "./PostingCard";

export default function PostingsDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // ✅ 게시물 상태 저장
    const [posts, setPosts] = useState(getRestaurantPostings("the-great-steakhouse"));

    // ✅ 게시물 삭제 함수
    const deletePost = (postId: string) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };

    // ✅ "Posted" 게시물과 "Scheduled/Failed" 게시물 분리
    const failedPosts = posts.filter(post => post.status === "Failed");
    const scheduledPosts = posts.filter(post => post.status === "Scheduled");
    const postedPosts = posts.filter(post => post.status === "Posted");

    return (
        <div>
            {/* ✅ 필터 바 */}
            <div className="flex items-center space-x-4 py-4 border-b">
                <SearchBar setSearchTerm={setSearchTerm} placeholder="Search posts..." />
                <DateRangePicker onChange={(range) => console.log("Selected Range:", range)} />
                
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

                <div className="flex border rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-3 flex items-center justify-center w-12 transition ${
                            viewMode === "list" ? "bg-white dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                    >
                        <FaThLarge className="text-gray-700 dark:text-gray-300" size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-3 flex items-center justify-center w-12 transition ${
                            viewMode === "grid" ? "bg-white dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                    >
                        <FaList className="text-gray-700 dark:text-gray-300" size={18} />
                    </button>
                </div>
            </div>

            {/* ✅ 게시물 목록 */}
            <div className="space-y-4 mt-2">
                {failedPosts.map((post) => (
                    <PostingCard key={post.id} posting={post} viewMode={viewMode} onDelete={deletePost} />
                ))}

                {scheduledPosts.map((post) => (
                    <PostingCard key={post.id} posting={post} viewMode={viewMode} onDelete={deletePost} />
                ))}
 
                {postedPosts.length > 0 && (failedPosts.length > 0 || scheduledPosts.length > 0) && (
                    <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>
                )}

                {postedPosts.map((post) => (
                    <PostingCard key={post.id} posting={post} viewMode={viewMode} onDelete={deletePost} />
                ))}
            </div>
        </div>
    );
}