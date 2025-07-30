export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  categories: Category[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
  slug: string;
  featuredImage?: string;
  readTime: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'admin' | 'author' | 'user';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
}