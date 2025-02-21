// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { FaChevronDown } from "react-icons/fa";

// export default function RestaurantSelector() {
//     // const { selectedRestaurant, setRestaurant } = useSelectedRestaurant();
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     const buttonRef = useRef<HTMLButtonElement>(null);

//     // ✅ 로그인하지 않았으면 렌더링하지 않음
//     // if (!selectedRestaurant) return null;

//     // ✅ 드롭다운 외부 클릭 시 자동으로 닫기
//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//             if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(event.target as Node) &&
//                 buttonRef.current &&
//                 !buttonRef.current.contains(event.target as Node)
//             ) {
//                 setIsOpen(false);
//             }
//         }

//         if (isOpen) {
//             document.addEventListener("mousedown", handleClickOutside);
//         } else {
//             document.removeEventListener("mousedown", handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [isOpen]);

//     // ✅ 레스토랑 선택 시 드롭다운 닫기
//     // useEffect(() => {
//     //     setIsOpen(false);
//     // }, [selectedRestaurant]);

//     return (
//         <div className="relative">
//             <button
//                 ref={buttonRef}
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex items-center space-x-2 text-base font-medium"
//             >
//                 {/* ✅ selectedRestaurant.logo가 있을 때만 렌더링 */}
//                 {selectedRestaurant.logo && (
//                     <Image
//                         src={selectedRestaurant.logo}
//                         alt={selectedRestaurant.name}
//                         width={24}
//                         height={24}
//                         className="rounded-full"
//                     />
//                 )}

//                 <span>{selectedRestaurant.name}</span>
//                 <FaChevronDown className="text-gray-500 text-sm" />
//             </button>

//             {isOpen && (
//                 <div
//                     ref={dropdownRef}
//                     className="absolute left-0 bg-white shadow-md border rounded-lg w-48 text-sm z-50"
//                     style={{ top: "100%" }} // ✅ 버튼 바로 아래에 위치하도록 변경
//                 >
//                     {/** 레스토랑 리스트 드롭다운 */}
//                     {setRestaurant &&
//                         ["The Great Steakhouse", "Ocean's Fresh Sushi", "Italian Delights"].map((name, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => setRestaurant({ id: String(index + 1), name, logo: `/default-logo.svg` })}
//                                 className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 space-x-2"
//                             >
//                                 <Image
//                                     src={`/default-logo.svg`}
//                                     alt={name}
//                                     width={20}
//                                     height={20}
//                                     className="rounded-full"
//                                 />
//                                 <span>{name}</span>
//                             </button>
//                         ))}
//                 </div>
//             )}
//         </div>
//     );
// }