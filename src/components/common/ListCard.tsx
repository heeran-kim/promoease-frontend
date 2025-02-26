"use client";

import React, { forwardRef } from "react";
import { Posting, getPostById } from "@/mocks/mockData";
import { Promotion } from "@/mocks/mockPromotions";
import { getPlatformIcon } from "@/constants/platforms";
import { format } from "date-fns";
import { getStatusClass } from "@/components/styles";
import ActionDropdown from "@/components/common/ActionDropdown";
import { FaRegCalendarAlt, FaTag } from "react-icons/fa";

interface ListCardProps<T extends Posting | Promotion> {
    item: T;
    actions: { label: string; onClick: () => void }[];
    type: "posting" | "promotion";
}

const formatShortURL = (url: string, maxLength = 18) => {
    const cleanURL = url.replace(/^(https?:\/\/)?(www\.)?/, "");
    return cleanURL.length > maxLength ? cleanURL.slice(0, maxLength) + "..." : cleanURL;
};

const ListCard = forwardRef<HTMLDivElement, ListCardProps<Posting | Promotion>>(
    ({ item, actions, type }, ref) => {
        const formattedDate =
            type === "posting" 
                ? format(new Date((item as Posting).scheduledAt), "yyyy-MM-dd hh:mm a")
                : `${format(new Date((item as Promotion).startDate), "yyyy-MM-dd")} ~ ${format(new Date((item as Promotion).endDate), "yyyy-MM-dd")}`;

        const image =
            type === "posting"
                ? (item as Posting).image
                : (item as Promotion).postId?.length
                ? getPostById((item as Promotion).postId[0])?.image
                : "/images/no-post.jpg";

        const socialLinks = 
            type === "posting"
                ? [{ link: (item as Posting).link ?? "Link not available yet", platform: (item as Posting).platform }]
                : (item as Promotion).postId.map((postId) => {
                    const post = getPostById(postId);
                    return { link: `/postings?id=${postId}`, platform: post?.platform ?? "unknown" };
                });

        return (
            <div ref={ref} className="relative p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg flex items-center space-x-4 h-auto">
                <div className="absolute top-2 right-2">
                    <ActionDropdown actions={actions} />
                </div>

                <div className="w-32 flex-shrink-0">
                    <img 
                        src={image}
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
                                ${getStatusClass((item as Posting).status)}
                            }`}
                        >
                            {(item as Posting).status}
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
                            {type === 'posting' 
                                ? (item as Posting).caption 
                                : (item as Promotion).description}
                        </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        {type === "posting" ? (
                            <div className="flex items-center space-x-1">
                                <span>👍 ❤️ </span>
                                <span>{(item as Posting).reactions || 0}</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1">
                                <span>🛒 Sold:</span>
                                <span>{(item as Promotion).soldCount || 0}</span>
                            </div>
                        )}

                        {type === "posting" && (
                            <span>{(item as Posting).comments || 0} comments</span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

ListCard.displayName = "ListCard";

export default ListCard;