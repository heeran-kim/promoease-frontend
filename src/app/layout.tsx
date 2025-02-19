// src/app/layout.tsx
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <AuthProvider>
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}