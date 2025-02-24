// src/app/create-post/page.tsx
"use client";

import { useState } from "react";
import Card from "@/components/common/Card";
import ImageAnalyser from "@/components/create-post/ImageAnalyser";
import BusinessInfo from "@/components/create-post/BusinessInfo";
import PostSettings from "@/components/create-post/PostSettings";
import UserCustomization from "@/components/create-post/UserCustomization";
import CaptionSuggestions from "@/components/create-post/CaptionSuggestions";

export default function NewPosting() {
    const [step, setStep] = useState(2); 
    const [promotionType, setPromotionType] = useState("");
    const [customText, setCustomText] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);

    return (
        <div className="max-w-6xl mx-auto flex gap-6 p-6">
            <ImageAnalyser />

            <div className="w-2/3 flex-grow space-y-6">
                {step === 2 ? (
                    <Card title="Step 2: Tell AI About Your Post" description="Help AI understand your post by providing some details. Your selections will shape the generated captions!">
                        <div className="space-y-1">
                            <BusinessInfo />
                            <PostSettings
                                promotionType={promotionType}
                                setPromotionType={setPromotionType}
                                selectedPlatform={selectedPlatform}
                                setSelectedPlatform={setSelectedPlatform}
                            />
                            <UserCustomization customText={customText} setCustomText={setCustomText} />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setStep(3)}
                                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                            >
                                Generate Captions
                            </button>
                        </div>
                    </Card>
                ) : (
                    <CaptionSuggestions
                        setStep={setStep}
                        selectedPlatform={selectedPlatform}
                        setSelectedPlatform={setSelectedPlatform}
                    />
                )}
            </div>
        </div>
    );
}