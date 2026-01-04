

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Loader2, Mic, MicVocal, Play, Sparkles, Square, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { analyzePronunciation, type AnalyzePronunciationOutput } from '@/ai/flows/ai-powered-accent-training';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';

type RecordingStatus = 'idle' | 'recording' | 'processing' | 'finished';

export default function AccentTrainingPage() {
  const [textToPronounce, setTextToPronounce] = useState('The quick brown fox jumps over the lazy dog.');
  const [nativeLanguage, setNativeLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('English');
  
  const [result, setResult] = useState<AnalyzePronunciationOutput | null>(null);
  const [status, setStatus] = useState<RecordingStatus>('idle');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const handleStartRecording = async () => {
    setStatus('recording');
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.start();
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Microphone Access Denied',
        description: 'Please enable microphone permissions in your browser settings.',
      });
      setStatus('idle');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = handleAnalyze;
    }
  };

  const handleAnalyze = async () => {
    setStatus('processing');
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const audioDataUri = reader.result as string;
      try {
        const analysisResult = await analyzePronunciation({
          audioDataUri,
          textToPronounce,
          nativeLanguage,
          targetLanguage,
        });
        setResult(analysisResult);
        setStatus('finished');
      } catch (error) {
        console.error('Error analyzing pronunciation:', error);
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'Could not analyze the audio. Please try again.',
        });
        setStatus('idle');
      }
    };
  };

  const getStatusButton = () => {
    switch (status) {
      case 'idle':
        return (
          <Button onClick={handleStartRecording} className="w-full" size="lg">
            <Mic className="mr-2" /> Start Recording
          </Button>
        );
      case 'recording':
        return (
          <Button onClick={handleStopRecording} className="w-full bg-destructive hover:bg-destructive/90" size="lg">
            <Square className="mr-2 animate-pulse" /> Stop Recording
          </Button>
        );
      case 'processing':
        return (
          <Button disabled className="w-full" size="lg">
            <Loader2 className="mr-2 animate-spin" /> Analyzing...
          </Button>
        );
      case 'finished':
         return (
          <Button onClick={handleStartRecording} className="w-full" size="lg">
            <Mic className="mr-2" /> Record Again
          </Button>
        );
    }
  };


  return (
    <div>
      <PageHeader
        title="AI Accent Coach"
        description="Get real-time feedback on your pronunciation from our AI coach."
        icon={MicVocal}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Practice Settings</CardTitle>
              <CardDescription>Configure your accent training session.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-to-pronounce">Text to Pronounce</Label>
                <Input
                  id="text-to-pronounce"
                  value={textToPronounce}
                  onChange={(e) => setTextToPronounce(e.target.value)}
                  disabled={status !== 'idle'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="native-language">Your Native Language</Label>
                 <Select
                  value={nativeLanguage}
                  onValueChange={setNativeLanguage}
                  disabled={status !== 'idle'}
                >
                  <SelectTrigger id="native-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Persian">Persian (فارسی)</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="target-language">Target Accent</Label>
                 <Select
                  value={targetLanguage}
                  onValueChange={setTargetLanguage}
                  disabled={status !== 'idle'}
                >
                  <SelectTrigger id="target-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English (Standard American)</SelectItem>
                    <SelectItem value="Persian">Persian (Standard Tehrani)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
             <CardFooter>
                {getStatusButton()}
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {status === 'idle' && !result && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <MicVocal className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Ready to Practice?</h2>
              <p className="text-muted-foreground">Click "Start Recording" to get feedback on your accent.</p>
            </div>
          )}
          
           {status === 'recording' && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-destructive border-dashed rounded-lg p-8 text-center bg-destructive/5">
              <Mic className="w-16 h-16 text-destructive mb-4 animate-pulse" />
              <h2 className="text-xl font-semibold text-destructive">Recording in progress...</h2>
              <p className="text-muted-foreground">Read the sentence aloud now.</p>
            </div>
          )}

           {(status === 'processing' || (status === 'finished' && result)) && (
            <Card>
              <CardHeader>
                <CardTitle>Analysis Result</CardTitle>
                <CardDescription>Here's the AI coach's feedback on your pronunciation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {status === 'processing' ? (
                   <div className="flex flex-col items-center justify-center py-16">
                     <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                     <h2 className="text-xl font-semibold">AI is analyzing your voice...</h2>
                   </div>
                ) : (
                    result && (
                        <>
                            <div className="text-center">
                                <p className="text-muted-foreground">Pronunciation Score</p>
                                <p className="text-6xl font-bold text-primary">{Math.round(result.pronunciationScore * 100)}%</p>
                            </div>
                            <Alert>
                                <Sparkles className="h-4 w-4" />
                                <AlertTitle className="font-bold">Coach's Feedback</AlertTitle>
                                <AlertDescription>
                                    {result.feedback}
                                </AlertDescription>
                            </Alert>
                             {result.visualAidDataUri && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold">Visual Aid</h3>
                                    <div className="border rounded-md p-2 flex justify-center">
                                        <Image src={result.visualAidDataUri} alt="Visual aid for pronunciation" width={300} height={200} className="rounded-sm" />
                                    </div>
                                </div>
                            )}
                        </>
                    )
                )}
              </CardContent>
            </Card>
           )}
        </div>
      </div>
    </div>
  );
}
