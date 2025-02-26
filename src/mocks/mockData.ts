// src/mocks/mockData.ts
import { promotion_captions } from "@/constants/captions";

export type Restaurant = {
    id: string;
    name: string;
    lastActivity: string; // ✅ 날짜 저장 (ISO 8601 문자열)
    logo: string; // ✅ 로고 이미지 URL
    upcomingPosts: number;
    uploadedPosts: number;
    failedPosts: number;
    lastPostLink: string; // ✅ 마지막 업로드된 포스트 링크
    socialMediaLinks: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
    }; // ✅ 연결된 소셜미디어 링크
};

const mockRestaurant: Restaurant | null = {
    id: "1",
    name: "The Great Steakhouse",
    logo: "/logos/the-great-steakhouse.jpeg",
    upcomingPosts: 2,
    uploadedPosts: 10,
    failedPosts: 1,
    lastActivity: "2025-02-22T12:00:00Z",
    lastPostLink: "https://instagram.com/p/abc123",
    socialMediaLinks: {
        instagram: "https://instagram.com/greatsteakhouse",
        facebook: "https://facebook.com/greatsteakhouse",
        twitter: "https://twitter.com/greatsteakhouse",
    },
};

export const getMockRestaurant = (): Restaurant | null => {
    // return mockRestaurant;
    return null;
};


export type PostingStatus = "Scheduled" | "Posted" | "Failed";
export const STATUS_OPTIONS: PostingStatus[] = ["Scheduled", "Posted", "Failed"];

// ✅ Posting 타입 정의
export type Posting = {
    id: string;
    createdAt: string;
    scheduledAt: string;
    status: PostingStatus;
    image: string;
    caption: string;
    type: "Marketing" | "Event" | "Announcement";
    platform: "Facebook" | "Twitter" | "Instagram" | "Thread";
    link: string | null;
    reactions?: number;
    comments?: number;
};

