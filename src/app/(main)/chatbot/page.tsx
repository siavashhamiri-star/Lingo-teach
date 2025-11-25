import { PageHeader } from '@/components/shared/page-header';
import { BotMessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
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
            <CardContent className="p-4 flex-grow overflow-y-auto">
              {/* Chat messages would go here */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BotMessageSquare className="w-8 h-8 text-primary shrink-0"/>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm">Hello! How can I help you learn today?</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3 justify-end">
                  <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                    <p className="text-sm">Hi! Can you teach me how to order coffee in Persian?</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="p-4 border-t flex items-center gap-2">
              <Input placeholder="Type your message..." className="flex-grow" />
              <Button size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="roleplay" className="flex-grow mt-4">
          <Card className="h-full flex flex-col justify-center items-center text-center p-8 border-2 border-dashed">
            <h2 className="text-xl font-semibold">Roleplay Mode</h2>
            <p className="text-muted-foreground">This feature is under construction.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
