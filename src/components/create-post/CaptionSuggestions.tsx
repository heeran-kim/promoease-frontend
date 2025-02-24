"use client";

import { useState } from "react";
import Card from "@/components/common/Card";
import { DndContext, closestCenter, useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { platformsList, platformIcons, registeredPlatforms } from "@/constants/platforms";
import PlatformDropZone from "./PlatformDropZone";


const initialCaptions = [
    "🔥 New Menu Alert! 🔥\nExperience the perfect balance of smoky grilled steak, fresh herbs, and a zesty lemon kick. 🍋🥩 Our new menu is designed for true food lovers who crave bold flavors in a cozy, premium dining atmosphere. 🍷✨\n📍 Available now – tag your foodie friends and come try it! #NewMenu #SteakLover #PremiumDining",
    "Indulge in perfection. 🥩✨\nJuicy, tender, and grilled to perfection – our newest menu item is here to elevate your dining experience. A hint of garlic, fresh herbs, and a citrus twist make every bite unforgettable. 🍋🔥\nTag someone who needs to try this! #FoodieHeaven #SteakGoals #NewMenu",
    "New menu, who dis? 🥩🔥\nCrispy sear, juicy center, and that zesty lemon-garlic hit. You know you want it. 🍋💥\nPull up. #NewMenu #SteakDoneRight",
    "👀 Can you smell that? That’s the sound of your next favorite meal sizzling to perfection! 🥩🔥\nGarlic, herbs, and a squeeze of fresh lemon—simple, yet unforgettable. 🍋✨\nDrop a 🔥 in the comments if you’re craving this right now! #FoodieLife #SteakPerfection #NewOnTheMenu",
    "✨ A new flavor experience awaits! ✨\nOur latest menu addition combines the rich, smoky taste of perfectly grilled steak with a refreshing citrus twist and aromatic herbs. 🍽️ Whether you're here for a casual night out or a premium dining experience, this one’s for you! 🍷\nCome taste the difference. Reservations recommended! #NewMenu #SteakLover #DiningExperience"
  ];

export default function CaptionSuggestions({ setStep, selectedPlatform, setSelectedPlatform }: any) {
    const [captions, setCaptions] = useState(initialCaptions);
    const [platformCaptions, setPlatformCaptions] = useState<{ [key: string]: string[] }>(
        Object.fromEntries(platformsList.map((platform) => [platform, []]))
    );
    
    const togglePlatform = (platform: string) => {
        if (!registeredPlatforms.includes(platform)) return;
        setSelectedPlatform((prev: string[]) =>
            prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform]
        );
    };
    
    const handleCaptionEdit = (platform: string, index: number, text: string) => {
        setPlatformCaptions((prev) => {
            const updatedCaptions = [...prev[platform]];
            updatedCaptions[index] = text;
            return { ...prev, [platform]: updatedCaptions };
        });
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const draggedCaption = active.id;
        const targetPlatform = over.data.current?.sortable.containerId;
        console.log(targetPlatform);

        if (!selectedPlatform.includes(targetPlatform)) return;

        setPlatformCaptions((prev) => ({
            ...prev,
            [targetPlatform]: draggedCaption,
        }));
    };


    return (
        <Card title="Step 3: AI-Generated Captions" description="Drag and drop a caption to your selected platform. You can also edit captions before posting.">
            {/* 🔹 Draggable 캡션 리스트 */}
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={captions}>
                    <div className="space-y-3">
                        {captions.map((caption) => (
                            <SortableItem key={caption} id={caption} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {/* 🔹 캡션 배치 & 입력 칸 */}
            <div className="mt-6">
                <h3 className="text-sm font-medium">📲 Captions by Platform:</h3>
                <div className="space-y-4 mt-3">
                    {platformsList.map((platform) => (
                        <PlatformDropZone key={platform} platform={platform}>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    {platformIcons[platform]}
                                    <p className="text-sm font-semibold">{platform}</p>
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

                            {/* ✅ 드래그 앤 드롭 가능 + 직접 수정 가능 */}
                            <input 
                                type="text"
                                className="w-full text-sm p-2 border rounded-md mt-1"
                                placeholder={selectedPlatform.includes(platform) ? "Drag a caption here or type your own..." : "Disabled"}
                                value={platformCaptions[platform].join("\n")} // ✅ 여러 개일 경우 줄바꿈해서 표시
                                onChange={(e) => handleCaptionEdit(platform, e.target.value)}
                                disabled={!selectedPlatform.includes(platform)}
                            />
                        </PlatformDropZone>
                    ))}
                </div>
            </div>

            {/* 🔹 뒤로 가기 & 포스트 버튼 */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                >
                    Back to Edit
                </button>

                <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                    Confirm & Post
                </button>
            </div>
        </Card>
    );
}

function SortableItem({ id }: { id: string }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <p
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm cursor-grab"
        >
            {id}
        </p>
    );
}