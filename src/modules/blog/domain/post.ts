export type BlogPostId = string;

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPostSummary = {
  id: BlogPostId;
  slug: string;
  title: string;
  coverImageUrl: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  categories: BlogCategory[];
};

export type BlogPostDetail = BlogPostSummary & {
  contentHtml: string;
  seoTitle: string | null;
  seoDescription: string | null;
  categories: BlogCategory[];
};

export type BlogRelatedPost = {
  id: BlogPostId;
  slug: string;
  title: string;
  publishedAt: string | null;
};
