"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { FaGoogle, FaApple, FaFacebook, FaKey } from "react-icons/fa";
import Link from "next/link";

export default function RegisterPage() {
    const { login } = useAuth();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    //
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Input Validation
    const validateForm = () => {
        const newErrors: {[key: string]: string } = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.includes("@")) newErrors.email = "Invalid email format.";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Register
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log("Validation failed", formData);
            return;
        }

        // Remove confirmPassword before sending the request
        const { confirmPassword, ...formDataToSend } = formData;
        void confirmPassword;

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formDataToSend),
        });

        if (res.ok) {
            await login(formData.email, formData.password);
        } else {
            console.error("Register failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md transition-all duration-300">
                {/* 제목 */}
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Sign Up for Promoease
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
                    <FaKey className="mr-3" /> Sign Up with Passkey
                </button>

                {/* 이메일 회원가입 버튼 */}
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

                {/* 이메일 회원가입 폼 */}
                {showEmailForm && (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4 animate-fade-in">
                        {/* 이름 입력 */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter your name"
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* 이메일 입력 */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter your email"
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* 비밀번호 입력 */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter your password"
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* 비밀번호 확인 입력 */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Re-enter your password"
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {/* 회원가입 버튼 */}
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                        >
                            Sign Up
                        </button>
                    </form>
                )}

                {/* 로그인 페이지 이동 */}
                <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Already have an account? <Link href="/login" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition">Log in</Link></p>
                </div>
            </div>
        </div>
    );
}