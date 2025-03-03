// src/hooks/useFetchData.ts
import useSWR from "swr";

const fetcher = async <T>(url: string): Promise<T | null> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    const fullUrl = `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;

    try {
        const res = await fetch(fullUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (res.status === 401) {
            if (url === "/api/users/me/") {
                return null;
            }
            throw new Error("Unauthorized (401)");
        }

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export function useFetchData<T>(url: string) {
    const { data, error, isValidating, mutate } = useSWR<T | null>(
        url,
        fetcher<T>,
        { revalidateOnFocus: true, shouldRetryOnError: true }
    );

    return {
        data: data ?? null,
        error: error && error.message !== "Unauthorized (401)",
        isLoading: isValidating,
        mutate 
    };
};