import { posts } from "@/lib/mock-data";
import { PostDetail } from "./post-detail";

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PostDetail id={id} />;
}
