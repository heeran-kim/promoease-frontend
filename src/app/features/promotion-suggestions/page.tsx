"use client";

import { FaChartBar, FaLightbulb, FaCloudSun } from "react-icons/fa";

export default function PromotionSuggestions() {
    return (
        <div className="max-w-6xl mx-auto space-y-16 p-6">
            {/* 🟢 1. 본인 가게 데이터 분석 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-12">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        📊 Your Restaurant Data Analysis
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        AI analyzes <strong>your restaurant's sales trends</strong> to suggest optimal promotions.
                    </p>
                </div>

                <div className="space-y-4">
                    {/* 🔹 메뉴 조합 & 사이드 메뉴 프로모션 */}
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow-md space-y-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            🤖 <strong>AI Assistant:</strong> 
                            <strong> 70% of customers who order Steak also add Fries. </strong>
                            However, <strong>30% don’t order any sides.</strong>
                            👉 Consider a <strong>combo discount</strong> to increase sales.
                        </p>
                        <div className="border-t border-gray-300 dark:border-gray-700 mt-2 pt-2 text-xs text-gray-500 whitespace-pre-line flex flex-col">
                            <div>🔹 <strong>Powered by:</strong> Apriori Algorithm (Frequent Pattern Mining, Market Basket Analysis)</div>
                            <div>🔹 <strong>Required Data:</strong> Internal sales database</div>
                        </div>
                    </div>

                    {/* 🔹 판매 부진 메뉴 할인 */}
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow-md space-y-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            🤖 <strong>AI Assistant:</strong> 
                            Your <strong>Seafood Pasta sales dropped by 20%</strong> in the last 2 weeks.
                            👉 A <strong>limited-time discount + social media post</strong> could help boost sales.
                        </p>
                        <div className="border-t border-gray-300 dark:border-gray-700 mt-2 pt-2 text-xs text-gray-500">
                            <div>🔹 <strong>Powered by:</strong> Time-Series Sales Analysis (ARIMA, Seasonal Decomposition)</div>
                            <div>🔹 <strong>Required Data:</strong> Internal sales database</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🟠 2. 업계 트렌드 분석 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-12">
                <div className="space-y-4">
                    {/* 🔹 업계 트렌드 - 인기 메뉴 */}
                    <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg shadow-md space-y-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            🤖 <strong>AI Assistant:</strong> 
                            Restaurants in your industry are <strong>heavily promoting Vegan Bowls.</strong>  
                            👉 If you have one, <strong>now is a great time to highlight it!</strong>
                        </p>
                        <div className="border-t border-gray-300 dark:border-gray-700 mt-2 pt-2 text-xs text-gray-500">
                            <div>🔹 <strong>Powered by:</strong> Competitor Analysis with NLP (Topic Modeling, Named Entity Recognition)  </div>
                            <div>🔹 <strong>API:</strong> Instagram, Facebook, Twitter, Threads</div>
                        </div>
                    </div>

                    {/* 🔹 업계 트렌드 - 시즌별 인기 메뉴 */}
                    <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg shadow-md space-y-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            🤖 <strong>AI Assistant:</strong> 
                            <strong>Local cafes are trending with seasonal Pumpkin Spice items.</strong>  
                            👉 If you don’t have a similar offering, consider <strong>creating one!</strong>
                        </p>
                        <div className="border-t border-gray-300 dark:border-gray-700 mt-2 pt-2 text-xs text-gray-500">
                            <div>🔹 <strong>Powered by:</strong> Social Media Trend Detection (Hashtag Analysis, Sentiment Analysis)  </div>
                            <div>🔹 <strong>API:</strong> Instagram, Facebook, Twitter, Threads</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        🔍 Industry Trends
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Discover what’s working for <strong>similar businesses in your industry</strong>.
                    </p>
                </div>
            </section>

            {/* 🟡 3. 트렌드 & 환경 기반 홍보 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        🌦️ Trend & Environment-Based Marketing
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Adapt your promotions based on <strong>weather, seasons, and trending challenges</strong>.
                    </p>
                </div>

                <div className="space-y-4">
                    {/* 🔹 날씨 기반 프로모션 */}
                    <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg shadow-md space-y-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            🤖 <strong>AI Assistant:</strong> 
                            <strong>Today’s temperature is above 30°C!</strong>  
                            👉 Promote your <strong>cold drinks and desserts</strong> to attract customers.
                        </p>
                        <div className="border-t border-gray-300 dark:border-gray-700 mt-2 pt-2 text-xs text-gray-500">
                            <div>🔹 <strong>Powered by:</strong> Weather-Based Recommendation System (Time-Series Forecasting)  </div>
                            <div>🔹 <strong>API:</strong> OpenWeather API</div>
                        </div>
                    </div>

                    {/* 🔹 SNS 트렌드 기반 챌린지 홍보 */}
                    <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg shadow-md space-y-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            🤖 <strong>AI Assistant:</strong> 
                            <strong>The latest challenge involves spicy food!</strong>  
                            👉 Create a <strong>Spicy Food Challenge Promo</strong> to engage customers.
                        </p>
                        <div className="border-t border-gray-300 dark:border-gray-700 mt-2 pt-2 text-xs text-gray-500">
                            <div>🔹 <strong>Powered by:</strong> Social Media Sentiment Analysis (BERT, Transformer-based Models)  </div>
                            <div>🔹 <strong>API:</strong> Instagram, Twitter, Threads</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}