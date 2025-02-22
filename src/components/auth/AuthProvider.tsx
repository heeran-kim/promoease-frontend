// src/components/AuthProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { emitWarning } from "process";

interface User {
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name:string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);
    
    const checkAuth = async () => {
        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });

            if (res.status === 401) {
                let newAccessToken = null;
                console.warn("🔄 Access Token expired, trying to refresh...");
                try {
                    const refresth_res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh/`, {
                        method: "POST",
                        credentials: "include",
                    });
    
                    if (refresth_res.ok) {
                        console.log("✅ Successfully refreshed access token");
                        // After refreshing, retry fetching user info
                        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`, {
                            method: "GET",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                        });
                    } else {
                        console.warn("❌ Refresh token expired or invalid. User must log in again.");
                        setUser(null);
                        return;
                    }
                } catch (error) {
                    console.error("❌ Refresh Token API Error:", error);
                    setUser(null);
                    return;
                }
            }

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        }
    };

    const login = async (email: string, password: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login/`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            await res.json();
            checkAuth();
            console.log("Login Successed! forwarding to dashboard.", user);
            router.push("/dashboard");
        } else {
            console.error("Login failed");
        }
    };

    const logout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout/`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
    
            if (res.ok) {
                setUser(null);
                router.push("/login");
                console.log("✅ Logout successful");
            } else {
                console.error("❌ Logout failed");
            }
        } catch (error) {
            console.error("❌ Logout API Error:", error);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name, email, password}),
            });

            if (res.ok)
            {
                console.log("✅ Register successful");
                checkAuth();
                router.push("/dashboard");
            } else {
                console.error("❌ Register failed");
            }
        } catch (error) {
            console.error("❌ Register API Error:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}