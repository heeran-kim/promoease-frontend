"use client";

import Card from "@/components/common/Card";
import { Dispatch, SetStateAction } from "react";

interface UserCustomizationProps {
    customText: string;
    setCustomText: Dispatch<SetStateAction<string>>;
}

export default function UserCustomization({ customText, setCustomText }: UserCustomizationProps) {
    return (
        <Card 
            title="Anything else to add?"
            description="Jot down any extra info—like limited-time deals or event details. No need for perfect wording, AI will smooth it out!"
        >
            <textarea
                className="w-full text-sm p-2 border rounded-md focus:ring focus:ring-blue-300"
                placeholder="e.g. 'Happy hour 5-7PM', 'Closed on Sunday', 'New seasonal menu!'"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
            />
        </Card>
    );
}