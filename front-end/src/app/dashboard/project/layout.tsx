import TitleSection from "@/components/title-section";

export default function LayoutProjectManager({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TitleSection title="Delete Project By Admin" />
      {children}
    </div>
  );
}
