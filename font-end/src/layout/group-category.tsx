import ItemCategory from "@/components/item-category";
import TitleSection from "@/components/title-section";
import axios from "axios";

export default async function GroupCategory() {
  const title: string = "Creative editorial in adsvertising, mv and film";

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/category/all`
    );

    const listCategory: {
      id: number;
      name: string;
      link: string;
      videoThumb: { id: number } | null;
    }[] = data;

    return (
      <div className="py-14">
        <TitleSection title={title} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 -z-10">
          {listCategory.map((val, index) => {
            return (
              <ItemCategory
                id={val.id}
                link={val.link}
                key={val.id}
                name={val.name}
                videoId={val.videoThumb ? val.videoThumb.id : null}
              />
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    return <div>Not Found</div>;
  }
}
