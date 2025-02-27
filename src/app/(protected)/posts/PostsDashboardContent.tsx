// src/app/(protected)/posts/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getPosts, deletePost } from "@/models/post";
import SearchBar from "@/components/common/SearchBar"; 
import DateRangePicker from "@/components/common/DateRangePicker";
import ListCard from "@/components/common/ListCard";
import Select from "@/components/common/Select";
import { PLATFORM_OPTIONS } from "@/constants/platforms";
import { STATUS_OPTIONS } from "@/models/post";

const ITEMS_PER_PAGE = 5; 

export default function PostsDashboardContent() {
    const [postId, setPostId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState<(typeof PLATFORM_OPTIONS)[number] | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [posts, setPosts] = useState(getPosts());
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const handleDelete = (postId: string) => {
        deletePost(postId);
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
            (!selectedStatus || post.status === selectedStatus) &&
            (!searchTerm || post.caption.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    const slicedPosts = filteredPosts.slice(0, visibleCount);

    const searchParams = useSearchParams();
    const postRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const newPostId = searchParams.get("id");
        if (newPostId && newPostId !== postId) {
            setPostId(newPostId);
        }
    }, [searchParams, postId]);

    useEffect(() => {
        if (!postId) return;

        const isPostVisible = posts.some(post => post.id === postId);
        if (isPostVisible) {
            postRefs.current[postId]?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            handleLoadMore();
        }
    }, [postId, posts]);

    return (
        <div>
            <div className="flex items-center space-x-4 py-4 border-b">
                <SearchBar setSearchTerm={setSearchTerm} placeholder="Search posts..." />
                <DateRangePicker onChange={(range) => console.log("Selected Range:", range)} />
                <Select value={selectedPlatform} onChange={setSelectedPlatform} options={PLATFORM_OPTIONS} placeholder="All Platforms"/>
                <Select value={selectedStatus} onChange={setSelectedStatus} options={STATUS_OPTIONS} placeholder="All Status"/>
            </div>

            <div className="space-y-4 mt-2">
                {slicedPosts.map((post) => {
                    const actions = [
                        post.status === "Failed" ? { label: "Retry", onClick: () => handleRetry(post.id) } : false,
                        post.status !== "Posted" ? { label: "Edit", onClick: () => handleEdit(post.id) } : false,
                        { label: "Delete", onClick: () => handleDelete(post.id) }
                    ].filter(Boolean) as { label: string; onClick: () => void }[];

                    return (
                        <ListCard
                            key={post.id}
                            ref={(el) => { postRefs.current[post.id] = el; }}
                            item={post}
                            actions={actions}
                            type="post"
                        />
                    );
                })}
            </div>

            {visibleCount < filteredPosts.length && (
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