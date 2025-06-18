
import { useContext } from "react";

import { NotificationProps } from "@/components/notification-component";
import { CategoryType } from "@/types/define.type";
import { createContext } from "react";

export type PageCategoryContextType = {
    handleNotification: (newNotification: NotificationProps) => void;
    handleActiveForm: (active: boolean) => void;
    handleAddCardType: (category: CategoryType) => void;
};

export const PageCategoryContext =
    createContext<PageCategoryContextType | null>(null);




export default function useCategoryPageContext() {
    const context = useContext(PageCategoryContext);
    if (context) {
        return context;
    }
    throw new Error("PageCategoryContext must be used within a PageCategoryProvider");
}