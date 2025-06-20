import TitleSection from "@/components/title-section";

export default function LayoutCategoryManager({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TitleSection title="Category Manager" />
      {children}
    </>
  );
}
