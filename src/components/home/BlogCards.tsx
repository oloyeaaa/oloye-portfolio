import { getAllPosts } from "@/lib/posts";
import PostTile from "./PostTile";

// Three posts picked because they tell the same story as the home page:
// joined-up systems that save a business time and money.
const FEATURED = [
  "why-ai-funnels-fail-at-the-handoff",
  "the-zero-dollar-owned-pipeline-for-creators",
  "google-infrastructure-vs-ai-hype",
];

export default function BlogCards() {
  const posts = getAllPosts();
  const cards = FEATURED.map((slug) => posts.find((p) => p.slug === slug)).filter((p) => p !== undefined);

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {cards.map((post) => (
        <PostTile key={post.slug} post={post} />
      ))}
    </div>
  );
}
