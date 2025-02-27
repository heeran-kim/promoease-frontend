"use client";

import Card from "@/components/common/Card";
import { getPlatformIcon, PLATFORM_OPTIONS } from "@/constants/platforms";
import { getRegisteredPlatforms } from "@/models/business";
import { PostType, TYPE_OPTIONS } from "@/models/post";
interface PostSettingsProps {
    postType: PostType;
    setPostType: (type: PostType) => void;
    selectedPlatform: string[];
    setSelectedPlatform: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PostSettings({
    postType,
    setPostType,
    selectedPlatform,
    setSelectedPlatform,
}: PostSettingsProps) {
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
                        {TYPE_OPTIONS.map((type) => (
                            <button
                                key={type}
                                onClick={() => setPostType(type)}
                                className={`px-3 py-1.5 rounded-md border text-sm transition ${
                                    postType === type ? "bg-gray-300" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
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
                        {PLATFORM_OPTIONS.map((platform) => (
                            <button
                                key={platform}
                                onClick={() => handlePlatformToggle(platform)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition ${
                                    registeredPlatforms.includes(platform)
                                        ? selectedPlatform.includes(platform)
                                            ? "bg-gray-300"
                                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                        : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
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