export type Promotion = {
    id: string;
    restaurantId: string;
    startDate: string;
    endDate: string;
    menuItems: string[];
    description: string;
    status: "Upcoming" | "Ongoing" | "Ended";
    soldCount?: number;
    socialMediaLinks?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        thread?: string;
    };
};

let promotions: Promotion[] = [
    {
        id: "1",
        restaurantId: "the-great-steakhouse",
        startDate: "2025-03-01",
        endDate: "2025-03-10",
        menuItems: ["Steak", "Fries"],
        description: "March promo: Steak & Fries combo 50% discount.",
        status: "Ongoing",
        soldCount: 45,
        socialMediaLinks: {
            instagram: "https://instagram.com/promo1",
        },
    },
    {
        id: "2",
        restaurantId: "the-great-steakhouse",
        startDate: "2025-03-15",
        endDate: "2025-03-20",
        menuItems: ["Seafood Pasta"],
        description: "20% discount on all seafood pasta dishes.",
        status: "Upcoming",
        socialMediaLinks: {},
    },
    {
        id: "3",
        restaurantId: "the-great-steakhouse",
        startDate: "2025-02-01",
        endDate: "2025-02-10",
        menuItems: ["Burger"],
        description: "BOGO deal for burgers in February.",
        status: "Ended",
        soldCount: 100,
        socialMediaLinks: {
            facebook: "https://facebook.com/promo3",
        },
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