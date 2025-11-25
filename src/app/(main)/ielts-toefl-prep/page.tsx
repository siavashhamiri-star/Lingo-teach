'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { GraduationCap, Loader2, Sparkles, Wand2 } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';

type ExamType = 'ielts' | 'toefl';
type ExamSection = 'speaking' | 'writing' | 'reading' | 'listening';

interface SimulationResult {
  score: number;
  feedback: string;
  question: string;
}

export default function IeltsToeflPrepPage() {
  const [examType, setExamType] = useState<ExamType>('ielts');
  const [examSection, setExamSection] = useState<ExamSection>('speaking');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStartSimulation = async () => {
    setIsLoading(true);
    setResult(null);
    toast({
      title: 'Starting Simulation...',
      description: `Generating a ${examType.toUpperCase()} ${examSection} task.`,
    });

    // In a real app, this would be a call to an AI flow.
    // We are simulating the AI response here.
    setTimeout(() => {
      const sampleQuestion =
        examType === 'ielts' && examSection === 'speaking'
          ? "Describe a time when you received good advice from someone. You should say: who gave you the advice, what the advice was, and explain why you think it was good advice."
          : 'Summarize the points made in the lecture, being sure to explain how they cast doubt on the specific points made in the reading passage.';

      const sampleScore = Math.random() * (9 - 6) + 6; // Random score between 6.0 and 9.0 for IELTS
      const sampleFeedback =
        'Your response was well-structured and you used a good range of vocabulary. To improve, try to use more complex sentence structures and vary your intonation to show more expression. Your pronunciation of "specific" could be clearer.';

      setResult({
        score: parseFloat(sampleScore.toFixed(1)),
        feedback: sampleFeedback,
        question: sampleQuestion,
      });
      setIsLoading(false);
      toast({
        title: 'Simulation Complete!',
        description: 'Your AI-powered feedback is ready.',
      });
    }, 2500);
  };

  const getScoreDisplay = () => {
    if (!result) return 'N/A';
    if (examType === 'ielts') return `${result.score.toFixed(1)} / 9.0`;
    return `${Math.round((result.score / 9) * 30)} / 30`;
  };

  return (
    <div>
      <PageHeader
        title="IELTS & TOEFL Prep"
        description="Simulate exam sections and get AI-powered scoring and feedback."
        icon={GraduationCap}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Simulation</CardTitle>
              <CardDescription>
                Choose your exam and get a sample task.
              </CardDescription>
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
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleStartSimulation}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Start Simulation
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">
                Simulating Exam Conditions...
              </h2>
              <p className="text-muted-foreground">
                Generating a unique task and preparing your AI examiner.
              </p>
            </div>
          )}

          {!isLoading && !result && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <GraduationCap className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Ready to Test Your Skills?</h2>
              <p className="text-muted-foreground">
                Select an exam and section to start a simulation.
              </p>
            </div>
          )}

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Simulation Results</CardTitle>
                <CardDescription>
                  Here is your sample task and AI-generated feedback.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="font-bold">Generated Task</Label>
                  <p className="text-muted-foreground p-4 bg-muted rounded-md mt-2">
                    {result.question}
                  </p>
                </div>
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle className="font-bold">AI Feedback</AlertTitle>
                  <AlertDescription>{result.feedback}</AlertDescription>
                </Alert>
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-medium text-lg">Estimated Score</span>
                    <span className="text-2xl font-bold text-primary">
                      {getScoreDisplay()}
                    </span>
                  </div>
                  <Progress value={(result.score / (examType === 'ielts' ? 9 : 30) * 100)} />
                </div>
              </CardContent>
               <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Note: This is a symbolic score generated for demonstration purposes. The real exam simulation will involve you recording or writing a response.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
