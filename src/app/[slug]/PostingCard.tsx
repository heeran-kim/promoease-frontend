"use client";
import Image from "next/image";
import { Posting } from "@/mocks/mockData"; // ✅ Posting 타입 import 경로 맞게 수정
import { FaFacebook, FaTwitter, FaInstagram, FaLink } from "react-icons/fa";
import { format } from "date-fns";

// ✅ 플랫폼 아이콘 맵핑 함수
function getPlatformIcon(platform: Posting["platform"]) {
    switch (platform) {
        case "Facebook":
            return <FaFacebook className="text-blue-600 w-5 h-5" />;
        case "Twitter":
            return <FaTwitter className="text-sky-500 w-5 h-5" />;
        case "Instagram":
            return <FaInstagram className="text-pink-500 w-5 h-5" />;
        default:
            return null;
    }
}

// ✅ 상태에 따른 색상 스타일
function getStatusStyle(status: Posting["status"]) {
    switch (status) {
        case "Posted":
            return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200";
        case "Scheduled":
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200";
        case "Failed":
            return "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-200";
        default:
            return "";
    }
}

export default function PostingCard({ posting }: { posting: Posting }) {
    const displayTime =
        posting.status === "Posted"
            ? `Posted at ${format(new Date(posting.createdAt), "yyyy-MM-dd HH:mm")}`
            : posting.status === "Scheduled"
            ? `Scheduled for ${format(new Date(posting.scheduledAt), "yyyy-MM-dd HH:mm")}`
            : `Failed at ${format(new Date(posting.createdAt), "yyyy-MM-dd HH:mm")}`;

    return (
        <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white dark:bg-gray-900 dark:border-gray-700 flex items-center space-x-6">
            {/* ✅ 이미지 */}
            <div className="w-32 h-32 flex-shrink-0 relative">
                <Image
                    src={posting.image}
                    alt="Post Image"
                    fill
                    className="object-cover rounded-md"
                />
            </div>

            {/* ✅ 내용 영역 */}
            <div className="flex flex-col flex-grow space-y-1">
                {/* 상단: 플랫폼 + 상태 */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        {getPlatformIcon(posting.platform)}
                        <span className="text-sm font-semibold dark:text-white">{posting.platform}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-md font-semibold ${getStatusStyle(posting.status)}`}>
                        {posting.status}
                    </span>
                </div>

                {/* ✅ 플랫폼별 말투 적용된 캡션 */}
                <p
                    className={`text-sm text-gray-700 dark:text-gray-300 ${
                        posting.platform === "Twitter" ? "italic" : ""
                    } line-clamp-2`}
                >
                    {posting.caption}
                </p>

                {/* ✅ 날짜/시간 */}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {displayTime}
                </p>

                {/* ✅ 해시태그 & 링크 */}
                <div className="flex items-center justify-between mt-2">
                    {/* 해시태그 */}
                    <div className="flex space-x-2">
                        {posting.hashtags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md"
                            >
                                {tag}
                            </span>
                        ))}
                        {posting.hashtags.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{posting.hashtags.length - 3}
                            </span>
                        )}
                    </div>

                    {/* 링크 (존재하면 표시) */}
                    {posting.link && (
                        <a
                            href={posting.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 dark:text-blue-400 hover:underline flex items-center space-x-1"
                        >
                            <FaLink />
                            <span>View</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}