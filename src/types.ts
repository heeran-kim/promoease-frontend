export interface Business {
    name?: string;
    logo: string;
    type?: string;
    target?: string;
    vibe?: string;
    salesDataEnabled?: boolean;
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

export interface Post {
    id: string;
    business: string;
    platform: string;
    categories: string[];
    caption: string;
    image: string;
    link: string;
    created_at: string;
    posted_at: string;
    scheduled_at: string;
    status: string;
    reactions: number;
    comments: number;
    reposts: number;
    shares: number;
}

export interface DropboxItem {
    label: string;
    onClick: () => void | Promise<void>;
}

export interface PostCategory {
    id: number;
    label: string;
    selected: boolean;
}

export interface PlatformState {
    label: string;
    account: string;
    selected: boolean;
    caption: string;
}

export interface PostCreationData {
    business: Pick<Business, "target" | "vibe" | "salesDataEnabled">;
    postCategories: PostCategory[];
    platformOptions: string[];
    platformStates: PlatformState[];
}

export type Promotion = {
    id: string;
    business: string;
    posts: Post[];
    categories: string[];
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    sold_count?: number;
};