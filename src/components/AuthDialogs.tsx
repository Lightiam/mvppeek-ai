import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, LinkIcon, Tag, User, Mail, Lock } from "lucide-react";
import { useState } from "react";

const SubmitMvpDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit MVP form submitted");
    alert("MVP submission requires backend setup. Please connect Supabase to enable this feature.");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Submit MVP
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-surface border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Submit Your MVP
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* MVP Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                MVP Title *
              </label>
              <Input
                placeholder="Enter your MVP title..."
                className="bg-background border-border"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Description *
              </label>
              <Textarea
                placeholder="Describe what your MVP does and what problem it solves..."
                className="bg-background border-border min-h-[100px]"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                <LinkIcon className="h-4 w-4 inline mr-2" />
                MVP URL *
              </label>
              <Input
                type="url"
                placeholder="https://your-mvp.com"
                className="bg-background border-border"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                <Tag className="h-4 w-4 inline mr-2" />
                Tags (comma separated)
              </label>
              <Input
                placeholder="AI, SaaS, Productivity, etc."
                className="bg-background border-border"
              />
            </div>
          </div>

          {/* Founder Info */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              <User className="h-5 w-5 inline mr-2" />
              Founder Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Your Name *
                </label>
                <Input
                  placeholder="John Doe"
                  className="bg-background border-border"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-background border-border"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submission Guidelines */}
          <div className="bg-background p-4 rounded-lg border border-border">
            <h4 className="font-medium text-foreground mb-2">Submission Guidelines:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your MVP should be functional and accessible via the provided URL</li>
              <li>• Provide a clear description of what your product does</li>
              <li>• Use relevant tags to help users discover your MVP</li>
              <li>• Make sure your MVP is ready for public feedback</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="hero">
              Submit MVP for Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AuthDialog = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Auth form submitted");
    alert("Authentication requires backend setup. Please connect Supabase to enable login/signup.");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-surface border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {isLogin ? "Welcome Back" : "Join MvpPeek AI"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Full Name
              </label>
              <Input
                placeholder="Enter your name"
                className="bg-background border-border"
                required
              />
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              <Mail className="h-4 w-4 inline mr-2" />
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-background border-border"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              <Lock className="h-4 w-4 inline mr-2" />
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="bg-background border-border"
              required
            />
          </div>

          <Button type="submit" variant="hero" className="w-full">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { SubmitMvpDialog, AuthDialog };