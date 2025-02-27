// src/constants/navItems.ts
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface SubPage {
    name: string;
    href: string;
    description: string;
}

interface ActionItem {
    label: string;
    onClick: () => void;
}

type ActionsFunction = (router: AppRouterInstance) => ActionItem[];

interface NavItem {
    name: string;
    href: string;
    description: string;
    subPages?: SubPage[];
    actions?: ActionsFunction;
}

export const NAV_ITEMS: NavItem[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        description: "Get an overview of your business and key metrics.",
        subPages: [],
    },
    {
        name: "Posts",
        href: "/posts",
        description: `
        Manage, schedule, and monitor your social media posts across multiple platforms in one place.
        - 📊 **Cross-platform Overview:** View all your posts across different social media platforms in a single list, including reactions and comment counts.
        - ❌ **Delete Unwanted Posts:** No need to delete posts manually on each platform—remove them directly from here with a single click.
        - ⏳ **Edit Scheduled Posts:** Modify scheduled posts, including their post time and content.
        - ⚠️ **Resolve Failed Posts:** If a post fails due to account issues, get notified and retry after fixing the problem.
        - ✨ **Create New Posts with AI Captions**: Want to generate a new post using AI-generated captions? Simply click the “⋯” (More Options) button on the right and select “Create Post”.
        `,
        subPages: [
            {
                name: "Create Post",
                href: "/posts/new",
                description: "Start by uploading an image. Then, adjust the post settings to generate the perfect caption!",
            }
        ],
        actions: (router: AppRouterInstance) => [
            { label: "Create Post", onClick: () => router.push("/posts/new") },
            { label: "Learn about Social Media Management", onClick: () => router.push("/features/social-media-management") },
            { label: "Learn about AI Captions", onClick: () => router.push("/features/ai-captions") },
        ],
    },
    {
        name: "Promotions",
        href: "/promotions",
        description: `
            Manage and track your event discounts, special deals, and creative promotions all in one place.
            - 💸 **Event Discounts & Flash Sales:** Easily set up limited-time offers to draw in new customers.
            - 🍔 **Menu & Combo Deals:** Get AI-driven suggestions for menu upgrades, combo deals, or seasonal offerings.
            - 🤖 **Machine Learning Insights:** Leverage advanced recommendations to craft high-impact promotions that drive sales.
            - 🔎 **Performance Tracking:** Stay on top of each promotion’s results, from redeemed discounts to boosted traffic.
            
            Want to create a brand-new promotion?
            Just click the “⋯” (More Options) button on the top right and select “Create Promotion”.
            `,
        subPages: [
            {
                name: "Create Promotion",
                href: "/promotions/new",
                description: "Leverage machine learning to generate high-impact promotions.",
            }
        ],
        actions: (router: AppRouterInstance) => [
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