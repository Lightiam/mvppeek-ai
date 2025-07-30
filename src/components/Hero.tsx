import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  TrendingUp, 
  Users, 
  Star, 
  ArrowRight,
  Zap,
  Target,
  Eye
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-surface to-background py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Announcement Badge */}
          <Badge className="mb-8 bg-surface border-primary/30 text-foreground animate-fade-in">
            <Star className="h-3 w-3 mr-2" />
            🚀 Now with inline previews and real-time rankings!
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Discover & Preview
            <span className="bg-gradient-brand bg-clip-text text-transparent block">
              Startup MVPs
            </span>
            Instantly
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            The only validated platform where you can preview, rank, and discover startup MVPs 
            without leaving the page. Join thousands of validated founders and early adopters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <Button variant="hero" size="xl" className="text-lg px-8">
              <Eye className="h-5 w-5 mr-2" />
              Start Exploring MVPs
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="xl" className="text-lg px-8">
              <Rocket className="h-5 w-5 mr-2" />
              Submit Your MVP
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="bg-gradient-brand p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Eye className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Inline Previews</h3>
              <p className="text-muted-foreground text-sm">
                Preview any MVP directly in-page with secure iframes. No popups, no redirects.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-brand p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Rankings</h3>
              <p className="text-muted-foreground text-sm">
                Dynamic scoring system based on upvotes, comments, views, and engagement.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-brand p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Social Discovery</h3>
              <p className="text-muted-foreground text-sm">
                Like, comment, repost, and upvote to help the best MVPs rise to the top.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 p-8 bg-surface rounded-2xl border border-border animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">24,891</div>
                <div className="text-sm text-muted-foreground">MVPs Discovered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">8,456</div>
                <div className="text-sm text-muted-foreground">Active Founders</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">156k</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">2.8M</div>
                <div className="text-sm text-muted-foreground">MVPs Previewed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;