// app/(protected)/dashboard/components/BusinessInfo.tsx
import SocialMediaLinks from "./SocialMediaLinks";
import BusinessStatus from "./BusinessStatus";
import LastPostInfo from "./LastPostInfo";
import { DashboardData } from "@/types";

interface BusinessInfoProps {
    dashboardData: DashboardData;
}

export default function BusinessInfo({ dashboardData }: BusinessInfoProps) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center space-x-2">
                <h3 className="text-md font-semibold text-gray-900 dark:text-gray-200">
                    {dashboardData.business.name}
                </h3> 
                <SocialMediaLinks social={dashboardData.socialMedia} />
            </div>

            <LastPostInfo postsSummary={dashboardData.postsSummary} />

            <BusinessStatus postsSummary={dashboardData.postsSummary} />
        </div>
    )
}