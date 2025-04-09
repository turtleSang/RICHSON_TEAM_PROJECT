'use client'
import axios from "axios";
export const fetcherProfile = async (url: string, token: string) => {
    const Authorization = `Bearer ${token}`;
    try {
        const res = await axios.get(url, {
            headers: {
                Authorization
            }
        });
        return res.data;
    } catch (err) {
        return err;
    }
}