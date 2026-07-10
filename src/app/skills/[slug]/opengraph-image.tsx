import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getAllSkillSlugs, getSkillBySlug } from "@/lib/skills";

export const alt = "Free Claude Code skill — Oloye.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllSkillSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  return renderOg({
    kicker: skill
      ? `${skill.category} · ${skill.price ? `£${skill.price}` : "Free"}`
      : "Skill",
    title: skill?.title ?? slug,
    sub: skill?.tagline ? skill.tagline.slice(0, 90) : undefined,
  });
}
