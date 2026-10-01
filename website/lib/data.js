import { client, hasSanity, imageUrl } from "./sanity";
import { fallback } from "./fallback";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const settingsQuery = `*[_type == "siteSettings"][0]`;
const departmentsQuery = `*[_type == "department"] | order(order asc, name asc){
  _id, name, consultant, schedule
}`;
const doctorsQuery = `*[_type == "doctor"] | order(order asc, name asc){
  _id, name, role, photo, "dept": department->name
}`;

// Pages refresh from the admin panel about every 30 seconds.
const options = { next: { revalidate: 30 } };

const pick = (value, fallbackValue) =>
  value === null || value === undefined || value === "" ? fallbackValue : value;

function buildSite(s) {
  const f = fallback.site;
  if (!s) return f;
  return {
    name: pick(s.name, f.name),
    tagline: pick(s.tagline, f.tagline),
    landline: pick(s.landline, f.landline),
    mobile: pick(s.mobile, f.mobile),
    whatsapp: pick(s.whatsapp, f.whatsapp),
    address: pick(s.address, f.address),
    mapLink: pick(s.mapLink, f.mapLink),
    hero: {
      title: pick(s.heroTitle, f.hero.title),
      text: pick(s.heroText, f.hero.text),
      image: imageUrl(s.heroImage, 1800),
    },
    deptIntro: pick(s.deptIntro, f.deptIntro),
    services:
      s.services && s.services.length
        ? s.services.map((x) => ({
            icon: x.icon || "steth",
            name: x.name,
            text: x.text || "",
            link: x.linkLabel && x.linkHref ? { label: x.linkLabel, href: x.linkHref } : null,
          }))
        : f.services,
    about: {
      title: pick(s.aboutTitle, f.about.title),
      text: pick(s.aboutText, f.about.text),
      image: imageUrl(s.aboutImage, 1200),
    },
    contact:
      s.contactDetails && s.contactDetails.length
        ? s.contactDetails.map((c) => [c.label, c.value])
        : f.contact,
    mapImage: imageUrl(s.mapImage, 1200),
    footer: pick(s.footerText, f.footer),
  };
}

function buildTimings(departments) {
  return departments.map((d) => ({
    name: d.name,
    consultant: d.consultant || "",
    days: (d.schedule || [])
      .filter((row) => row.day && row.times && row.times.length)
      .sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day))
      .map((row) => [row.day, row.times]),
  }));
}

export async function getSiteData() {
  if (!hasSanity) return fallback;

  const [settings, departments, doctors] = await Promise.all([
    client.fetch(settingsQuery, {}, options),
    client.fetch(departmentsQuery, {}, options),
    client.fetch(doctorsQuery, {}, options),
  ]);

  return {
    site: buildSite(settings),
    timings: buildTimings(departments || []),
    doctors: (doctors || []).map((d) => ({
      id: d._id,
      name: d.name,
      role: d.role,
      dept: d.dept || "",
      image: imageUrl(d.photo, 600),
    })),
  };
}
