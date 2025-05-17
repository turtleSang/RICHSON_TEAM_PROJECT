import ListNavDashBoard from "@/components/list-nav-item-dashboard";
import ProfileDashBoard from "@/components/profile-dashboard";
import { UserProfile } from "@/types/define.type";

export default function NavBarDashBoard({ profile }: { profile: UserProfile }) {
  return (
    <div className="py-3">
      <ProfileDashBoard profile={profile} />
      <ListNavDashBoard />
    </div>
  );
}
