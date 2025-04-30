'use client'

import { CategoryType, ProjectCardType, ProjectDto, ProjectNameSearch, TypeShort } from "@/types/define.type";
import axios from "axios"
import useSWR from "swr"

// Profile
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

// Category
const getListCategory = async (url: string) => {
    try {
        const res = await axios.get(url);
        const listCategory: CategoryType[] = res.data
        return listCategory
    } catch (error) {
        return null
    }
}

export const useCategory = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/category/all`;
    const { data, error, isLoading } = useSWR(url, url => getListCategory(url));
    return { data, error, isLoading }
}


// Project
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
        return null;
    }

}

export const useProjects = (page: number, size: number, type: TypeShort, short: boolean, userId?: number) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/project/list`
    if (userId) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/project/list/user/${userId}`
    }

    const { data, isLoading, error } = useSWR(
        [url, page, size, type, short],
        ([url, page, size, type, short]) => getListProject(url, page, size, type, short)
    );
    return { data, isLoading, error }
}

const getListNameProject = async (url: string, txtSearch: string) => {
    try {
        const res = await axios.get(`${url}/${encodeURIComponent(txtSearch)}`);
        const listName: ProjectNameSearch[] = res.data
        return listName;
    } catch (error) {
        return null;
    }
}

export const useProjectNameSearch = (txtSearch: string) => {
    if (!txtSearch) {
        return { data: null, isLoading: false };
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project/search/name`
    const { data, isLoading } = useSWR([url, txtSearch], ([url, txtSearch]) => getListNameProject(url, txtSearch))
    return { data, isLoading }
}

export const CreateProject = async (project: ProjectDto) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    const res = await axios.post(url, project, { withCredentials: true });
    const { id, name } = res.data
    return { id, name }
}



