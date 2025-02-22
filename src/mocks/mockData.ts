// ✅ Restaurant 타입 정의
export type Restaurant = {
    id: string;
    name: string;
    slug: string;  // ✅ URL-friendly slug 추가
    lastActivity: string; // ✅ 날짜 저장 (ISO 8601 문자열)
    logo: string; // ✅ 로고 이미지 URL
};

// ✅ 기본 레스토랑 데이터 (slug 없이)
export const mockRestaurants: Omit<Restaurant, "slug">[] = [
    { 
        id: "1", 
        name: "The Great Steakhouse", 
        lastActivity: "2024-02-22T12:00:00Z", 
        logo: ""
    },
    { 
        id: "2", 
        name: "Ocean's Fresh Sushi", 
        lastActivity: "2024-02-21T15:30:00Z", 
        logo: ""
    },
    { 
        id: "3", 
        name: "Italian Delights", 
        lastActivity: "2024-02-20T18:45:00Z", 
        logo: "" 
    }
];

// ✅ 모든 레스토랑 데이터에 slug 자동 추가
export const getMockRestaurants = (): Restaurant[] => {
    return mockRestaurants.map((restaurant) => ({
        ...restaurant,
        slug: restaurant.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // 특수 문자 제거
            .replace(/\s+/g, "-") // 공백을 "-"로 변경
    }));
};

// ✅ 특정 slug에 해당하는 레스토랑 찾기 (백엔드 API 대체)
export const getRestaurantBySlug = (slug: string): Restaurant | null => {
    const restaurants = getMockRestaurants();
    return restaurants.find((r) => r.slug === slug) || null;
};