

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Camera, Loader2, Sparkles, Volume2, CameraOff, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { identifyObject, type IdentifyObjectOutput } from '@/ai/flows/object-identification';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function ObjectIdentifierPage() {
  const [result, setResult] = useState<IdentifyObjectOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
      // Cleanup: stop video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  const handleCaptureAndIdentify = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsLoading(true);
    setResult(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    
    const imageDataUri = canvas.toDataURL('image/jpeg');

    try {
      const identificationResult = await identifyObject({ imageDataUri });
      setResult(identificationResult);
    } catch (error) {
      console.error('Error identifying object:', error);
      toast({
        variant: 'destructive',
        title: 'Identification Failed',
        description: 'Could not identify the object. Please try again with a clearer picture.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const playAudio = (audioDataUri: string) => {
    const audio = new Audio(audioDataUri);
    audio.play();
  };

  return (
    <div>
      <PageHeader
        title="Visual Translator"
        description="Point your camera at an object to learn its name in English and Persian."
        icon={Camera}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Camera View</CardTitle>
              <CardDescription>Center an object in the view and capture it.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative">
                 {hasCameraPermission === false && (
                    <div className="flex flex-col items-center gap-2 text-destructive">
                        <CameraOff className="w-12 h-12" />
                        <p className="font-semibold">Camera access is required.</p>
                    </div>
                )}
                <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                <canvas ref={canvasRef} className="hidden" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCaptureAndIdentify} disabled={isLoading || !hasCameraPermission} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Identify Object
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">Analyzing Image...</h2>
              <p className="text-muted-foreground">Our AI is looking at your photo. This might take a moment.</p>
            </div>
          )}

          {!isLoading && !result && (
             <div className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed rounded-lg p-8 text-center">
              <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Results will appear here</h2>
              <p className="text-muted-foreground">Capture an image of an object to see its translation.</p>
            </div>
          )}

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary"/>
                  Identification Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                    <h3 className="font-bold text-lg mb-2">English</h3>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <p className="text-xl">{result.englishName}</p>
                        <Button size="icon" variant="ghost" onClick={() => playAudio(result.englishAudio)}>
                            <Volume2 className="w-5 h-5"/>
                        </Button>
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-bold text-lg mb-2 text-right">فارسی</h3>
                     <div className="flex items-center justify-between p-3 bg-muted rounded-md" dir="rtl">
                        <p className="text-xl">{result.persianName}</p>
                        <Button size="icon" variant="ghost" onClick={() => playAudio(result.persianAudio)}>
                            <Volume2 className="w-5 h-5"/>
                        </Button>
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
