import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zcymyfvp";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// When no Project ID is set, the site shows sample content (lib/fallback.js).
export const hasSanity = Boolean(projectId);

export const client = hasSanity
  ? createClient({ projectId, dataset, apiVersion: "2024-10-01", useCdn: false })
  : null;

const builder = hasSanity ? imageUrlBuilder({ projectId, dataset }) : null;

export function imageUrl(source, width = 800) {
  if (!source || !builder) return null;
  return builder.image(source).width(width).auto("format").url();
}
