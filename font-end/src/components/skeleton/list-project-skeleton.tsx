import clsx from "clsx";

export default function ListProjectSkeleton() {
  const skeletons = Array.from({ length: 4 }).fill("");
  return (
    <div className="grid gap-1  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {skeletons.map((_, index) => {
        return (
          <div
            key={index}
            className={clsx(
              "relative animate-pulse bg-background-item h-72  overflow-hidden",
              index + 1 === 1 && "md:col-span-2 lg:col-span-3",
              index + 1 === 3 && "xl:col-span-2",
              index + 1 === 4 && "md:col-span-2 lg:col-span-1 xl:col-span-2"
            )}
          >
            <div className="animate-pulse rounded-t-xl absolute h-14 bg-background w-1/2 md:w-3/4 z-10 bottom-0 left-3"></div>
          </div>
        );
      })}
    </div>
  );
}
