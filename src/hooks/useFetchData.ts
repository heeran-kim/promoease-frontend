// src/hooks/useFetchData.ts
import useSWR from "swr";

const fetcher = async <T>(url: string): Promise<T | undefined> => {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return undefined;
    }
};

export function useFetchData<T>(url: string) {
    const { data, error, isValidating, mutate } = useSWR<T | undefined>(
        url,
        fetcher<T>,
        { revalidateOnFocus: true, shouldRetryOnError: true }
    );

    return { data, error, isLoading: isValidating, refetch: mutate };
};