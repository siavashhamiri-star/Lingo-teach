import { PageHeader } from '@/components/shared/page-header';
import { Crown, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function KaraokePage() {
  return (
    <div>
      <PageHeader
        title="Premium Karaoke"
        description="Sing along to popular English songs and learn through music."
        icon={Music}
      />
      <Card className="shadow-lg text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <span>Premium Feature</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">
            Unlock weekly karaoke sessions, advanced audio controls, and more with LinguaWeave Premium.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Sparkles className="mr-2 h-5 w-5" />
            Go Premium
          </Button>
           <div className="mt-4 p-8 border-2 border-dashed rounded-lg w-full">
            <h2 className="text-xl font-semibold">Karaoke Player</h2>
            <p className="text-muted-foreground">Premium content is waiting for you.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
