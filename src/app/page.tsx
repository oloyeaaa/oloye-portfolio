import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

const skills = [
  { name: "Marketing Automation", description: "HubSpot, Marketo, Pardot, custom workflow design" },
  { name: "MarTech Stack", description: "Platform selection, integration architecture, performance optimisation" },
  { name: "AI & Enterprise", description: "AI-powered marketing infrastructure, prompt engineering, agent workflows" },
  { name: "Marketing Operations", description: "Data governance, reporting, attribution, process design" },
  { name: "Web Performance", description: "Analytics, tracking, CRO, technical SEO" },
  { name: "Campaign Strategy", description: "Enterprise ABM, demand gen, multi-channel orchestration" },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-accent-light text-sm font-semibold uppercase tracking-widest mb-4">
            Enterprise Marketing & Automation
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            I build AI-powered marketing infrastructure and write about what works.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
            Marketing Manager for Enterprise & Automation. I specialise in turning complex MarTech stacks into revenue-generating systems. This is where I share what I&apos;m learning and building.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/about"
              className="bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              About Me
            </Link>
            <Link
              href="/blog"
              className="border border-white/30 hover:border-white text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-primary mb-2">What I Do</h2>
          <p className="text-muted mb-10">Core areas of expertise across enterprise marketing and technology.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-white border border-border rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-2">{skill.name}</h3>
                <p className="text-sm text-muted">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">Recent Posts</h2>
                <p className="text-muted">Thoughts on marketing automation, MarTech, and enterprise AI.</p>
              </div>
              <Link
                href="/blog"
                className="text-sm font-medium text-accent hover:text-accent-light transition-colors hidden md:block"
              >
                View all posts &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/blog"
                className="text-sm font-medium text-accent hover:text-accent-light transition-colors"
              >
                View all posts &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
