import TitleSection from "@/components/title-section";

export default function LayoutUserManager({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TitleSection title="USER MANAGER" />
      {children}
    </div>
  );
}
