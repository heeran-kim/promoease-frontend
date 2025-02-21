// src/mocks/mockData.ts
export const mockRestaurants = [
    { id: "1", name: "The Great Steakhouse", description: "Best steaks in town!" },
    { id: "2", name: "Ocean's Fresh Sushi", description: "Fresh sushi, every day!" },
    { id: "3", name: "Italian Delights", description: "Authentic Italian pasta & pizza." }
];

// ✅ getMockRestaurants 함수를 내보냄
export const getMockRestaurants = () => mockRestaurants;