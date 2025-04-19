import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DropDownBtn({
  listDropDown,
  handleValue,
}: {
  name: string;
  listDropDown: {
    name: string;
    value: any;
  }[];
  handleValue: (value: any) => void;
}) {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(listDropDown[0].name);

  const handleSelect = (item: { name: string; value: any }) => {
    handleValue(item.value);
    setSelected(item.name);
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={clsx("relative z-10")}>
      <button
        onClick={handleClick}
        className={clsx(
          "uppercase py-1 ml-2 w-32 border-3 md:ml-7 md:px-4 md:py-2 md:w-44 rounded-xl cursor-pointer duration-200 hover:border-hover",
          isOpen && "border-hover"
        )}
        type="button"
      >
        {selected}
      </button>
      <motion.div
        layout
        className="absolute w-32 left-2 top-10 md:w-44 md:top-12 md:left-7"
      >
        {isOpen && (
          <ul className="md:py-3 text-center rounded-xl bg-btnBg duration-200 ">
            {listDropDown.map((item, index) => {
              return (
                <li
                  className="py-1 uppercase cursor-pointer duration-200 mb-3 hover:bg-btnBorder hover:text-background"
                  onClick={() => handleSelect(item)}
                  key={index}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
