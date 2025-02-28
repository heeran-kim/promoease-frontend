// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardCard from "./components/DashboardCard";
import EmptyBusinessState from "./components/EmptyBusinessState";
import { DashboardData } from "@/types";

async function fetchDashboardData(): Promise<DashboardData | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
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

export default function Dashboard() {
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
            setError("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64 text-red-500">
                <p>{error}</p>
                <button onClick={fetchData} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {dashboardData?.business ? (
                <DashboardCard dashboardData={dashboardData} />
            ) : (
                <EmptyBusinessState />
            )}
        </div>
    );
}