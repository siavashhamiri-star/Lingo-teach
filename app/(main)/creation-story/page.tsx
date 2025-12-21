
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { BookAudio, Loader2, Sparkles, MicVocal, Copy, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateCreationStoryAudiobook, type CreationStoryAudiobookOutput } from '@/ai/flows/app-creation-story-audiobook';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CreationStoryPage() {
  const [story, setStory] = useState<CreationStoryAudiobookOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateStory = async () => {
    setIsLoading(true);
    setStory(null);
    toast({
      title: 'Weaving the Grand Tale...',
      description: 'The AI is crafting the epic story of our universe in both English and Persian. This may take a moment.',
    });
    try {
      const result = await generateCreationStoryAudiobook();
      setStory(result);
      toast({
        title: 'The Story is Ready!',
        description: 'Listen to the legend of Afarinesh in English and Persian.',
      });
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        variant: 'destructive',
        title: 'Error Weaving the Tale',
        description: 'There was a problem creating the story. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = (text: string, language: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard!',
      description: `The ${language} story has been copied.`,
    });
  };

  return (
    <div>
      <PageHeader
        title="The Creation Story"
        description="Listen to the legend of our universe, our philosophy, and our grand vision."
        icon={BookAudio}
      />
      <div className="flex justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">The Audiobook of Afarinesh</CardTitle>
            <CardDescription>
              This is the story of how our world was born, from a single idea to a universe of possibilities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <h2 className="text-xl font-semibold">The AI is composing the epic...</h2>
                <p className="text-muted-foreground">Gathering philosophies and weaving bilingual narratives.</p>
              </div>
            )}

            {!isLoading && !story && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
                <BookAudio className="w-12 h-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold">The Tale Awaits</h2>
                <p className="text-muted-foreground mb-6">Press the button below to generate and hear the creation story of our world.</p>
                 <Button onClick={handleGenerateStory} size="lg">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate the Story
                </Button>
              </div>
            )}
            
            {story && (
                <Tabs defaultValue="english" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="english">English</TabsTrigger>
                    <TabsTrigger value="persian">فارسی (Persian)</TabsTrigger>
                    <TabsTrigger value="instrumental" className="flex items-center gap-2">
                        <MicVocal className="w-4 h-4"/> Your Voice
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="english">
                    <div className="space-y-4 pt-4">
                        <audio controls src={story.englishAudioDataUri} className="w-full" />
                        <ScrollArea className="h-80 p-4 border rounded-md bg-muted/50">
                            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{story.englishStory}</p>
                        </ScrollArea>
                         <Button variant="outline" onClick={() => copyToClipboard(story.englishStory, 'English')} className="w-full">
                            <Copy className="mr-2 h-4 w-4" /> Copy English Text
                        </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="persian">
                     <div className="space-y-4 pt-4 text-right" dir="rtl">
                        <audio controls src={story.persianAudioDataUri} className="w-full" />
                        <ScrollArea className="h-80 p-4 border rounded-md bg-muted/50">
                            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{story.persianStory}</p>
                        </ScrollArea>
                        <Button variant="outline" onClick={() => copyToClipboard(story.persianStory, 'Persian')} className="w-full">
                            <Copy className="ml-2 h-4 w-4" /> کپی متن فارسی
                        </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="instrumental">
                     <div className="space-y-4 pt-4">
                        <video src="/Afarinesh_Instrumental.mp4" className="w-full rounded-lg border bg-muted" controls loop>
                            Your browser does not support the video tag.
                        </video>
                         <a href="/Afarinesh_Instrumental.mp4" download="Afarinesh_Instrumental.mp4">
                            <Button variant="outline" className="w-full">
                                <Download className="mr-2 h-4 w-4" /> Download Instrumental Track
                            </Button>
                        </a>
                        <Tabs defaultValue="sub-english" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="sub-english">English Subtitles</TabsTrigger>
                                <TabsTrigger value="sub-persian">زیرنویس فارسی</TabsTrigger>
                            </TabsList>
                            <TabsContent value="sub-english">
                                <ScrollArea className="h-60 p-4 border rounded-md bg-muted/50">
                                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{story.englishStory}</p>
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="sub-persian">
                                <ScrollArea className="h-60 p-4 border rounded-md bg-muted/50 text-right" dir="rtl">
                                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{story.persianStory}</p>
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </div>
                  </TabsContent>
                </Tabs>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground mx-auto">This bilingual audiobook was generated by AI based on the core philosophy of the Afarinesh ecosystem.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
