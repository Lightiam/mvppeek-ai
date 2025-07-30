import { v4 as uuidv4 } from 'uuid';
import { BlogPost, User, Category } from '@/types/blog';

class BlogStorage {
  private readonly POSTS_KEY = 'blog_posts';
  private readonly USERS_KEY = 'blog_users';
  private readonly CATEGORIES_KEY = 'blog_categories';

  // Initialize with sample data if empty
  initializeData() {
    if (!this.getPosts().length) {
      this.seedData();
    }
  }

  private seedData() {
    // Create sample users
    const users: User[] = [
      {
        id: uuidv4(),
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
        bio: 'Tech entrepreneur and blogger',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
        bio: 'Product designer and writer',
        role: 'author',
        createdAt: new Date().toISOString()
      }
    ];

    // Create sample categories
    const categories: Category[] = [
      {
        id: uuidv4(),
        name: 'Technology',
        slug: 'technology',
        description: 'Latest tech trends and innovations',
        color: 'hsl(262 83% 58%)'
      },
      {
        id: uuidv4(),
        name: 'Startups',
        slug: 'startups',
        description: 'Startup stories and advice',
        color: 'hsl(217 91% 60%)'
      },
      {
        id: uuidv4(),
        name: 'Design',
        slug: 'design',
        description: 'UI/UX and product design',
        color: 'hsl(142 71% 45%)'
      }
    ];

    // Create sample posts
    const posts: BlogPost[] = [
      {
        id: uuidv4(),
        title: 'The Future of Web Development',
        content: `# The Future of Web Development

Web development has come a long way since the early days of static HTML pages. Today, we're witnessing a revolution in how we build and deploy web applications.

## Modern Frameworks

React, Vue, and Svelte have transformed how we think about user interfaces. These frameworks provide:

- Component-based architecture
- Reactive state management
- Efficient rendering

## The Rise of TypeScript

TypeScript has become the de facto standard for large-scale JavaScript applications, providing:

- Static type checking
- Better IDE support
- Improved maintainability

## Conclusion

The future looks bright for web development, with new tools and technologies constantly emerging to help us build better experiences.`,
        excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
        author: users[0],
        categories: [categories[0]],
        tags: ['web development', 'react', 'typescript'],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        published: true,
        slug: 'future-of-web-development',
        readTime: 5
      },
      {
        id: uuidv4(),
        title: 'Building a Successful Startup',
        content: `# Building a Successful Startup

Starting a company is one of the most challenging yet rewarding experiences an entrepreneur can have.

## Key Principles

1. **Solve a real problem** - Your product must address a genuine need
2. **Build an MVP** - Start small and iterate quickly
3. **Listen to customers** - Feedback is your most valuable asset

## Team Building

Assembling the right team is crucial for success. Look for:

- Complementary skills
- Shared vision
- Strong work ethic

The journey is difficult, but with the right approach, you can build something amazing.`,
        excerpt: 'Essential principles and strategies for building a successful startup from the ground up.',
        author: users[1],
        categories: [categories[1]],
        tags: ['startup', 'entrepreneurship', 'business'],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        published: true,
        slug: 'building-successful-startup',
        readTime: 4
      },
      {
        id: uuidv4(),
        title: 'Design Principles for Better UX',
        content: `# Design Principles for Better UX

Great design is not just about aesthetics - it's about creating experiences that delight users and solve their problems effectively.

## Core Principles

### 1. User-Centered Design
Always start with your users' needs and goals.

### 2. Simplicity
Remove unnecessary elements and focus on what matters.

### 3. Consistency
Maintain consistent patterns throughout your interface.

### 4. Accessibility
Design for everyone, including users with disabilities.

## Testing and Iteration

- Conduct user research
- Create prototypes
- Test early and often
- Iterate based on feedback

Remember, good design is invisible - users should be able to accomplish their goals without thinking about the interface.`,
        excerpt: 'Fundamental design principles that lead to exceptional user experiences and product success.',
        author: users[1],
        categories: [categories[2]],
        tags: ['design', 'ux', 'ui', 'user experience'],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        published: true,
        slug: 'design-principles-better-ux',
        readTime: 6
      }
    ];

    this.saveUsers(users);
    this.saveCategories(categories);
    this.savePosts(posts);
  }

  // Posts
  getPosts(): BlogPost[] {
    const posts = localStorage.getItem(this.POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  }

  getPostById(id: string): BlogPost | null {
    const posts = this.getPosts();
    return posts.find(post => post.id === id) || null;
  }

  getPostBySlug(slug: string): BlogPost | null {
    const posts = this.getPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  savePosts(posts: BlogPost[]): void {
    localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
  }

  savePost(post: BlogPost): void {
    const posts = this.getPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    if (existingIndex >= 0) {
      posts[existingIndex] = { ...post, updatedAt: new Date().toISOString() };
    } else {
      posts.push({ ...post, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    
    this.savePosts(posts);
  }

  deletePost(id: string): void {
    const posts = this.getPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    this.savePosts(filteredPosts);
  }

  // Users
  getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.id === id) || null;
  }

  saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push({ ...user, createdAt: new Date().toISOString() });
    }
    
    this.saveUsers(users);
  }

  // Categories
  getCategories(): Category[] {
    const categories = localStorage.getItem(this.CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
  }

  getCategoryById(id: string): Category | null {
    const categories = this.getCategories();
    return categories.find(category => category.id === id) || null;
  }

  saveCategories(categories: Category[]): void {
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories));
  }

  saveCategory(category: Category): void {
    const categories = this.getCategories();
    const existingIndex = categories.findIndex(c => c.id === category.id);
    
    if (existingIndex >= 0) {
      categories[existingIndex] = category;
    } else {
      categories.push(category);
    }
    
    this.saveCategories(categories);
  }

  // Utility methods
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}

export const blogStorage = new BlogStorage();