
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Crown, Loader2, Music, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateKaraokeTrack, type KaraokeTrackOutput } from '@/ai/flows/karaoke-song-generator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// --- Pricing Model Simulation ---
const IS_PREMIUM_USER = false;
// -----------------------------

export default function KaraokePage() {
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'fa'>('fa');
  const [track, setTrack] = useState<KaraokeTrackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateTrack = async () => {
    if (!songTitle || !artist) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Information',
        description: 'Please enter both song title and artist.',
      });
      return;
    }
     if (!IS_PREMIUM_USER) {
      toast({
        variant: 'destructive',
        title: 'Premium Feature',
        description: 'Karaoke is a premium feature. Please upgrade your plan to generate a track.',
      });
      return;
    }
    setIsLoading(true);
    setTrack(null);
    try {
      const result = await generateKaraokeTrack({
        songTitle,
        artist,
        targetLanguage,
      });
      setTrack(result);
    } catch (error) {
      console.error('Error generating karaoke track:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Track',
        description: 'There was a problem finding or translating the lyrics. Please check the song title and artist and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <PageHeader
        title="AI-Powered Karaoke"
        description="Learn through music by singing along to your favorite songs."
        icon={Music}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Find a Song</CardTitle>
                  <CardDescription>Enter a song to get translated lyrics.</CardDescription>
                </div>
                <Badge variant="destructive">Premium Feature</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="song-title">Song Title</Label>
                <Input
                  id="song-title"
                  placeholder="e.g., 'Bohemian Rhapsody'"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  disabled={isLoading || !IS_PREMIUM_USER}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist">Artist</Label>
                <Input
                  id="artist"
                  placeholder="e.g., 'Queen'"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  disabled={isLoading || !IS_PREMIUM_USER}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-language">Translate Lyrics To</Label>
                 <Select
                  value={targetLanguage}
                  onValueChange={(value: 'en' | 'fa') => setTargetLanguage(value)}
                  disabled={isLoading || !IS_PREMIUM_USER}
                >
                  <SelectTrigger id="target-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fa">Persian (فارسی)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateTrack} disabled={isLoading || !IS_PREMIUM_USER} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Music className="mr-2 h-4 w-4" />
                )}
                Generate Karaoke Track
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-semibold">Finding Your Song...</h2>
              <p className="text-muted-foreground">The AI is searching for the lyrics and creating your karaoke track. This might take a moment.</p>
            </div>
          )}

          {!isLoading && !track && (
             <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-lg p-8 text-center">
              {!IS_PREMIUM_USER ? (
                 <Card className="w-full max-w-md text-center shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                           <Crown className="w-6 h-6 text-yellow-500" />
                           Unlock the Stage!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground">The Karaoke feature is your chance to learn languages through music, with translated lyrics for your favorite songs. This is an exclusive premium feature.</p>
                    </CardContent>
                    <CardFooter>
                       <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                         <Sparkles className="mr-2 h-4 w-4" />
                         Upgrade to Start Singing
                       </Button>
                    </CardFooter>
                 </Card>
              ) : (
                <>
                  <Music className="w-12 h-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold">Your Stage is Waiting</h2>
                  <p className="text-muted-foreground">Enter a song and artist to start your AI-powered karaoke session.</p>
                </>
              )}
            </div>
          )}

          {track && (
            <Card>
              <CardHeader>
                <CardTitle className={cn(targetLanguage === 'fa' && 'text-right')}>{track.songTitle}</CardTitle>
                <CardDescription className={cn(targetLanguage === 'fa' && 'text-right')}>{track.artist}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 {/* This would be where a music player / visualizer would go */}
                <div className="w-full text-center p-4 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground text-sm">Karaoke audio player coming soon!</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Original Lyrics</h3>
                    <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed font-sans">{track.originalLyrics}</pre>
                  </div>
                   <div>
                     <h3 className={cn("font-bold text-lg mb-2", targetLanguage === 'fa' && 'text-right')}>Translated Lyrics</h3>
                     <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed font-sans" dir={targetLanguage === 'fa' ? 'rtl' : 'ltr'}>{track.translatedLyrics}</pre>
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
