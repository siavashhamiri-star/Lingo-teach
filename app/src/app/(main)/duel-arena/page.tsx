
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Swords, User, Shield, Star, Crown, ShieldCheck, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type League = "Emperor's Council" | "Champion of Champions" | "Award League" | "Shield League" | "Star League";

const leagueConfig: Record<
  League,
  { icon: React.ElementType; className: string }
> = {
  "Emperor's Council": {
    icon: Crown,
    className:
      'bg-destructive/20 border-destructive/50 text-destructive-foreground hover:bg-destructive/30',
  },
  "Champion of Champions": {
    icon: Swords,
    className: 'bg-sky-500/20 border-sky-500/50 text-sky-200 hover:bg-sky-500/30',
  },
  "Award League": {
    icon: Award,
    className:
      'bg-yellow-500/20 border-yellow-500/50 text-yellow-200 hover:bg-yellow-500/30',
  },
  "Shield League": {
    icon: Shield,
    className:
      'bg-slate-500/20 border-slate-500/50 text-slate-300 hover:bg-slate-500/30',
  },
  "Star League": {
    icon: Star,
    className:
      'bg-orange-600/20 border-orange-600/50 text-orange-300 hover:bg-orange-600/30',
  },
};

const opponents = [
  { rank: 1, name: 'Elena', avatar: 'https://picsum.photos/seed/student1/100/100', league: "Emperor's Council" as League },
  { rank: 2, name: 'Kenji', avatar: 'https://picsum.photos/seed/student2/100/100', league: "Champion of Champions" as League },
  { rank: 4, name: 'Sara', avatar: 'https://picsum.photos/seed/student3/100/100', league: 'Award League' as League },
  { rank: 5, name: 'David', avatar: 'https://picsum.photos/seed/student4/100/100', league: 'Shield League' as League },
];

const duelHistory = [
    { opponent: 'Kenji', result: 'Win', xp: '+50 XP', date: '2 days ago' },
    { opponent: 'Sara', result: 'Loss', xp: '-10 XP', date: '5 days ago' },
];


export default function DuelArenaPage() {
    const { toast } = useToast();

    const handleChallenge = (opponentName: string) => {
        toast({
            title: 'Challenge Sent!',
            description: `Your duel challenge has been sent to ${opponentName}. They will be notified.`
        });
    }

  return (
    <div>
      <PageHeader
        title="The Duel Arena"
        description="Challenge your peers to a 1v1 language battle and climb the ranks."
        icon={Swords}
      />
        <Alert className="mb-8 border-accent text-accent-foreground bg-accent/10">
          <ShieldCheck className="h-4 w-4 text-accent" />
          <AlertTitle>This is the Heart of "Dynamic Meritocracy"</AlertTitle>
          <AlertDescription>
           The Duel Arena is where skill is proven and mastery is forged. Challenge rivals, test your knowledge under pressure, and rise to the top. Winning duels grants significant XP and prestige.
          </AlertDescription>
        </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Challenge an Opponent</CardTitle>
                    <CardDescription>Select a rival from the leaderboard to challenge to a duel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Opponent</TableHead>
                                <TableHead>League</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {opponents.map((opponent) => {
                                const leagueInfo = leagueConfig[opponent.league];
                                const LeagueIcon = leagueInfo.icon;
                                return (
                                <TableRow key={opponent.rank}>
                                    <TableCell className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={opponent.avatar} alt={opponent.name} data-ai-hint="person portrait"/>
                                            <AvatarFallback>{opponent.name.substring(0,2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">{opponent.name}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn("gap-1.5", leagueInfo.className)}>
                                          <LeagueIcon className="h-3 w-3" />
                                          {opponent.league}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" onClick={() => handleChallenge(opponent.name)}>
                                            <Swords className="mr-2 h-4 w-4" />
                                            Challenge
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                 <CardHeader>
                    <CardTitle>Your Duel History</CardTitle>
                    <CardDescription>Review your recent battles.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Opponent</TableHead>
                                <TableHead>Result</TableHead>
                                <TableHead className="text-right">XP</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {duelHistory.map((duel, index) => (
                                <TableRow key={index}>
                                    <TableCell>{duel.opponent}</TableCell>
                                    <TableCell>
                                        <Badge variant={duel.result === 'Win' ? 'default' : 'destructive'}>
                                            {duel.result}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={cn('text-right font-semibold', duel.result === 'Win' ? 'text-primary' : 'text-destructive')}>{duel.xp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Alert className="mt-6">
                        <AlertTitle>Coming Soon: Live Duels!</AlertTitle>
                        <AlertDescription>
                            Real-time 1v1 language games are in development. Get ready for the ultimate test of skill!
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
