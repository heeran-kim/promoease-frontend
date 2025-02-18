"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    FaGoogle, 
    FaApple, 
    FaFacebook, 
    FaKey, 
    // FaEnvelope 
} from "react-icons/fa";

export default function LoginPage() {
    const [showEmailForm, setShowEmailForm] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md transition-all duration-300">
                {/* 제목 */}
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Log in to Promoease
                </h2>

                {/* 소셜 로그인 버튼 */}
                <div className="mt-6 space-y-3">
                    <button className="flex items-center w-full px-4 py-3 text-white bg-[#4285F4] rounded-md hover:bg-[#357ae8] transition">
                        <FaGoogle className="mr-3" /> Continue with Google
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-white bg-[#000000] rounded-md hover:bg-[#333333] transition">
                        <FaApple className="mr-3" /> Continue with Apple
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-white bg-[#1877F2] rounded-md hover:bg-[#166FE5] transition">
                        <FaFacebook className="mr-3" /> Continue with Facebook
                    </button>
                </div>

                {/* 구분선 */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or</span>
                    </div>
                </div>

                {/* Passkey 로그인 */}
                <button className="flex items-center w-full px-4 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition">
                    <FaKey className="mr-3" /> Login with Passkey
                </button>

                {/* 이메일 로그인 버튼 */}
                {!showEmailForm && (
                    <div className="mt-4 text-center">
                        <button
                            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
                            onClick={() => setShowEmailForm(true)}
                        >
                            Continue with Email →
                        </button>
                    </div>
                )}

                {/* 이메일 로그인 폼 */}
                {showEmailForm && (
                    <form className="mt-6 space-y-4 animate-fade-in">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                        >
                            Log in
                        </button>
                    </form>
                )}

                {/* 회원가입 & 비밀번호 찾기 */}
                <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Don&apos;t have an account? <Link href="/register" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition">Sign up</Link></p>
                    <p className="mt-2"><Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition">Forgot your password?</Link></p>
                </div>
            </div>
        </div>
    );
}