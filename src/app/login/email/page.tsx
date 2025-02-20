"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const EmailPage: React.FC = () => {
    const router = useRouter();

    const handleBackToLoginOptions = () => {
        router.back(); // 이전 페이지로 이동
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Log in to Promoease</h1>
                <form>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button type="submit" className="socialbutton">
                        Continue with email
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button onClick={handleBackToLoginOptions} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition">
                        ← Other Login Options
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailPage;
