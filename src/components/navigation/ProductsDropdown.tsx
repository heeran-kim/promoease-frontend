import Link from "next/link";
import { FaRobot, FaChartLine, FaLightbulb } from "react-icons/fa";

export default function ProductsDropdown() {
    return (
        <div className="absolute top-full left-0 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-2">
            <div className="space-y-3">
                <Link href="/feature1" className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <FaRobot className="text-indigo-500 text-xl" />
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">AI Captions</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Generate captions with AI</p>
                    </div>
                </Link>
                <Link href="/feature2" className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <FaChartLine className="text-indigo-500 text-xl" />
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Marketing Insights</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Analyze your marketing impact</p>
                    </div>
                </Link>
                <Link href="/feature3" className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <FaLightbulb className="text-indigo-500 text-xl" />
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Promotion Suggestion</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get AI-powered promotion ideas</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}