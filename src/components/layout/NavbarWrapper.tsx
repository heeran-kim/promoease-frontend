// src/components/layout/NavbarWrapper.tsx
"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
    const navbarRef = useRef<HTMLDivElement>(null);
    const [paddingTop, setPaddingTop] = useState(0);

    useLayoutEffect(() => {
        const updatePaddingTop = () => {
            if (navbarRef.current) {
                setPaddingTop(navbarRef.current.offsetHeight);
            }
        };

        updatePaddingTop();

        window.addEventListener("resize", updatePaddingTop);

        const observer = new MutationObserver(updatePaddingTop);
        if (navbarRef.current) {
            observer.observe(navbarRef.current, { attributes: true, childList: true, subtree: true });
        }

        return () => {
            window.removeEventListener("resize", updatePaddingTop);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={navbarRef} className="fixed w-full z-50">
                <Navbar />
            </div>
            <div style={{ paddingTop: `${paddingTop}px` }}>
                {children}
            </div>
        </>
    );
}