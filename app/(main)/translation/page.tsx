'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Languages, Loader2, RefreshCw, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateWeeklyTranslationExercise, type WeeklyTranslationExerciseOutput } from '@/ai/flows/weekly-translation-exercise-generation';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export default function TranslationPage() {
  const [languageLevel, setLanguageLevel] = useState(80);
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'fa'>('en');
  const [exercise, setExercise] = useState<WeeklyTranslationExerciseOutput | null>(null);
  const [userTranslation, setUserTranslation] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateExercise = async () => {
    setIsLoading(true);
    setExercise(null);
    setUserTranslation('');
    setShowAnswer(false);
    try {
      const result = await generateWeeklyTranslationExercise({
        languageLevel: languageLevel,
        targetLanguage: targetLanguage,
      });
      setExercise(result);
    } catch (error) {
      console.error('Error generating exercise:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Exercise',
        description: 'There was a problem creating your exercise. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sourceText = targetLanguage === 'en' ? exercise?.persianText : exercise?.englishText;
  const sourceLangDir = targetLanguage === 'en' ? 'rtl' : 'ltr';
  const sourceLangName = targetLanguage === 'en' ? 'Persian' : 'English';
  
  const correctTranslation = targetLanguage === 'en' ? exercise?.englishText : exercise?.persianText;
  const targetLangDir = targetLanguage === 'en' ? 'ltr' : 'rtl';


  return (
    <div>
      <PageHeader
        title="Weekly Translation"
        description="Translate a text based on your language level and get instant feedback."
        icon={Languages}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Translation Settings</CardTitle>
              <CardDescription>Adjust the settings to generate a new exercise.</CardDescription>
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
                <Label htmlFor="target-language">I want to translate to...</Label>
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
              <Button onClick={handleGenerateExercise} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                New Exercise
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">Generating Your Exercise...</h2>
              <p className="text-muted-foreground">The AI is preparing a challenge for you. This might take a moment.</p>
            </div>
          )}

          {!isLoading && !exercise && (
             <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Languages className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Ready for a Challenge?</h2>
              <p className="text-muted-foreground">Adjust your settings and generate a new exercise to begin.</p>
            </div>
          )}

          {exercise && (
            <Card>
              <CardHeader>
                <CardTitle>Translate This Text</CardTitle>
                <CardDescription>Read the text below and type your translation in the box.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className={cn("font-bold text-lg mb-2", sourceLangDir === 'rtl' && 'text-right')}>
                    Source Text ({sourceLangName})
                  </h3>
                  <p className="text-muted-foreground leading-relaxed rounded-md bg-muted p-4" dir={sourceLangDir}>
                    {sourceText}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                   <Label htmlFor="user-translation" className={cn(targetLangDir === 'rtl' && 'text-right w-full block')}>
                     Your Translation
                   </Label>
                  <Textarea
                    id="user-translation"
                    placeholder="Type your translation here..."
                    value={userTranslation}
                    onChange={(e) => setUserTranslation(e.target.value)}
                    dir={targetLangDir}
                    rows={5}
                    className="text-base"
                  />
                </div>
                {showAnswer && (
                  <Alert variant="default" className="bg-primary/10 border-primary/20">
                    <RefreshCw className="h-4 w-4 !text-primary" />
                    <AlertTitle className={cn("font-bold", targetLangDir === 'rtl' && 'text-right')}>
                      Correct Translation
                    </AlertTitle>
                    <AlertDescription className="text-primary" dir={targetLangDir}>
                      {correctTranslation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                 <Button onClick={() => setShowAnswer(true)} disabled={!userTranslation} className="w-full">
                    Check Answer
                 </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
