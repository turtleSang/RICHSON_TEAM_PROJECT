export default function DescriptionDetail({
  listText,
}: {
  listText: string[];
}) {
  return (
    <div className="mt-3">
      {listText.map((val, index) => {
        return <p key={index}>{val}</p>;
      })}
    </div>
  );
}
