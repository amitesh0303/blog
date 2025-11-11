export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogCreateInput {
  title: string;
  content: string;
  excerpt: string;
}

export interface BlogUpdateInput {
  title?: string;
  content?: string;
  excerpt?: string;
  published?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
