'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Loader2, Mic, MicVocal, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { analyzePronunciation, type AnalyzePronunciationOutput } from '@/ai/flows/ai-powered-accent-training';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AccentTrainingPage() {
  const [nativeLanguage, setNativeLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Persian');
  const [textToPronounce, setTextToPronounce] = useState('سلام، حال شما چطور است؟');
  const [analysis, setAnalysis] = useState<AnalyzePronunciationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const handleStartRecording = async () => {
    setAnalysis(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = handleAnalyzePronunciation;

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast({
        title: 'Recording Started',
        description: 'Speak the phrase now. Click stop when you are done.',
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: 'destructive',
        title: 'Microphone Access Denied',
        description: 'Please enable microphone permissions in your browser settings.',
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsLoading(true); // Show loader while analysis happens
      toast({
        title: 'Recording Stopped',
        description: 'Analyzing your pronunciation...',
      });
    }
  };

  const handleAnalyzePronunciation = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64Audio = reader.result as string;
      try {
        const result = await analyzePronunciation({
          audioDataUri: base64Audio,
          textToPronounce,
          nativeLanguage,
          targetLanguage,
        });
        setAnalysis(result);
      } catch (error) {
        console.error('Error analyzing pronunciation:', error);
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'Could not analyze pronunciation. The AI model might be unavailable.',
        });
      } finally {
        setIsLoading(false);
      }
    };
  };

  return (
    <div>
      <PageHeader
        title="AI Accent Training"
        description="Improve your pronunciation with real-time AI feedback."
        icon={MicVocal}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Accent Coach</CardTitle>
              <CardDescription>Record yourself and get instant feedback from our AI coach.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className='space-y-2'>
                <p className="font-medium">Phrase to Pronounce:</p>
                <p className="text-lg text-muted-foreground p-4 bg-muted rounded-md text-center" dir={targetLanguage === 'Persian' ? 'rtl' : 'ltr'}>
                  {textToPronounce}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                disabled={isLoading}
                className="w-full"
                variant={isRecording ? 'destructive' : 'default'}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                   <>
                    <Mic className="mr-2 h-4 w-4" />
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                   </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">Analyzing Your Accent...</h2>
              <p className="text-muted-foreground">Our AI coach is listening carefully. This might take a moment.</p>
            </div>
          )}

          {!isLoading && !analysis && (
             <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <MicVocal className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Ready to Improve?</h2>
              <p className="text-muted-foreground">Click "Start Recording" to get feedback on your pronunciation.</p>
            </div>
          )}

          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary"/>
                  Your Feedback
                </CardTitle>
                <CardDescription>Here's your real-time pronunciation analysis.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-medium text-lg">Pronunciation Score</span>
                    <span className="text-2xl font-bold text-primary">
                      {Math.round(analysis.pronunciationScore * 100)} / 100
                    </span>
                  </div>
                  <Progress value={analysis.pronunciationScore * 100} />
                </div>
                <Alert>
                  <AlertTitle className='font-bold'>Coach's Feedback</AlertTitle>
                  <AlertDescription>
                    {analysis.feedback}
                  </AlertDescription>
                </Alert>
                {analysis.visualAidDataUri && (
                    <div>
                        <h3 className="font-bold text-lg mb-2">Visual Aid</h3>
                        <img src={analysis.visualAidDataUri} alt="Visual pronunciation aid" className="rounded-lg border" />
                    </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
