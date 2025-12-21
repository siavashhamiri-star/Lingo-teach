
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { GraduationCap, Loader2, Sparkles, Wand2, FileText, BookOpen, Crown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { generatePersonalizedLesson, type PersonalizedLessonOutput } from '@/ai/flows/personalized-lesson-generation';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// --- Pricing Model Simulation ---
const IS_PREMIUM_USER = false;
// -----------------------------

type ExamType = 'ielts' | 'toefl';
type ExamSection = 'speaking' | 'writing';

export default function IeltsToeflPrepPage() {
  const [examType, setExamType] = useState<ExamType>('ielts');
  const [examSection, setExamSection] = useState<ExamSection>('speaking');
  const [workshop, setWorkshop] = useState<PersonalizedLessonOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [freeTrialUsed, setFreeTrialUsed] = useState(false);
  const { toast } = useToast();

  const handleStartWorkshop = async () => {
    if (!IS_PREMIUM_USER && freeTrialUsed) {
      toast({
        variant: 'destructive',
        title: 'Free Trial Used',
        description: 'Please upgrade to premium for unlimited access to workshops.',
      });
      return;
    }

    setIsLoading(true);
    setWorkshop(null);
    toast({
      title: 'Generating Your Workshop...',
      description: `The AI is creating a custom ${examType.toUpperCase()} ${examSection} lesson for you.`,
    });

    const lessonRequirements = `Create a detailed workshop for the ${examSection} section of the ${examType.toUpperCase()} exam.
    It should include:
    1. A realistic sample question for this section.
    2. Key strategies and tips for answering this type of question.
    3. A high-scoring model answer.
    4. A few vocabulary or grammar exercises related to the topic.
    The lesson should be structured to teach a user how to master this task.
    `;

    try {
      const result = await generatePersonalizedLesson({
        userLanguage: 'English',
        nativeLanguage: 'Any', // The lesson is in English, so native lang is less relevant here
        lessonRequirements,
      });
      setWorkshop(result);
      if (!IS_PREMIUM_USER) {
        setFreeTrialUsed(true);
      }
       toast({
        title: 'Workshop Ready!',
        description: 'Your AI-powered exam prep lesson is here.',
      });
    } catch (error) {
       console.error('Error generating workshop:', error);
       toast({
        variant: 'destructive',
        title: 'Error Generating Workshop',
        description: 'There was a problem creating your lesson. The AI model might be unavailable.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isGenerateButtonDisabled = isLoading || (!IS_PREMIUM_USER && freeTrialUsed);

  return (
    <div>
      <PageHeader
        title="IELTS & TOEFL Prep"
        description="Simulate exam sections and get AI-powered teaching and feedback."
        icon={GraduationCap}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>AI Exam Tutor</CardTitle>
                  <CardDescription>
                    Get a personalized AI-led workshop.
                  </CardDescription>
                </div>
                <Badge variant="destructive">Premium Feature</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="exam-type">Exam Type</Label>
                <Select
                  value={examType}
                  onValueChange={(value: ExamType) => setExamType(value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="exam-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ielts">IELTS</SelectItem>
                    <SelectItem value="toefl">TOEFL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="exam-section">Exam Section</Label>
                <Select
                  value={examSection}
                  onValueChange={(value: ExamSection) => setExamSection(value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="exam-section">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speaking">Speaking</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="reading" disabled>Reading (coming soon)</SelectItem>
                    <SelectItem value="listening" disabled>Listening (coming soon)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               {!IS_PREMIUM_USER && !freeTrialUsed && (
                <Alert variant="default" className="border-primary/20 bg-primary/5">
                  <Crown className="h-4 w-4 text-primary" />
                  <AlertTitle>Try it for Free!</AlertTitle>
                  <AlertDescription>
                    Your first AI workshop is on us. Generate one premium lesson for free to see the magic.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleStartWorkshop}
                disabled={isGenerateButtonDisabled}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Workshop
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">
                Your AI Tutor is Preparing...
              </h2>
              <p className="text-muted-foreground">
                Crafting a unique workshop with strategies and examples just for you.
              </p>
            </div>
          )}

          {!isLoading && !workshop && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
               {freeTrialUsed && !IS_PREMIUM_USER ? (
                 <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">You've experienced the power.</h2>
                    <p className="text-muted-foreground max-w-md">Your first workshop was just a preview. Unlock your full potential and get unlimited, personalized exam prep by upgrading.</p>
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Unlock Unlimited Prep
                    </Button>
                 </div>
              ) : (
                <>
                  <GraduationCap className="w-12 h-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold">Ready to Master the Exam?</h2>
                  <p className="text-muted-foreground">
                    Select an exam and section to start a personalized workshop.
                  </p>
                </>
              )}
            </div>
          )}

          {workshop && (
            <Card>
              <CardHeader>
                <CardTitle>{workshop.lessonTitle}</CardTitle>
                <CardDescription>
                  An AI-generated workshop for the {examType.toUpperCase()} {examSection} section.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/> Lesson & Strategies</h3>
                    <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap rounded-md border p-4">
                      {workshop.lessonContent}
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary"/> Exercises</h3>
                    <div className="space-y-4">
                        {workshop.exercises.map((exercise, index) => (
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
               <CardFooter>
                <p className="text-xs text-muted-foreground">
                  This content is generated by AI. To practice, try answering the sample question before reading the model answer.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
