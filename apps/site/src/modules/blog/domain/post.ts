export type BlogPostId = string;

export type BlogPostSummary = {
  id: BlogPostId;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
};

export type BlogPostDetail = BlogPostSummary & {
  contentHtml: string;
};
