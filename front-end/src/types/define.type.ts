export type UserProfile = {
    name: string;
    email: string;
    avatar: string;
    id: number;
    role: Role
    createAt: Date
}

export type Role = "admin" | "viewer" | "member";

export type CategoryType = {
    id: number;
    name: string;
    link: string;
    description: string;
    videoThumb: {
        id: number;
    } | null
}

export type ProjectCardType = {
    id: number;
    name: string;
    description: string,
    rating: number;
    createAt: Date;
    author: {
        id: number;
        name: string;
        avatar: string;
    };
    categoryList: {
        id: number;
        name: string;
        link: string;
    }[];
    thumb: {
        id: number;
    };
}

export type ProjectDetail = {
    id: number,
    name: string,
    description: string,
    rating: number,
    createAt: Date,
    updateAt: Date,
    author: {
        id: number,
        name: string,
        avatar: string
    },
    video: { id: number } | null,
    thumb: {
        id: number;
    } | null,
    imageList?: { id: number }[],
    categoryList: { name: string, id: number, link: string }[]
}

export type TypeShort = "project.rating" | "project.createAt" | "project.updateAt"

export type ProjectNameSearch = {
    id: number,
    name: string
}

export interface ErrorMessageType {
    [key: string]: string;
}

export type ProjectDto = {
    name: string;
    description: string;
    categoryIdList: number[];
}

export type ProjectGetOption = {
    userId?: number
    categoryLink?: string
}

