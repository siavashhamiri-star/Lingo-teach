'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { BookText, Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateBilingualShortStory, type BilingualShortStoryOutput } from '@/ai/flows/bilingual-short-story-generation';
import { Separator } from '@/components/ui/separator';

export default function StoriesPage() {
  const [languageLevel, setLanguageLevel] = useState(80);
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'fa'>('en');
  const [story, setStory] = useState<BilingualShortStoryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateStory = async () => {
    setIsLoading(true);
    setStory(null);
    try {
      const result = await generateBilingualShortStory({
        userLanguageLevel: languageLevel,
        userTargetLanguage: targetLanguage,
      });
      setStory(result);
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Story',
        description: 'There was a problem creating your story. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Bilingual Short Stories"
        description="Enjoy a new story each week, read aloud in both English and Persian."
        icon={BookText}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Story</CardTitle>
              <CardDescription>Adjust the settings and generate a new bilingual story.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="language-level">Language Level: {languageLevel}</Label>
                <Slider
                  id="language-level"
                  min={1}
                  max={160}
                  step={1}
                  value={[languageLevel]}
                  onValueChange={(value) => setLanguageLevel(value[0])}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-language">I want to learn...</Label>
                <Select
                  value={targetLanguage}
                  onValueChange={(value: 'en' | 'fa') => setTargetLanguage(value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="target-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fa">Persian (فارسی)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateStory} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Story
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">Generating Your Story...</h2>
              <p className="text-muted-foreground">The AI is weaving a tale for you. This might take a moment.</p>
            </div>
          )}

          {!isLoading && !story && (
             <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <BookText className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Your Story Awaits</h2>
              <p className="text-muted-foreground">Select your language level and generate a new story to begin.</p>
            </div>
          )}

          {story && (
            <Card>
              <CardHeader>
                <CardTitle>Your Bilingual Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">English</h3>
                  <audio controls src={story.englishAudio} className="w-full mb-4" />
                  <p className="text-muted-foreground leading-relaxed">{story.englishStory}</p>
                </div>
                <Separator />
                <div>
                   <h3 className="font-bold text-lg mb-2 text-right">فارسی</h3>
                  <audio controls src={story.persianAudio} className="w-full mb-4" />
                  <p className="text-muted-foreground leading-relaxed text-right" dir="rtl">{story.persianStory}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
