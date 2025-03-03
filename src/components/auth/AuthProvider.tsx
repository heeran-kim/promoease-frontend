// src/components/AuthProvider.tsx
"use client";
import { createContext, useContext } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { useRouter } from "next/navigation";
import { User } from "@/types";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name:string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { data: user, mutate } = useFetchData<User>("/api/users/me/");
    
    const login = async (email: string, password: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login/`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            await res.json();
            mutate(user, true);
            router.push("/dashboard");
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
                mutate(user, true);
                router.push("/login");
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
                mutate(user, true);
                router.push("/dashboard");
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