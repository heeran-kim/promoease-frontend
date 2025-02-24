"use client";

import { FaFacebook, FaInstagram, FaTwitter, FaThreads } from "react-icons/fa6";

export const platformsList = ["Facebook", "Instagram", "Twitter", "Threads"];

export const registeredPlatforms = ["Facebook", "Instagram", "Twitter"];

export const platformIcons: { [key: string]: JSX.Element } = {
    Facebook: <FaFacebook className="text-blue-600" />,
    Instagram: <FaInstagram className="text-pink-500" />,
    Twitter: <FaTwitter className="text-blue-400" />,
    Threads: <FaThreads className="text-black" />,
};