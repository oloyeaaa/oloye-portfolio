import type { Metadata } from "next";
import { getPostsByCategory, getCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = getCategories();
  const category = categories.find((c) => c.slug === slug);
  const name = category?.name || slug;
  return {
    title: `${name} Articles`,
    description: `Articles about ${name} from Oloye Adeosun.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  const categories = getCategories();
  const category = categories.find((c) => c.slug === slug);
  const categoryName = category?.name || slug;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {categoryName}
      </h1>
      <p className="text-muted mb-8">
        {posts.length} {posts.length === 1 ? "article" : "articles"} in this category.
      </p>

      <CategoryFilter categories={categories} />

      {posts.length === 0 ? (
        <p className="text-muted text-center py-12">No posts in this category yet.</p>
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
