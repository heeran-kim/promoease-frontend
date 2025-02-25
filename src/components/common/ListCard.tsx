"use client";
import { Posting } from "@/mocks/mockData";
import { Promotion } from "@/mocks/mockPromotions";
import { getPlatformIcon } from "@/constants/platforms";
import { format } from "date-fns";
import { getStatusClass } from "@/components/styles";
import ActionDropdown from "@/components/common/ActionDropdown";

interface ListCardProps<T extends Posting | Promotion> {
    item: T;
    onDelete: (id: string) => void;
    type: "posting" | "promotion";
}

const formatShortURL = (url: string, maxLength = 18) => {
    const cleanURL = url.replace(/^(https?:\/\/)?(www\.)?/, "");
    return cleanURL.length > maxLength ? cleanURL.slice(0, maxLength) + "..." : cleanURL;
};

const ListCard = <T extends Posting | Promotion>({ item, onDelete, type }: ListCardProps<T>) => {
    const formattedDate = type === "posting" 
    ? format(new Date((item as Posting).scheduledAt), "yyyy-MM-dd hh:mm a")
    : `${format(new Date((item as Promotion).startDate), "yyyy-MM-dd")} ~ ${format(new Date((item as Promotion).endDate), "yyyy-MM-dd")}`;

    const actions = [
        item.status === "Scheduled" || item.status === "Failed"
            ? { label: "Edit", onClick: () => onEdit(item.id) }
            : null,
        item.status === "Failed"
            ? { label: "Retry", onClick: () => onRetry(item.id) }
            : null,
        { label: "Delete", onClick: () => onDelete(item.id) },
    ].filter(Boolean);

    return (
        <div className="relative p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg flex items-center space-x-4 h-auto">
            <div className="absolute top-2 right-2">
                <ActionDropdown actions={actions} />
            </div>

            <div className="w-32 h-32 flex-shrink-0">
                {type === "posting" ? (
                    <img 
                        src={(item as Posting).image} 
                        alt="Post Image" 
                        className="border rounded-lg w-32 h-32 object-cover"
                    />
                ) : (
                    <div className="w-32 h-32 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg">
                        🍽️ {(item as Promotion).menuItems.join(", ")}
                    </div>
                )}
            </div>

            <div className="flex-1">
                <div className="flex items-center justify-between mt-5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formattedDate}
                    </span>
                    <span 
                        className={`px-2 py-1 text-xs font-semibold rounded-md
                            ${getStatusClass((item as Posting).status)}
                        }`}
                    >
                        {(item as Posting).status}
                    </span>
                </div>

                {"platform" in item && type === "posting" ? (
                    item.link ? (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            {getPlatformIcon(item.platform, "text-xs")}
                            <span className="truncate max-w-[160px]">
                                {formatShortURL(item.link)}
                            </span>
                        </a>
                    ) : (
                        <span className="mt-1 inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            {getPlatformIcon(item.platform, "text-xs")}
                            <span className="truncate">Link not available yet</span>
                        </span>
                    )
                ) : (
                    item.socialMediaLinks &&
                    Object.entries(item.socialMediaLinks).map(([platform, url]) => (
                        <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            {getPlatformIcon(platform, "text-xs")}
                            <span className="truncate max-w-[160px]">
                                {formatShortURL(url)}
                            </span>
                        </a>
                    ))
                )}

                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {type === "posting" ? (item as Posting).caption : (item as Promotion).description}
                </p>

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
};

export default ListCard;