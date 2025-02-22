"use client";

import { Restaurant, getRestaurantBySlug } from "@/mocks/mockData";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa"; 
import RestaurantDropdown from "@/components/navigation/RestaurantDropdown";

export default function RestaurantSelector() {
    const { slug } = useParams(); // ✅ 현재 URL에서 slug 가져오기
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null); 

    // ✅ 백엔드에서 해당 레스토랑 정보 가져오기
    useEffect(() => {
        if (!slug) {
            setSelectedRestaurant(null); // ✅ 선택된 레스토랑 초기화
            return;
        }

        const restaurant = getRestaurantBySlug(slug);
        if (restaurant) {
            setSelectedRestaurant(restaurant);
        } else {
            console.error("Restaurant not found:", slug);
        }

        // const fetchRestaurant = async () => {
        //     try {
        //         const res = await fetch(`/api/restaurants/${slug}`); // ✅ 백엔드 API 요청
        //         if (!res.ok) throw new Error("Failed to fetch restaurant data");
        //         const data = await res.json();
        //         setSelectedRestaurant(data); // ✅ 상태 업데이트
        //     } catch (error) {
        //         console.error("Error fetching restaurant:", error);
        //     }
        // };

        // fetchRestaurant();
    }, [slug]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node) // ✅ 버튼 클릭은 무시
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    if (!selectedRestaurant) return null;

    return (
        <div className="relative">
            <div className="flex items-center space-x-2 text-base font-medium">
                <Image
                    src={selectedRestaurant.logo || "/globe.svg"}
                    alt={selectedRestaurant.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                />
                <span>{selectedRestaurant.name}</span>

                {/* ✅ 화살표 버튼 (이것만 클릭 가능) */}
                <button
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`p-1 rounded-md transition-colors ${
                        isOpen ? "bg-gray-200" : "hover:bg-gray-100"
                    }`}
                >
                    <FaChevronDown
                        className={`text-gray-500 text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {/* ✅ 드롭다운 */}
                {isOpen && (
                    <div ref={dropdownRef}>
                        <RestaurantDropdown selectedSlug={slug} closeDropdown={() => setIsOpen(false)} />
                    </div>
                )}
            </div>
        </div>
    );
}