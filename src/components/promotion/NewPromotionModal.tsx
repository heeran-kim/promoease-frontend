"use client";

import { useState } from "react";

export default function NewPromotionModal({ onClose, onAdd }: { onClose: () => void; onAdd: (promotion: any) => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = () => {
        if (title && description && discount && startDate && endDate) {
            onAdd({ title, description, discount, startDate, endDate });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold">Create New Promotion</h2>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mt-2" />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded mt-2" />
                <input type="text" placeholder="Discount (e.g. 20%)" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full p-2 border rounded mt-2" />
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border rounded mt-2" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 border rounded mt-2" />
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
                </div>
            </div>
        </div>
    );
}