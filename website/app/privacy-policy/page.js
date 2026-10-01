import LegalPage from "@/components/LegalPage";
import { getSiteData } from "@/lib/data";

export async function generateMetadata() {
  const { site } = await getSiteData();
  return { title: `Privacy Policy | ${site.name}, ${site.tagline}` };
}

export default function PrivacyPage() {
  return <LegalPage file="privacy-policy.md" />;
}
