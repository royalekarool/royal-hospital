import BookingClient from "@/components/BookingClient";
import { getSiteData } from "@/lib/data";

export async function generateMetadata() {
  const { site } = await getSiteData();
  return { title: `Book your doctor | ${site.name}, ${site.tagline}` };
}

const one = (v) => (Array.isArray(v) ? v[0] : v || "");

export default async function DoctorsPage({ searchParams }) {
  const { site, timings, doctors } = await getSiteData();
  const params = (await searchParams) || {};
  const dept = one(params.dept);
  const doctor = one(params.doctor);

  return (
    <BookingClient
      key={`${dept}|${doctor}`}
      doctors={doctors}
      timings={timings}
      siteName={site.name}
      whatsapp={site.whatsapp}
      landline={site.landline}
      initialDept={dept}
      initialDoctor={doctor}
    />
  );
}
