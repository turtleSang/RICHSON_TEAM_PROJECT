"use client";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export default function Loader() {
  const numberCircleAround = 5;

  return (
    <div className="relative w-32 h-32 rounded-full  overflow-hidden">
      <FontAwesomeIcon
        className="z-20 opacity-70 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-4xl"
        icon={faVideo}
      />
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
        width="100px"
        height="100px"
        className={
          "absolute z-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        }
      >
        <circle cx={50} cy={50} r={50} className=" fill-background-item" />

        {Array.from({ length: numberCircleAround }, (_, index) => {
          const angle = index * (360 / numberCircleAround);

          return <CircleRound angle={angle} distance={15} r={10} key={index} />;
        })}
      </motion.svg>
      <svg
        width="100px"
        height="100px"
        className="absolute z-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full opacity-35"
      >
        <polygon points="50,50 100,0 100,100" className="fill-textsc" />
      </svg>
    </div>
  );
}

const CircleRound = ({
  angle,
  distance,
  r,
}: {
  angle: number;
  distance: number;
  r: number;
}) => {
  const radiant = angle * (Math.PI / 180);
  const y = Math.round(50 - (50 - distance) * Math.sin(radiant));
  const x = Math.round(50 + (50 - distance) * Math.cos(radiant));

  return (
    <>
      <circle cx={x} cy={y} r={r} className="fill-background"></circle>
    </>
  );
};
