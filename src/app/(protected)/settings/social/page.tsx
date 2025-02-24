"use client";

import { useState } from "react";
import Card from "@/components/common/Card";
import { FaTwitter, FaInstagram, FaFacebook, FaThreads } from "react-icons/fa6";

const socialPlatforms = [
    { name: "Twitter", url: "twitter.com/", icon: <FaTwitter className="w-5 h-5 text-blue-500" /> },
    { name: "Instagram", url: "instagram.com/", icon: <FaInstagram className="w-5 h-5 text-pink-500" /> },
    { name: "Facebook", url: "facebook.com/", icon: <FaFacebook className="w-5 h-5 text-blue-600" /> },
    { name: "Threads", url: "threads.net/", icon: <FaThreads className="w-5 h-5 text-black" /> },
];

export default function SocialMediaSettings() {
    const [businessInfo, setBusinessInfo] = useState({
        socials: {
            Twitter: "",
            Instagram: "",
            Facebook: "",
            Threads: "",
        },
    });

    const handleSocialChange = (platform: string, value: string) => {
        setBusinessInfo((prev) => ({
            ...prev,
            socials: { ...prev.socials, [platform]: value },
        }));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {socialPlatforms.map(({ name, url, icon }) => (
                <Card
                    key={name}
                    title={name}
                    description={`Enter your ${name} username to link your account.`}
                    restriction="Please enter your username only."
                >
                    <div className="flex items-center border rounded-md overflow-hidden">
                        <span className="flex items-center gap-2 bg-gray-200 text-gray-600 px-3 py-2 text-sm">
                            {icon} {/* 플랫폼 아이콘 추가 */}
                            {url}
                        </span>
                        <input
                            type="text"
                            value={businessInfo.socials[name]}
                            onChange={(e) => handleSocialChange(name, e.target.value)}
                            className="flex-1 text-sm p-2 border-l focus:ring focus:ring-blue-300"
                            placeholder="yourusername"
                        />
                    </div>
                </Card>
            ))}
        </div>
    );
}