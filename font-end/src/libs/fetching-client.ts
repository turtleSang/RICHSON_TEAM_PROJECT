'use client'

import axios from "axios"
import useSWR from "swr"

const getProfile = async (url: string) => {
    try {
        const res = await axios.get(url, { withCredentials: true });
        return res.data;
    } catch (err) {
        return null;
    }
}

export const useProfile = () => {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, url => getProfile(url));
    return [data, error, isLoading]
}
