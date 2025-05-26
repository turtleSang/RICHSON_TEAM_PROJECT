import ListProjectSkeleton from "@/components/skeleton/list-project-skeleton";
import TitleSection from "@/components/title-section";
import { HeaderFont1, HeaderFont2 } from "@/font/font";
import ProjectNav from "@/layout/project-nav";
import clsx from "clsx";
import { Suspense } from "react";

export default function LayoutProject({
  children,
}: {
  children: React.ReactNode;
}) {
  const content =
    "Welcome to our project portfolio. This section showcases a selection of our completed works, including music videos (MVs), television commercials (TVCs), and short films produced for various clients. We invite you to explore these projects to gain insight into our capabilities and creative approach";
  return (
    <div className=" mt-10 flex flex-col items-center justify-center w-full h-full">
      <TitleSection title="Our Project" />
      <p
        className={clsx(
          "mb-10 px-8 md:px-10 lg:px-20 text-justify text-body-mobile md:text-body-tablet lg:text-body-desktop",
          HeaderFont2.className
        )}
      >
        {content}
      </p>
      <ProjectNav />
      <Suspense fallback={<ListProjectSkeleton />}>{children}</Suspense>
    </div>
  );
}