let postings: Posting[] = [
    // 1️⃣ 가게 내부 소개 (Instagram만 사용)
    {
        id: "1",
        createdAt: "2025-01-15T10:00:00Z",
        scheduledAt: "2025-01-16T10:00:00Z",
        status: "Posted",
        image: "/images/store-inside.jpg",
        platform: "Instagram",
        caption: "Welcome to The Great Steakhouse! 🍽️✨ Cozy ambiance, perfect for a night out. #SteakLover #CozyVibes",
        type: "Marketing",
        link: "https://instagram.com/p/storeintro",
        reactions: 10,
        comments: 4,
    },

    // 3️⃣ 스테이크 & 파스타 행사 (Instagram + Facebook + Twitter)
    {
        id: "4",
        createdAt: "2025-02-10T14:00:00Z",
        scheduledAt: "2025-02-12T12:00:00Z",
        status: "Posted",
        image: "/images/steak-pasta.jpg",
        platform: "Instagram",
        caption: "🍷🥩 Steak & Pasta Night Special! Limited seats available. Reserve now! #FoodieEvent #DateNight",
        type: "Event",
        link: "https://instagram.com/p/eventpost",
        reactions: 30,
        comments: 23,
    },
    {
        id: "5",
        createdAt: "2025-02-10T14:00:00Z",
        scheduledAt: "2025-02-12T12:00:00Z",
        status: "Posted",
        image: "/images/steak-pasta.jpg",
        platform: "Facebook",
        caption: "🥩🍝 Join us for our Steak & Pasta Night Special! Enjoy a premium meal with great company. Limited spots left! RSVP now.",
        type: "Event",
        link: "https://facebook.com/greatsteakhouse/events/steakpasta",
        reactions: 20,
        comments: 19,
    },
    {
        id: "6",
        createdAt: "2025-02-10T14:00:00Z",
        scheduledAt: "2025-02-12T12:00:00Z",
        status: "Posted",
        image: "/images/steak-pasta.jpg",
        platform: "Twitter",
        caption: "Steak & Pasta Night this weekend! 🍝🔥 Reserve your table now! #SteakLover #Foodie",
        type: "Event",
        link: "https://twitter.com/greatsteakhouse/status/event",
        reactions: 20,
        comments: 2,
    },

    // 4️⃣ 부활절 휴무 공지 (Instagram + Facebook, 트위터 제외)
    {
        id: "7",
        createdAt: "2025-03-20T08:00:00Z",
        scheduledAt: "2025-04-01T00:00:00Z",
        status: "Scheduled",
        image: "/images/easter-holiday.jpg",
        platform: "Instagram",
        caption: "🐣🌿 We'll be closed for Easter break! Enjoy the holiday with your loved ones. See you soon! #EasterBreak #FamilyTime",
        type: "Announcement",
        link: null, // 아직 게시 전
    },
    {
        id: "8",
        createdAt: "2025-03-20T08:00:00Z",
        scheduledAt: "2025-04-01T00:00:00Z",
        status: "Scheduled",
        image: "/images/easter-holiday.jpg",
        platform: "Facebook",
        caption: "🐣🌿 Easter Holiday Notice: We’ll be closed on April 1st. Have a great holiday, and we’ll see you after the break!",
        type: "Announcement",
        link: null,
    },
    {
        id: "9",
        createdAt: "2025-02-25T14:00:00Z",
        scheduledAt: "2025-02-26T12:00:00Z",
        status: "Failed",
        image: "/images/failed-post.jpg",
        platform: "Instagram",
        caption: "🚨 Limited-time steak deal! Get 20% off all steak dishes today only! 🥩🔥 #SteakLover #LimitedOffer",
        type: "Event",
        link: null, // 실패했으므로 링크 없음
    },
    {
        id: "101",
        createdAt: "2024-04-25T10:00:00Z",
        scheduledAt: "2024-05-01T09:00:00Z",
        status: "Posted",
        image: "/images/blooming-onion.jpg",
        caption: promotion_captions[0],
        type: "Marketing",
        platform: "Instagram",
        link: "https://instagram.com/greatsteakhouse/p/promo1",
        reactions: 30,
        comments: 23,
      },
      {
        id: "102",
        createdAt: "2024-04-25T10:05:00Z",
        scheduledAt: "2024-05-01T09:00:00Z",
        status: "Posted",
        image: "/images/blooming-onion.jpg",
        caption: promotion_captions[1],
        type: "Marketing",
        platform: "Facebook",
        link: "https://facebook.com/greatsteakhouse/posts/promo1",
        reactions: 52,
        comments: 34,
      },
    
      // Promotion 2 => 3 related posts (Instagram, Facebook, Twitter)
      {
        id: "201",
        createdAt: "2025-01-30T08:00:00Z",
        scheduledAt: "2025-02-01T09:00:00Z",
        status: "Posted",
        image: "/images/seafood-pasta.jpg",
        caption: promotion_captions[2],
        type: "Event",
        platform: "Instagram",
        link: "https://instagram.com/greatsteakhouse/p/promo2",
        reactions: 15,
        comments: 3,
      },
      {
        id: "202",
        createdAt: "2025-01-30T08:00:00Z",
        scheduledAt: "2025-02-01T09:00:00Z",
        status: "Posted",
        image: "/images/seafood-pasta.jpg",
        caption: promotion_captions[3],
        type: "Event",
        platform: "Facebook",
        link: "https://facebook.com/greatsteakhouse/posts/promo2",
        reactions: 12,
        comments: 2,
      },
      {
        id: "203",
        createdAt: "2025-01-30T08:00:00Z",
        scheduledAt: "2025-02-01T09:00:00Z",
        status: "Posted",
        image: "/images/seafood-pasta.jpg",
        caption: promotion_captions[4],
        type: "Event",
        platform: "Twitter",
        link: "https://twitter.com/greatsteakhouse/status/203",
        reactions: 7,
        comments: 1,
      },
];

export const getRestaurantPostings = (): Posting[] => {
    return postings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPostById = (postId: string): Posting | undefined => {
    return postings.find((post) => post.id === postId);
};

export const addPosting = (newPost: Posting) => {
    postings = [newPost, ...postings];
};

export const deletePosting = (postId: string) => {
    postings = postings.filter((post) => post.id !== postId);
};
