import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema, itemListSchema } from "@/lib/schema";
import { SITE_URL, CHECKLIST_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { FAQS } from "@/lib/faqs";
import Faq from "@/components/Faq";
import Reveal from "@/components/home/Reveal";
import PostTile from "@/components/home/PostTile";
import { LastCall } from "@/components/home/CallToAction";
import OneLiner from "@/components/home/OneLiner";

export const revalidate = 60;

const TITLE = "Automation ideas for small businesses";
const DESCRIPTION =
  "Simple fixes for the jobs that keep small business owners working late: leads, onboarding, delivery and keeping clients coming back.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Oloye blog` },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  // Off-story posts are marked hidden and never reach this list.
  const [featured, ...rest] = getAllPosts();

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/blog",
          title: TITLE,
          description: DESCRIPTION,
          type: "CollectionPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ],
        })}
      />
      <JsonLd
        data={itemListSchema({
          path: "/blog",
          items: [featured, ...rest].filter(Boolean).map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
        })}
      />

      <div className="bg-surface">
        <section className="px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">Blog</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-foreground sm:text-7xl">
              Automation ideas for <span className="lime-mark">small businesses.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
              Simple fixes for the jobs that keep you working late. Written the way we&apos;d explain it to a friend.
            </p>
          </div>
        </section>

        {featured && (
          <section className="px-4 sm:px-6">
            <Reveal className="mx-auto max-w-5xl">
              <PostTile post={featured} big />
            </Reveal>
          </section>
        )}

        {rest.length > 0 && (
          <section className="px-4 pt-6 sm:px-6">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 2) * 120}>
                  <PostTile post={post} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <OneLiner className="pt-24 sm:pt-32" />

        <section className="px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="mx-auto max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-accent p-8 sm:flex-row sm:items-center sm:p-12">
              <div>
                <p className="display text-3xl text-foreground sm:text-4xl">Not sure where to start?</p>
                <p className="mt-2 text-foreground/70">10 jobs most businesses can hand over first.</p>
              </div>
              <Link
                href={CHECKLIST_URL}
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-foreground px-7 py-4 text-sm font-bold text-accent transition hover:bg-foreground/90"
              >
                Get the free checklist
              </Link>
            </div>
          </Reveal>
        </section>

        <Faq items={FAQS.blog} heading="About the blog" />

        <LastCall />
      </div>
    </>
  );
}
