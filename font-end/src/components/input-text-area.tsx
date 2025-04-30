import { motion } from "framer-motion";
import { TextareaHTMLAttributes } from "react";

export default function InputTextArea({
  title,
  placeholder,
  errorMessage,
  ...props
}: {
  title: string;
  placeholder?: string;
  errorMessage?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <motion.label
      className="flex flex-row justify-between flex-wrap"
      htmlFor=""
      layout
    >
      {errorMessage && (
        <motion.p className="w-full h-5 text-red-600 mb-3">
          {errorMessage}
        </motion.p>
      )}
      <span className="inline-block w-3/12 ">{title}</span>
      <textarea
        {...props}
        className="w-8/12 h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hover resize-none duration-200"
        placeholder={placeholder}
      />
    </motion.label>
  );
}
