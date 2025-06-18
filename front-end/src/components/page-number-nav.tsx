import clsx from "clsx";

export default function PageNumberNav({
  pageNumber,
  pageTotal,
  handlePage,
}: {
  pageNumber: number;
  pageTotal: number;
  handlePage: (numPage: number) => void;
}) {
  const listNumber = Array.from({ length: pageTotal }, (_, i) => i + 1);

  return (
    <div className="text-center">
      {listNumber.map((val, index) => {
        return (
          <span
            className={clsx(
              "inline-block mr-3 cursor-pointer hover:text-hover duration-200",
              pageNumber === val && "text-hover scale-150"
            )}
            key={index}
            onClick={() => handlePage(val)}
          >
            {val}
          </span>
        );
      })}
    </div>
  );
}
