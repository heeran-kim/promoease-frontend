import { FaSort } from "react-icons/fa";

export default function SortDropdown({ sortBy, setSortBy }: { sortBy: string; setSortBy: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <div className="relative">
            <select
                className="border p-2 rounded-lg text-sm appearance-none pr-8"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="activity">Sort by activity</option>
                <option value="name">Sort by name</option>
            </select>
            {/* 아이콘 추가 (absolute 위치 설정) */}
            <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
    );
}