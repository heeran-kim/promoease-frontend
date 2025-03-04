"use client";

import Card from "@/components/common/Card";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DraggableCaption from "./DraggableCaption";
import PlatformDropZone from "./PlatformDropZone";
import { PlatformState } from "@/types";

interface CaptionSuggestionsProps {
    setStep: (step: number) => void;
    platformOptions: string[];
    platformStates: PlatformState[];
    setPlatformStates: (type: PlatformState[]) => void;
    handleConfirmPost: () => void;
    captions: string[];
}

export default function CaptionSuggestions({ setStep, platformOptions, platformStates, setPlatformStates, handleConfirmPost, captions }: CaptionSuggestionsProps) {
    const handlePlatformToggle = (platformLabel: string) => {
        setPlatformStates(platformStates.map((platform) =>
            platform.label === platformLabel ? { ...platform, selected: !platform.selected } : platform
        ));
    };
    
    const handleCaptionEdit = (platformLabel: string, text: string) => {
        setPlatformStates(platformStates.map((platform) =>
            platform.label === platformLabel ? { ...platform, caption: text } : platform
        ));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
    
        const draggedCaption = String(active.id);
        const targetPlatform = String(over.id);

        if (!platformStates.find((p) => p.label === targetPlatform)?.selected) return;
    
        setPlatformStates(platformStates.map((platform) =>
            platform.label === targetPlatform ? { ...platform, caption: draggedCaption } : platform
        ));
    };

    return (
        <Card 
            title="Step 3: Review & Customize Captions" 
            description="Drag and drop a caption to your selected platform. You can also edit captions before posting. If you want different AI-generated captions, click 'Back to Edit' to adjust your inputs and generate new suggestions."
        >
            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex flex-col lg:flex-row items-start gap-6">
                    <div className="w-full lg:w-1/2 flex-shrink-0 space-y-3">
                        <h3 className="text-sm font-medium">📝 Generated Captions:</h3>
                        {captions.map((caption) => (
                            <DraggableCaption key={caption} id={caption} text={caption} />
                        ))}
                        <div className="text-xs mt-2 text-gray-500">
                            🚀 <strong>[AI Model Usage Plan]</strong> <br />
                            - This feature is currently a sample, and the AI-generated captions have been pre-defined. <br />
                            - AI-powered caption generation will be implemented to create context-aware captions based on images and user inputs. <br />
                            - Planned <strong>pre-trained AI models</strong> for caption generation:  <br />
                            * <strong>GPT-4 / T5</strong> → (Natural language generation for captions) <br /> 
                            * <strong>BART</strong> → (Text summarization & refinement) <br />
                            - Depending on the requirements, one of these models will be selected, or a combination may be used to optimize caption relevance and creativity.
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex-grow space-y-6">
                        <h3 className="text-sm font-medium">📲 Captions by Platform:</h3>
                        <div className="space-y-4 mt-3">
                            {platformOptions.map((platform) => (
                                <div key={platform}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold">{platform}</p>
                                            {platformStates.find((p) => p.label === platform) && (
                                                <span className="text-xs text-gray-500">(@{platformStates.find((p) => p.label === platform)?.account})</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handlePlatformToggle(platform)}
                                            className={`text-xs px-2 py-1 rounded-md transition ${
                                                platformStates.find((p) => p.label === platform)
                                                    ? platformStates.find((p) => p.label === platform)?.selected
                                                        ? "bg-black text-white hover:bg-gray-800"
                                                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            }`}
                                            disabled={!platformStates.find((p) => p.label === platform)}
                                        >
                                            {platformStates.find((p) => p.label === platform)?.selected ? "Disable" : "Enable"}
                                        </button>
                                    </div>

                                    <PlatformDropZone key={platform} platform={platform}>
                                        <textarea 
                                            id={platform}
                                            className="w-full h-24 text-sm p-2 border rounded-md mt-1 resize-none"
                                            placeholder={
                                                platformStates.find((p) => p.label === platform)
                                                    ? platformStates.find((p) => p.label === platform)?.selected
                                                        ? "Drag a caption here or type your own..."
                                                        : "🔹 Want to post here? Enable this platform first!"
                                                    : "❌ You cannot post here. This platform is not registered."
                                            }
                                            value={platformStates.find((p) => p.label === platform)?.selected ? platformStates.find((p) => p.label === platform)?.caption : ""}
                                            onChange={(e) => handleCaptionEdit(platform, e.target.value)}
                                            disabled={!platformStates.find((p) => p.label === platform)?.selected}
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
