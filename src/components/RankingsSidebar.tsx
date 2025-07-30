import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  TrendingUp, 
  Crown, 
  Star, 
  ArrowUp,
  Flame,
  Users,
  Award
} from "lucide-react";

const RankingsSidebar = () => {
  const topMvps = [
    { rank: 1, title: "AI Writing Assistant", score: 2847, change: "+12%" },
    { rank: 2, title: "Crypto Portfolio Tracker", score: 2156, change: "+8%" },
    { rank: 3, title: "Social Media Scheduler", score: 1923, change: "+15%" },
    { rank: 4, title: "Code Review Tool", score: 1687, change: "+5%" },
    { rank: 5, title: "Project Management Hub", score: 1432, change: "+22%" },
  ];

  const topContributors = [
    { rank: 1, name: "Sarah Chen", points: 15420, badge: "💎" },
    { rank: 2, name: "Alex Rodriguez", points: 12890, badge: "🏆" },
    { rank: 3, name: "Jordan Kim", points: 11240, badge: "⭐" },
    { rank: 4, name: "Taylor Swift", points: 9830, badge: "🚀" },
    { rank: 5, name: "Morgan Lee", points: 8920, badge: "✨" },
  ];

  return (
    <div className="space-y-6">
      {/* Top MVPs */}
      <Card className="p-6 bg-surface border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Top MVPs Today</h3>
        </div>
        
        <div className="space-y-3">
          {topMvps.map((mvp) => (
            <div key={mvp.rank} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  mvp.rank === 1 ? 'bg-gradient-brand text-primary-foreground' :
                  mvp.rank === 2 ? 'bg-surface-hover text-foreground' :
                  mvp.rank === 3 ? 'bg-warning/20 text-warning' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {mvp.rank === 1 ? <Crown className="h-4 w-4" /> : mvp.rank}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors cursor-pointer">
                    {mvp.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{mvp.score} points</p>
                </div>
              </div>
              <Badge 
                className={`${
                  mvp.change.startsWith('+') ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                }`}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                {mvp.change}
              </Badge>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4">
          View Full Rankings
        </Button>
      </Card>

      {/* Top Contributors */}
      <Card className="p-6 bg-surface border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Top Contributors</h3>
        </div>
        
        <div className="space-y-3">
          {topContributors.map((contributor) => (
            <div key={contributor.rank} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  contributor.rank === 1 ? 'bg-gradient-brand text-primary-foreground' :
                  'bg-surface-hover text-foreground'
                }`}>
                  {contributor.rank === 1 ? contributor.badge : contributor.rank}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors cursor-pointer">
                    {contributor.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{contributor.points.toLocaleString()} pts</p>
                </div>
              </div>
              <span className="text-lg">{contributor.badge}</span>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4">
          View All Contributors
        </Button>
      </Card>

      {/* Quick Stats */}
      <Card className="p-6 bg-surface border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Flame className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Community Stats</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1,247</div>
            <div className="text-xs text-muted-foreground">MVPs Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24.8k</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">847</div>
            <div className="text-xs text-muted-foreground">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">156</div>
            <div className="text-xs text-muted-foreground">New Founders</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RankingsSidebar;