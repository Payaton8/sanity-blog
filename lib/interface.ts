
export interface Post {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  body: unknown;
  tags: {
    name: string;
    slug: {
      current: string;
    };
  }[];
  categories: {
    title: string;
    slug: {
      current: string;
    };
  }[];
  mainImage: {
    asset: {
      url: string;
    };
  };
  relatedPosts: Post[];
}
