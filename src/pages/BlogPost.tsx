import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogStorage } from '@/lib/blogStorage';
import { BlogPost as BlogPostType } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, ArrowLeft, Edit, Trash2, Home } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      blogStorage.initializeData();
      const foundPost = blogStorage.getPostBySlug(slug);
      setPost(foundPost);
      setLoading(false);
    }
  }, [slug]);

  const handleDelete = () => {
    if (post && window.confirm('Are you sure you want to delete this post?')) {
      blogStorage.deletePost(post.id);
      toast({
        title: 'Post deleted',
        description: 'The blog post has been successfully deleted.',
      });
      navigate('/blog');
    }
  };

  const renderContent = (content: string) => {
    // Simple markdown-like rendering for demonstration
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-bold text-foreground mt-8 mb-4 first:mt-0">
              {paragraph.replace('# ', '')}
            </h1>
          );
        }
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-semibold text-foreground mt-6 mb-3">
              {paragraph.replace('## ', '')}
            </h2>
          );
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-medium text-foreground mt-4 mb-2">
              {paragraph.replace('### ', '')}
            </h3>
          );
        }
        if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- '));
          return (
            <ul key={index} className="list-disc list-inside space-y-1 text-foreground my-4">
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.replace('- ', '')}</li>
              ))}
            </ul>
          );
        }
        if (/^\d+\./.test(paragraph)) {
          const items = paragraph.split('\n').filter(line => /^\d+\./.test(line));
          return (
            <ol key={index} className="list-decimal list-inside space-y-1 text-foreground my-4">
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={index} className="text-foreground leading-relaxed my-4">
            {paragraph}
          </p>
        );
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Post header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Badge 
                key={category.id} 
                variant="secondary"
                style={{ backgroundColor: `${category.color}20`, color: category.color }}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Link to={`/blog/edit/${post.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </header>

        {/* Post content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </div>
          
          <div className="border-t border-border pt-8">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Tags */}
        {post.tags.length > 0 && (
          <footer className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-medium text-foreground mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default BlogPost;