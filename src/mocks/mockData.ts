// ✅ Restaurant 타입 정의
export type Restaurant = {
    id: string;
    name: string;
    slug: string;  // ✅ URL-friendly slug 추가
    lastActivity: string; // ✅ 날짜 저장 (ISO 8601 문자열)
    logo: string; // ✅ 로고 이미지 URL
    upcomingPosts: number; // ✅ 업로드 예정 포스트 수
    lastPostLink: string; // ✅ 마지막 업로드된 포스트 링크
    socialMediaLinks: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
    }; // ✅ 연결된 소셜미디어 링크
};

// ✅ 기본 레스토랑 데이터 (slug 없이)
const baseMockRestaurants: Omit<Restaurant, "slug">[] = [
    { 
        id: "1", 
        name: "The Great Steakhouse", 
        logo: "/logos/the-great-steakhouse.jpeg",
        upcomingPosts: 5,
        lastActivity: "2024-02-22T12:00:00Z", 
        lastPostLink: "https://instagram.com/p/abc123",
        socialMediaLinks: {
            instagram: "https://instagram.com/greatsteakhouse",
            facebook: "https://facebook.com/greatsteakhouse",
            twitter: "https://twitter.com/greatsteakhouse"
        }
    },
    { 
        id: "2", 
        name: "Ocean's Fresh Sushi", 
        logo: "/logos/oceans-fresh-sushi.jpeg",
        upcomingPosts: 3,
        lastActivity: "2024-02-21T15:30:00Z", 
        lastPostLink: "https://instagram.com/p/xyz789",
        socialMediaLinks: {
            instagram: "https://instagram.com/oceansfreshsushi",
            facebook: "https://facebook.com/oceansfreshsushi"
        }
    },
    { 
        id: "3", 
        name: "Italian Delights", 
        logo: "/logos/italian-delights.jpeg",
        upcomingPosts: 7,
        lastActivity: "2024-02-20T18:45:00Z", 
        lastPostLink: "https://instagram.com/p/def456",
        socialMediaLinks: {
            instagram: "https://instagram.com/italiandelights",
            twitter: "https://twitter.com/italiandelights"
        }
    }
];

// ✅ 모든 레스토랑 데이터에 slug 자동 추가
export const getMockRestaurants = (): Restaurant[] => {
    return baseMockRestaurants.map((restaurant) => ({
        ...restaurant,
        slug: restaurant.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // 특수 문자 제거
            .replace(/\s+/g, "-") // 공백을 "-"로 변경
    }));
};

// ✅ 특정 slug에 해당하는 레스토랑 찾기 (백엔드 API 대체)
export const getRestaurantBySlug = (slug: string): Restaurant | null => {
    return getMockRestaurants().find((restaurant) => restaurant.slug === slug) || null;
};


// ✅ Posting 타입 정의
export type Posting = {
    id: string;
    restaurantId: string; // ✅ 어떤 레스토랑의 게시물인지 식별
    createdAt: string; // ✅ 게시물 작성 날짜 (ISO 8601)
    scheduledAt: string; // ✅ 예정된 게시 날짜
    status: "Scheduled" | "Posted" | "Failed"; // ✅ 현재 상태
    image: string; // ✅ 게시물 대표 이미지 (썸네일)
    description: string; // ✅ 게시물 본문
    hashtags: string[]; // ✅ 해시태그 목록
    platforms: { platform: "Facebook" | "Twitter" | "Instagram"; status: "Success" | "Failed" }[]; // ✅ 소셜미디어별 업로드 상태
};

// ✅ Mock 게시물 데이터
export const mockPostings: Posting[] = [
    {
        id: "1",
        restaurantId: "the-great-steakhouse",
        createdAt: "2024-02-20T12:00:00Z",
        scheduledAt: "2024-02-22T10:00:00Z",
        status: "Scheduled",
        image: "/vercel.svg",
        description: "Introducing our new T-bone steak! 🥩🔥 #SteakLover #BestInTown",
        hashtags: ["#SteakLover", "#BestInTown"],
        platforms: [
            { platform: "Facebook", status: "Success" },
            { platform: "Twitter", status: "Success" },
            { platform: "Instagram", status: "Success" },
        ],
    },
    {
        id: "2",
        restaurantId: "ocean-fresh-sushi",
        createdAt: "2024-02-18T15:30:00Z",
        scheduledAt: "2024-02-20T10:00:00Z",
        status: "Posted",
        image: "/vercel.svg",
        description: "Fresh sushi, ready to roll 🍣✨ #SushiTime #FreshDaily",
        hashtags: ["#SushiTime", "#FreshDaily"],
        platforms: [
            { platform: "Facebook", status: "Success" },
            { platform: "Twitter", status: "Success" },
            { platform: "Instagram", status: "Success" },
        ],
    },
    {
        id: "3",
        restaurantId: "the-great-steakhouse",
        createdAt: "2024-02-17T18:00:00Z",
        scheduledAt: "2024-02-19T08:00:00Z",
        status: "Failed",
        image: "/vercel.svg",
        description: "Our new signature burger! 🍔🚀 #BurgerLover #BestBurgers",
        hashtags: ["#BurgerLover", "#BestBurgers"],
        platforms: [
            { platform: "Facebook", status: "Failed" },
            { platform: "Twitter", status: "Failed" },
            { platform: "Instagram", status: "Failed" },
        ],
    },
];

// ✅ 특정 레스토랑의 게시물 가져오기
export const getRestaurantPostings = (restaurantId: string): Posting[] => {
    return mockPostings
        .filter((post) => post.restaurantId === restaurantId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // ✅ 최신순 정렬
};