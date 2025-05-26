"use client";
import ProfileNavLayout from "@/layout/profile-nav";

import ListProjectLayOut from "@/layout/list-project-layout";
import { AuthContext } from "@/libs/AuthProvider";
import { useContext } from "react";
import ListProjectSkeleton from "@/components/skeleton/list-project-skeleton";
import NoPermission from "@/components/no-permission";

export default function PageProfile() {
  const { isLoading, user, error } = useContext(AuthContext);

  return (
    <div>
      {error && <NoPermission />}
      {isLoading && <ListProjectSkeleton />}
      {user && (
        <div>
          <ProfileNavLayout profile={user} />
          <ListProjectLayOut
            name={`project of ${user.name}`}
            userId={user.id}
          />
        </div>
      )}
    </div>
  );
}
