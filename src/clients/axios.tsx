import axios from "axios";
const apiBackend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",

    },
    withCredentials: true,

});
export {apiBackend};