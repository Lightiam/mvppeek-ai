import { Button } from "@/components/ui/button";
import { Search, Bell, User, TrendingUp, Trophy, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-brand p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              MvpPeek AI
            </h1>
            <p className="text-xs text-muted-foreground">Startup Discovery Platform</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search MVPs, founders, or technologies..."
              className="pl-10 bg-surface border-border focus:border-primary/50"
            />
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="text-sm">
              <Trophy className="h-4 w-4 mr-2" />
              Rankings
            </Button>
            <Button variant="ghost" size="sm" className="text-sm">
              <Star className="h-4 w-4 mr-2" />
              Featured
            </Button>
          </nav>

          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="hero" size="sm">
            Submit MVP
          </Button>

          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;