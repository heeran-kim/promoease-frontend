// src/components/AuthProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`, { method: "GET", credentials: "include" , headers: { "Content-Type": "application/json" } });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        } catch (error) {
            console.error("Auth check failed", error);
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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout/`, { method: "POST", credentials: "include" });
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}