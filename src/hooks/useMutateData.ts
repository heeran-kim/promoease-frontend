// src/hooks/useMutateData.ts
export function useMutateData<T>() {
    const mutateData = async (
        url: string,
        method: "POST" | "PUT" | "DELETE",
        body?: Record<string, unknown> | null
    ): Promise<T | null> => {
        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!res.ok) throw new Error(`Failed to ${method} data: ${res.status}`);

            return method === "DELETE" ? null : await res.json();
        } catch (error) {
            console.error(`Error with ${method} request to ${url}:`, error);
            return null;
        }
    };

    return { mutateData };
}