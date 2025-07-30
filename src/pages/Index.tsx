import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import MvpCard from "@/components/MvpCard";
import InlinePreview from "@/components/InlinePreview";
import RankingsSidebar from "@/components/RankingsSidebar";

const Index = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // Mock MVP data
  const mvps = [
    {
      id: "1",
      title: "AI Content Generator Pro",
      description: "Generate high-quality blog posts, social media content, and marketing copy using advanced AI. Perfect for content creators and marketers.",
      url: "https://openai.com",
      founder: "Sarah Chen",
      founderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612e6c6?w=40&h=40&fit=crop&crop=face",
      upvotes: 247,
      comments: 34,
      views: 1289,
      tags: ["AI", "Content", "Marketing", "SaaS"],
      timeAgo: "2h ago",
      isLiked: false,
      isUpvoted: true,
      rank: 1,
      isRising: true
    },
    {
      id: "2", 
      title: "CryptoFlow - Portfolio Tracker",
      description: "Real-time cryptocurrency portfolio tracking with advanced analytics, profit/loss calculations, and tax reporting features.",
      url: "https://coinbase.com",
      founder: "Alex Rodriguez",
      founderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      upvotes: 189,
      comments: 28,
      views: 967,
      tags: ["Crypto", "FinTech", "Portfolio", "Analytics"],
      timeAgo: "4h ago",
      isLiked: true,
      isUpvoted: false,
      rank: 2
    },
    {
      id: "3",
      title: "Social Scheduler Pro",
      description: "Schedule and manage your social media posts across all platforms with AI-powered content suggestions and analytics.",
      url: "https://buffer.com",
      founder: "Jordan Kim",
      founderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      upvotes: 156,
      comments: 19,
      views: 743,
      tags: ["Social Media", "Marketing", "Automation", "SaaS"],
      timeAgo: "6h ago",
      isLiked: false,
      isUpvoted: false,
      rank: 3,
      isRising: true
    },
    {
      id: "4",
      title: "DevReview - Code Review Tool",
      description: "AI-powered code review tool that helps teams catch bugs, improve code quality, and maintain coding standards.",
      url: "https://github.com",
      founder: "Taylor Swift",
      founderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      upvotes: 134,
      comments: 42,
      views: 612,
      tags: ["DevTools", "AI", "Code Review", "Development"],
      timeAgo: "8h ago",
      isLiked: true,
      isUpvoted: true,
      rank: 4
    }
  ];

  const handlePreview = (url: string, title?: string) => {
    setPreviewUrl(url);
    setPreviewTitle(title || "MVP Preview");
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewTitle("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Only show when no preview is active */}
      {!previewUrl && <Hero />}
      
      <FilterBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Inline Preview */}
            {previewUrl && (
              <InlinePreview
                url={previewUrl}
                title={previewTitle}
                onClose={closePreview}
                onPreview={(url) => handlePreview(url, "External Site")}
              />
            )}
            
            {/* MVP Cards */}
            <div className="space-y-6">
              {mvps.map((mvp) => (
                <MvpCard
                  key={mvp.id}
                  mvp={mvp}
                  onPreview={(url) => handlePreview(url, mvp.title)}
                />
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center py-8">
              <button className="inline-flex items-center px-6 py-3 bg-gradient-brand text-primary-foreground rounded-lg font-medium hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                Load More MVPs
              </button>
            </div>
          </div>

          {/* Rankings Sidebar */}
          <div className="lg:col-span-1">
            <RankingsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
