// src/app/(protected)/settings/general/page.tsx
"use client";

import { useState, useEffect } from "react";
import Card from "@/components/common/Card";
import DragAndDropUploader from "@/components/common/DragAndDropUploader";
import { Business, defaultBusiness, setBusinessField, getBusiness } from "@/models/business";

const industryOptions = ["Restaurant", "Cafe", "Bar", "Takeaway", "Others"];

export default function GeneralSettings() {
    const [placeId, setPlaceId] = useState("");
    const [isPresetIndustry, setIsPresetIndustry] = useState(false);
    const [businessInfo, setBusinessInfo] = useState<Business>(defaultBusiness);

    useEffect(() => {
        const storedBusiness = getBusiness();
        setBusinessInfo(storedBusiness ?? defaultBusiness);
    }, []);

    const fakeBusinessData = {
        name: "The Great Steakhouse",
        logo: "/logos/the-great-steakhouse.jpeg",
        type: "Restaurant",
    };

    const handleSaveGoogleMapsLink = () => {
        setBusinessInfo((prev) => ({
            ...prev,
            name: fakeBusinessData.name,
            logo: fakeBusinessData.logo,
            type: fakeBusinessData.type,
        }));
    };

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const fieldName = e.currentTarget.id as keyof typeof businessInfo;
        const value = businessInfo[fieldName];
        setBusinessField(fieldName, value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.currentTarget.id as keyof Business;
        setBusinessInfo((prev) => ({ ...prev, [fieldName]: e.target.value }));

        console.log(businessInfo)
    };

    const handleLogoChange = (file: File | null) => {
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setBusinessInfo((prev) => ({ ...prev, logo: fileURL }));
        } else {
            setBusinessInfo((prev) => ({ ...prev, logo: "" }));
        }
    };

    useEffect(() => {
        setIsPresetIndustry(industryOptions.includes(businessInfo.type));
    }, [businessInfo.type]);

    const handleCategoryClick = (category: string) => {
        setBusinessInfo((prev) => ({ ...prev, type: category }));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card
                title="Google Maps Business Link"
                description="If you want to use Google Maps data for Promoease, enter your Place ID below."
                restriction="Copy and paste the full Google Maps business URL."
                onSave={handleSaveGoogleMapsLink}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="w-1/2 text-sm p-2 border rounded-md focus:ring focus:ring-blue-300"
                        placeholder="Enter Google Maps URL"
                        value={placeId}
                        onChange={(e) => setPlaceId(e.target.value)}
                    />
                </div>
            </Card>

            {/* Business Name */}
            <Card
                id="name"
                title="Business Name"
                description="This is your business's visible name. Customers will see this name."
                restriction="Please use 32 characters at maximum."
                onSave={handleSave}
            >
                <input
                    id="name"
                    type="text"
                    className="w-1/2 text-sm p-2 border rounded-md focus:ring focus:ring-blue-300"
                    placeholder="Enter your business name"
                    value={businessInfo.name}
                    onChange={handleInputChange}
                />
            </Card>

            {/* Business Logo */}
            <Card
                id="logo"
                title="Business Logo"
                description="Upload your business's logo. This will be displayed on your profile."
                restriction="Recommended size: 500x500px. PNG or JPG format."
                showSaveButton={false}
            >
                <DragAndDropUploader value={businessInfo.logo} onChange={handleLogoChange} fileType="logo" />
            </Card>

            {/* Business Type Selection */}
            <Card
                id="type"
                title="Business Type"
                description="Select your business type. If your type is not listed or you want a more specific name, enter it manually."
                restriction="Choose one of the options or enter manually."
                onSave={handleSave}
            >
                <div className="flex flex-wrap gap-2">
                    {industryOptions.map((industry) => (
                        <button
                            key={industry}
                            onClick={() => handleCategoryClick(industry)}
                            className={`px-3 py-1.5 rounded-md border text-sm ${
                                (isPresetIndustry && businessInfo.type === industry) ||
                                (!isPresetIndustry && industry === "Others")
                                    ? "bg-black text-white border-black"
                                    : "bg-white border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            {industry}
                        </button>
                    ))}
                </div>

                <input
                    id="type"
                    type="text"
                    className="w-1/2 mt-2 text-sm p-2 border rounded-md focus:ring focus:ring-blue-300"
                    placeholder="Enter a more specific type"
                    value={isPresetIndustry ? "" : businessInfo.type}
                    onChange={handleInputChange}
                />
            </Card>

            <Card
                id="target"
                title="Target Customer"
                description="Provide information about your typical customers (Age, Gender)."
                restriction="Please use 32 characters at maximum."
                onSave={handleSave}
            >
                <input
                    id="target"
                    type="text"
                    className="w-1/2 text-sm p-2 border rounded-md focus:ring focus:ring-blue-300"
                    placeholder="e.g. 18-35 years old, mostly female"
                    value={businessInfo.target}
                    onChange={handleInputChange}
                />
            </Card>

            <Card
                id="vibe"
                title="Vibe"
                description="Describe the atmosphere of your business."
                restriction="Please use 32 characters at maximum."
                onSave={handleSave}
            >
                <input
                    id="vibe"
                    type="text"
                    className="w-3/4 text-sm p-2 border rounded-md focus:ring focus:ring-blue-300"
                    placeholder="e.g. Cozy and family-friendly"
                    value={businessInfo.vibe}
                    onChange={handleInputChange}
                />
            </Card>

        </div>
    );
}