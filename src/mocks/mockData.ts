// src/mocks/mockData.ts
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
    return mockRestaurant;
    // return null;
};


// ✅ Posting 타입 정의
export type Posting = {
    id: string;
    restaurantId: string; // ✅ 어떤 레스토랑의 게시물인지 식별
    createdAt: string; // ✅ 게시물 작성 날짜 (ISO 8601)
    scheduledAt: string; // ✅ 예정된 게시 날짜
    status: "Scheduled" | "Posted" | "Failed"; // ✅ 현재 상태
    image: string; // ✅ 게시물 대표 이미지 (썸네일)
    caption: string; // ✅ 소셜미디어별 개별 캡션
    hashtags: string[]; // ✅ 해시태그 목록
    type: "Marketing" | "Event" | "Announcement";
    platform: "Facebook" | "Twitter" | "Instagram"; // ✅ 특정 플랫폼에 맞게 개별 처리
    link: string;
    reactions?: number;
    comments?: number;
};

let postings: Posting[] = [
    // 1️⃣ 가게 내부 소개 (Instagram만 사용)
    {
        id: "1",
        restaurantId: "the-great-steakhouse",
        createdAt: "2025-01-15T10:00:00Z",
        scheduledAt: "2025-01-16T10:00:00Z",
        status: "Posted",
        image: "/images/store-inside.jpg",
        platform: "Instagram",
        caption: "Welcome to The Great Steakhouse! 🍽️✨ Cozy ambiance, perfect for a night out. #SteakLover #CozyVibes",
        hashtags: ["#SteakLover", "#CozyVibes"],
        type: "Marketing",
        link: "https://instagram.com/p/storeintro",
        reactions: 10,
        comments: 4,
    },

    // 2️⃣ 스테이크 사진 (Instagram + Facebook)
    {
        id: "2",
        restaurantId: "the-great-steakhouse",
        createdAt: "2025-01-20T12:00:00Z",
        scheduledAt: "2025-01-21T18:00:00Z",
        status: "Posted",
        image: "/images/steak.jpg",
        platform: "Instagram",
        caption: "🔥 Nothing beats a perfectly grilled steak! Who's craving one? 🥩 #Foodie #GrillMaster",
        hashtags: ["#Foodie", "#GrillMaster"],
        type: "Marketing",
        link: "https://instagram.com/p/steakpost",
        reactions: 20,
        comments: 14,
    },
    {
        id: "3",
        restaurantId: "the-great-steakhouse",
        createdAt: "2025-01-20T12:00:00Z",
        scheduledAt: "2025-01-21T18:00:00Z",
        status: "Posted",
        image: "/images/steak.jpg",
        platform: "Facebook",
        caption: "🔥 Introducing our signature steak! Freshly grilled to perfection. Visit us today! #SteakLover",
        hashtags: ["#SteakLover"],
        type: "Marketing",
        link: "https://facebook.com/greatsteakhouse/post/steak",
        reactions: 13,
        comments: 9,
    },

    // 3️⃣ 스테이크 & 파스타 행사 (Instagram + Facebook + Twitter)
    {
        id: "4",
        restaurantId: "the-great-steakhouse",
        createdAt: "2025-02-10T14:00:00Z",
        scheduledAt: "2025-02-12T12:00:00Z",
        status: "Posted",
        image: "/images/steak-pasta.jpg",
        platform: "Instagram",
        caption: "🍷🥩 Steak & Pasta Night Special! Limited seats available. Reserve now! #FoodieEvent #DateNight",
        hashtags: ["#FoodieEvent", "#DateNight"],
        type: "Event",
        link: "https://instagram.com/p/eventpost",
        reactions: 30,
        comments: 23,
    },
    {
        id: "5",
        restaurantId: "the-great-steakhouse",
        createdAt: "2025-02-10T14:00:00Z",
        scheduledAt: "2025-02-12T12:00:00Z",
        status: "Posted",
        image: "/images/steak-pasta.jpg",
        platform: "Facebook",
        caption: "🥩🍝 Join us for our Steak & Pasta Night Special! Enjoy a premium meal with great company. Limited spots left! RSVP now.",
        hashtags: ["#PremiumSteak", "#PastaNight"],
        type: "Event",
        link: "https://facebook.com/greatsteakhouse/events/steakpasta",
        reactions: 20,
        comments: 19,
    },
    {
        id: "6",
        restaurantId: "the-great-steakhouse",
        createdAt: "2025-02-10T14:00:00Z",
        scheduledAt: "2025-02-12T12:00:00Z",
        status: "Posted",
        image: "/images/steak-pasta.jpg",
        platform: "Twitter",
        caption: "Steak & Pasta Night this weekend! 🍝🔥 Reserve your table now! #SteakLover #Foodie",
        hashtags: ["#SteakLover", "#Foodie"],
        type: "Event",
        link: "https://twitter.com/greatsteakhouse/status/event",
        reactions: 20,
        comments: 2,
    },

    // 4️⃣ 부활절 휴무 공지 (Instagram + Facebook, 트위터 제외)
    {
        id: "7",
        restaurantId: "the-great-steakhouse",
        createdAt: "2025-03-20T08:00:00Z",
        scheduledAt: "2025-04-01T00:00:00Z",
        status: "Scheduled",
        image: "/images/easter-holiday.jpg",
        platform: "Instagram",
        caption: "🐣🌿 We'll be closed for Easter break! Enjoy the holiday with your loved ones. See you soon! #EasterBreak #FamilyTime",
        hashtags: ["#EasterBreak", "#FamilyTime"],
        type: "Announcement",
        link: null, // 아직 게시 전
    },
    {
        id: "8",
        restaurantId: "the-great-steakhouse",
        createdAt: "2025-03-20T08:00:00Z",
        scheduledAt: "2025-04-01T00:00:00Z",
        status: "Scheduled",
        image: "/images/easter-holiday.jpg",
        platform: "Facebook",
        caption: "🐣🌿 Easter Holiday Notice: We’ll be closed on April 1st. Have a great holiday, and we’ll see you after the break!",
        hashtags: ["#HolidayNotice", "#SeeYouSoon"],
        type: "Announcement",
        link: null,
    },
    {
        id: "9",
        restaurantId: "the-great-steakhouse",
        createdAt: "2025-02-25T14:00:00Z",
        scheduledAt: "2025-02-26T12:00:00Z",
        status: "Failed",
        image: "/images/failed-post.jpg",
        platform: "Instagram",
        caption: "🚨 Limited-time steak deal! Get 20% off all steak dishes today only! 🥩🔥 #SteakLover #LimitedOffer",
        hashtags: ["#SteakLover", "#LimitedOffer"],
        type: "Promotion",
        link: null, // 실패했으므로 링크 없음
    },
];

export const getRestaurantPostings = (): Posting[] => {
    return postings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const addPosting = (newPost: Posting) => {
    postings = [newPost, ...postings];
};

export const deletePosting = (postId: string) => {
    postings = postings.filter((post) => post.id !== postId);
};