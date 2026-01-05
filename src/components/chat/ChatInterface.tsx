// ChatInterface.tsx - Minimal Design
import { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Loader2, X, ChevronRight, Moon, Sun, Settings, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { TheoLogicalExplorer } from './TheoLogicalExplorer';
import { SavedPassages } from './SavedPassages';
import { QuickActions } from './QuickActions';
import { chatService } from '../../services/chatService';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Header from '../HeaderTeaching';

interface ChatInterfaceProps {
  mode: string;
  onBack: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const MODE_TITLES: Record<string, string> = {
  teaching_fr: 'Enseignement Biblique',
  teaching_mg: 'Fampianarana Baiboly',
  counseling_fr: 'Counseling Biblique',
  counseling_mg: 'Counseling Baiboly',
};

export function ChatInterface({ mode, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showExplorer, setShowExplorer] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    initializeConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeConversation = async () => {
    try {
      const conversation = await chatService.createConversation(mode);
      setConversationId(conversation.id);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading || !conversationId) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    try {
      await chatService.saveMessage(conversationId, 'user', userMessage);

      const assistantResponse = await chatService.sendMessage(
        messages.map(m => ({ role: m.role, content: m.content })),
        mode
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      await chatService.saveMessage(conversationId, 'assistant', assistantResponse);

      if (messages.length === 0) {
        const title = userMessage.slice(0, 50) + (userMessage.length > 50 ? '...' : '');
        await chatService.updateConversationTitle(conversationId, title);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (window.confirm(mode.includes('fr') ? 'Vider la conversation ?' : 'Hanala ny resaka ve ianao?')) {
      setMessages([]);
      initializeConversation();
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-1 h-6 rounded-full",
                mode.includes('teaching') ? "bg-primary" : "bg-emerald-500"
              )} />
              <div>
                <h1 className="font-semibold text-sm text-foreground">
                  {MODE_TITLES[mode]}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Assistant Théologique
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="h-8 w-8"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute top-full right-4 mt-1 rounded-lg border bg-popover shadow-lg p-3 w-48 z-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Paramètres</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
                className="h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={clearChat}
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 text-sm"
            >
              Vider la conversation
            </Button>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          {/* Quick Actions & Explorer Section */}
          <div className="mb-6 space-y-4">
            {messages.length === 0 && mode.includes('teaching') && (
              <QuickActions 
                mode={mode} 
                onAction={(action) => {
                  setInput(action);
                  inputRef.current?.focus();
                }} 
              />
            )}

            {mode.includes('teaching') && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowExplorer(!showExplorer)}
                  className="gap-2"
                >
                  {showExplorer ? 'Masquer' : 'Montrer'} les thèmes théologiques
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    showExplorer && "rotate-90"
                  )} />
                </Button>
              </div>
            )}

            {showExplorer && (
              <TheoLogicalExplorer
                onSelectTopic={(topic) => {
                  setInput(`Explique le thème réformé: ${topic}`);
                  setShowExplorer(false);
                  inputRef.current?.focus();
                }}
              />
            )}
          </div>

          {/* Messages Container */}
          <div className="space-y-4 mb-6">
            {messages.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex p-3 rounded-lg bg-primary/10">
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center",
                    mode.includes('teaching') ? "bg-primary text-primary-foreground" : "bg-emerald-500 text-white"
                  )}>
                    {mode.includes('teaching') ? '📖' : '💭'}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  {mode.includes('teaching')
                    ? mode.includes('fr')
                      ? 'Explorez les Écritures'
                      : 'Hadinona ny Soratra Masina'
                    : mode.includes('fr')
                    ? 'Conseil Biblique Personnalisé'
                    : 'Torolalana Baiboly manokana'}
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  {mode.includes('fr')
                    ? 'Posez vos questions sur l\'Écriture. Toutes les réponses sont fondées sur la Bible et la théologie réformée.'
                    : 'Apetraho ny fanontanianao momba ny Soratra Masina. Ny valiny rehetra dia mifototra amin\'ny Baiboly sy ny teolojia reformé.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    role={message.role} 
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                ))}
                {loading && (
                  <div className="flex items-center gap-3 p-4">
                    <div className="relative">
                      <div className="h-6 w-6 rounded-full border-2 border-border" />
                      <div className="absolute inset-0 border-2 border-t-transparent border-primary rounded-full animate-spin" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Réflexion en cours...
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  mode.includes('fr')
                    ? 'Écrivez votre message... (Shift+Enter pour une nouvelle ligne)'
                    : 'Soraty eto ny hafatrao... (Shift+Enter hanova andalana)'
                }
                className="w-full min-h-[60px] max-h-32 resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                rows={2}
                disabled={loading}
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {input.length}/2000
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="h-11 px-4"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}