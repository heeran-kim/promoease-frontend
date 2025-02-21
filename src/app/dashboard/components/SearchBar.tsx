"use client";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ setSearchTerm }: { setSearchTerm: (value: string) => void }) {
    return (
        <div className="relative flex-grow">
            {/* 돋보기 아이콘 (FontAwesome) */}
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
                type="text"
                placeholder="Search Restaurants..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}