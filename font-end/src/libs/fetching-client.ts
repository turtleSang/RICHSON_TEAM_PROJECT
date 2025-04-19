'use client'

import { ProjectCardType } from "@/types/define.type";
import axios from "axios"
import useSWR from "swr"




const getProfile = async (url: string) => {
    try {
        const res = await axios.get(url, { withCredentials: true });
        return res.data;
    } catch (error) {
        return null;
    }

}

export const useProfile = () => {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, url => getProfile(url));
    return [data, error, isLoading]
}


type TypeShort = 'project.rating' | 'project.createAt' | 'project.updateAt'


const getListProject = async (url: string, page: number, size: number, type: TypeShort, short: boolean) => {
    try {
        const res = await axios.get(url, {
            params: {
                page,
                size,
                type,
                short
            }

        })
        const listProject: ProjectCardType[] = res.data
        return listProject
    } catch (error) {
        console.log(error);

        return null;
    }

}

export const useProjects = (page: number, size: number, type: TypeShort, short: boolean) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project/list`
    const { data, isLoading, error } = useSWR(
        [url, page, size, type, short],
        ([url, page, size, type, short]) => getListProject(url, page, size, type, short)
    );
    return { data, isLoading, error }
}
