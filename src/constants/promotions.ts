export type Promotion = {
    id: string;
    restaurantId: string; // 어떤 레스토랑의 프로모션인지
    startDate: string; // 시작 날짜 (ISO 8601)
    endDate: string; // 종료 날짜
    menuItems: string[]; // 적용 메뉴 (예: ["Steak", "Pasta"])
    description: string; // 세부 설명
    status: "Upcoming" | "Ongoing" | "Ended"; // 프로모션 상태
    soldCount?: number; // 프로모션으로 팔린 갯수
    socialMediaLinks?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
    }; // 소셜미디어 게시 링크
};