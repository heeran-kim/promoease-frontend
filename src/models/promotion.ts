// src/models/promotion.ts

export const TYPE_OPTIONS = ["Discount", "Combo", "MenuHighlight", "NewMenu"] as const;
export const STATUS_OPTIONS = ["Upcoming", "Ongoing", "Ended"] as const;

export type Promotion = {
    id: string;
    startDate: string;
    endDate: string;
    category: string;
    description: string;
    status: string;
    soldCount?: number;
    postId?: string[];
};

let promotions: Promotion[] = [];

export const setBulkPromotions = (newPromotions: Promotion[]) => {
    promotions = [...newPromotions];
};

export const getPromotions = (): Promotion[] => {
    return promotions;
};

export const addPromotion = (newPromo: Promotion) => {
    promotions = [newPromo, ...promotions];
};

export const deletePromotion = (promoId: string) => {
    promotions = promotions.filter((promo) => promo.id !== promoId);
};
