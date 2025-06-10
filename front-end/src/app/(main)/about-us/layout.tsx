import TitleSection from "@/components/title-section";

export default function LayoutAboutUs({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-3">
      <TitleSection title="OUR journey " />
      {children}
    </section>
  );
}
