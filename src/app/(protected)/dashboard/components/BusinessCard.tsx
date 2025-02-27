"use client";

import clsx from "clsx";
import { baseContainerClass } from "@/components/styles";
import { Business } from "@/models/business";
import { getPostsSummary } from "@/models/post";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SocialMediaLinks from "./SocialMediaLinks";
import { FaLink } from "react-icons/fa";
import BusinessStatus from "./BusinessStatus";
import ActionDropdown from "@/components/common/ActionDropdown";
import { NAV_ITEMS } from "@/constants/navItems";

interface BusinessCardProps {
    business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
    const router = useRouter();
    const postsSummary = getPostsSummary();

    const actions = NAV_ITEMS
        .filter(({ href }) => href !== "/dashboard")
        .map(({ name, href }) => ({
            label: name,
            onClick: () => router.push(href),
        }));

    return (
        <div className={clsx("relative p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col cursor-pointer", baseContainerClass)}>
            <ActionDropdown actions={actions} />

            <div className="flex items-center space-x-4">
                <Image 
                    src={business.logo} 
                    alt={`${business.name} Logo`} 
                    width={60} 
                    height={60} 
                    className="rounded-full" 
                />
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                        <h3 className="text-md font-semibold text-gray-900 dark:text-gray-200">{business.name}</h3> 
                        <SocialMediaLinks links={business.socialMediaLinks} />
                    </div>

                    {postsSummary.lastActivity && (
                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 flex items-center">
                            Last Post: {new Date(postsSummary.lastActivity).toLocaleString()}
                            {postsSummary.lastPostLink && (
                                <a
                                    href={postsSummary.lastPostLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaLink className="inline-block text-xs" /> {/* 🔗 링크 아이콘 */}
                                </a>
                            )}
                        </p>
                    )}

                    <BusinessStatus 
                        upcomingPosts={postsSummary.upcomingPosts} 
                        uploadedPosts={postsSummary.uploadedPosts} 
                        failedPosts={postsSummary.failedPosts} 
                    />
                </div>
            </div>
        </div>
    );
}