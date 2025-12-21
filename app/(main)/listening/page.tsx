'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Ear, Loader2, Wand2, FileText, Newspaper, Presentation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { selectWeeklyArticle, type SelectWeeklyArticleOutput } from '@/ai/flows/weekly-listening-comprehension-article-selection';
import { Badge } from '@/components/ui/badge';

export default function ListeningPage() {
  const [languageLevel, setLanguageLevel] = useState(80);
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'fa'>('en');
  const [article, setArticle] = useState<SelectWeeklyArticleOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateArticle = async () => {
    setIsLoading(true);
    setArticle(null);
    try {
      const result = await selectWeeklyArticle({
        languageLevel: languageLevel,
        targetLanguage: targetLanguage,
      });
      setArticle(result);
    } catch (error) {
      console.error('Error generating article:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Content',
        description: 'There was a problem creating your listening exercise. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getArticleIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-5 h-5 text-primary"/>;
      case 'speech': return <Presentation className="w-5 h-5 text-primary"/>;
      case 'news': return <Newspaper className="w-5 h-5 text-primary"/>;
      default: return <FileText className="w-5 h-5 text-primary"/>;
    }
  }


  return (
    <div>
      <PageHeader
        title="Weekly Listening"
        description="Improve your comprehension by listening to AI-selected articles and news."
        icon={Ear}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Generator</CardTitle>
              <CardDescription>Generate a new listening exercise based on your level.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="language-level">Your Language Level: {languageLevel}</Label>
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
                <Label htmlFor="target-language">I want to listen in...</Label>
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
              <Button onClick={handleGenerateArticle} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Content
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">Finding Relevant Content...</h2>
              <p className="text-muted-foreground">The AI is selecting an interesting piece for you to listen to.</p>
            </div>
          )}

          {!isLoading && !article && (
             <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Ear className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Ready to Listen?</h2>
              <p className="text-muted-foreground">Generate a new listening exercise to start.</p>
            </div>
          )}

          {article && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>{article.articleTitle}</CardTitle>
                    <CardDescription>Source: {article.articleSource}</CardDescription>
                  </div>
                   <Badge variant="outline" className="capitalize flex gap-2 items-center">
                     {getArticleIcon(article.articleType)}
                     {article.articleType}
                   </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap" dir={targetLanguage === 'fa' ? 'rtl' : 'ltr'}>
                      {article.articleContent}
                    </p>
                </div>
              </CardContent>
              <CardFooter className='flex-col gap-4'>
                 {/* This is a placeholder for audio player and comprehension questions */}
                <div className="w-full text-center p-4 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground text-sm">Audio player & comprehension test coming soon!</p>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
