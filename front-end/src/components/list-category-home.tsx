"use client";
import { CategoryType } from "@/types/define.type";
import ItemCategory from "./item-category";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function ListCategoryHome({
  listCategory,
}: {
  listCategory: CategoryType[];
}) {
  let layout = listCategory.length % 4;

  return (
    <div
      className={
        "grid gap-1 -z-10 w-full overflow-hidden grid-cols-2 xl:grid-cols-4"
      }
    >
      {listCategory.map((val, index) => {
        if (layout === 1 && index === listCategory.length - 1) {
          return (
            <motion.div
              initial={{ translateX: "-100%", opacity: 0 }}
              whileInView={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring", delay: 0.2 * index }}
              key={`category_${val.id}`}
              className="col-span-2 xl:col-span-4"
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
        }

        if (
          layout === 2 &&
          (index === listCategory.length - 1 ||
            index === listCategory.length - 2)
        ) {
          return (
            <motion.div
              initial={{ translateX: "-100%", opacity: 0 }}
              whileInView={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring", delay: 0.2 * index }}
              key={`category_${val.id}`}
              className="col-span-1 xl:col-span-2"
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
        }

        if (layout === 3) {
          if (
            index === listCategory.length - 2 ||
            index === listCategory.length - 3
          ) {
            return (
              <motion.div
                initial={{ translateX: "-100%", opacity: 0 }}
                whileInView={{ translateX: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring", delay: 0.2 * index }}
                key={`category_${val.id}`}
                className="col-span-1 xl:col-span-2"
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
          }
          if (index === listCategory.length - 1) {
            return (
              <motion.div
                initial={{ translateX: "-100%", opacity: 0 }}
                whileInView={{ translateX: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring", delay: 0.2 * index }}
                key={`category_${val.id}`}
                className="col-span-2 xl:col-span-4"
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
          }
        }

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
