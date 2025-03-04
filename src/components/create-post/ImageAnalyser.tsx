"use client";

import DragAndDropUploader from "@/components/common/DragAndDropUploader";
import Card from "@/components/common/Card";
import { Dispatch, SetStateAction } from "react";

interface ImageAnalyserProps {
    image: File | null;
    setImage: (image: File | null) => void;
    detectedItems: string[];
    setDetectedItems: Dispatch<SetStateAction<string[]>>;
    handleAnalyseImage: (e: React.MouseEvent<HTMLButtonElement>) => void; 
}

export default function ImageAnalyser({ image, setImage, detectedItems, setDetectedItems, handleAnalyseImage }: ImageAnalyserProps) {
    const handleImageUpload = (file: File | null) => {
        if (file) {
            setImage(file);
            setDetectedItems([]);
        } else {
            setImage(null);
        }
    };

    const removeDetectedItem = (index: number) => {
        setDetectedItems((prev: string[]) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full lg:w-1/3 flex-shrink-0">
            <Card
                title="Step 1: Upload & Analyse Image"
                description={
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <p>Start by uploading an image. The AI will analyse its content to extract key elements that will help in generating your caption.</p>
                        <ul className="list-disc ml-4">
                            <li>Upload an image by <strong>dragging & dropping</strong> or clicking to select a file.</li>
                            <li>After uploading, click the <strong>&quot;Analyse Image&quot;</strong> button to detect key elements.</li>
                            <li>Remove incorrect tags by hovering over them and clicking the <strong>X button</strong>.</li>
                        </ul>
                    </div>
                }
            >
                <DragAndDropUploader value={image ? URL.createObjectURL(image) : ""}  onChange={handleImageUpload} fileType="image" />
            
                {image && (
                    <div className="mt-3">
                        <button
                            onClick={handleAnalyseImage}
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
                        >
                            Analyse Image
                        </button>

                        {detectedItems.length > 0 && (
                            <>
                            <div className="mt-3 p-3 border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-800">
                                <p className="text-sm font-medium mb-2">Detected Items:</p>
                                <div className="flex flex-wrap gap-2">
                                    {detectedItems.map((item, index) => (
                                        <div key={index} className="relative px-3 py-1 bg-gray-200 text-sm rounded-md group">
                                            {item}
                                            <button
                                                onClick={() => removeDetectedItem(index)}
                                                className="absolute -top-2 -right-2 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-xs mt-2 text-gray-500">
                                🚀 <strong>[AI Model Usage Plan]</strong> <br />
                                - This feature is currently a sample and the AI analysis function has not been implemented yet. <br />
                                - Image analysis AI will be used to detect objects within images. <br />
                                - Planned <strong>pre-trained open-source models</strong> from Hugging Face:  <br />
                                * <strong>CLIP</strong> (Image-to-text matching) <br /> 
                                * <strong>ResNet</strong> (Deep learning-based image classification)  <br />
                                * <strong>EfficientNet</strong> (Lightweight image recognition model) <br />
                                - One of these models will be selected, or a combination may be used for optimal performance.
                            </div>
                            </>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
}