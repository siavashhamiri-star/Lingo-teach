'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { BrainCircuit, Loader2, Sparkles, Wand2, BookOpen, FileText, Briefcase, Building, MessageSquareQuote, Stethoscope } from 'lucide-react';
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

type TopicTemplate = 'business' | 'immigration' | 'slang' | 'medical';

export default function LearningPathPage() {
  const [lessonRequirements, setLessonRequirements] = useState('');
  const [userLanguage, setUserLanguage] = useState<'English' | 'Persian'>('English');
  const [nativeLanguage, setNativeLanguage] = useState<'English' | 'Persian'>('Persian');
  const [lesson, setLesson] = useState<PersonalizedLessonOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const setTemplate = (topic: TopicTemplate) => {
    let template = '';
    switch(topic) {
        case 'business':
            template = "Create a Business English lesson. Focus on vocabulary for meetings, negotiations, and writing professional emails. Include an exercise on common business idioms and formal communication etiquette.";
            break;
        case 'immigration':
            template = "Create a lesson for English for immigration purposes. The lesson should cover essential vocabulary and phrases for interacting with officials, filling out forms, and understanding legal documents. Include a role-playing exercise for a border interview.";
            break;
        case 'slang':
            template = "Create a lesson on modern colloquial English and slang. Explain the meaning and usage of 5-7 popular slang terms or phrases. Provide examples of how they are used in natural conversation and include an exercise to test understanding.";
            break;
        case 'medical':
            template = "Create a comprehensive Medical English lesson suitable for doctors, medical students, radiologists, and lab scientists. The lesson should focus on terminology for patient consultations, understanding medical reports (radiology, lab results), and common clinical vocabulary. Include practical exercises."
            break;
    }
    setLessonRequirements(template);
  }

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
                  placeholder="e.g., 'An introductory lesson on Persian greetings for beginner English speakers...'"
                  value={lessonRequirements}
                  onChange={(e) => setLessonRequirements(e.target.value)}
                  disabled={isLoading}
                  rows={5}
                />
              </div>

               <div className='space-y-3'>
                  <Label>Or, choose a topic template</Label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Button variant="outline" size="sm" onClick={() => setTemplate('business')} disabled={isLoading} className="flex-col h-16">
                        <Briefcase className="w-5 h-5 mb-1"/>
                        <span className="text-xs">Business</span>
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => setTemplate('immigration')} disabled={isLoading} className="flex-col h-16">
                        <Building className="w-5 h-5 mb-1"/>
                        <span className="text-xs">Immigration</span>
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => setTemplate('slang')} disabled={isLoading} className="flex-col h-16">
                        <MessageSquareQuote className="w-5 h-5 mb-1"/>
                        <span className="text-xs">Slang</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setTemplate('medical')} disabled={isLoading} className="flex-col h-16">
                        <Stethoscope className="w-5 h-5 mb-1"/>
                        <span className="text-xs">Medical</span>
                    </Button>
                  </div>
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
