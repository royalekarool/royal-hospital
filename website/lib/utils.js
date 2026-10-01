export const tel = (n) => "tel:" + String(n).replace(/\s/g, "");

export const waUrl = (whatsapp, msg) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function bookHref({ dept, doctor } = {}) {
  const p = new URLSearchParams();
  if (dept) p.set("dept", dept);
  if (doctor) p.set("doctor", doctor);
  const q = p.toString();
  return "/doctors" + (q ? "?" + q : "");
}
