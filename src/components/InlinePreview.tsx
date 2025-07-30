import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

interface InlinePreviewProps {
  url: string;
  title: string;
  onClose: () => void;
}

const InlinePreview = ({ url, title, onClose }: InlinePreviewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const createSecureIframe = () => {
    return (
      <iframe
        src={url}
        title={`Preview of ${title}`}
        className={`w-full border-none rounded-lg transition-all duration-300 ${
          isFullscreen ? 'h-screen' : 'h-96'
        }`}
        sandbox="allow-scripts allow-same-origin allow-forms allow-navigation"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  };

  return (
    <Card 
      className={`relative overflow-hidden bg-surface border-border animate-fade-in ${
        isFullscreen ? 'fixed inset-4 z-50' : 'mb-6'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-sm text-muted-foreground ml-4 font-mono">
            {url}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(url, '_self')}
            className="h-8 w-8"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="relative">
        {createSecureIframe()}
        
        {/* Loading Overlay */}
        <div className="absolute inset-0 bg-surface flex items-center justify-center animate-pulse">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading preview...</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-background/50 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Secure preview of {title}
            </span>
          </div>
          <Button
            variant="hero"
            size="sm"
            onClick={() => window.open(url, '_self')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Full Site
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InlinePreview;