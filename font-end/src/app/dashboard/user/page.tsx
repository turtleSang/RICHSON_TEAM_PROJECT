"use client";

import InputTxt from "@/components/input-txt";
import NotFoundComponent from "@/components/not-found-component";
import NotificationComponent, {
  NotificationProps,
} from "@/components/notification-component";
import PageNumberNav from "@/components/page-number-nav";
import UserCardListSkeleton from "@/components/skeleton/user-card-list-skeleton";
import UserCard from "@/components/user-card";
import { useListUser } from "@/libs/fetching-client";
import { Role, UserProfile } from "@/types/define.type";
import { FormEvent, useEffect, useState } from "react";

export default function UserManagerPage() {
  const pageSize = 3;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [nameSearch, setNameSearch] = useState<string>("");
  const { data, error, isLoading } = useListUser(
    pageSize,
    pageNumber,
    nameSearch
  );
  const [listUser, setListUser] = useState<UserProfile[]>([]);
  const [notification, setNotification] = useState<NotificationProps | null>({
    mess: "",
    type: "suscess",
  });
  const [txtValue, setTxtValue] = useState("");

  useEffect(() => {
    if (data && data.totalPage) {
      setTotalPage(data.totalPage);
    } else {
      setTotalPage(1);
    }
    if (data && data.listUser) {
      setListUser(data.listUser);
    } else {
      setListUser([]);
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageNumber(1);
      setNameSearch(txtValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [txtValue]);

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

  const handleChangeName = (e: FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setTxtValue(val);
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
        <div className="flex h-[10vh] p-3">
          <label className="block w-full" htmlFor="nameSearch">
            <input
              className="block w-full border-2 p-3 rounded-md"
              type="text"
              id="nameSearch"
              value={txtValue}
              onInput={(e) => {
                handleChangeName(e);
              }}
              placeholder="Search by name"
            />
          </label>
        </div>
        <div className="h-[70vh] flex flex-col overflow-y-auto px-3">
          {isLoading && <UserCardListSkeleton />}
          {listUser.length > 0 ? (
            listUser.map((val) => {
              return (
                <UserCard
                  handleNotification={handleNotification}
                  profile={val}
                  key={val.id}
                  handleUpdated={handleUpdateSuccess}
                />
              );
            })
          ) : (
            <NotFoundComponent name={"User"} />
          )}
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
