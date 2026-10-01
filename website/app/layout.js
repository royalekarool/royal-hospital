import "./globals.css";
import { Figtree } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import { getSiteData } from "@/lib/data";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});

export async function generateMetadata() {
  const { site } = await getSiteData();
  return {
    title: `${site.name}, ${site.tagline}`,
    description: site.hero.text,
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default async function RootLayout({ children }) {
  const { site } = await getSiteData();
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <Header name={site.name} tagline={site.tagline} landline={site.landline} />
        <main id="top">{children}</main>
        <Footer footer={site.footer} landline={site.landline} />
        <MobileBar landline={site.landline} />
      </body>
    </html>
  );
}
