// src/constants/navItems.ts

export const NAV_ITEMS: {
    name: string;
    href: string;
    description: string;
    subPages: { name: string; href: string; description: string }[];
    actions?: (router: any) => { label: string; onClick: () => void }[];
}[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        description: "Get an overview of your business and key metrics.",
        subPages: [],
    },
    {
        name: "Postings",
        href: "/postings",
        description: `
        Manage, schedule, and monitor your social media posts across multiple platforms in one place.
        - 📊 **Cross-platform Overview:** View all your posts across different social media platforms in a single list.
        - ⏳ **Edit Scheduled Posts:** Modify scheduled posts, including their posting time and content.
        - ❌ **Delete Unwanted Posts:** No need to delete posts manually on each platform—remove them directly from here with a single click.
        - ⚠️ **Resolve Failed Posts:** If a post fails due to account issues, get notified and retry after fixing the problem.
        `,
        subPages: [
            {
                name: "Create Post",
                href: "/postings/new",
                description: "Start by uploading an image. Then, adjust the post settings to generate the perfect caption!",
            }
        ],
        actions: (router) => [
            { label: "Create Post", onClick: () => router.push("/postings/new") },
            { label: "Learn about Social Media Management", onClick: () => router.push("/features/social-media-management") },
            { label: "Learn about AI Captions", onClick: () => router.push("/features/ai-captions") },
        ],
    },
    {
        name: "Promotions",
        href: "/promotions",
        description: "Manage and track your ongoing and upcoming promotions.",
        subPages: [
            {
                name: "Create Promotion",
                href: "/promotions/new",
                description: "Leverage machine learning to generate high-impact promotions.",
            }
        ],
        actions: (router) => [
            { label: "Create Promotion", onClick: () => router.push("/promotions/new") },
            { label: "Learn More", onClick: () => router.push("/features/promotion-suggestions") },
        ],
    },
    {
        name: "Analytics",
        href: "/analytics",
        description: "Analyze your performance with detailed insights and reports.",
        subPages: [],
    },
    {
        name: "Support",
        href: "/support",
        description: "Find answers to your questions or contact support.",
        subPages: [],
    },
    {
        name: "Settings",
        href: "/settings/general",
        description: "Customize your business settings and preferences.",
        subPages: [
            { name: "General Information", href: "/settings/general", description: "Manage your general business information." },
            { name: "Upload Sales Data", href: "/settings/sales", description: "Upload and track your sales performance." },
            { name: "Billing & Payments", href: "/settings/billing", description: "Manage your billing details and payment methods." },
            { name: "Invoices", href: "/settings/invoices", description: "View, download, and manage past invoices." },
            { name: "Social Media", href: "/settings/social", description: "Connect and manage your social media accounts." },
            { name: "Account Settings", href: "/settings/account", description: "Update your login credentials and personal details." },
        ],
    },
];