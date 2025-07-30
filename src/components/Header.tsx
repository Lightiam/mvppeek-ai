import { Button } from "@/components/ui/button";
import { Search, Bell, User, TrendingUp, Trophy, Star, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SubmitMvpDialog, AuthDialog } from "@/components/AuthDialogs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-brand p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              MvpPeek AI
            </h1>
            <p className="text-xs text-muted-foreground">Startup Discovery Platform</p>
          </div>
        </Link>

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
            <Link to="/blog">
              <Button variant="ghost" size="sm" className="text-sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Blog
              </Button>
            </Link>
          </nav>

          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              console.log("Bell button clicked!");
              alert("Bell button works!");
            }}
          >
            <Bell className="h-4 w-4" />
          </Button>

          <SubmitMvpDialog />

          <AuthDialog />
        </div>
      </div>
    </header>
  );
};

export default Header;