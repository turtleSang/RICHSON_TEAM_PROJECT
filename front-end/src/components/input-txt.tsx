import { motion } from "framer-motion";
import { InputHTMLAttributes } from "react";

export default function InputTxt({
  errorMessage,
  title,

  ...props
}: {
  title: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <motion.label
      className="py-2 flex flex-row justify-between flex-wrap items-center "
      htmlFor=""
      layout
    >
      {errorMessage && (
        <p className="w-full h-5 text-red-600">{errorMessage}</p>
      )}
      <span className="w-3/12">{title}</span>
      <input
        className="focus-visible:outline-0 w-8/12 border-b-2  focus:border-b-hover"
        type="text"
        {...props}
      />
    </motion.label>
  );
}
