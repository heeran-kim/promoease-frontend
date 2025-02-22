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
    caption: string; // ✅ 소셜미디어별 개별 캡션
    hashtags: string[]; // ✅ 해시태그 목록
    type: "Marketing" | "Event" | "Announcement";
    platform: "Facebook" | "Twitter" | "Instagram"; // ✅ 특정 플랫폼에 맞게 개별 처리
    link: string;
};

// ✅ Mock 포스팅 데이터 (각 소셜미디어별 개별 포스팅)
export const mockPostings: Posting[] = [
    // 1️⃣ 가게 내부 소개 (Instagram만 사용)
    {
        id: "1",
        restaurantId: "the-great-steakhouse",
        createdAt: "2024-01-15T10:00:00Z",
        scheduledAt: "2024-01-16T10:00:00Z",
        status: "Posted",
        image: "/images/store-inside.jpg",
        platform: "Instagram",
        caption: "Welcome to The Great Steakhouse! 🍽️✨ Cozy ambiance, perfect for a night out. #SteakLover #CozyVibes",
        hashtags: ["#SteakLover", "#CozyVibes"],
        type: "Marketing",
        link: "https://instagram.com/p/storeintro",
    },

    // 2️⃣ 스테이크 사진 (Instagram + Facebook)
    {
        id: "2",
        restaurantId: "the-great-steakhouse",
        createdAt: "2024-01-20T12:00:00Z",
        scheduledAt: "2024-01-21T18:00:00Z",
        status: "Posted",
        image: "/images/steak.jpg",
        platform: "Instagram",
        caption: "🔥 Nothing beats a perfectly grilled steak! Who's craving one? 🥩 #Foodie #GrillMaster",
        hashtags: ["#Foodie", "#GrillMaster"],
        type: "Marketing",
        link: "https://instagram.com/p/steakpost",
    },
    {
        id: "3",
        restaurantId: "the-great-steakhouse",
        createdAt: "2024-01-20T12:00:00Z",
        scheduledAt: "2024-01-21T18:00:00Z",
        status: "Posted",
        image: "/images/steak.jpg",
        platform: "Facebook",
        caption: "🔥 Introducing our signature steak! Freshly grilled to perfection. Visit us today! #SteakLover",
        hashtags: ["#SteakLover"],
        type: "Marketing",
        link: "https://facebook.com/greatsteakhouse/post/steak",
    },

    // 3️⃣ 스테이크 & 파스타 행사 (Instagram + Facebook + Twitter)
    {
        id: "4",
        restaurantId: "the-great-steakhouse",
        createdAt: "2024-02-10T14:00:00Z",
        scheduledAt: "2024-02-12T12:00:00Z",
        status: "Posted",
        image: "/images/steak-pasta.jpg",
        platform: "Instagram",
        caption: "🍷🥩 Steak & Pasta Night Special! Limited seats available. Reserve now! #FoodieEvent #DateNight",
        hashtags: ["#FoodieEvent", "#DateNight"],
        type: "Event",
        link: "https://instagram.com/p/eventpost",
    },
    {
        id: "5",
        restaurantId: "the-great-steakhouse",
        createdAt: "2024-02-10T14:00:00Z",
        scheduledAt: "2024-02-12T12:00:00Z",
        status: "Posted",
        image: "/images/steak-pasta.jpg",
        platform: "Facebook",
        caption: "🥩🍝 Join us for our Steak & Pasta Night Special! Enjoy a premium meal with great company. Limited spots left! RSVP now.",
        hashtags: ["#PremiumSteak", "#PastaNight"],
        type: "Event",
        link: "https://facebook.com/greatsteakhouse/events/steakpasta",
    },
    {
        id: "6",
        restaurantId: "the-great-steakhouse",
        createdAt: "2024-02-10T14:00:00Z",
        scheduledAt: "2024-02-12T12:00:00Z",
        status: "Posted",
        image: "/images/steak-pasta.jpg",
        platform: "Twitter",
        caption: "Steak & Pasta Night this weekend! 🍝🔥 Reserve your table now! #SteakLover #Foodie",
        hashtags: ["#SteakLover", "#Foodie"],
        type: "Event",
        link: "https://twitter.com/greatsteakhouse/status/event",
    },

    // 4️⃣ 부활절 휴무 공지 (Instagram + Facebook, 트위터 제외)
    {
        id: "7",
        restaurantId: "the-great-steakhouse",
        createdAt: "2024-03-20T08:00:00Z",
        scheduledAt: "2024-04-01T00:00:00Z",
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
        createdAt: "2024-03-20T08:00:00Z",
        scheduledAt: "2024-04-01T00:00:00Z",
        status: "Scheduled",
        image: "/images/easter-holiday.jpg",
        platform: "Facebook",
        caption: "🐣🌿 Easter Holiday Notice: We’ll be closed on April 1st. Have a great holiday, and we’ll see you after the break!",
        hashtags: ["#HolidayNotice", "#SeeYouSoon"],
        type: "Announcement",
        link: null,
    },
];

// ✅ 특정 레스토랑의 포스팅 가져오기 (소셜미디어별 구분)
export const getRestaurantPostings = (restaurantId: string): Posting[] => {
    return mockPostings
        .filter((post) => post.restaurantId === restaurantId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // ✅ 최신순 정렬
};