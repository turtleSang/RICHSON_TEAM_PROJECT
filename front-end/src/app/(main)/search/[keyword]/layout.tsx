import ListProjectSkeleton from "@/components/skeleton/list-project-skeleton";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Suspense fallback={<ListProjectSkeleton />}>{children}</Suspense>
    </section>
  );
}
