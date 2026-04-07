export type BlogPostId = string;

export type BlogPostSummary = {
  id: BlogPostId;
  slug: string;
  title: string;
  coverImageUrl: string | null;
  publishedAt: string | null;
};

export type BlogPostDetail = BlogPostSummary & {
  contentHtml: string;
  seoTitle: string | null;
  seoDescription: string | null;
};
