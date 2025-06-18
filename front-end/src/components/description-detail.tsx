import { DescriptionFont } from "@/font/font";
import clsx from "clsx";

export default function DescriptionDetail({
  listText,
}: {
  listText: string[];
}) {
  return (
    <div className={clsx("mt-3", DescriptionFont.className)}>
      {listText.map((val, index) => {
        return <p key={index}>{val}</p>;
      })}
    </div>
  );
}
