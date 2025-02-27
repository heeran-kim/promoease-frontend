// src/models/post.ts
import { PLATFORM_OPTIONS } from "@/constants/platforms";

export const STATUS_OPTIONS = ["Scheduled", "Posted", "Failed"] as const;
export const TYPE_OPTIONS = ["Store Promotion", "Menu Promotion", "Event Promotion", "Announcement"] as const;
export type PostType = (typeof TYPE_OPTIONS)[number];

export type Post = {
    id: string;
    createdAt: string;
    scheduledAt: string;
    status: (typeof STATUS_OPTIONS)[number];
    image: string;
    caption: string;
    type: PostType;
    platform: (typeof PLATFORM_OPTIONS)[number];
    link: string | null;
    reactions?: number;
    comments?: number;
};

let posts: Post[] = [];

export const setBulkPosts = (newPosts: Post[]) => {
    posts = [...newPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPosts = (): Post[] => {
    return posts;
};

export const getPostById = (postId: string): Post | undefined => {
    return posts.find((post) => post.id === postId);
};

export const addPost = (newPost: Post) => {
    posts = [newPost, ...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const deletePost = (postId: string) => {
    posts = posts.filter((post) => post.id !== postId);
};

export const getPostsSummary = () => {
    const lastUploadedPost = posts
        .filter((post) => post.status === "Posted")
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

    return {
        lastActivity: lastUploadedPost ? lastUploadedPost.createdAt : null,
        lastPostLink: lastUploadedPost ? lastUploadedPost.link : null,
        uploadedPosts: posts.filter((post) => post.status === "Posted").length,
        upcomingPosts: posts.filter((post) => post.status === "Scheduled").length,
        failedPosts: posts.filter((post) => post.status === "Failed").length,
    };
};