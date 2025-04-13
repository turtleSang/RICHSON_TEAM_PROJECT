import Carousel from "@/components/carousel";
import Loader from "@/components/loader";
import GroupCategory from "@/layout/group-category";
import { GetProfile } from "@/libs/fetching-server";
import { div } from "framer-motion/client";
import { cookies } from "next/headers";

export default async function MainPage() {
  return (
    <div>
      <Carousel />
      <GroupCategory />
    </div>
  );
}
