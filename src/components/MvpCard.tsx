import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUp, 
  MessageCircle, 
  Share2, 
  Heart, 
  ExternalLink, 
  Eye,
  TrendingUp,
  Clock
} from "lucide-react";
import { useState } from "react";

interface MvpCardProps {
  mvp: {
    id: string;
    title: string;
    description: string;
    url: string;
    founder: string;
    founderAvatar: string;
    upvotes: number;
    comments: number;
    views: number;
    tags: string[];
    timeAgo: string;
    isLiked: boolean;
    isUpvoted: boolean;
    rank?: number;
    isRising?: boolean;
  };
  onPreview: (url: string) => void;
}

const MvpCard = ({ mvp, onPreview }: MvpCardProps) => {
  const [isLiked, setIsLiked] = useState(mvp.isLiked);
  const [isUpvoted, setIsUpvoted] = useState(mvp.isUpvoted);
  const [upvotes, setUpvotes] = useState(mvp.upvotes);

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted);
    setUpvotes(isUpvoted ? upvotes - 1 : upvotes + 1);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Card className="group relative overflow-hidden bg-surface border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated">
      {/* Rank Badge */}
      {mvp.rank && (
        <div className="absolute top-4 left-4 z-10">
          <Badge 
            variant="secondary" 
            className="bg-gradient-brand text-primary-foreground font-semibold"
          >
            #{mvp.rank}
          </Badge>
        </div>
      )}

      {/* Rising Badge */}
      {mvp.isRising && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-success text-success-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            Rising
          </Badge>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={mvp.founderAvatar}
              alt={mvp.founder}
              className="w-10 h-10 rounded-full border-2 border-border"
            />
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {mvp.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                by {mvp.founder} • {mvp.timeAgo}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleUpvote}
            className={`transition-all duration-300 ${
              isUpvoted 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'hover:border-primary/50'
            }`}
          >
            <div className="flex flex-col items-center">
              <ArrowUp className="h-4 w-4" />
              <span className="text-xs">{upvotes}</span>
            </div>
          </Button>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {mvp.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mvp.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-surface hover:bg-surface-hover"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{mvp.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{mvp.comments}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{mvp.timeAgo}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="hero"
              size="sm"
              onClick={() => onPreview(mvp.url)}
              className="transform hover:scale-105"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(mvp.url, '_self')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="social"
              size="sm"
              onClick={handleLike}
              className={isLiked ? 'text-red-500 border-red-500/30' : ''}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="social" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="social" size="sm">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MvpCard;