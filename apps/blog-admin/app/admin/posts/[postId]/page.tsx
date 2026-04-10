import { PostEditorScreen } from "@/src/modules/blog-admin/ui/PostEditorScreen";

export default async function AdminPostDetailsPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  return <PostEditorScreen postId={postId} />;
}

