import { Suspense } from "react";
import PostsDashboardContent from "./PostsDashboardContent";

export default function PostsDashboard() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <PostsDashboardContent />
        </Suspense>
    );
}