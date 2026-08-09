import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  BotMessageSquare,
  Trophy,
  LayoutDashboard,
  TrendingUp,
  Target,
  Zap
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
import { PageHeader } from '@/components/shared/page-header';

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

const stats = [
  { label: 'Total Stars', value: '1,810', icon: Zap, color: 'text-yellow-500' },
  { label: 'Words Learned', value: '452', icon: Target, color: 'text-blue-500' },
  { label: 'Fluency Rank', value: 'Elite', icon: TrendingUp, color: 'text-green-500' },
];

const leaderboard = [
  { rank: 1, name: 'Elena', stars: 2150 },
  { rank: 2, name: 'Kenji', stars: 1980 },
  { rank: 3, name: 'You', stars: 1810 },
  { rank: 4, name: 'Sara', stars: 1750 },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <PageHeader
        title="Citizen Dashboard"
        description="Welcome to Afarinesh! Here's your contribution to the city of Tavana."
        icon={LayoutDashboard}
      />

      {/* New Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={cn("w-8 h-8", stat.color)} />
            </CardContent>
          </Card>
        ))}
      </div>

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
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Stay consistent to build Tavana faster.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal) => (
              <div key={goal.title}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{goal.title}</span>
                  <span className="text-sm text-muted-foreground">{goal.current} / {goal.total}</span>
                </div>
                <Progress value={(goal.current / goal.total) * 100} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Global Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Citizen</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((user) => (
                  <TableRow key={user.rank} className={user.name === 'You' ? 'bg-primary/5' : ''}>
                    <TableCell className="font-medium">{user.rank}</TableCell>
                    <TableCell className={user.name === 'You' ? 'font-bold' : ''}>{user.name}</TableCell>
                    <TableCell className="text-right font-semibold">{user.stars}</TableCell>
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

import { cn } from '@/lib/utils';
