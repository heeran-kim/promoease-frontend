// components/SocialMediaLinks.tsx

import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

interface SocialMediaLinksProps {
    links: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
    };
}

export default function SocialMediaLinks({ links }: SocialMediaLinksProps) {
    if (Object.keys(links).length === 0) return null;

    return (
        <div className="flex items-center">
            <div className="flex space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                {links.instagram && (
                    <a href={links.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <FaInstagram className="text-pink-500 text-sm hover:opacity-80 transition" />
                    </a>
                )}
                {links.facebook && (
                    <a href={links.facebook} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <FaFacebook className="text-blue-600 text-sm hover:opacity-80 transition" />
                    </a>
                )}
                {links.twitter && (
                    <a href={links.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <FaTwitter className="text-blue-400 text-sm hover:opacity-80 transition" />
                    </a>
                )}
            </div>
        </div>
    );
}