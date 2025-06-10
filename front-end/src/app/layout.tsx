import type { Metadata } from "next";
import "./globals.css";
import { ContentFont } from "@/font/font";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthProvider from "@/libs/AuthProvider";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "RICHSON TEAM",
  description:
    "A powerful and easy-to-use online video editing tool developed by Team Edit.",
  keywords: ["richson team", "video editor"],
  creator: "THANK SANG",
  openGraph: {
    title: "RICHSON TEAM",
    description:
      "Edit videos online with cutting, trimming, transitions, effects and export in high quality.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ContentFont.className} sm:text-body-mobile md:text-body-tablet lg:text-body-desktop antialiased`}
        cz-shortcut-listen="true"
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
