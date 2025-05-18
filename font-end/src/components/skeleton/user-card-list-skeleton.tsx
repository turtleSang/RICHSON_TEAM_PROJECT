export default function UserCardListSkeleton() {
  const arr = new Array(3).fill("");
  return (
    <div>
      {arr.map((_, index) => {
        return (
          <div
            className="flex flex-row justify-between bg-accent mb-3 p-3 items-center "
            key={index}
          >
            <div className="h-28 w-28 rounded-full bg-background-item animate-pulse"></div>
            <div className="w-1/3">
              <div className="h-8 bg-background-item mb-3 animate-pulse"></div>
              <div className="h-6 bg-background-item mb-3 animate-pulse"></div>
              <div className="h-6 bg-background-item mb-3 animate-pulse"></div>
              <div className="h-5 bg-background-item mb-3 animate-pulse"></div>
            </div>
            <div className="h-8 w-1/3 bg-background-item animate-pulse"></div>
          </div>
        );
      })}
    </div>
  );
}
