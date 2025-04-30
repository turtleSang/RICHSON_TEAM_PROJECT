export type UserProfile = {
    name: string;
    email: string;
    avatar: string;
    id: number;
}

export type CategoryType = {
    id: number;
    name: string;
    link: string;
    videoThumb: {
        id: number;
    }
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

