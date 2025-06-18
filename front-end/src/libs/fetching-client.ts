'use client'

import { CategoryType, ProjectCardType, ProjectDto, ProjectGetOption, ProjectNameSearch, TypeShort, UserProfile } from "@/types/define.type";
import axios, { AxiosError } from "axios"
import useSWR from "swr"

// Profile
const getProfile = async (url: string) => {
    try {
        const res = await axios.get(url, { withCredentials: true });
        const profile: UserProfile = res.data;
        return profile;
    } catch (error) {
        const axiosErr = error as AxiosError;
        throw new Error(axiosErr.message)
    }

}

export const useProfile = () => {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, url => getProfile(url));
    return { data, error, isLoading }
}

// Category
const getListCategory = async (url: string) => {
    try {
        const res = await axios.get(url, { withCredentials: true });
        const listCategory: CategoryType[] = res.data
        return listCategory
    } catch (error) {
        console.error(error)
        return null
    }
}

export const useCategory = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/category/all`;
    const { data, error, isLoading } = useSWR(url, url => getListCategory(url));
    return { data, error, isLoading }
}


// Project
export const getListProject = async (url: string, page: number, size: number, type: TypeShort, short: boolean) => {
    const res = await axios.get(url, {
        params: {
            page,
            size,
            type,
            short
        }, withCredentials: true

    })
    const { listProject, maxPage } = res.data as { listProject: ProjectCardType[], maxPage: number }

    return { listProject, maxPage }


}

export const useProjects = (page: number, size: number, type: TypeShort, short: boolean, { userId, categoryLink }: ProjectGetOption) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/project/list`
    if (userId) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/project/list/user/${userId}`
    }
    if (categoryLink) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/project/list/category/${categoryLink}`
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
        console.error(error);
        return null;
    }
}

export const useProjectNameSearch = (txtSearch: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project/search/name`
    const { data, isLoading } = useSWR(txtSearch ? [url, txtSearch] : null, ([url, txtSearch]) => getListNameProject(url, txtSearch))
    return { data, isLoading }
}

export const CreateProject = async (project: ProjectDto) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    const res = await axios.post(url, project, { withCredentials: true });
    const { id, name } = res.data
    return { id, name }
}

const getListUser = async (url: string, pageNumber: number, pageSize: number) => {
    try {
        const res = await axios.get(url, {
            withCredentials: true,
            params: {
                pageNumber, pageSize
            }
        })
        const { listUser, totalPage } = res.data;
        return { listUser: listUser as UserProfile[], totalPage: totalPage as number };
    } catch (error) {
        const axiosErr = error as AxiosError

        throw new Error(axiosErr.message)
    }

}

export const useListUser = (pageSize: number, pageNumber = 1, name?: string) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/user/list`;
    if (name) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/user/list/${encodeURIComponent(name)}`;
    }
    const { data, error, isLoading } = useSWR([url, pageSize, pageNumber], ([url, pageSize, pageNumber]) => getListUser(url, pageNumber, pageSize))

    return { data, error, isLoading }
}



