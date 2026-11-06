import { getAllPosts } from "@/lib/posts";
import PostTile from "./PostTile";

// The three newest posts. getAllPosts is newest first and leaves out hidden posts
// and posts dated ahead.
export default function BlogCards() {
  const cards = getAllPosts().slice(0, 3);

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {cards.map((post) => (
        <PostTile key={post.slug} post={post} />
      ))}
    </div>
  );
}
