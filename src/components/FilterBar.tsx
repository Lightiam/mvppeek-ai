import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Star, 
  Clock, 
  MessageCircle, 
  Filter,
  SortAsc
} from "lucide-react";

const FilterBar = () => {
  const categories = [
    "All Categories",
    "AI/ML",
    "SaaS",
    "E-commerce",
    "FinTech",
    "HealthTech",
    "EdTech",
    "Social",
    "DevTools",
    "Productivity"
  ];

  return (
    <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-border py-4">
      <div className="container mx-auto px-4">
        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Sort Options */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground mr-2">Sort by:</span>
            <Button variant="hero" size="sm" className="text-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <Star className="h-4 w-4 mr-2" />
              Top Rated
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <Clock className="h-4 w-4 mr-2" />
              Latest
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Most Discussed
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <Select defaultValue="All Categories">
              <SelectTrigger className="w-48 bg-surface border-border">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="today">
              <SelectTrigger className="w-32 bg-surface border-border">
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Trending
            <button className="ml-2 hover:text-primary/70">×</button>
          </Badge>
          <Badge variant="secondary" className="bg-surface hover:bg-surface-hover">
            AI/ML
            <button className="ml-2 hover:text-muted-foreground/70">×</button>
          </Badge>
          <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
            Clear all
          </Button>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">247 MVPs</span> matching your filters
          </p>
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sorted by engagement score</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;