import { PageCategoryContext } from "@/app/dashboard/category/page";
import { useContext } from "react";

export default function useCategoryPageContext() {
    const context = useContext(PageCategoryContext);
    if (context) {
        return context;
    }
    throw new Error("PageCategoryContext must be used within a PageCategoryProvider");
}