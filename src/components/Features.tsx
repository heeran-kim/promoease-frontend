const features = [
    { 
      title: "AI Caption Generator", 
      description: "Upload an image, and AI will create the perfect caption.", 
      icon: "🤖" 
    },
    { 
      title: "Hashtag Recommendations", 
      description: "Get the best trending hashtags for your posts.", 
      icon: "🔥" 
    },
    { 
      title: "Promotion Suggestions", 
      description: "AI suggests effective promotions to increase engagement.", 
      icon: "📣" 
    },
];

export default function Features() {
    return (
        <section className="py-16 bg-gradient-to-r from-indigo-50 to-indigo-200 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-300 mb-10">Why Choose Promoease?</h2>
                <div className="mt-10 grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-10 h-64 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:scale-105 transition-transform">
                            <div className="text-6xl">{feature.icon}</div>
                            <h3 className="text-xl font-semibold">{feature.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}