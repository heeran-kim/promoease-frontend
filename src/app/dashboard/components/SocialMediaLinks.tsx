// components/SocialMediaLinks.tsx

import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

interface SocialMediaLinksProps {
    links: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
    };
}

// 🔹 링크에서 마지막 계정명만 추출하는 함수
const extractUsername = (url: string): string => {
    return "@" + url.split("/").pop(); // URL의 마지막 부분을 계정명으로 사용
};

export default function SocialMediaLinks({ links }: SocialMediaLinksProps) {
    if (Object.keys(links).length === 0) return null;

    return (
        <div className="flex flex-col space-y-2 mt-3">
            {links.instagram && (
                <a
                    href={links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-gray-700 hover:text-black w-fit"
                >
                    <FaInstagram className="text-pink-500 text-sm" />
                    <span className="ml-2 text-xs">{extractUsername(links.instagram)}</span>
                </a>
            )}
            {links.facebook && (
                <a
                    href={links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-gray-700 hover:text-black w-fit"
                >
                    <FaFacebook className="text-blue-600 text-sm" />
                    <span className="ml-2 text-xs">{extractUsername(links.facebook)}</span>
                </a>
            )}
            {links.twitter && (
                <a
                    href={links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-gray-700 hover:text-black w-fit"
                >
                    <FaTwitter className="text-blue-400 text-sm" />
                    <span className="ml-2 text-xs">{extractUsername(links.twitter)}</span>
                </a>
            )}
        </div>
    );
}