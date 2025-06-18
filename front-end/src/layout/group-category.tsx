import ListCategoryHome from "@/components/list-category-home";
import NotFoundComponent from "@/components/not-found-component";
import TitleSection from "@/components/title-section";
import { CategoryType } from "@/types/define.type";
import axios from "axios";

export default async function GroupCategory() {
  const title: string = "Creative editorial in adsvertising, mv and film";

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/category/all`
    );

    const listCategory: CategoryType[] = data;

    return (
      <div className="mt-10">
        <TitleSection title={title} />
        {listCategory.length > 0 ? (
          <ListCategoryHome listCategory={listCategory} />
        ) : (
          <div>
            <NotFoundComponent name="Category" />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <NotFoundComponent name="Category" />;
  }
}
