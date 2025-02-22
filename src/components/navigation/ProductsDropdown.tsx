import Link from "next/link";
import { FaRobot, FaChartLine, FaLightbulb, FaPen } from "react-icons/fa";
import { dropdownItemClass, dropdownTextClass, dropdownSubTextClass } from "@/components/styles";

const productItems = [
    {
        href: "/feature1",
        icon: <FaRobot className="text-xl" />,
        title: "AI Captions",
        description: "Generate captions with AI",
    },
    {
        href: "/feature2",
        icon: <FaChartLine className="text-xl" />,
        title: "Marketing Insights",
        description: "Analyze your marketing impact",
    },
    {
        href: "/feature3",
        icon: <FaLightbulb className="text-xl" />,
        title: "Promotion Suggestion",
        description: "Get AI-powered promotion ideas",
    },
    {
        href: "/feature4",
        icon: <FaPen className="text-xl" />,
        title: "Social Media Management",
        description: "Schedule & manage posts across multiple platforms",
    },
];

export default function ProductsDropdown() {
    return (
        <div className="absolute top-full left-0 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-2">
            <div className="space-y-3">
                {productItems.map(({ href, icon, title, description }) => (
                    <Link key={href} href={href} className={dropdownItemClass}>
                        {icon}
                        <div>
                            <h4 className={dropdownTextClass}>{title}</h4>
                            <p className={dropdownSubTextClass}>{description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}