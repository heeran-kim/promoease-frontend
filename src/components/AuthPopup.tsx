"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function AuthPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                <button className="absolute top-4 right-4 text-gray-600" onClick={onClose}>
                    <FaTimes className="text-2xl" />
                </button>
                <h2 className="text-2xl font-bold text-center mb-6">
                    {isLogin ? "Log in to Promoease" : "Sign up for Promoease"}
                </h2>
                {isLogin ? (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input type="email" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your email" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input type="password" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg">
                            Log in
                        </button>
                        <p className="text-center mt-4">
                            Don't have an account? 
                            <button type="button" className="text-blue-600 ml-1" onClick={() => setIsLogin(false)}>
                                Sign up
                            </button>
                        </p>
                    </form>
                ) : (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input type="email" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your email" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input type="password" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg">
                            Sign up
                        </button>
                        <p className="text-center mt-4">
                            Already have an account? 
                            <button type="button" className="text-blue-600 ml-1" onClick={() => setIsLogin(true)}>
                                Log in
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
