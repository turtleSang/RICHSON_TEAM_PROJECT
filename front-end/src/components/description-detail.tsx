export default function DescriptionDetail({
  listText,
}: {
  listText: string[];
}) {
  return (
    <div className="pl-3">
      {listText.map((val, index) => {
        return <p key={index}>{val}</p>;
      })}
    </div>
  );
}
