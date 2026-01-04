

'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Swords, User, Shield, Sparkles, BookOpen, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const opponents = [
    {
        name: "Kenji",
        level: 158,
        specialty: "English Literature",
        avatar: PlaceHolderImages.find(img => img.id === 'duel-opponent-2')?.imageUrl,
        isProfessor: true
    },
    {
        name: "Sara",
        level: 145,
        specialty: "IELTS Speaking",
        avatar: PlaceHolderImages.find(img => img.id === 'duel-opponent-3')?.imageUrl,
        isProfessor: false
    },
    {
        name: "David",
        level: 130,
        specialty: "Business English",
        avatar: PlaceHolderImages.find(img => img.id === 'duel-opponent-4')?.imageUrl,
        isProfessor: false
    }
]

export default function DuelArenaPage() {
    const { toast } = useToast();

    const handleChallenge = (name: string) => {
        toast({
            title: 'Challenge Sent!',
            description: `Your challenge has been sent to ${name}. They will be notified.`
        })
    }

  return (
    <div>
      <PageHeader
        title="The Duel Arena"
        description="Challenge peers and professors to a respectful duel of knowledge."
        icon={Swords}
      />
       <Alert className="mb-8 border-accent/20 bg-accent/5 text-accent-foreground">
        <Sparkles className="h-4 w-4 text-accent" />
        <AlertTitle className="text-accent">The Duel of Scientific Synergy</AlertTitle>
        <AlertDescription className="text-accent/80">
         When a brilliant student proves their mastery, a respectful, *optional* duel is suggested between their professor and a peer. This is not to shame, but a confidential opportunity for mutual growth. The duel itself becomes the greatest "workshop for knowledge creation," leading to a "genetic leap" in science.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opponents.map((opponent, index) => (
             <Card key={index} className="flex flex-col">
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-muted">
                        {opponent.avatar && <AvatarImage src={opponent.avatar} alt={opponent.name} />}
                        <AvatarFallback>{opponent.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl">{opponent.name}</CardTitle>
                    <div className="flex items-center gap-2">
                        {opponent.isProfessor ? 
                            <Badge variant="destructive"><Crown className="w-3 h-3 mr-1.5"/>Professor</Badge> : 
                            <Badge variant="secondary">Student</Badge>
                        }
                    </div>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                    <p className="text-muted-foreground">Level {opponent.level}</p>
                    <p className="font-semibold">{opponent.specialty}</p>
                </CardContent>
                 <CardFooter>
                    <Button onClick={() => handleChallenge(opponent.name)} className="w-full">
                        <Swords className="mr-2 h-4 w-4" />
                        Challenge {opponent.isProfessor ? "Professor" : "Student"}
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
