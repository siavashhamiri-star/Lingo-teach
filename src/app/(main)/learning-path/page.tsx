'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { BrainCircuit, Loader2, Sparkles, Wand2, BookOpen, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generatePersonalizedLesson, type PersonalizedLessonOutput } from '@/ai/flows/personalized-lesson-generation';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LearningPathPage() {
  const [lessonRequirements, setLessonRequirements] = useState('');
  const [userLanguage, setUserLanguage] = useState<'English' | 'Persian'>('English');
  const [nativeLanguage, setNativeLanguage] = useState<'English' | 'Persian'>('Persian');
  const [lesson, setLesson] = useState<PersonalizedLessonOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateLesson = async () => {
    if (!lessonRequirements) {
      toast({
        variant: 'destructive',
        title: 'Requirements missing',
        description: 'Please describe the lesson you want to create.',
      });
      return;
    }
    setIsLoading(true);
    setLesson(null);
    try {
      const result = await generatePersonalizedLesson({
        userLanguage,
        nativeLanguage,
        lessonRequirements,
      });
      setLesson(result);
      toast({
        title: 'Lesson Generated!',
        description: 'Your personalized lesson plan is ready.',
      });
    } catch (error) {
      console.error('Error generating lesson:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Lesson',
        description: 'There was a problem creating your lesson. The AI model might be unavailable.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Lesson Plan Generator"
        description="Create personalized lessons for your students or content."
        icon={BrainCircuit}
      />
      <Alert className="mb-8">
        <Sparkles className="h-4 w-4" />
        <AlertTitle>For Advanced Users & Content Creators</AlertTitle>
        <AlertDescription>
          This tool empowers you to generate structured lesson plans. Describe your topic, and the AI will create the content and exercises for you to teach others.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Creator</CardTitle>
              <CardDescription>Define the lesson you want to generate.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lesson-requirements">Lesson Description</Label>
                <Textarea
                  id="lesson-requirements"
                  placeholder="e.g., 'An introductory lesson on Persian greetings for beginner English speakers. Focus on formal and informal situations.'"
                  value={lessonRequirements}
                  onChange={(e) => setLessonRequirements(e.target.value)}
                  disabled={isLoading}
                  rows={5}
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="target-language">Lesson Language (Teaching)</Label>
                 <Select
                  value={userLanguage}
                  onValueChange={(value: 'English' | 'Persian') => setUserLanguage(value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="target-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Persian">Persian (فارسی)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="native-language">Student's Native Language</Label>
                 <Select
                  value={nativeLanguage}
                  onValueChange={(value: 'English' | 'Persian') => setNativeLanguage(value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="native-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Persian">Persian (فارسی)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateLesson} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Lesson Plan
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">Generating Your Lesson Plan...</h2>
              <p className="text-muted-foreground">The AI is structuring the content and exercises.</p>
            </div>
          )}

          {!isLoading && !lesson && (
             <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Your Lesson Plan Appears Here</h2>
              <p className="text-muted-foreground">Fill out the details on the left to create your first lesson plan.</p>
            </div>
          )}

          {lesson && (
            <Card>
              <CardHeader>
                <CardTitle>{lesson.lessonTitle}</CardTitle>
                <CardDescription>A complete, ready-to-use lesson plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/> Lesson Content</h3>
                    <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap rounded-md border p-4">
                      {lesson.lessonContent}
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary"/> Exercises</h3>
                    <div className="space-y-4">
                        {lesson.exercises.map((exercise, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg border">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary">{exercise.exerciseType}</Badge>
                                </div>
                                <p className="text-muted-foreground">{exercise.exerciseDescription}</p>
                            </div>
                        ))}
                    </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
