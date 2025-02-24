"use client";

import { useDroppable } from "@dnd-kit/core";

export default function PlatformDropZone({ platform, children }: { platform: string; children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({
        id: platform, // ✅ 플랫폼 ID를 Droppable로 등록
        data: { sortable: { containerId: platform  }},
    });

    return (
        <div 
            ref={setNodeRef} // ✅ 이걸 추가해야 Draggable이 여기에 Drop 가능함
            className="border rounded-md p-2 min-h-[50px] bg-white"
        >
            {children}
        </div>
    );
}