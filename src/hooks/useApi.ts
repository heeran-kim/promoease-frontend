import useSWR from "swr";

// Converts snake_case to camelCase (for API responses)
const toCamelCase = <T>(obj: T): T => {
    if (Array.isArray(obj)) {
        return obj.map(toCamelCase) as T;
    } else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
            const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            (acc as Record<string, unknown>)[camelKey] = toCamelCase((obj as Record<string, unknown>)[key]);
            return acc;
        }, {} as T);
    }
    return obj;
};

// Converts camelCase to snake_case (for API requests)
const toSnakeCase = <T>(obj: T): T => {
    if (Array.isArray(obj)) {
        return obj.map(toSnakeCase) as T;
    } else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
            const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
            (acc as Record<string, unknown>)[snakeKey] = toSnakeCase((obj as Record<string, unknown>)[key]);
            return acc;
        }, {} as T);
    }
    return obj;
};

// Fetcher for SWR
const fetcher = async <T>(url: string): Promise<T | null> => {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (res.status === 401) {
            return null;
        }

        if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

        return toCamelCase(await res.json()); // Convert response to camelCase
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

// SWR Hook for Fetching Data
export function useFetchData<T>(url: string) {
    const { data, error, isValidating, mutate } = useSWR<T | null>(url, fetcher<T>, {
        revalidateOnFocus: true,
        shouldRetryOnError: true,
    });

    return { data: data ?? null, error, isLoading: isValidating, mutate };
}

// Function for Mutating Data
export const mutateData = async <T>(
    url: string,
    method: "POST" | "PUT" | "DELETE",
    body?: Record<string, unknown> | null
): Promise<T | null> => {
    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: body ? JSON.stringify(toSnakeCase(body)) : undefined, // Convert request to snake_case
        });

        if (!res.ok) throw new Error(`Failed to ${method} data: ${res.status}`);

        return method === "DELETE" ? null : toCamelCase(await res.json());
    } catch (error) {
        console.error(`Error with ${method} request to ${url}:`, error);
        return null;
    }
};