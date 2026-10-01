import LegalPage from "@/components/LegalPage";
import { getSiteData } from "@/lib/data";

export async function generateMetadata() {
  const { site } = await getSiteData();
  return { title: `Terms & Conditions | ${site.name}, ${site.tagline}` };
}

export default function TermsPage() {
  return <LegalPage file="terms-and-conditions.md" />;
}
