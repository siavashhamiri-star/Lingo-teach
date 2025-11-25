'use client';

import { useState, useRef } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Headset, Loader2, Mic, Play, Square, Wand2, Crown, Sparkles } from 'lucide-react';
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
  generateInterpretationScenario,
  type InterpretationScenarioOutput,
} from '@/ai/flows/simultaneous-interpretation-flow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// --- Pricing Model Simulation ---
const IS_PREMIUM_USER = false;
// -----------------------------

type InterpretationStatus = 'idle' | 'playing' | 'recording' | 'finished';

export default function SimultaneousInterpretationPage() {
  const [scenario, setScenario] = useState('News Broadcast');
  const [sourceLanguage, setSourceLanguage] = useState<'English' | 'Persian'>('English');
  const [generatedScenario, setGeneratedScenario] =
    useState<InterpretationScenarioOutput | null>(null);
  const [status, setStatus] = useState<InterpretationStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [freeTrialUsed, setFreeTrialUsed] = useState(false);
  const { toast } = useToast();

  const sourceAudioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const userAudioChunksRef = useRef<Blob[]>([]);

  const handleGenerateScenario = async () => {
    if (!IS_PREMIUM_USER && freeTrialUsed) {
      toast({
        variant: 'destructive',
        title: 'Free Trial Used',
        description: 'Please upgrade to premium for unlimited practice scenarios.',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedScenario(null);
    setStatus('idle');
    try {
      const result = await generateInterpretationScenario({
        topic: scenario,
        language: sourceLanguage,
      });
      setGeneratedScenario(result);
      if (!IS_PREMIUM_USER) {
        setFreeTrialUsed(true);
      }
    } catch (error) {
      console.error('Error generating scenario:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'Could not generate the scenario. The AI might be busy.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startInterpretation = async () => {
    if (!generatedScenario || !sourceAudioRef.current) return;

    // Start recording user's voice
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      userAudioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        userAudioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.start();
    } catch (err) {
       toast({
        variant: 'destructive',
        title: 'Microphone Access Denied',
        description: 'Please enable microphone permissions to record your interpretation.',
      });
      return;
    }

    // Play source audio
    const sourceAudio = sourceAudioRef.current;
    sourceAudio.src = generatedScenario.sourceAudioDataUri;
    sourceAudio.play();
    setStatus('playing');

    sourceAudio.onended = () => {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      setStatus('finished');
      toast({ title: 'Practice Complete!', description: "You can now review your recording."});
    };
  };

  const isGenerateButtonDisabled = isLoading || status !== 'idle' || (!IS_PREMIUM_USER && freeTrialUsed);

  return (
    <div>
      <PageHeader
        title="Simultaneous Interpretation"
        description="Practice real-time interpretation with AI-driven scenarios."
        icon={Headset}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Scenario Setup</CardTitle>
                  <CardDescription>
                    Generate a scenario to practice.
                  </CardDescription>
                </div>
                <Badge variant="destructive">Premium Feature</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="source-language">Source Language</Label>
                <Select
                  value={sourceLanguage}
                  onValueChange={(value: 'English' | 'Persian') =>
                    setSourceLanguage(value)
                  }
                  disabled={isGenerateButtonDisabled}
                >
                  <SelectTrigger id="source-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Persian">Persian (فارسی)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scenario">Choose a Scenario</Label>
                <Select
                  value={scenario}
                  onValueChange={setScenario}
                  disabled={isGenerateButtonDisabled}
                >
                  <SelectTrigger id="scenario">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="News Broadcast">News Broadcast</SelectItem>
                    <SelectItem value="Business Meeting">Business Meeting</SelectItem>
                    <SelectItem value="Medical Consultation">Medical Consultation</SelectItem>
                    <SelectItem value="Technical Presentation">Technical Presentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {!IS_PREMIUM_USER && !freeTrialUsed && (
                <Alert variant="default" className="border-primary/20 bg-primary/5">
                  <Crown className="h-4 w-4 text-primary" />
                  <AlertTitle>Try it for Free!</AlertTitle>
                  <AlertDescription>
                    Your first interpretation scenario is on us. Experience professional-level practice for free.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerateScenario}
                disabled={isGenerateButtonDisabled}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Scenario
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">Generating Scenario...</h2>
              <p className="text-muted-foreground">
                The AI is preparing the source text and audio for your practice session.
              </p>
            </div>
          )}

          {!isLoading && !generatedScenario && (
             <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              {freeTrialUsed && !IS_PREMIUM_USER ? (
                 <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Ready for the next level?</h2>
                    <p className="text-muted-foreground max-w-md">You've had a taste of professional interpretation practice. Upgrade to get unlimited scenarios and master your skills.</p>
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Unlock Unlimited Practice
                    </Button>
                 </div>
              ) : (
                <>
                  <Headset className="w-12 h-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold">Ready to Interpret?</h2>
                  <p className="text-muted-foreground">
                    Choose your settings and generate a scenario to begin.
                  </p>
                </>
              )}
            </div>
          )}

          {generatedScenario && (
            <Card>
              <CardHeader>
                <CardTitle>Practice: {scenario}</CardTitle>
                <CardDescription>
                  Click play to hear the source audio and begin interpreting immediately.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-4 border rounded-md bg-muted/50 max-h-48 overflow-y-auto">
                    <h3 className="font-bold mb-2">Source Text</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap" dir={sourceLanguage === 'Persian' ? 'rtl' : 'ltr'}>{generatedScenario.sourceText}</p>
                 </div>
                 <audio ref={sourceAudioRef} className="hidden" />

                {status === 'finished' && (
                   <div className="space-y-2">
                     <Label>Your Interpretation Recording:</Label>
                     <audio controls className="w-full" src={URL.createObjectURL(new Blob(userAudioChunksRef.current))}/>
                   </div>
                )}
              </CardContent>
              <CardFooter className="flex-col gap-4">
                 <Button onClick={startInterpretation} disabled={status !== 'idle'}>
                   <Play className="mr-2 h-4 w-4" />
                   Start Interpretation Practice
                 </Button>
                <p className="text-xs text-muted-foreground">
                  AI-powered analysis and scoring of your interpretation is coming soon.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
