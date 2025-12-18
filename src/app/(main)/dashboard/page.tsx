
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  BotMessageSquare,
  Trophy,
  Award,
  Shield,
  Gem,
  Star,
  Crown,
  Swords,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/page-header';
import { LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const quickLinks = [
  {
    title: 'Practice with Chatbot',
    description: 'Hone your conversation skills.',
    icon: BotMessageSquare,
    href: '/chatbot',
  },
  {
    title: 'Start an Exercise',
    description: 'Grammar, vocabulary, and more.',
    icon: BookOpenCheck,
    href: '/exercises',
  },
  {
    title: 'Daily Challenge',
    description: 'Compete and win stars.',
    icon: Trophy,
    href: '/challenges',
  },
];

const weeklyGoals = [
  { title: 'Complete 5 Lessons', current: 2, total: 5 },
  { title: '30 Mins Chat Practice', current: 10, total: 30 },
  { title: 'Win a Daily Challenge', current: 0, total: 1 },
];

const leaderboard = [
  { rank: 1, name: 'Elena', stars: 2150, league: "Emperor's Council" },
  { rank: 2, name: 'Kenji', stars: 1980, league: 'Champion of Champions', partner: 'You' },
  { rank: 3, name: 'You', stars: 1810, league: 'Champion of Champions', partner: 'Kenji' },
  { rank: 4, name: 'Sara', stars: 1750, league: 'Award League' },
  { rank: 5, name: 'David', stars: 1230, league: 'Shield League' },
  { rank: 6, name: 'Maria', stars: 980, league: 'Shield League' },
  { rank: 7, name: 'Hassan', stars: 650, league: 'Star League' },
];

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


export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to Afarinesh! Here's your learning snapshot."
        icon={LayoutDashboard}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <Card key={link.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{link.title}</CardTitle>
              <link.icon className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
              <Button asChild variant="outline" size="sm">
                <Link href={link.href}>
                  Go <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3 shadow-md">
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal) => (
              <div key={goal.title}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{goal.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.total}
                  </span>
                </div>
                <Progress value={(goal.current / goal.total) * 100} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Weekly Leaderboard</CardTitle>
            <CardDescription>Top learners climb to a higher league each week based on XP.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>League</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((user) => {
                  const leagueInfo = leagueConfig[user.league as League];
                  const LeagueIcon = leagueInfo.icon;
                  return (
                    <TableRow key={user.rank} className={cn(user.name === 'You' ? 'bg-primary/10' : '')}>
                      <TableCell className="font-medium">{user.rank}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        {user.name}
                        {user.partner && (
                           <Badge variant="outline" className="gap-1.5 border-accent text-accent-foreground">
                             <Swords className="h-3 w-3" />
                             Synergy
                           </Badge>
                        )}
                        </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("gap-1.5", leagueInfo.className)}>
                          <LeagueIcon className="h-3 w-3" />
                          {user.league}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">{user.stars}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
