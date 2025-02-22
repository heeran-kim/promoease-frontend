// src/mocks/mockData.ts

// ✅ Restaurant 타입 정의
export type Restaurant = {
    id: string;
    name: string;
    slug: string;  // ✅ URL-friendly slug 추가
    lastActivity: string; // ✅ 날짜 저장 (ISO 8601 문자열)
    logo: string; // ✅ 로고 이미지 URL
};

export const mockRestaurants: Omit<Restaurant, "slug">[] = [
    { 
        id: "1", 
        name: "The Great Steakhouse", 
        lastActivity: "2024-02-22T12:00:00Z", 
        logo: "https://example.com/logos/steakhouse.png" 
    },
    { 
        id: "2", 
        name: "Ocean's Fresh Sushi", 
        lastActivity: "2024-02-21T15:30:00Z", 
        logo: "https://example.com/logos/sushi.png" 
    },
    { 
        id: "3", 
        name: "Italian Delights", 
        lastActivity: "2024-02-20T18:45:00Z", 
        logo: "https://example.com/logos/italian.png" 
    }
];

// ✅ name을 기반으로 slug 자동 생성
export const getMockRestaurants = (): Restaurant[] => {
    return mockRestaurants.map((restaurant) => ({
        ...restaurant,
        slug: restaurant.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // 특수 문자 제거
            .replace(/\s+/g, "-") // 공백을 "-"로 변경
    }));
};