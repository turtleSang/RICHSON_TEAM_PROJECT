import Link from "next/link";
import { motion } from "framer-motion";

const listItem: { name: string; link: string }[] = [
  {
    link: "/",
    name: "home",
  },
  {
    link: "/project",
    name: "project",
  },
  {
    link: "/about-us",
    name: "about us",
  },
  {
    link: "/contact",
    name: "contact",
  },
];

export default function ListItemMenu({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <ul className="text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop h-[70vh] flex flex-col justify-around">
      {listItem.map((val, index) => {
        return (
          <motion.li
            whileHover={{ x: 20 }}
            key={index}
            transition={{ duration: 0.1, type: "tween" }}
            className="hover:text-hover duration-200"
            onClick={handleClose}
          >
            <Link href={val.link}>{val.name.toUpperCase()}</Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
