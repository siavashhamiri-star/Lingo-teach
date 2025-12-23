
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Crown, Film, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateGenesisMovie, type GenesisMovieOutput } from '@/ai/flows/genesis-movie-generation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// --- Pricing Model Simulation ---
const IS_PREMIUM_USER = false;
// -----------------------------

export default function GenesisMoviePage() {
  const [userQuote, setUserQuote] = useState('');
  const [movie, setMovie] = useState<GenesisMovieOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateMovie = async () => {
    if (!userQuote) {
      toast({
        variant: 'destructive',
        title: 'Quote Missing',
        description: 'Please enter a sentence to inspire your movie.',
      });
      return;
    }
    if (!IS_PREMIUM_USER) {
      toast({
        variant: 'destructive',
        title: 'Premium Feature',
        description: 'The Genesis Movie is a premium feature. Please upgrade to create your own cinematic experience.',
      });
      return;
    }
    setIsLoading(true);
    setMovie(null);
    toast({
      title: 'Rendering Your Genesis Movie...',
      description: 'The AI is directing, filming, and rendering your vision. This is a very advanced feature and may take up to 2 minutes.',
    });
    try {
      const result = await generateGenesisMovie({ userQuote });
      setMovie(result);
       toast({
        title: 'Your Movie is Ready!',
        description: 'Press play to watch your creation.',
      });
    } catch (error: any) {
      console.error('Error generating movie:', error);
      toast({
        variant: 'destructive',
        title: 'Rendering Failed',
        description: error.message || 'There was a problem creating your movie. The AI might be busy or the request could not be processed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="The Genesis Movie"
        description="Become a co-creator of our world. Generate a unique movie with your own words."
        icon={Film}
      />
       <Alert className="mb-8 border-accent/20 bg-accent/5 text-accent-foreground">
        <Sparkles className="h-4 w-4 text-accent" />
        <AlertTitle className="text-accent">The Ultimate Act of Creation</AlertTitle>
        <AlertDescription className="text-accent/80">
         As a citizen of Afarinesh, you have the power to create. Provide a single, inspiring sentence, and our Genesis AI will render a unique, cinematic movie based on your vision. You are not just a user; you are a co-creator of this universe's art.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Director's Chair</CardTitle>
                    <CardDescription>Enter your inspiring sentence.</CardDescription>
                  </div>
                   <Badge variant="destructive">Premium</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-quote">Your Inspiring Quote</Label>
                <Textarea
                  id="user-quote"
                  placeholder="e.g., 'Knowledge is the light that builds the future.'"
                  value={userQuote}
                  onChange={(e) => setUserQuote(e.target.value)}
                  disabled={isLoading || !IS_PREMIUM_USER}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateMovie} disabled={isLoading || !IS_PREMIUM_USER} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Create My Movie
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">AI is Rendering Your Vision...</h2>
              <p className="text-muted-foreground">This is our most powerful feature and requires significant processing. Please be patient, this can take up to 2 minutes.</p>
            </div>
          )}

          {!isLoading && !movie && (
             <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
               {!IS_PREMIUM_USER ? (
                 <Card className="w-full max-w-md text-center shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                           <Crown className="w-6 h-6 text-yellow-500" />
                           Unlock Your Director's Chair!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground">The Genesis Movie is the ultimate creative experience in Afarinesh. Turn your words into a cinematic reality. This is an exclusive premium feature.</p>
                    </CardContent>
                    <CardFooter>
                       <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                         <Sparkles className="mr-2 h-4 w-4" />
                         Upgrade to Become a Creator
                       </Button>
                    </CardFooter>
                 </Card>
              ) : (
                <>
                  <Film className="w-12 h-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold">Your Vision Awaits</h2>
                  <p className="text-muted-foreground">Enter a sentence and let the AI bring it to life.</p>
                </>
              )}
            </div>
          )}

          {movie && (
            <Card>
              <CardHeader>
                <CardTitle>Your Genesis Movie</CardTitle>
                <CardDescription>Inspired by: "{userQuote}"</CardDescription>
              </CardHeader>
              <CardContent>
                <video controls src={movie.videoDataUri} className="w-full rounded-md" />
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">You can download and share your creation. As an Ambassador of Creation, you earn XP for sharing.</p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
