// ChatMessage.tsx - Minimal Design
import { User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn(
      "flex gap-3",
      isUser ? "flex-row-reverse" : ""
    )}>
      <div className={cn(
        "flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-secondary-foreground"
      )}>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      
      <div className={cn(
        "flex-1 max-w-[85%] space-y-1",
        isUser ? "items-end" : ""
      )}>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {isUser ? 'Vous' : 'Assistant'}
          </span>
          <span className="text-xs text-muted-foreground/70">
            {formatTime(timestamp)}
          </span>
        </div>
        
        <div className={cn(
          "group relative rounded-lg px-4 py-3",
          isUser
            ? "bg-primary/5 border border-primary/10"
            : "bg-secondary/50 border border-border/50"
        )}>
          <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {content}
          </div>
          
          {/* Action Buttons */}
          <div className={cn(
            "absolute top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
            isUser ? "left-2" : "right-2"
          )}>
            <button
              onClick={handleCopy}
              className="h-7 w-7 rounded-md bg-background/80 hover:bg-background border border-border flex items-center justify-center transition-colors"
              title={copied ? 'Copié' : 'Copier'}
            >
              <Copy className={cn(
                "h-3 w-3",
                copied ? "text-green-600" : "text-muted-foreground"
              )} />
            </button>
            
            {!isUser && (
              <>
                <button
                  onClick={() => setFeedback(feedback === 'like' ? null : 'like')}
                  className="h-7 w-7 rounded-md bg-background/80 hover:bg-background border border-border flex items-center justify-center transition-colors"
                  title="J'aime"
                >
                  <ThumbsUp className={cn(
                    "h-3 w-3",
                    feedback === 'like' ? "text-green-600" : "text-muted-foreground"
                  )} />
                </button>
                
                <button
                  onClick={() => setFeedback(feedback === 'dislike' ? null : 'dislike')}
                  className="h-7 w-7 rounded-md bg-background/80 hover:bg-background border border-border flex items-center justify-center transition-colors"
                  title="Je n'aime pas"
                >
                  <ThumbsDown className={cn(
                    "h-3 w-3",
                    feedback === 'dislike' ? "text-red-600" : "text-muted-foreground"
                  )} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}