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