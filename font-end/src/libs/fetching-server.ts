import { UserProfile } from "@/types/define.type";
import axios from "axios";
export async function GetProfileServer(token: string | undefined) {
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
        const userProfile: UserProfile = res.data
        return userProfile;
    } catch (error) {
        return null;
    }
}