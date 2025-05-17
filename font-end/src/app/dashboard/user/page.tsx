"use client";

import NotificationComponent, {
  NotificationProps,
} from "@/components/notification-component";
import PageNumberNav from "@/components/page-number-nav";
import UserCard from "@/components/user-card";
import { useListUser } from "@/libs/fetching-client";
import { Role, UserProfile } from "@/types/define.type";
import { useEffect, useState } from "react";

export default function UserManagerPage() {
  const pageSize = 6;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { data, error, isLoading } = useListUser(pageSize, pageNumber);
  const [listUser, setListUser] = useState<UserProfile[]>([]);
  const [notification, setNotification] = useState<NotificationProps | null>({
    mess: "",
    type: "suscess",
  });

  useEffect(() => {
    if (data && data.totalPage) {
      setTotalPage(data.totalPage);
    }
    if (data && data.listUser) {
      setListUser(data.listUser);
    }
  }, [data]);

  const handlePage = (numPage: number) => {
    setPageNumber(numPage);
  };

  const handleNotification = (newNotification: NotificationProps) => {
    setNotification(newNotification);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleUpdateSuccess = (userId: number, newRole: Role) => {
    const newList = listUser.map((val) => {
      if (val.id === userId) {
        return { ...val, role: newRole };
      }
      return val;
    });
    setListUser(newList);
  };

  return (
    <>
      {notification && (
        <NotificationComponent
          mess={notification.mess}
          type={notification.type}
        />
      )}
      <div className="h-[80vh] bg-background-item">
        <div className="h-[10vh]">Search by email</div>
        <div className="h-[70vh] flex flex-col overflow-y-auto px-3">
          {listUser.map((val) => {
            return (
              <UserCard
                handleNotification={handleNotification}
                profile={val}
                key={val.id}
                handleUpdated={handleUpdateSuccess}
              />
            );
          })}
        </div>
      </div>

      <PageNumberNav
        pageNumber={pageNumber}
        pageTotal={totalPage}
        handlePage={handlePage}
      />
    </>
  );
}
