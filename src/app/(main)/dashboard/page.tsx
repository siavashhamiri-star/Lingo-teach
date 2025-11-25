import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  BotMessageSquare,
  Trophy,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  { rank: 1, name: 'Elena', stars: 125, league: 'Premier' },
  { rank: 2, name: 'You', stars: 110, league: 'Gold' },
  { rank: 3, name: 'David', stars: 98, league: 'Gold' },
  { rank: 4, name: 'Sara', stars: 95, league: 'Gold' },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your learning snapshot."
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
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Stars</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((user) => (
                  <TableRow key={user.rank} className={user.name === 'You' ? 'bg-primary/10' : ''}>
                    <TableCell className="font-medium">{user.rank}</TableCell>
                    <TableCell>
                      {user.name}
                      {user.league === 'Premier' && (
                        <Badge variant="destructive" className="ml-2">Premier</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{user.stars}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
