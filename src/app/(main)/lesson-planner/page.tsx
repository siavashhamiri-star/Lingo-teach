
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Loader2, Sparkles, Wand2, BookOpen, FileText, Briefcase, Building, MessageSquareQuote, Stethoscope, Crown, Scale } from 'lucide-react';
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

// --- Pricing Model Simulation ---
const IS_PREMIUM_USER = false;
// -----------------------------

type TopicTemplate = 'business' | 'immigration' | 'slang' | 'medical' | 'legal';

export default function LessonPlannerPage() {
  const [lessonRequirements, setLessonRequirements] = useState('');
  const [userLanguage, setUserLanguage] = useState<'English' | 'Persian'>('English');
  const [nativeLanguage, setNativeLanguage] = useState<'English' | 'Persian'>('Persian');
  const [lesson, setLesson] = useState<PersonalizedLessonOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const setTemplate = (topic: TopicTemplate) => {
    if (!IS_PREMIUM_USER && (topic === 'medical' || topic === 'legal')) {
      toast({
        variant: 'destructive',
        title: 'Premium Feature',
        description: `The ${topic} lesson template is a premium feature. Please upgrade your plan.`,
      });
      return;
    }

    let template = '';
    switch(topic) {
        case 'business':
            template = "Create a Business English lesson. Focus on vocabulary for meetings, negotiations, and writing professional emails. Include an exercise on common business idioms and formal communication etiquette.";
            break;
        case 'immigration':
            template = "Create a lesson for English for immigration purposes. The lesson should cover essential vocabulary and phrases for interacting with officials, filling out forms, and understanding legal documents. Include a role-playing exercise for a border interview.";
            break;
        case 'slang':
            template = "Create a lesson on modern, real-life English slang and idioms. Explain the meaning and usage of 5-7 popular slang terms. Include natural, emotional expressions people use when they are stressed or thinking out loud. For example: phrases like 'I've got to get my act together', 'My palms are sweaty', or 'I should have done this differently'. Provide examples of how these are used in natural conversation and include an exercise to test understanding.";
            break;
        case 'medical':
            template = "Create a comprehensive Medical English lesson suitable for doctors, medical students, radiologists, and lab scientists. The lesson should focus on terminology for patient consultations, understanding medical reports (radiology, lab results), and common clinical vocabulary. Include practical exercises."
            break;
        case 'legal':
            template = "Create a lesson on Legal English. Focus on terminology related to housing contracts (purchase and lease), movable and immovable property, and the residency application process for the USA, UK, Canada, and Australia. The lesson should be practical and aimed at individuals needing to understand and navigate these legal situations."
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
        title="AI Lesson Creator"
        description="Transform your language knowledge into teaching power."
        icon={FileText}
      />
      <Alert className="mb-8 border-primary/20 bg-primary/5 text-primary-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">Share Your Power, Master Your Skills</AlertTitle>
        <AlertDescription className="text-primary/80">
          In our ecosystem, elite and top-performing students are given the privilege and the "Right of Professorship" to teach lower-level learners. This is not just a feature; it's the ultimate path to mastery. By teaching, you challenge your own understanding and achieve true fluency. Use this tool to create lessons and empower others.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Creator</CardTitle>
              <CardDescription>Tell the AI what lesson you want to create.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lesson-requirements">I want to teach a lesson about...</Label>
                <Textarea
                  id="lesson-requirements"
                  placeholder="e.g., 'An introductory lesson on Persian greetings for beginner English speakers...' or 'A lesson about the simple present tense in English.'"
                  value={lessonRequirements}
                  onChange={(e) => setLessonRequirements(e.target.value)}
                  disabled={isLoading}
                  rows={5}
                />
              </div>

               <div className='space-y-3'>
                  <Label>Or, choose a topic template</Label>
                  <div className='grid grid-cols-3 gap-2'>
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
                    <Button variant="outline" size="sm" onClick={() => setTemplate('medical')} disabled={isLoading || !IS_PREMIUM_USER} className="flex-col h-16 relative">
                        { !IS_PREMIUM_USER && <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 scale-75">Premium</Badge> }
                        <Stethoscope className="w-5 h-5 mb-1"/>
                        <span className="text-xs">Medical</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setTemplate('legal')} disabled={isLoading || !IS_PREMIUM_USER} className="flex-col h-16 relative">
                        { !IS_PREMIUM_USER && <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 scale-75">Premium</Badge> }
                        <Scale className="w-5 h-5 mb-1"/>
                        <span className="text-xs">Legal</span>
                    </Button>
                  </div>
              </div>


               <div className="space-y-2">
                <Label htmlFor="target-language">Language of Instruction</Label>
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
                <Label htmlFor="native-language">The Student's Native Language</Label>
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
              <h2 className="text-xl font-semibold">Your Lesson Plan Will Appear Here</h2>
              <p className="text-muted-foreground">Describe the lesson you want to create to get started.</p>
            </div>
          )}

          {lesson && (
            <Card>
              <CardHeader>
                <CardTitle>{lesson.lessonTitle}</CardTitle>
                <CardDescription>A complete, ready-to-use lesson plan generated by AI.</CardDescription>
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

    