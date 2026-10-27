import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

// Three posts picked because they tell the same story as the home page:
// joined-up systems that save a business time and money. The one-line blurbs
// are written for this page, so each card reads short and plain.
const FEATURED: { slug: string; blurb: string }[] = [
  {
    slug: "why-ai-funnels-fail-at-the-handoff",
    blurb: "Leads don't get lost at the start. They get lost between the steps.",
  },
  {
    slug: "the-zero-dollar-owned-pipeline-for-creators",
    blurb: "Catch every enquiry in a list you own, with tools you already pay for.",
  },
  {
    slug: "google-infrastructure-vs-ai-hype",
    blurb: "Why simple, boring tools keep a business running longer than the latest shiny one.",
  },
];

export default function BlogCards() {
  const posts = getAllPosts();
  const cards = FEATURED.map((f) => {
    const post = posts.find((p) => p.slug === f.slug);
    return post ? { ...post, blurb: f.blurb } : null;
  }).filter((p) => p !== null);

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {cards.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition hover:-translate-y-1 hover:border-foreground"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-foreground">
            <Image
              src={post.coverImage || "/images/hero-pipeline.jpg"}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <p className="eyebrow">{post.category}</p>
            <h3 className="mt-3 text-xl font-bold leading-snug text-foreground">{post.title}</h3>
            <p className="mt-3 text-muted">{post.blurb}</p>
            <span className="mt-auto pt-6 text-sm font-semibold text-foreground">
              <span className="lime-mark">Read it</span> →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
