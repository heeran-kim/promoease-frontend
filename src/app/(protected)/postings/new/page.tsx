// src/app/postings/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/common/Card";
import ImageAnalyser from "@/components/create-post/ImageAnalyser";
import BusinessInfo from "@/components/create-post/BusinessInfo";
import PostSettings from "@/components/create-post/PostSettings";
import UserCustomization from "@/components/create-post/UserCustomization";
import CaptionSuggestions from "@/components/create-post/CaptionSuggestions";
import { addPosting } from "@/mocks/mockData";
import { usePlatformCaptions } from "@/context/PlatformCaptionsContext";
import { v4 as uuidv4 } from "uuid";

export default function NewPosting() {
    const [step, setStep] = useState(2); 
    const [promotionType, setPromotionType] = useState("");
    const [customText, setCustomText] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
    const [image, setImage] = useState<string>("");
    const [detectedItems, setDetectedItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { platformCaptions, resetPlatformCaptions } = usePlatformCaptions(); 
    const router = useRouter();

    const handleGenerateCaptions = () => {
        resetPlatformCaptions();
        setIsLoading(true);
        setTimeout(() => {
            setStep(3);
            setIsLoading(false);
        }, 2000);
    };

    const handleConfirmPost = () => {
        setIsLoading(true);

        setTimeout(() => {
            selectedPlatform.forEach((platform) => {
                addPosting({
                    id: uuidv4(),
                    restaurantId: "the-great-steakhouse",
                    createdAt: new Date().toISOString(),
                    scheduledAt: new Date().toISOString(),
                    status: "Posted",
                    image: image,
                    platform,
                    caption: platformCaptions[platform],
                    hashtags: [],
                    type: "Marketing",
                    link: null,
                });
            });
    
            setIsLoading(false);
            setIsSuccess(true);
    
            setTimeout(() => {
                router.push("/postings");
            }, 1500);
        }, 2000);
    };



    return (
        <div className="max-w-6xl mx-auto flex gap-6 p-6">
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        {isSuccess ? (
                            <>
                                <div className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full text-3xl mb-3">
                                    ✔
                                </div>
                                <p className="text-lg font-semibold text-gray-700">Posted Successfully!</p>
                            </>
                        ) : (
                            <>
                                <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-3"></div>
                                <p className="text-lg font-semibold text-gray-700">Processing...</p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {step == 2 ? (
                <>
                    <ImageAnalyser image={image} setImage={setImage} detectedItems={detectedItems} setDetectedItems={setDetectedItems} />
                    <div className="w-2/3 flex-grow space-y-6">
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
                                    onClick={handleGenerateCaptions}
                                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                                >
                                    Generate Captions
                                </button>
                            </div>
                        </Card>
                    </div>
                </>
            ):(
                <CaptionSuggestions
                    setStep={setStep}
                    selectedPlatform={selectedPlatform}
                    setSelectedPlatform={setSelectedPlatform}
                    handleConfirmPost={handleConfirmPost}
                />
            )}
        </div>
    );
}