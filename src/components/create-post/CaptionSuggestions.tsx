"use client";

import { useEffect } from "react";
import Card from "@/components/common/Card";
import { DndContext, closestCenter } from "@dnd-kit/core";
import DraggableCaption from "./DraggableCaption";
import PlatformDropZone from "./PlatformDropZone";
import { PLATFORM_OPTIONS, getPlatformIcon, registeredAccounts, getRegisteredPlatforms } from "@/constants/platforms";
import { captions } from "@/constants/captions";
import { usePlatformCaptions } from "@/context/PlatformCaptionsContext";


export default function CaptionSuggestions({ setStep, selectedPlatform, setSelectedPlatform, handleConfirmPost }: any) {
    const { platformCaptions, setPlatformCaptions } = usePlatformCaptions();
    const registeredPlatforms = getRegisteredPlatforms();
    
    const togglePlatform = (platform: string) => {
        if (!registeredPlatforms.includes(platform)) return;

        setSelectedPlatform((prev: string[]) => {
            return prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform];
        });
    };

    useEffect(() => {
        setPlatformCaptions((prev: { [key: string]: string }) => {
            const updatedCaptions: { [key: string]: string } = { ...prev };
    
            PLATFORM_OPTIONS.forEach((platform) => {
                if (!selectedPlatform.includes(platform)) {
                    updatedCaptions[platform] = "";
                }
            });
    
            return updatedCaptions;
        });
    }, [selectedPlatform]);
    
    const handleCaptionEdit = (platform: string, text: string) => {
        setPlatformCaptions((prev) => ({
            ...prev,
            [platform]: text,
        }));
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const draggedCaption = active.id;
        const targetPlatform = over.id;

        if (!selectedPlatform.includes(targetPlatform)) return;

        setPlatformCaptions((prev) => ({
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
                            {PLATFORM_OPTIONS.map((platform) => (
                                <div key={platform}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            {getPlatformIcon(platform)}
                                            <p className="text-sm font-semibold">{platform}</p>
                                            {registeredAccounts[platform] && (
                                                <span className="text-xs text-gray-500">({registeredAccounts[platform]})</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => togglePlatform(platform)}
                                            className={`text-xs px-2 py-1 rounded-md transition ${
                                                registeredPlatforms.includes(platform)
                                                    ? selectedPlatform.includes(platform)
                                                        ? "bg-black text-white hover:bg-gray-800"
                                                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            }`}
                                            disabled={!registeredPlatforms.includes(platform)}
                                        >
                                            {selectedPlatform.includes(platform) ? "Disable" : "Enable"}
                                        </button>
                                    </div>

                                    <PlatformDropZone key={platform} platform={platform}>
                                        <textarea 
                                            id={platform}
                                            className="w-full h-24 text-sm p-2 border rounded-md mt-1 resize-none"
                                            placeholder={
                                                registeredPlatforms.includes(platform)
                                                    ? selectedPlatform.includes(platform)
                                                        ? "Drag a caption here or type your own..."
                                                        : "🔹 Want to post here? Enable this platform first!"
                                                    : "❌ You cannot post here. This platform is not registered."
                                            }
                                            value={platformCaptions[platform]}
                                            onChange={(e) => handleCaptionEdit(platform, e.target.value)}
                                            disabled={!selectedPlatform.includes(platform)}
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
