// src/context/PlatformCaptionsContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PLATFORM_OPTIONS } from "@/utils/icon";

interface PlatformCaptionsContextType {
    platformCaptions: Record<string, string>;
    setPlatformCaptions: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    resetPlatformCaptions: () => void;
}

const PlatformCaptionsContext = createContext<PlatformCaptionsContextType | undefined>(undefined);

export function PlatformCaptionsProvider({ children }: { children: ReactNode }) {
    const getInitialCaptions = () => {
        if (typeof window === "undefined") return Object.fromEntries(PLATFORM_OPTIONS.map((platform) => [platform, ""]));

        try {
            const storedCaptions = localStorage.getItem("platformCaptions");
            return storedCaptions
                ? JSON.parse(storedCaptions)
                : Object.fromEntries(PLATFORM_OPTIONS.map((platform) => [platform, ""]));
        } catch (error) {
            console.error("Error parsing platformCaptions from localStorage:", error);
            return Object.fromEntries(PLATFORM_OPTIONS.map((platform) => [platform, ""]));
        }
    };

    const [platformCaptions, setPlatformCaptions] = useState<{ [key: string]: string }>(getInitialCaptions);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("platformCaptions", JSON.stringify(platformCaptions));
        }
    }, [platformCaptions]);

    const resetPlatformCaptions = () => {
        const initialCaptions = Object.fromEntries(PLATFORM_OPTIONS.map((platform) => [platform, ""]));
        setPlatformCaptions(() => initialCaptions);
        if (typeof window !== "undefined") {
            localStorage.setItem("platformCaptions", JSON.stringify(initialCaptions));
        }
    };

    return (
        <PlatformCaptionsContext.Provider value={{ platformCaptions, setPlatformCaptions, resetPlatformCaptions }}>
            {children}
        </PlatformCaptionsContext.Provider>
    );
}

export function usePlatformCaptions() {
    const context = useContext(PlatformCaptionsContext);
    if (!context) {
        throw new Error("usePlatformCaptions must be used within a PlatformCaptionsProvider");
    }
    return context;
}