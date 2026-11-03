import FreebieForm from "@/components/post/FreebieForm";
import type { PostFreebie } from "@/lib/postFreebies";

// The one next step every case study page ends on: a free thing for their
// email, with the tick box to join the list (the same form the blog uses).
export default function ListStep({ freebie, source }: { freebie: PostFreebie; source: string }) {
  return (
    <section className="px-4 pb-28 pt-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FreebieForm freebie={freebie} source={source} />
      </div>
    </section>
  );
}
