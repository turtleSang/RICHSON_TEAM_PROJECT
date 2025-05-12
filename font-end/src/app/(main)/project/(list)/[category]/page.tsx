import axios from "axios";
import dynamic from "next/dynamic";
const ListProjectLayOut = dynamic(() => import("@/layout/list-project-layout"));

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/category/detail/${category}`;
  const res = await axios.get(url);
  const {
    name,
    description,
    link,
  }: { name: string; description: string; link: string } = res.data;

  return (
    <div className="w-full">
      <ListProjectLayOut name={`${name} project`} description={description} />
    </div>
  );
}
