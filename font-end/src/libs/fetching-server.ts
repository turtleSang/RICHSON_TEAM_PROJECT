import axios from "axios";
export async function GetProfileServer(token: string) {
    if (!token) {
        return null;
    }
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            headers: {
                Cookie: `access_token=${token}`
            },
            withCredentials: true
        })
        return res.data;
    } catch (error) {
        return null;
    }
}