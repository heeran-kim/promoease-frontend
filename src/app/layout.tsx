// src/app/layout.tsx
"use client";
import "./globals.css";
import { useState, useLayoutEffect, useRef } from "react";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const navbarRef = useRef<HTMLDivElement>(null);
    const [paddingTop, setPaddingTop] = useState(0);

    useLayoutEffect(() => {
        const updatePaddingTop = () => {
            if (navbarRef.current) {
                setPaddingTop(navbarRef.current.offsetHeight);
            }
        };

        updatePaddingTop();

        // Resize 이벤트 리스너
        window.addEventListener("resize", updatePaddingTop);

        // MutationObserver를 사용하여 Navbar의 크기 변화를 감지
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
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <AuthProvider>
                    <div ref={navbarRef} className="fixed w-full z-50">
                        <Navbar />
                    </div>
                    <main className="flex-grow" style={{ paddingTop: `${paddingTop}px` }}>
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}