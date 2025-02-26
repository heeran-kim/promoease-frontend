// src/app/(protected)/postings/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getRestaurantPostings, deletePosting } from "@/mocks/mockData";
import SearchBar from "@/components/common/SearchBar"; 
import DateRangePicker from "@/components/common/DateRangePicker";
import ListCard from "@/components/common/ListCard";
import Select from "@/components/common/Select";
import { PLATFORM_OPTIONS } from "@/constants/platforms";
import { STATUS_OPTIONS } from "@/mocks/mockData";

const ITEMS_PER_PAGE = 5; 

export default function PostingsDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [posts, setPosts] = useState(getRestaurantPostings());
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const handleDelete = (postId: string) => {
        deletePosting(postId);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };

    const handleEdit = (postId: string) => {
        console.log(`Editing post: ${postId}`);
        // TODO: Implement edit logic
    };

    const handleRetry = (postId: string) => {
        console.log(`Retrying post: ${postId}`);
        // TODO: Implement retry logic
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    const filteredPosts = posts
    .filter(post => 
        (!selectedPlatform || post.platform === selectedPlatform) &&
        (!selectedStatus || post.status === selectedStatus)
    )
    .slice(0, visibleCount);

    const failedPosts = posts.filter(post => post.status === "Failed");
    const scheduledPosts = posts.filter(post => post.status === "Scheduled");
    const postedPosts = posts.filter(post => post.status === "Posted");

    const searchParams = useSearchParams();
    const postId = searchParams.get("id");
    const postRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        if (!postId) return;
        if (postRefs.current[postId]) {
            postRefs.current[postId]?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
        handleLoadMore();
    }, [postId, visibleCount]);

    return (
        <div>
            <div className="flex items-center space-x-4 py-4 border-b">
                <SearchBar setSearchTerm={setSearchTerm} placeholder="Search posts..." />
                <DateRangePicker onChange={(range) => console.log("Selected Range:", range)} />
                <Select value={selectedPlatform} onChange={setSelectedPlatform} options={PLATFORM_OPTIONS} placeholder="All Platforms"/>
                <Select value={selectedStatus} onChange={setSelectedStatus} options={STATUS_OPTIONS} placeholder="All Status"/>
            </div>

            <div className="space-y-4 mt-2">
                {filteredPosts.map((post) => {
                    const actions = [
                        post.status === "Failed" && { label: "Retry", onClick: () => handleRetry(post.id) },
                        post.status !== "Posted" && { label: "Edit", onClick: () => handleEdit(post.id) },
                        { label: "Delete", onClick: () => handleDelete(post.id) },
                    ].filter(Boolean);

                    return (
                        <ListCard
                            key={post.id}
                            ref={(el) => { postRefs.current[post.id] = el; }}
                            item={post}
                            actions={actions}
                            type="posting"
                        />
                    );
                })}
            </div>

            {visibleCount < posts.length && (
                <div className="flex justify-center mt-6">
                    <button
                        id="load-more-button"
                        onClick={handleLoadMore}
                        className="w-full px-6 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 
                                rounded-lg shadow-sm hover:bg-gray-100 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}