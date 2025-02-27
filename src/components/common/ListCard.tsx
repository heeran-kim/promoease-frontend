"use client";

import React, { forwardRef } from "react";
import { Post, getPostById } from "@/models/post";
import { Promotion } from "@/models/promotion";
import { getPlatformIcon } from "@/constants/platforms";
import { format } from "date-fns";
import { getStatusClass } from "@/components/styles";
import ActionDropdown from "@/components/common/ActionDropdown";
import { FaRegCalendarAlt, FaTag } from "react-icons/fa";
import Image from "next/image";

interface ListCardProps<T extends Post | Promotion> {
    item: T;
    actions: { label: string; onClick: () => void }[];
    type: "post" | "promotion";
}

const formatShortURL = (url: string, maxLength = 18) => {
    const cleanURL = url.replace(/^(https?:\/\/)?(www\.)?/, "");
    return cleanURL.length > maxLength ? cleanURL.slice(0, maxLength) + "..." : cleanURL;
};

const ListCard = forwardRef<HTMLDivElement, ListCardProps<Post | Promotion>>(
    ({ item, actions, type }, ref) => {
        const formattedDate =
            type === "post" 
                ? format(new Date((item as Post).scheduledAt), "yyyy-MM-dd hh:mm a")
                : `${format(new Date((item as Promotion).startDate), "yyyy-MM-dd")} ~ ${format(new Date((item as Promotion).endDate), "yyyy-MM-dd")}`;

        const image =
            type === "post"
                ? (item as Post).image
                : ((item as Promotion).postId ?? []).length > 0
                ? getPostById((item as Promotion).postId?.[0] ?? "")?.image ?? "/images/no-post.jpg"
                : "/images/no-post.jpg";

        const socialLinks = 
            type === "post"
                ? [{ link: (item as Post).link ?? "Link not available yet", platform: (item as Post).platform }]
                : (item as Promotion).postId?.map((postId) => {
                    const post = getPostById(postId);
                    return { link: `/posts?id=${postId}`, platform: post?.platform ?? "unknown" };
                }) ?? [];

        return (
            <div ref={ref} className="relative p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg flex items-center space-x-4 h-auto">
                <div className="absolute top-2 right-2">
                    <ActionDropdown actions={actions} />
                </div>

                <div className="w-32 flex-shrink-0">
                    <Image 
                        src={image}
                        alt={image}
                        width={320}
                        height={400}
                        className="aspect-[4/5] border border-gray-200 dark:border-gray-700 rounded-lg object-cover"
                    />
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <FaRegCalendarAlt />{formattedDate}
                        </div>
                        <span 
                            className={`px-2 py-1 text-xs font-semibold rounded-md
                                ${getStatusClass((item as Post).status)}
                            }`}
                        >
                            {(item as Post).status}
                        </span>
                    </div>

                    <div 
                        className="inline-flex items-center gap-1.5 text-xs font-medium 
                                px-2 py-1 rounded-md bg-gray-500 dark:bg-blue-600 
                                text-white dark:text-gray-100 w-fit min-w-[60px]">
                        <FaTag className="text-sm" /> {item.type}
                    </div> 

                    <div className="flex">
                        {socialLinks.map(({ link, platform }, index) => (
                            <div key={index}>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                >
                                    {getPlatformIcon(platform, "text-xs")}
                                    <span className="truncate max-w-[160px]">
                                        {formatShortURL(link)}
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                    

                    <div className="mt-2 p-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <p
                            className="mt-2 text-sm text-gray-700 dark:text-gray-300"
                            style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {type === 'post' 
                                ? (item as Post).caption 
                                : (item as Promotion).description}
                        </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        {type === "post" ? (
                            <div className="flex items-center space-x-1">
                                <span>👍 ❤️ </span>
                                <span>{(item as Post).reactions || 0}</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1">
                                <span>🛒 Sold:</span>
                                <span>{(item as Promotion).soldCount || 0}</span>
                            </div>
                        )}

                        {type === "post" && (
                            <span>{(item as Post).comments || 0} comments</span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

ListCard.displayName = "ListCard";

export default ListCard;