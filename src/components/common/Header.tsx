// src/components/common/Header.tsx
"use client";

export default function Header({ title, description }: { title: string; description?: string }) {
    return (
        <div className="border-b border-gray-300 dark:border-gray-700 px-6 py-8">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {title}
            </h1>

            {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
            )}
        </div>
    );
}