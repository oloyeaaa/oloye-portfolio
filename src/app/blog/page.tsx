import type { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on marketing automation, MarTech, AI in enterprise marketing, leadership, and marketing operations.",
};

export default function Blog() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Blog</h1>
      <p className="text-muted mb-8">
        Practical insights on marketing automation, MarTech, and AI from an enterprise practitioner.
      </p>

      <CategoryFilter categories={categories} />

      {posts.length === 0 ? (
        <p className="text-muted text-center py-12">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
