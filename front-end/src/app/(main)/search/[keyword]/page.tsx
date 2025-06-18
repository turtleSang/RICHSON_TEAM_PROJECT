import { HeaderFont2 } from "@/font/font";
import GroupSearchProject from "@/layout/group-search-project";
import clsx from "clsx";

export default async function SearchKeywordPage({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword } = await params;

  return (
    <div className="w-full overflow-hidden">
      <h1
        className={clsx(
          "text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop py-3 text-center",
          HeaderFont2.className
        )}
      >
        Search result for keyword {decodeURI(keyword)}
      </h1>
      <GroupSearchProject keyword={keyword} />
    </div>
  );
}
