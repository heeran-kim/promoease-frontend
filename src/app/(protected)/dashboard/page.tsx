// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import DashboardCard from "./components/DashboardCard";
import EmptyBusinessState from "./components/EmptyBusinessState";
import { DashboardData } from "@/types";

async function fetchDashboardData(): Promise<DashboardData | null> {
    try {
        const res = await fetch("/api/dashboard", {
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
        console.error(error);
        return null;
    }
}

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadData() {
            const data = await fetchDashboardData();
            setDashboardData(data);
            setLoading(false);
        }

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Loading...</p>
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