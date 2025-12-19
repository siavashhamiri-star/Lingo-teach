
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Users, GraduationCap, School, MessageSquare, ArrowRight, UserCheck, Laugh, Handshake, Sparkles, Swords, ShieldCheck, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const communityRooms = [
  {
    title: 'General Language Exchange',
    description: 'Practice English and Persian with learners from around the world at all levels.',
    icon: MessageSquare,
    onlineCount: 128,
    tags: ['All Levels', 'Conversation', 'Practice'],
  },
  {
    title: 'Kids\' Corner (Ages 7-12)',
    description: 'A fun and safe space for young learners to practice with games, stories, and friends.',
    icon: Laugh,
    onlineCount: 56,
    tags: ['Kids', 'Games', 'Fun'],
  },
  {
    title: "Teachers' Lounge",
    description: 'A dedicated space for language teachers to share resources, methods, and insights.',
    icon: School,
    onlineCount: 23,
    tags: ['Educators', 'Methodology', 'Networking'],
    isExclusive: true,
  },
  {
    title: 'Exam Experts Corner',
    description: 'Connect with users who hold IELTS, TOEFL, or Duolingo certificates for tips and advice.',
    icon: GraduationCap,
    onlineCount: 42,
    tags: ['IELTS', 'TOEFL', 'Exam Prep'],
    isExclusive: true,
  },
  {
    title: 'Advanced Discussion',
    description: 'Engage in deep conversations on complex topics with fluent and advanced speakers.',
    icon: UserCheck,
    onlineCount: 31,
    tags: ['Advanced', 'Debate', 'Fluency'],
  },
];


export default function CommunityPage() {
    const { toast } = useToast();

    const handleFindPartner = () => {
        toast({
            title: "We're looking for your partner!",
            description: "Based on your progress and goals, we'll suggest a compatible language partner for you soon.",
        });
    }

  return (
    <div>
      <PageHeader
        title="Community Hub"
        description="Connect with learners, find a partner, and practice in exchange rooms."
        icon={Users}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gradient-to-tr from-accent/20 via-background to-background border-accent/30 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <Swords className="w-8 h-8 text-accent" />
                    Survival Arena: The Last One Standing
                </CardTitle>
                <CardDescription>
                    A high-stakes language game where only the sharpest minds survive. Up to 25 players can join.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert variant="default" className="border-accent bg-accent/10 mb-4">
                    <AlertTitle className="text-accent-foreground">Game Rules</AlertTitle>
                    <AlertDescription className="text-accent-foreground/80">
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Enter the arena with up to 24 other players.</li>
                            <li>The system will ask rapid-fire language questions.</li>
                            <li>You start with 3 lives. Each wrong answer costs a life.</li>
                            <li>Lose all your lives, and you're out!</li>
                            <li>The last three players standing win huge XP and exclusive badges.</li>
                        </ul>
                    </AlertDescription>
                </Alert>
                <p className="text-sm text-muted-foreground mb-4">
                    This is the ultimate test of your knowledge and speed. Do you have what it takes to be the champion?
                </p>
                <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Join the Next Arena (Coming Soon!)
                </Button>
            </CardContent>
        </Card>
        <Card className="bg-gradient-to-tr from-primary/20 via-background to-background border-primary/30 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                    Duel of Scientific Synergy
                </CardTitle>
                <CardDescription>
                    A team-based battle of wits where knowledge creation is the ultimate prize. Up to 20 can observe.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert variant="default" className="border-primary/30 bg-primary/10 mb-4">
                    <AlertTitle className="text-primary-foreground">Event Rules</AlertTitle>
                    <AlertDescription className="text-primary-foreground/80">
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Two teams, led by peer professors or top students, enter the duel.</li>
                            <li>The duel consists of complex challenges and case studies.</li>
                            <li>A panel of "Emperor's Council" members judges the outcome.</li>
                            <li>The entire duel is recorded and becomes a masterclass for all students.</li>
                            <li>Winning teams earn prestige, massive XP, and a share of the "knowledge bounty".</li>
                        </ul>
                    </AlertDescription>
                </Alert>
                <p className="text-sm text-muted-foreground mb-4">
                   This is where science takes a genetic leap. Witness the creation of knowledge in real-time.
                </p>
                <Button asChild variant="default">
                   <Link href="/duel-arena">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Enter the Duel Arena
                   </Link>
                </Button>
            </CardContent>
        </Card>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <Handshake className="w-8 h-8 text-primary" />
                    Find Your Language Partner
                </CardTitle>
                <CardDescription>
                    Learning is a journey best shared. We'll help you find a consistent partner to practice with, stay motivated, and grow together.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert variant="default" className="border-accent bg-accent/10 mb-4">
                  <Swords className="h-4 w-4 text-accent-foreground" />
                  <AlertTitle className="text-accent-foreground">Synergy Bonus!</AlertTitle>
                  <AlertDescription className="text-accent-foreground/80">
                    When you and your partner complete lessons together, you both earn bonus XP. Team up to climb the leaderboards faster!
                  </AlertDescription>
                </Alert>
                <Button onClick={handleFindPartner}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Find My Partner Now
                </Button>
            </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-destructive/10 to-yellow-500/10 border-destructive/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <Swords className="w-8 h-8 text-destructive" />
                    Monthly Team Championship
                </CardTitle>
                <CardDescription>
                    At the end of each month, team up and compete for glory and huge rewards.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert variant="default" className="border-yellow-500/30 bg-yellow-500/10 mb-4">
                  <ShieldCheck className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-700">Form Your Elite Team</AlertTitle>
                  <AlertDescription className="text-yellow-700/80">
                    Create a team of 3 (2 students + 1 teacher). Top-ranked teachers have the privilege to recruit their best students to form a team. Winners get massive XP boosts, exclusive badges, and league promotions.
                  </AlertDescription>
                </Alert>
                <Button variant="destructive">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Form Your Team
                </Button>
            </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Language Exchange Rooms</h2>
      <Alert className="mb-8">
        <AlertTitle>Feature in Development</AlertTitle>
        <AlertDescription>
          Full text and voice chat functionalities within rooms are coming soon! For now, joining a room will take you to our AI chatbot for practice.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityRooms.map((room) => (
            <Card key={room.title} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="bg-primary/10 p-3 rounded-lg">
                           <room.icon className="w-6 h-6 text-primary" />
                        </div>
                        {room.isExclusive && <Badge variant="destructive">Exclusive</Badge>}
                    </div>
                    <CardTitle className="pt-4">{room.title}</CardTitle>
                    <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                     <div className="flex flex-wrap gap-2">
                        {room.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                        <span className="font-bold text-primary">{room.onlineCount}</span> users online
                    </div>
                    <Button asChild variant="outline" size="sm">
                       <Link href="/chatbot">
                        Join Room <ArrowRight className="ml-2 h-4 w-4" />
                       </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
