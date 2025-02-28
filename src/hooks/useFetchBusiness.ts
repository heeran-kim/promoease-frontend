// 📌 src/hooks/useFetchBusiness.ts
import { useEffect, useState } from "react";
import { Business } from "@/types";

const fetchBusinessData = async () => {
    try {
        const response = await fetch("/api/business/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch business data: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const useFetchBusiness = () => {
    const [businessInfo, setBusinessInfo] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBusinessData()
            .then((data) => {
                if (data) setBusinessInfo(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : String(err));
                setLoading(false);
            });
    }, []);

    return { businessInfo, setBusinessInfo, loading, error };
};