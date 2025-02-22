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
        logo: "",
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
        logo: "",
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
        logo: "",
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