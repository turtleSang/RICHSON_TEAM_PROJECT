"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export type NotificationProps = {
  mess: string;
  type: "success" | "error" | "warning";
};

const styleBgNofication = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-600",
};

const styleTextNofication = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
};

export default function NotificationComponent(nofi: NotificationProps) {
  const [active, setActive] = useState<boolean>(false);

  let icon: IconProp;
  switch (nofi.type) {
    case "success":
      icon = faCheck;
      break;
    case "error":
      icon = faExclamation;
      break;
    default:
      icon = faTriangleExclamation;
      break;
  }
  const variant: Variants = {
    show: { opacity: 1, translateY: 0 },
    hidden: { opacity: 0, translateY: 10 },
  };

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => {
      setActive(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {active && nofi.mess && (
        <motion.div
          variants={variant}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 0.3 }}
          key={"nofication"}
          className={clsx(
            "fixed bottom-15 left-1 z-50 bg-gray-400 p-3 rounded-md",
            styleTextNofication[nofi.type]
          )}
        >
          <span
            className={clsx(
              "inline-block mr-3 text-text w-10 h-10 text-center leading-10 rounded-full",
              styleBgNofication[nofi.type]
            )}
          >
            <FontAwesomeIcon icon={icon} />
          </span>
          {nofi.mess}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
