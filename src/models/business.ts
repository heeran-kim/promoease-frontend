// src/models/business.ts

import { PLATFORM_OPTIONS } from "@/utils/icon";

export type Business = {
    id: string;
    name: string;
    logo: string;
    type: string;
    target: string;
    vibe: string;
    socialMediaLinks: Record<keyof typeof PLATFORM_OPTIONS, string>;
};

export const defaultBusiness: Business = {
    ...(Object.fromEntries(
        Object.keys({} as Omit<Business, "socialMediaLinks">).map((key) => [key, ""])
    ) as Omit<Business, "socialMediaLinks">),
    logo: "/images/no-post.jpg",
    socialMediaLinks: Object.fromEntries(
        PLATFORM_OPTIONS.map((key) => [key, ""])
    ) as Record<keyof typeof PLATFORM_OPTIONS, string>,
};

let business: Business = { ...defaultBusiness };

const isBusinessEmpty = (business: Business): boolean => {
    return JSON.stringify(business) === JSON.stringify(defaultBusiness);
};

export const getBusiness = (): Business | null => {
    if (isBusinessEmpty(business)) return null;
    return business;
};

export const getRegisteredPlatforms = (): string[] => {
    if (!business) return [];

    return Object.entries(business.socialMediaLinks)
        .filter(([value]) => value.trim() !== "")
        .map(([platform]) => platform);
};

export const getRegisteredAccount = (platform: keyof typeof PLATFORM_OPTIONS): string | null => {
    if (isBusinessEmpty(business)) return null;
    const account = business.socialMediaLinks[platform];
    return account;
};

export const setBusinessField = <K extends keyof Business>(key: K, value: Business[K]) => {
    if (!business) return;
    business = { ...business, [key]: value };
    console.log(business)
};

