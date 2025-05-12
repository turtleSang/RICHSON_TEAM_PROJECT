import clsx from "clsx";

export default function ListProjectSkeleton() {
  const skeletons = Array.from({ length: 4 }).fill("");
  return (
    <div className="grid gap-1  grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {skeletons.map((_, index) => {
        return (
          <div
            key={index}
            className={clsx(
              "relative animate-pulse bg-background-item aspect-video col-span-1 overflow-hidden"
            )}
          >
            <div className="animate-pulse rounded-t-xl absolute h-14 bg-background w-1/2 md:w-3/4 z-10 bottom-0 left-3"></div>
          </div>
        );
      })}
    </div>
  );
}
