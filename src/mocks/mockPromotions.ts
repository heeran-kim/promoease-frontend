export const TYPE_OPTIONS = ["Discount", "Combo", "MenuHighlight", "NewMenu"] as const;
export const STATUS_OPTIONS = ["Upcoming", "Ongoing", "Ended"] as const;

export type Promotion = {
    id: string;
    startDate: string;
    endDate: string;
    type: (typeof TYPE_OPTIONS)[number];
    description: string;
    status: (typeof STATUS_OPTIONS)[number];
    soldCount?: number;
    postId?: string[];
};

let promotions: Promotion[] = [
    {
        id: "1",
        startDate: "2024-05-01",
        endDate: "2024-05-07",
        type: "MenuHighlight",
        description: "Your exclusive signature dish, Bloomin' Onion, is a unique menu item that competitors don't offer. \nLeverage this exclusivity to attract more customers by showcasing it on social media.",
        status: "Ended",
        soldCount: 158,
        postId: ["101", "102"],
    },
    {
        id: "2",
        startDate: "2025-02-01",
        endDate: "2025-02-28",
        type: "Combo",
        description: "40% of customers who order Seafood Pasta also pair it with a glass of white wine.\nBased on past sales data, offering a 15% discount on this combo can increase sales while maintaining profitability.",
        status: "Ongoing",
        soldCount: 84,
        postId: ["201", "202", "203"],
    },
    {
        id: "3",
        startDate: "2025-03-01",
        endDate: "2025-03-31",
        type: "NewMenu",
        description: "As the weather cools down in March, warm comfort foods become more popular.\nData shows that sales of hot soup dishes increased by 18% during this period last year.\nConsider adding Pumpkin Soup to your menu.",
        status: "Upcoming",
        soldCount: 0,
        postId: [],
    },
];

export const getRestaurantPromotions = (): Promotion[] => {
    return promotions;
};

export const addPromotion = (newPromo: Promotion) => {
    promotions = [newPromo, ...promotions];
};

export const deletePromotion = (promoId: string) => {
    promotions = promotions.filter((promo) => promo.id !== promoId);
};