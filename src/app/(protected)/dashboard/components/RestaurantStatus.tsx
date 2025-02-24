import React from "react";

type PostStatusProps = {
    upcomingPosts: number;
    uploadedPosts: number;
    failedPosts: number;
};

const RestaurantStatus: React.FC<PostStatusProps> = ({ upcomingPosts, uploadedPosts, failedPosts }) => {
    return (
        <p className="mt-2 text-xs flex items-center">
            {failedPosts > 0 ? (
                <>
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                    <span className="text-red-600 dark:text-red-400">
                        {failedPosts} post{failedPosts > 1 ? "s" : ""} failed. Please try again.
                    </span>
                </>
            ) : upcomingPosts > 0 ? (
                <>
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                    <span className="text-yellow-600 dark:text-yellow-400">
                        {upcomingPosts} post{upcomingPosts > 1 ? "s" : ""} scheduled.
                    </span>
                </>
            ) : (
                <>
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    <span className="text-green-600 dark:text-green-400">
                        {uploadedPosts} post{uploadedPosts > 1 ? "s" : ""} uploaded successfully.
                    </span>
                </>
            )}
        </p>
    );
};

export default RestaurantStatus;