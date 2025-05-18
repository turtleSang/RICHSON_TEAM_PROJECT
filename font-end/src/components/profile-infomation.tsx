import { useProfile } from "@/libs/fetching-client";
import Login from "./login-with-google";
import UserInfoBtn from "./user-info-btn";
import { useContext } from "react";
import { AuthContext } from "@/libs/AuthProvider";

export default function ProfileInfo() {
  const { isLoading, user, error } = useContext(AuthContext);
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!user || error) {
    return <Login />;
  }

  const { name, avatar } = user;

  return <UserInfoBtn name={name} avatar={avatar} />;
}
