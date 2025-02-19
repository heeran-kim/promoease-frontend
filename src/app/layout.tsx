import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientComponent from "@/components/ClientComponent";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <ClientComponent>
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </ClientComponent>
            </body>
        </html>
    );
}
