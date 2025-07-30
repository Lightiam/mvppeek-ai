import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { blogStorage } from '@/lib/blogStorage';
import { BlogPost, Category, User } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BlogCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { toast } = useToast();
  const isEditing = Boolean(id);

  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    authorId: '',
    categoryIds: [] as string[],
    published: false,
    tags: [] as string[],
    tagInput: ''
  });

  useEffect(() => {
    blogStorage.initializeData();
    const allUsers = blogStorage.getUsers();
    const allCategories = blogStorage.getCategories();
    
    setUsers(allUsers);
    setCategories(allCategories);

    // Set default author to first admin user
    if (allUsers.length > 0 && !formData.authorId) {
      const adminUser = allUsers.find(user => user.role === 'admin') || allUsers[0];
      setFormData(prev => ({ ...prev, authorId: adminUser.id }));
    }

    // Load existing post for editing
    if (isEditing && id) {
      const existingPost = blogStorage.getPostById(id);
      if (existingPost) {
        setFormData({
          title: existingPost.title,
          content: existingPost.content,
          excerpt: existingPost.excerpt,
          authorId: existingPost.author.id,
          categoryIds: existingPost.categories.map(cat => cat.id),
          published: existingPost.published,
          tags: existingPost.tags,
          tagInput: ''
        });
      }
    }
  }, [id, isEditing]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter(id => id !== categoryId)
        : [...prev.categoryIds, categoryId]
    }));
  };

  const handleAddTag = () => {
    const tag = formData.tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
        tagInput: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const generateExcerpt = () => {
    if (formData.content) {
      // Extract first paragraph or first 150 characters
      const firstParagraph = formData.content.split('\n\n')[0];
      const cleaned = firstParagraph.replace(/#+\s/g, '').trim();
      const excerpt = cleaned.length > 150 ? cleaned.substring(0, 147) + '...' : cleaned;
      handleInputChange('excerpt', excerpt);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast({ title: 'Error', description: 'Title is required', variant: 'destructive' });
      return false;
    }
    if (!formData.content.trim()) {
      toast({ title: 'Error', description: 'Content is required', variant: 'destructive' });
      return false;
    }
    if (!formData.excerpt.trim()) {
      toast({ title: 'Error', description: 'Excerpt is required', variant: 'destructive' });
      return false;
    }
    if (!formData.authorId) {
      toast({ title: 'Error', description: 'Author is required', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleSave = async (shouldPublish: boolean = false) => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const author = users.find(user => user.id === formData.authorId)!;
      const selectedCategories = categories.filter(cat => formData.categoryIds.includes(cat.id));
      
      const slug = isEditing && id 
        ? blogStorage.getPostById(id)?.slug || blogStorage.generateSlug(formData.title)
        : blogStorage.generateSlug(formData.title);

      const postData: BlogPost = {
        id: isEditing && id ? id : uuidv4(),
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author,
        categories: selectedCategories,
        tags: formData.tags,
        published: shouldPublish || formData.published,
        slug,
        createdAt: isEditing && id ? blogStorage.getPostById(id)!.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readTime: blogStorage.calculateReadTime(formData.content)
      };

      blogStorage.savePost(postData);
      
      toast({
        title: isEditing ? 'Post updated' : 'Post created',
        description: shouldPublish 
          ? 'Your blog post has been published successfully!'
          : 'Your blog post has been saved as draft.',
      });

      navigate('/blog');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save the post. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/blog')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={loading}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Eye className="w-4 h-4" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter post title..."
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateExcerpt}
                      disabled={!formData.content}
                    >
                      Generate from content
                    </Button>
                  </div>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Brief description of your post..."
                    rows={3}
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Write your post content here... (supports simple markdown)"
                    rows={20}
                    className="bg-background border-border font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports basic markdown: # Headers, ## Subheaders, - Lists, 1. Numbered lists
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Select value={formData.authorId} onValueChange={(value) => handleInputChange('authorId', value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => handleInputChange('published', checked)}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-surface/50 rounded p-2 transition-colors"
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.categoryIds.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="rounded border-border"
                      />
                      <Badge
                        variant="outline"
                        style={{ backgroundColor: `${category.color}20`, color: category.color }}
                      >
                        {category.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={formData.tagInput}
                    onChange={(e) => handleInputChange('tagInput', e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    placeholder="Add tag..."
                    className="bg-background border-border"
                  />
                  <Button variant="outline" size="sm" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        #{tag}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-destructive"
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreate;