import { useProfile } from "@/libs/fetching-client";
import Login from "./login-with-google";
import UserInfoBtn from "./user-info-btn";

export default function ProfileInfo() {
  const [data, isLoading, error] = useProfile();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data || error) {
    return <Login />;
  }

  const { name, avatar } = data;

  return <UserInfoBtn name={name} avatar={avatar} />;
}
