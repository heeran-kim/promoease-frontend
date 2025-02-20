// src/app/layout.tsx
import { AuthProvider } from "@/components/auth/AuthProvider";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <AuthProvider>
                    <Navbar />
                    <main className="flex-grow mt-16">{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}