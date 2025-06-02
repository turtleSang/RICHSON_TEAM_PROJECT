"use client";
import CategoryDashboardCard from "@/components/category-dashboard-card";
import CreateCategoryForm from "@/components/create-category-form";
import ModalGroup from "@/components/modal-group";
import NotificationComponent, {
  NotificationProps,
} from "@/components/notification-component";
import { useCategory } from "@/libs/fetching-client";
import { CategoryType } from "@/types/define.type";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useEffect, useState } from "react";

export type PageCategoryContextType = {
  handleNotification: (newNotification: NotificationProps) => void;
  handleActiveForm: (active: boolean) => void;
  handleAddCardType: (category: CategoryType) => void;
};

export const PageCategoryContext =
  createContext<PageCategoryContextType | null>(null);

export default function PageCategoryManager() {
  const { data, error, isLoading } = useCategory();
  const [listCategory, setListCategory] = useState<CategoryType[]>([]);
  const [activeForm, setActiveForm] = useState(false);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setListCategory(data);
    }
  }, [data]);

  const handleNotification = (newNotification: NotificationProps) => {
    setNotification(newNotification);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleActiveForm = (active: boolean) => {
    setActiveForm(active);
  };

  const handleAddCardType = (categoryNew: CategoryType) => {
    setListCategory((prev) => [...prev, categoryNew]);
  };

  return (
    <PageCategoryContext
      value={{ handleNotification, handleActiveForm, handleAddCardType }}
    >
      <div className="">
        <div className="mt-3 grid grid-cols-3 gap-4">
          {notification && (
            <NotificationComponent
              mess={notification.mess}
              type={notification.type}
            />
          )}
          {listCategory.length > 0 &&
            listCategory.map((category) => {
              return (
                <CategoryDashboardCard category={category} key={category.id} />
              );
            })}
          {activeForm && <CreateCategoryForm />}
          <div className="bg-background-item p-3 relative flex items-center justify-center">
            <button
              disabled={activeForm}
              className="inline-block border-2 w-20 h-20 rounded-lg cursor-pointer hover:bg-hover hover:border-hover hover:text-background duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleActiveForm(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </PageCategoryContext>
  );
}
