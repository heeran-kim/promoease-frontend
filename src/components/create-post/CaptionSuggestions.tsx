"use client";

import { useEffect } from "react";
import Card from "@/components/common/Card";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DraggableCaption from "./DraggableCaption";
import PlatformDropZone from "./PlatformDropZone";
import { getRegisteredAccount, getRegisteredPlatforms } from "@/models/business";
import { captions } from "@/constants/captions";
import { usePlatformCaptions } from "@/context/PlatformCaptionsContext";
import { PlatformState } from "@/types";

interface CaptionSuggestionsProps {
    setStep: (step: number) => void;
    platformOptions: string[];
    platformStates: PlatformState[];
    setPlatformStates: (type: PlatformState[]) => void;
    handleConfirmPost: () => void;
}

export default function CaptionSuggestions({ setStep, platformOptions, platformStates, setPlatformStates, handleConfirmPost }: CaptionSuggestionsProps) {
    const { platformCaptions, setPlatformCaptions } = usePlatformCaptions();
    
    const togglePlatform = (platform: string) => {
        if (!platformStates.includes(platform)) return;

        setPlatformStates((prev: string[]) => {
            return prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform];
        });
    };

    useEffect(() => {
        setPlatformCaptions((prev: Record<string, string>) => {
            const updatedCaptions: Record<string, string> = { ...prev };
            let hasChanges = false;
    
            platformOptions.forEach((platform) => {
                if (!platformStates.includes(platform) && updatedCaptions[platform] !== "") {
                    updatedCaptions[platform] = "";
                    hasChanges = true;
                }
            });
    
            return hasChanges ? updatedCaptions : prev;
        });
    }, [platformStates, setPlatformCaptions]);
    
    const handleCaptionEdit = (platform: string, text: string) => {
        setPlatformCaptions((prev) => ({
            ...prev,
            [platform]: text,
        }));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
    
        const draggedCaption = String(active.id);
        const targetPlatform = String(over.id);
    
        if (!platformStates.includes(targetPlatform)) return;
    
        setPlatformCaptions((prev: Record<string, string>) => ({
            ...prev,
            [targetPlatform]: draggedCaption,
        }));
    };

    return (
        <Card 
            title="Step 3: Review & Customize Captions" 
            description="Drag and drop a caption to your selected platform. You can also edit captions before posting. If you want different AI-generated captions, click 'Back to Edit' to adjust your inputs and generate new suggestions."
        >
            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex gap-6">
                    <div className="w-1/2 flex-shrink-0 space-y-3">
                        <h3 className="text-sm font-medium">📝 Generated Captions:</h3>
                        {captions.map((caption) => (
                            <DraggableCaption key={caption} id={caption} text={caption} />
                        ))}
                    </div>

                    <div className="w-1/2 flex-grow space-y-6">
                        <h3 className="text-sm font-medium">📲 Captions by Platform:</h3>
                        <div className="space-y-4 mt-3">
                            {platformOptions.map((platform) => (
                                <div key={platform}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold">{platform}</p>
                                            {getRegisteredAccount(platform as keyof typeof platformOptions) && (
                                                <span className="text-xs text-gray-500">({getRegisteredAccount(platform as keyof typeof platformOptions)})</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => togglePlatform(platform)}
                                            className={`text-xs px-2 py-1 rounded-md transition ${
                                                platformStates.includes(platform)
                                                    ? platformStates.includes(platform)
                                                        ? "bg-black text-white hover:bg-gray-800"
                                                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            }`}
                                            disabled={!platformStates.includes(platform)}
                                        >
                                            {platformStates.includes(platform) ? "Disable" : "Enable"}
                                        </button>
                                    </div>

                                    <PlatformDropZone key={platform} platform={platform}>
                                        <textarea 
                                            id={platform}
                                            className="w-full h-24 text-sm p-2 border rounded-md mt-1 resize-none"
                                            placeholder={
                                                platformStates.includes(platform)
                                                    ? platformStates.includes(platform)
                                                        ? "Drag a caption here or type your own..."
                                                        : "🔹 Want to post here? Enable this platform first!"
                                                    : "❌ You cannot post here. This platform is not registered."
                                            }
                                            value={platformCaptions[platform]}
                                            onChange={(e) => handleCaptionEdit(platform, e.target.value)}
                                            disabled={!platformStates.includes(platform)}
                                        />
                                    </PlatformDropZone>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DndContext>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                >
                    Back to Edit
                </button>

                <button
                    onClick={handleConfirmPost}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                    Confirm & Post
                </button>
            </div>
        </Card>
    );
}
