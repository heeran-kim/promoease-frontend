"use client"

import { useState, FormEvent} from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';

const EmailRegisterPage: React.FC = () => {
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
        setErrors({});
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
            setErrors({"message": "Registration failed"});
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up for Promoease</h1>
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
            { errors && 
                Object.entries(errors).map(
                    ([key, message]) => (
                    <p key={key} className="text-red-500">{message}</p>
            ))}
        </form>
        </div>
        </div>
        );
};

export default EmailRegisterPage;



               