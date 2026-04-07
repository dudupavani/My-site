import type { BlogPostDetail, BlogPostId, BlogPostSummary } from "@/src/modules/blog/domain/post";

export type ListPublicBlogPostsInput = {
  limit?: number;
  cursor?: string;
};

export type ListPublicBlogPostsOutput = {
  items: BlogPostSummary[];
  nextCursor: string | null;
};

export type GetPublicBlogPostInput = {
  postId: BlogPostId;
};

export type GetPublicBlogPostOutput = BlogPostDetail | null;
