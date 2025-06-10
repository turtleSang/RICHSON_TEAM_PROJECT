"use client";
import { CategoryType } from "@/types/define.type";
import ItemCategory from "./item-category";
import { motion } from "framer-motion";

export default function ListCategoryHome({
  listCategory,
}: {
  listCategory: CategoryType[];
}) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 -z-10 w-full overflow-hidden">
      {listCategory.map((val, index) => {
        return (
          <motion.div
            initial={{ translateX: "-100%", opacity: 0 }}
            whileInView={{ translateX: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", delay: 0.2 * index }}
            key={`category_${val.id}`}
          >
            <ItemCategory
              id={val.id}
              link={val.link}
              key={val.id}
              name={val.name}
              videoId={val.videoThumb ? val.videoThumb.id : null}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
