"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getRestaurantPostings, Posting } from "@/mocks/mockData";
import Image from "next/image";

export default function PostingsDashboard() {
    const { slug } = useParams(); // ✅ 현재 레스토랑 가져오기
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    
    if (!slug) return <p>No restaurant selected</p>;

    const postings = getRestaurantPostings(slug).filter((post) =>
        selectedPlatform ? post.platforms.some((p) => p.platform === selectedPlatform) : true
    );

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Postings Management</h1>

            {/* ✅ 소셜미디어 필터 버튼 */}
            <div className="flex space-x-2 mb-4">
                {["Facebook", "Twitter", "Instagram"].map((platform) => (
                    <button
                        key={platform}
                        onClick={() => setSelectedPlatform(selectedPlatform === platform ? null : platform)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                            selectedPlatform === platform ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        {platform}
                    </button>
                ))}
            </div>

            {/* ✅ 게시물 목록 */}
            <div className="space-y-6">
                {postings.map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg shadow-sm">
                        <div className="flex space-x-4">
                            <Image src={post.image} alt="Post Image" width={80} height={80} className="rounded-lg" />
                            <div className="flex flex-col">
                                <p className="font-semibold">{post.description}</p>
                                <p className="text-gray-500 text-sm">{post.hashtags.join(" ")}</p>
                                <div className="mt-2">
                                    {post.platforms.map(({ platform, status }) => (
                                        <span
                                            key={platform}
                                            className={`px-2 py-1 text-xs rounded-md mr-2 ${
                                                status === "Success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                            }`}
                                        >
                                            {platform} {status === "Success" ? "✅" : "❌"}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}