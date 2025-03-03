"use client";

import Card from "@/components/common/Card";
import { PostCategory, PlatformState } from "@/types";
import { getPlatformIcon } from "@/utils/icon";

interface PostSettingsProps {
    postCategories: PostCategory[];
    setPostCategories: (type: PostCategory[]) => void;
    platformOptions: string[];
    platformStates: PlatformState[];
    setPlatformStates: (type: PlatformState[]) => void;
}

export default function PostSettings({
    postCategories,
    setPostCategories,
    platformOptions,
    platformStates,
    setPlatformStates,
}: PostSettingsProps) {
    const handleCategoryToggle = (categoryLabel: string) => {
        setPostCategories(postCategories.map((category) =>
                category.label === categoryLabel ? { ...category, selected: !category.selected } : category
            )
        );
        console.log(postCategories);
    };

    const handlePlatformToggle = (platformLabel: string) => {
        setPlatformStates(platformStates.map((platform) =>
            platform.label === platformLabel ? { ...platform, selected: !platform.selected } : platform
        ));
        console.log(platformStates);
    };

    return (
        <Card title="Post Settings" description="Define the purpose and platform for your post.">
            <div className="space-y-3">
                <div>
                    <p className="text-sm font-medium mb-1">📌 Select Purpose:</p>
                    <div className="flex flex-wrap gap-2">
                        {postCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryToggle(category.label)}
                                className={`px-3 py-1.5 rounded-md border text-sm transition ${
                                    category.selected ? "bg-gray-300" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-sm font-medium mb-1">🌍 Choose Platforms:</p>
                    <div className="flex flex-wrap gap-2">
                        {platformOptions.map((platform: string) => {
                            const platformState = platformStates.find((p) => p.label === platform);
                            return (
                                <button
                                    key={platform}
                                    onClick={() => handlePlatformToggle(platform)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition ${
                                        platformState
                                            ? platformState.selected
                                                ? "bg-gray-300"
                                                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                            : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                                    }`}
                                >
                                    {getPlatformIcon(platform)}
                                    {platform}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
}