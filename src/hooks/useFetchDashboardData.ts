import { useState, useEffect, useCallback } from "react";
import { DashboardData } from "@/types";

async function fetchDashboardData(): Promise<DashboardData | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch dashboard data: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return null;
    }
}

export function useFetchDashboardData() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchDashboardData();
            setDashboardData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { dashboardData, loading, error, fetchData };
}