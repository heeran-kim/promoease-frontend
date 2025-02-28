// src/app/dashboard/page.tsx
"use client";

import DashboardCard from "./components/DashboardCard";
import EmptyBusinessState from "./components/EmptyBusinessState";
import { useFetchDashboardData } from "@/hooks/useFetchDashboardData";

export default function Dashboard() {
    const { dashboardData, loading, error, fetchData } = useFetchDashboardData();

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