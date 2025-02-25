// src/app/(protected)/postings/page.tsx
"use client";

import { useState } from "react";
import { getRestaurantPostings, deletePosting } from "@/mocks/mockData";
import SearchBar from "@/components/common/SearchBar"; 
import DateRangePicker from "@/components/common/DateRangePicker";
import ListCard from "@/components/common/ListCard";

export default function PostingsDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const [posts, setPosts] = useState(getRestaurantPostings());

    const handleDelete = (postId: string) => {
        deletePosting(postId);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); // UI 반영
    };

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
            </div>

            {/* ✅ 게시물 목록 */}
            <div className="space-y-4 mt-2">
                {failedPosts.map((post) => (
                    <ListCard key={post.id} item={post} onDelete={handleDelete} type="posting" />
                ))}

                {scheduledPosts.map((post) => (
                    <ListCard key={post.id} item={post} onDelete={handleDelete} type="posting" />
                ))}
 
                {postedPosts.length > 0 && (failedPosts.length > 0 || scheduledPosts.length > 0) && (
                    <div className="border-t border-gray-300 dark:border-gray-700 my-4"></div>
                )}

                {postedPosts.map((post) => (
                    <ListCard key={post.id} item={post} onDelete={handleDelete} type="posting" />
                ))}
            </div>
        </div>
    );
}