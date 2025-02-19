"use client";

import { useState } from "react";
import AuthPopup from "@/components/AuthPopup";
import Navbar from "@/components/Navbar";

export default function ClientComponent({ children }: { children: React.ReactNode }) {
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        console.log("Opening popup...");
        setIsAuthPopupOpen(true);
    };

    const handleClosePopup = () => {
        console.log("Closing popup...");
        setIsAuthPopupOpen(false);
    };

    return (
        <>
            <Navbar onSignIn={handleOpenPopup} />
            {children}
            <AuthPopup isOpen={isAuthPopupOpen} onClose={handleClosePopup} />
            {console.log("Popup open status:", isAuthPopupOpen)}
        </>
    );
}
