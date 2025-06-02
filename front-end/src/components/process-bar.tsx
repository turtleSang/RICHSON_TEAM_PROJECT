"use client";

import { motion } from "framer-motion";

export default function ProcessBar({ percentage }: { percentage: number }) {
  return (
    <div className="w-full h-8 bg-text rounded-full mt-3 relative overflow-hidden">
      <motion.div
        className={`bg-amber-700 h-full absolute z-0 text-center`}
        style={{
          width: `${percentage}%`,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        {percentage}
      </motion.div>
    </div>
  );
}
