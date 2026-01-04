

'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { BotMessageSquare, Loader2, Send, Sparkles, User, Drama, Crown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { chat, type ChatMessage } from '@/ai/flows/chatbot-flow';
import { generateRoleplayScene, type RoleplaySceneOutput } from '@/ai/flows/role-playing-flow';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// --- Pricing Model Simulation ---
const IS_PREMIUM_USER = false;
const FREE_CHAT_MESSAGE_LIMIT = 6; // Includes the initial message from the bot
// -----------------------------

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: 'Hello! How can I help you practice your English or Persian today?' },
  ]);
  const [input, setInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState<'English' | 'Persian'>('English');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Roleplay state
  const [scenario, setScenario] = useState('Ordering a coffee');
  const [isRoleplayLoading, setIsRoleplayLoading] = useState(false);
  const [roleplayScene, setRoleplayScene] = useState<RoleplaySceneOutput | null>(null);

  const { toast } = useToast();

  const isChatLimitReached = !IS_PREMIUM_USER && messages.length >= FREE_CHAT_MESSAGE_LIMIT;

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
    if (!input.trim() || isChatLoading || isChatLimitReached) return;

    const newUserMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsChatLoading(true);

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
      setIsChatLoading(false);
    }
  };

  const handleGenerateRoleplay = async () => {
    setIsRoleplayLoading(true);
    setRoleplayScene(null);
    try {
      const result = await generateRoleplayScene({
        scenario,
        targetLanguage,
      });
      setRoleplayScene(result);
    } catch (error) {
      console.error('Error generating roleplay scene:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Scene',
        description: 'There was a problem creating your role-play scenario. The AI might be busy.',
      });
    } finally {
      setIsRoleplayLoading(false);
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
          <TabsTrigger value="roleplay">Role-Play <Sparkles className="w-4 h-4 ml-2 text-yellow-500" /></TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-grow mt-4">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b space-y-2">
              <Label htmlFor="target-language-chat">I want to practice...</Label>
              <Select
                value={targetLanguage}
                onValueChange={(value: 'English' | 'Persian') => setTargetLanguage(value)}
                disabled={isChatLoading}
              >
                <SelectTrigger id="target-language-chat" className="w-[180px]">
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
                  {isChatLoading && (
                     <div className="flex items-start gap-3">
                       <div className="bg-primary/10 p-2 rounded-full">
                         <BotMessageSquare className="w-6 h-6 text-primary shrink-0" />
                       </div>
                       <div className="p-3 rounded-lg bg-muted flex items-center">
                         <Loader2 className="w-5 h-5 animate-spin text-primary" />
                       </div>
                     </div>
                  )}
                  {isChatLimitReached && (
                     <Alert className="mt-4 border-accent text-accent-foreground bg-accent/10">
                        <Crown className="h-4 w-4 text-accent" />
                        <AlertTitle>Free Chat Limit Reached</AlertTitle>
                        <AlertDescription>
                            You've reached the message limit for the free plan. 
                            <Button variant="link" className="p-0 h-auto ml-1 text-accent-foreground font-bold">Upgrade for unlimited conversations.</Button>
                        </AlertDescription>
                    </Alert>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isChatLimitReached ? 'Upgrade to send more messages' : 'Type your message...'}
                className="flex-grow"
                disabled={isChatLoading || isChatLimitReached}
              />
              <Button type="submit" size="icon" disabled={isChatLoading || !input.trim() || isChatLimitReached}>
                {isChatLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </Card>
        </TabsContent>
        
        {/* Roleplay Tab */}
        <TabsContent value="roleplay" className="flex-grow mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Role-Play Scene</CardTitle>
                  <CardDescription>Select a scenario to practice a real-life conversation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="target-language-roleplay">Practice Language</Label>
                    <Select
                      value={targetLanguage}
                      onValueChange={(value: 'English' | 'Persian') => setTargetLanguage(value)}
                      disabled={isRoleplayLoading}
                    >
                      <SelectTrigger id="target-language-roleplay">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Persian">Persian (فارسی)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="scenario">Choose a Scenario</Label>
                    <Select
                      value={scenario}
                      onValueChange={(value) => setScenario(value)}
                      disabled={isRoleplayLoading}
                    >
                      <SelectTrigger id="scenario">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ordering a coffee">Ordering a coffee</SelectItem>
                        <SelectItem value="Asking for directions">Asking for directions</SelectItem>
                        <SelectItem value="Job interview introduction">Job interview introduction</SelectItem>
                        <SelectItem value="Buying a train ticket">Buying a train ticket</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleGenerateRoleplay} disabled={isRoleplayLoading} className="w-full">
                    {isRoleplayLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Drama className="mr-2 h-4 w-4" />}
                    Generate Scene
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="lg:col-span-2">
               {isRoleplayLoading && (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                  <h2 className="text-xl font-semibold">The AI is setting the stage...</h2>
                  <p className="text-muted-foreground">Generating script and unique voices. This is an advanced feature and may take a moment.</p>
                </div>
              )}

              {!isRoleplayLoading && !roleplayScene && (
                 <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
                  <Drama className="w-12 h-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold">Your Stage Awaits</h2>
                  <p className="text-muted-foreground">Choose a scenario and click "Generate Scene" to start your audio role-play experience!</p>
                </div>
              )}

              {roleplayScene && (
                <Card className="h-full overflow-hidden">
                  <CardHeader>
                    <CardTitle>Scenario: {scenario}</CardTitle>
                    <CardDescription>Listen to the multi-voice conversation below.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <audio controls src={roleplayScene.audioDataUri} className="w-full" />
                    <ScrollArea className="h-[280px] p-4 border rounded-md bg-muted/50">
                        <div className="space-y-4">
                            {roleplayScene.script.map((line, index) => (
                                <div key={index} className="flex gap-3">
                                    <p>
                                        <span className="font-bold">{line.speaker}:</span>
                                        <span className="text-muted-foreground" dir={targetLanguage === 'Persian' ? 'rtl' : 'ltr'}> {line.line}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
