// Represents a business or brand
export interface Business {
    name: string;                   // Business name
    logo: string;                   // URL of the business logo (backend assigns a default if empty)
    category?: string;              // Business category (ex: "restaurant", "cafe")
    target?: string;                // Target customer (ex: "young professionals", "students")
    vibe?: string;                  // Business branding or mood (ex: "luxury", "casual")
    salesDataEnabled?: boolean;     // Whether sales data is provided
}

export const EMPTY_BUSINESS: Business = {
    name: "",
    logo: "",
    category: "",
    target: "",
    vibe: "",
    salesDataEnabled: false,
};

// Represents a connected social media account
export interface SocialMedia {
    platform: string;               // ex: "facebook", "instagram"
    link: string;                   // ex: "https://facebook.com/mybusiness"
    accountName: string;            // ex: "mybusiness" (Social media account name)
}

// Summary of posts for the dashboard
export interface PostsSummary {
    upcomingPosts: number;          // Number of scheduled posts
    uploadedPosts: number;          // Number of successfully uploaded posts
    failedPosts: number;            // Number of posts that failed to upload
    lastActivity: string | null;    // ex: "2024-03-01T12:00:00Z" (ISO timestamp) or null
    lastPostLink: string | null;    // ex: "https://facebook.com/mybusiness/posts/12345" or null
}

// Data structure for the dashboard view
export interface DashboardData {
    business: Pick<Business, "name" | "logo">;
    socialMedia: SocialMedia[];
    postsSummary: PostsSummary;
}

// Represents a social media post
export interface Post {
    id: string;                     // Unique post ID
    business: string;               // Associated business name (ex: "My Coffee Shop")
    platform: string;               // ex: "facebook", "twitter"
    categories: string[];           // ex: ["Brand Story", "Product Highlight"]
    caption: string;                // Text content of the post
    image: string;                  // URL of the attached image
    link: string;                   // ex: "https://facebook.com/mybusiness/posts/12345"
    createdAt: string;              // ex: "2024-03-01T12:00:00Z" (ISO timestamp)
    postedAt: string;               // ex: "2024-03-02T14:30:00Z" (ISO timestamp)
    scheduledAt: string;            // ex: "2024-03-03T09:00:00Z" (ISO timestamp)
    status: string;                 // ex: "scheduled", "posted", "failed"
    reactions: number;              // Number of likes/reactions
    comments: number;               // Number of comments
    reposts: number;                // Number of times reposted
    shares: number;                 // Number of shares
}

// Represents an action item in a dropdown menu
export interface DropboxItem {
    label: string;                  // Display name (ex: "edit", "delete")
    onClick: () => void | Promise<void>;    // Function triggered when selected
}


// Represents a category assigned to a post
export interface PostCategory {
    id: number;                     // Unique category ID
    label: string;                  // Category name (ex: "Brand Story", "Product Highlight")
    selected: boolean;              // Whether this category is selected
}

// Represents a platform selection for posting
export interface PlatformState {
    label: string;                  // Platform name (ex: "Facebook", "Instagram")
    account: string;                // Associated account name
    selected: boolean;              // Whether this platform is selected
    caption: string;                // Custom caption for this platform
}


// Data structure for creating a new post
export interface PostCreationData {
    business: Pick<Business, "target" | "vibe" | "salesDataEnabled">;
    postCategories: PostCategory[];
    platformOptions: string[];
    platformStates: PlatformState[];
}


// Represents a promotional campaign consisting of multiple posts
export type Promotion = {
    id: string;                     // Unique promotion ID
    business: string;               // Associated business name
    posts: Post[];                  // List of related posts
    categories: string[];           // ex: ["Deals & Discounts", "Combos & Bundles"]
    description: string;            // Description of the promotion
    startDate: string;              // ex: "2024-04-01T00:00:00Z" (ISO timestamp)
    endDate: string;                // ex: "2024-04-10T23:59:59Z" (ISO timestamp)
    status: string;                 // ex: "upcoming", "ongoing"
    soldCount: number;              // Number of units sold
};

// Represents a user in the system
export interface User {
    name: string;                   // Name of the user
    email: string;                  // ex: "user@example.com"
    role: string;                   // ex: "admin", "business owner"
}


export interface ImageAnalysisResponse {
    detectedItems: string[];        // List of detected objects (e.g., ["Steak", "Lemon"])
}