export type PostStatus = "draft" | "published";

export type ValidationErrorMap = Record<string, string>;

export type BlogCategory = {
  id: string;
  name: string;
  created_at: string;
};

export type PostListItem = {
  id: string;
  title: string;
  slug: string;
  status: PostStatus;
  updated_at: string;
  cover_image_path: string | null;
  cover_image_url: string | null;
  is_featured: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  source_markdown: string | null;
  status: PostStatus;
  cover_image_path: string | null;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  categories: BlogCategory[];
};

export type PostPayload = {
  title?: string;
  slug?: string;
  content?: string | null;
  source_markdown?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  category_ids?: string[];
};

export type PublishPayload = PostPayload;

export type CategoryPayload = {
  name?: string;
};

export type ValidationErrorResponse = {
  detail: string;
  errors?: ValidationErrorMap;
};

