
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Loader2, Sparkles, Trophy, Wand2, Star, Brain, Languages } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateDailyChallenge, type DailyChallengeOutput } from '@/ai/flows/daily-language-challenge-generation';
import { generateGeneralKnowledgeChallenge } from '@/ai/flows/general-knowledge-challenge-generation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ChallengeType = 'language' | 'general';
type ChallengeOutput = { question: string; answer: string; };

export default function ChallengesPage() {
  const [challengeType, setChallengeType] = useState<ChallengeType>('language');
  const [languageLevel, setLanguageLevel] = useState(80);
  const [difficulty, setDifficulty] = useState(5);
  const [targetLanguage, setTargetLanguage] = useState<'English' | 'Persian'>('English');
  const [challenge, setChallenge] = useState<ChallengeOutput | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateChallenge = async () => {
    setIsLoading(true);
    setChallenge(null);
    setShowAnswer(false);
    try {
      let result: ChallengeOutput;
      if (challengeType === 'language') {
        result = await generateDailyChallenge({
          languageLevel,
          targetLanguage,
        });
      } else {
        result = await generateGeneralKnowledgeChallenge({
          difficulty,
        });
      }
      setChallenge(result);
       toast({
        title: "Today's Challenge is Here!",
        description: 'Solve it to win your daily stars.',
      });
    } catch (error) {
      console.error('Error generating challenge:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Challenge',
        description: 'There was a problem creating your daily challenge. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Daily Challenge Event"
        description="Compete in daily events to test your skills and win stars."
        icon={Trophy}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Settings</CardTitle>
              <CardDescription>Generate a new challenge for today's event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <Alert>
                <Star className="h-4 w-4" />
                <AlertTitle>Win XP!</AlertTitle>
                <AlertDescription>
                  Successfully completing the daily challenge earns you XP and helps you climb the leaderboard.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="challenge-type">Challenge Type</Label>
                <Select
                  value={challengeType}
                  onValueChange={(value: ChallengeType) => setChallengeType(value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="challenge-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="language"><div className="flex items-center gap-2"><Languages /> Language</div></SelectItem>
                    <SelectItem value="general"><div className="flex items-center gap-2"><Brain /> General Knowledge</div></SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {challengeType === 'language' ? (
                <>
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
                    <Label htmlFor="target-language">Challenge Language</Label>
                    <Select
                      value={targetLanguage}
                      onValueChange={(value: 'English' | 'Persian') => setTargetLanguage(value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger id="target-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Persian">Persian (فارسی)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                 <div className="space-y-3">
                    <Label htmlFor="difficulty-level">Difficulty Level: {difficulty}</Label>
                    <Slider
                      id="difficulty-level"
                      min={1}
                      max={10}
                      step={1}
                      value={[difficulty]}
                      onValueChange={(value) => setDifficulty(value[0])}
                      disabled={isLoading}
                    />
                  </div>
              )}

            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateChallenge} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get Today's Challenge
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">Generating Your Challenge...</h2>
              <p className="text-muted-foreground">The AI is crafting a unique question just for you.</p>
            </div>
          )}

          {!isLoading && !challenge && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed rounded-lg p-8 text-center bg-muted/20">
              <Trophy className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold">The Arena Awaits</h2>
              <p className="text-muted-foreground max-w-sm mx-auto mt-2">Click "Get Today's Challenge" to enter the daily event and prove your skills.</p>
            </div>
          )}

          {challenge && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Here is your challenge:</CardTitle>
                <CardDescription>Solve this to claim your reward!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-foreground p-6 bg-muted rounded-md text-center font-medium">
                  {challenge.question}
                </p>
                {showAnswer && (
                  <Alert variant="default" className="border-accent bg-accent/10">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <AlertTitle className="font-bold text-accent-foreground">Correct Answer</AlertTitle>
                    <AlertDescription className="text-accent-foreground">
                      {challenge.answer}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={() => setShowAnswer(true)} disabled={showAnswer} className="w-full">
                  Reveal Answer
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
