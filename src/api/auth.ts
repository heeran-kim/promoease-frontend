// Axios is a promise-based HTTP client for JavaScript that allows you to make requests
// to APIs easily. It works in both the browser and Node.js environments and is commonly
// used to send and received data from web servers.

// A Promise is a special JavaScript object that represents an operation that hasn't
// completed yet, but will in the future. It can have three states: Pending, Resolved,
// Rejected

// Since Axios is promise-based, every Axios request returns a Promise.

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const register = (email: string, password: string, role: string) => {
    return axios.post(`${API_URL}/users/register/`, { email, password, role });
};

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/login/`, { email, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            let errorMessage = error.response.data.non_field_errors?.[0] || error.response.data.error || "Login failed";
            if (typeof errorMessage !== "string") {
                errorMessage = JSON.stringify(errorMessage);
            }
            throw new Error(errorMessage);
        }
        throw new Error("Something went wrong");
    }
};
