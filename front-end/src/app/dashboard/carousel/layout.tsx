import TitleSection from "@/components/title-section";

export default function CarouselPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TitleSection title="Carousel Manager" />
      {children}
    </>
  );
}
