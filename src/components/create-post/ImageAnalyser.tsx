"use client";

import DragAndDropUploader from "@/components/common/DragAndDropUploader";
import Card from "@/components/common/Card";

export default function ImageAnalyser({ image, setImage, detectedItems, setDetectedItems }: { 
    image: string; 
    setImage: (image: string) => void;
    detectedItems: string[];
    setDetectedItems: (items: string[]) => void;
}) {
    const handleImageUpload = (file: File | null) => {
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImage(fileURL);
            setDetectedItems([]);
        } else {
            setImage("");
        }
    };

    const handleAnalyseImage = async () => {
        if (!image) {
            alert("Please select an image first!");
            return;
        }
        const fakeAnalysis = ["Steak", "Grilled Meat", "Garlic", "Herbs", "Lemon", "Lamb"];
        setDetectedItems(fakeAnalysis);
    };

    const removeDetectedItem = (index: number) => {
        setDetectedItems((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="w-1/3 flex-shrink-0">
            <Card
                title="Step 1: Upload & Analyse Image"
                description={
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <p>Start by uploading an image. The AI will analyse its content to extract key elements that will help in generating your caption.</p>
                        <ul className="list-disc ml-4">
                            <li>Upload an image by <strong>dragging & dropping</strong> or clicking to select a file.</li>
                            <li>After uploading, click the <strong>"Analyse Image"</strong> button to detect key elements.</li>
                            <li>Remove incorrect tags by hovering over them and clicking the <strong>X button</strong>.</li>
                        </ul>
                    </div>
                }
            >
                <DragAndDropUploader value={image} onChange={handleImageUpload} fileType="image" />
            
                {image && (
                    <div className="mt-3">
                        <button
                            onClick={handleAnalyseImage}
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
                        >
                            Analyse Image
                        </button>

                        {detectedItems.length > 0 && (
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
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
}