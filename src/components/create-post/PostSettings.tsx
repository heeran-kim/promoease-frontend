"use client";

import Card from "@/components/common/Card";
import { getPlatformIcon, getRegisteredPlatforms, platformConfig } from "@/constants/platforms";

const promotionTypes = ["Store Promotion", "Menu Promotion", "Event Promotion", "Announcement"];

export default function PostSettings({
    promotionType,
    setPromotionType,
    selectedPlatform,
    setSelectedPlatform,
}: any) {
    const registeredPlatforms = getRegisteredPlatforms();
    const handlePlatformToggle = (platform: string) => {
        if (!registeredPlatforms.includes(platform)) return;
        setSelectedPlatform((prev: string[]) =>
            prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
        );
    };

    return (
        <Card title="Post Settings" description="Define the purpose and platform for your post.">
            <div className="space-y-3">
                <div>
                    <p className="text-sm font-medium mb-1">📌 Select Purpose:</p>
                    <div className="flex flex-wrap gap-2">
                        {promotionTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setPromotionType(type)}
                                className={`px-3 py-1.5 rounded-md border text-sm transition ${
                                    promotionType === type ? "bg-gray-300" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-sm font-medium mb-1">🌍 Choose Platforms:</p>
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(platformConfig).map((platform) => (
                            <button
                                key={platform}
                                onClick={() => handlePlatformToggle(platform)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition ${
                                    registeredPlatforms.includes(platform)
                                        ? selectedPlatform.includes(platform)
                                            ? "bg-gray-300"
                                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                        : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed" // 등록되지 않은 플랫폼
                                }`}
                            >
                                {getPlatformIcon(platform)}
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}