"use client";

import { FaFacebook, FaInstagram, FaTwitter, FaThreads, FaCircleQuestion } from "react-icons/fa6";

export const registeredAccounts: { [key: string]: string } = {
    facebook: "@thegreatsteakhouse",
    instagram: "@thegreatsteakhouse",
    twitter: "@thegreatsteakhouse",
    threads: "",
};

export const platformConfig: Record<string, { icon: React.ElementType; color: string }> = {
    facebook: { icon: FaFacebook, color: "text-blue-600" },
    instagram: { icon: FaInstagram, color: "text-pink-500" },
    twitter: { icon: FaTwitter, color: "text-blue-400" },
    threads: { icon: FaThreads, color: "text-black" },
};

export const getRegisteredPlatforms = () => {
    return Object.keys(registeredAccounts).filter((platform) => registeredAccounts[platform]);
};

export const getPlatformIcon = (platform: string, additionalClasses = "") => {
    const lowerCasePlatform = platform.toLowerCase();
    const config = platformConfig[lowerCasePlatform] || { icon: FaCircleQuestion, color: "text-gray-500" };

    return <config.icon className={`${config.color} ${additionalClasses} hover:opacity-80 transition`} size={20} />;
};
