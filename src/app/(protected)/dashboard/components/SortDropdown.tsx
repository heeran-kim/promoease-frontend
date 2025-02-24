import { useState, useRef, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import { FaCheck } from "react-icons/fa"; // ✅ 체크 아이콘 추가

export default function SortDropdown({ sortBy, setSortBy }: { sortBy: string; setSortBy: React.Dispatch<React.SetStateAction<string>> }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ✅ 드롭다운 외부 클릭 시 닫기
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-48" ref={dropdownRef}>
            {/* ✅ 드롭다운 버튼 (현재 선택된 옵션 강조) */}
            <button
                className="border p-2 rounded-lg text-sm w-full text-left appearance-none flex justify-between items-center
                           bg-white text-gray-900 border-gray-300 hover:bg-gray-100
                           dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                Sort by {sortBy === "activity" ? "activity" : "name"}
                <FaSort className="text-gray-500 dark:text-gray-300" />
            </button>

            {/* ✅ 드롭다운 메뉴 (현재 선택된 옵션을 강조) */}
            {isOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10
                                dark:bg-gray-800 dark:border-gray-600 text-sm">
                    <div
                        className="p-2 flex justify-between items-center cursor-pointer 
                                    hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => { setSortBy("activity"); setIsOpen(false); }}
                    >
                        Sort by activity
                        {sortBy === "activity" && <FaCheck />}
                    </div>
                    <div
                        className="p-2 flex justify-between items-center cursor-pointer 
                                    hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => { setSortBy("name"); setIsOpen(false); }}
                    >
                        Sort by name
                        {sortBy === "name" && <FaCheck />}
                    </div>
                </div>
            )}
        </div>
    );
}