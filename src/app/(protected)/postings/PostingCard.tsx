"use client";
import { Posting } from "@/mocks/mockData";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { format } from "date-fns";

const PostingCard = ({ posting, viewMode, onDelete }: { 
    posting: Posting, 
    viewMode: "grid" | "list", 
    onDelete: (id: string) => void 
}) => {
    // 플랫폼 아이콘 매핑
    const platformIcons = {
        Facebook: <FaFacebook className="text-blue-600" size={20} />,
        Instagram: <FaInstagram className="text-pink-500" size={20} />,
        Twitter: <FaTwitter className="text-blue-400" size={20} />,
    };

    // 날짜 및 시간 포맷
    const formattedDateTime = format(new Date(posting.scheduledAt), "yyyy-MM-dd hh:mm a");

    return (
        <a 
            href={posting.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block" // 클릭 영역 확장
        >
            <div 
                className={`relative p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg ${
                    viewMode === "list" ? "flex items-center space-x-4 h-auto" : "max-w-md mx-auto"
                }`}
            >
                {/* 🗑️ 삭제 버튼 (Grid & List 모드에서 보이게) */}
                <button 
                    onClick={(e) => {
                        e.preventDefault(); // 클릭 이벤트 방지 (삭제 시 링크 이동 방지)
                        onDelete(posting.id);
                    }}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 z-20 bg-white bg-opacity-70 px-2 py-1 rounded-md"
                >
                    ❌
                </button>

                {/* 🏷️ Grid 모드에서 플랫폼, 날짜, 상태를 이미지 위에 배치 (흰색 배경) */}
                {viewMode === "grid" && (
                    <>
                        <div className="absolute top-2 left-2 flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-md z-10">
                            <div className="w-6 h-6 flex justify-center items-center">
                                {platformIcons[posting.platform]}
                            </div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                                {formattedDateTime}
                            </span>
                        </div>

                        {/* ✅ Grid 모드에서 Status 위치 조정 (삭제 버튼 아래) */}
                        <span 
                            className={`absolute top-10 right-2 px-2 py-1 text-xs font-semibold rounded-md z-10 ${
                                posting.status === "Failed"
                                    ? "bg-red-100 text-red-600"
                                    : posting.status === "Scheduled"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-green-100 text-green-600"
                            }`}
                        >
                            {posting.status}
                        </span>
                    </>
                )}

                {/* 🖼️ 이미지 배치 */}
                <div className={viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "mt-2"}>
                    <img 
                        src={posting.image} 
                        alt="Post Image" 
                        className={`rounded-lg ${
                            viewMode === "grid" 
                                ? "w-full max-w-md mx-auto aspect-[4/3] object-cover"
                                : "w-32 h-32 object-cover"
                        }`}
                    />
                </div>

                {/* 🏷️ List 모드일 때 텍스트 배치 */}
                <div className={viewMode === "list" ? "flex-1" : "mt-3"}>
                    {/* 🏷️ List 모드에서 플랫폼, 날짜, 상태 표시 */}
                    {viewMode === "list" && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-full">
                                    {platformIcons[posting.platform]}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {formattedDateTime}
                                </span>
                            </div>
                            <span 
                                className={`px-2 py-1 text-xs font-semibold rounded-md ${
                                    posting.status === "Failed"
                                        ? "bg-red-100 text-red-600"
                                        : posting.status === "Scheduled"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-green-100 text-green-600"
                                }`}
                            >
                                {posting.status}
                            </span>
                        </div>
                    )}

                    {/* 📝 포스트 내용 */}
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{posting.caption}</p>

                    {/* ❤️ 반응 수 & 💬 댓글 수 */}
                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                            <span>👍 ❤️ </span>
                            <span>{posting.reactions || 0}</span>
                        </div>
                        <span>{posting.comments || 0} comments</span>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default PostingCard;