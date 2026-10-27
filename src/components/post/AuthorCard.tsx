import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/lib/authors";

// The card at the end of every post: whoever wrote it, in their own words.
export default function AuthorCard({ author }: { author: Author }) {
  return (
    <section aria-label="About the author" className="mt-16 rounded-3xl border border-border bg-background p-7 sm:p-9">
      <p className="eyebrow">Written by</p>
      <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
        <Link href={author.url.replace(/^https?:\/\/[^/]+/, "")} className="shrink-0" aria-label={`About ${author.name}`}>
          <Image
            src={author.image}
            alt={author.name}
            width={88}
            height={88}
            className="h-[88px] w-[88px] rounded-full object-cover transition hover:ring-4 hover:ring-accent"
          />
        </Link>
        <div>
          <Link href={author.url.replace(/^https?:\/\/[^/]+/, "")} className="text-xl font-bold text-foreground hover:underline decoration-accent decoration-2 underline-offset-4">
            {author.name}
          </Link>
          <p className="text-sm text-muted">{author.role}</p>
          <p className="mt-4 text-primary-dim">{author.bio}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href={author.url.replace(/^https?:\/\/[^/]+/, "")}
              className="rounded-lg bg-foreground px-3 py-1.5 text-sm font-semibold text-accent transition hover:bg-foreground/90"
            >
              More about {author.name.split(" ")[0]}
            </Link>
            {author.links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-foreground"
              >
                {l.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
