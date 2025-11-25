'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { BotMessageSquare, Loader2, Send, Sparkles, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { chat, type ChatMessage } from '@/ai/flows/chatbot-flow';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: 'Hello! How can I help you practice your English or Persian today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState<'English' | 'Persian'>('English');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat({
        history: messages,
        message: input,
        targetLanguage,
      });
      const newModelMessage: ChatMessage = { role: 'model', content: result.response };
      setMessages((prev) => [...prev, newModelMessage]);
    } catch (error) {
      console.error('Error with chatbot:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'The chatbot is currently unavailable. Please try again later.',
      });
      // Optional: remove the user message if the API call fails
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        title="Bilingual Chatbot"
        description="Practice conversation, roleplay scenarios, and ask questions."
        icon={BotMessageSquare}
      />
      <Tabs defaultValue="chat" className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="roleplay">Roleplay</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="flex-grow mt-4">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b space-y-2">
              <Label htmlFor="target-language">I want to practice...</Label>
              <Select
                value={targetLanguage}
                onValueChange={(value: 'English' | 'Persian') => setTargetLanguage(value)}
                disabled={isLoading}
              >
                <SelectTrigger id="target-language" className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Persian">Persian (فارسی)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardContent className="p-0 flex-grow">
              <ScrollArea className="h-[400px] w-full p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${
                        message.role === 'user' ? 'justify-end' : ''
                      }`}
                    >
                      {message.role === 'model' && (
                        <div className="bg-primary/10 p-2 rounded-full">
                           <BotMessageSquare className="w-6 h-6 text-primary shrink-0" />
                        </div>
                      )}
                      <div
                        className={`p-3 max-w-sm rounded-lg ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm" dir={message.role === 'model' && targetLanguage === 'Persian' ? 'rtl' : 'ltr'}>{message.content}</p>
                      </div>
                       {message.role === 'user' && (
                        <div className="bg-muted p-2 rounded-full">
                           <User className="w-6 h-6 text-muted-foreground shrink-0" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                     <div className="flex items-start gap-3">
                       <div className="bg-primary/10 p-2 rounded-full">
                         <BotMessageSquare className="w-6 h-6 text-primary shrink-0" />
                       </div>
                       <div className="p-3 rounded-lg bg-muted flex items-center">
                         <Loader2 className="w-5 h-5 animate-spin text-primary" />
                       </div>
                     </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="roleplay" className="flex-grow mt-4">
          <Card className="h-full flex flex-col justify-center items-center text-center p-8 border-2 border-dashed">
             <Sparkles className="w-12 h-12 text-muted-foreground mb-4"/>
            <h2 className="text-xl font-semibold">Roleplay Mode</h2>
            <p className="text-muted-foreground">This feature is under construction.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
