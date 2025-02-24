// src/components/common/SearchBar.tsx
"use client";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
    setSearchTerm,
    placeholder = "Search...",
}: {
    setSearchTerm: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 text-sm" />
            <input
                type="text"
                placeholder={placeholder}
                className="pl-10 pr-4 py-2 border rounded-lg w-full text-sm
                           text-gray-900 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none
                           dark:bg-black dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:ring-blue-400"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}