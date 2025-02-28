export interface Business {
    name?: string;
    logo: string;
    type?: string;
    target?: string;
    vibe?: string;
}

export interface SocialMedia {
    platform: string;   // ex: "facebook"
    link: string;       // ex: "https://facebook.com/mybusiness"
    username: string;   // ex: "mybusiness"
}

export interface PostsSummary {
    upcomingPosts: number;
    uploadedPosts: number;
    failedPosts: number;
    lastActivity: string | null;
    lastPostLink: string | null;
}

export interface DashboardData {
    business: Pick<Business, "name" | "logo">;
    socialMedia: SocialMedia[];
    postsSummary: PostsSummary;
}