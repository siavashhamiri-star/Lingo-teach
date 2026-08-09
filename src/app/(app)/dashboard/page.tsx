import Link from 'next/link';
import {
  ArrowLeft,
  BookOpenCheck,
  BotMessageSquare,
  Trophy,
  LayoutDashboard,
  Zap,
  Target,
  TrendingUp,
  Sparkles,
  Swords
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
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const citizenStats = [
  { label: 'ستاره‌های توانا (XP)', value: '۱,۸۱۰', icon: Zap, color: 'text-yellow-500' },
  { label: 'کلمات فتح شده', value: '۴۵۲', icon: Target, color: 'text-blue-500' },
  { label: 'رتبه شهروندی', value: 'نخبه (Elite)', icon: TrendingUp, color: 'text-green-500' },
];

const citizenActions = [
  {
    title: 'چت‌بات دوزبانه',
    desc: 'تمرین مکالمه زنده و رفع تردید.',
    icon: BotMessageSquare,
    href: '/chatbot',
  },
  {
    title: 'خالق درس (AI)',
    desc: 'حق استادی خود را اعمال کنید.',
    icon: BookOpenCheck,
    href: '/lesson-planner',
  },
  {
    title: 'میدان دوئل',
    desc: 'هم‌افزایی علمی با اساتید.',
    icon: Swords,
    href: '/duel-arena',
  },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <PageHeader
        title="داشبورد شهروند"
        description="به شهر توانا خوش آمدید. امروز چه دانشی خلق می‌کنید؟"
        icon={LayoutDashboard}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {citizenStats.map((stat) => (
          <Card key={stat.label} className="border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="bg-primary/5 p-3 rounded-full">
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {citizenActions.map((action) => (
          <Card key={action.title} className="hover:shadow-lg transition-all group border-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <action.icon className="w-6 h-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{action.desc}</p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={action.href}>
                  ورود <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md border-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            برترین معماران توانا (Leaderboard)
          </CardTitle>
          <CardDescription>نخبگانی که بیشترین سهم را در گسترش علم داشته‌اند.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right w-[100px]">رتبه</TableHead>
                <TableHead className="text-right">شهروند</TableHead>
                <TableHead className="text-right">امتیاز آفرینش</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-primary/5 font-bold">
                <TableCell>۱</TableCell>
                <TableCell>شما (John Doe)</TableCell>
                <TableCell>۱,۸۱۰</TableCell>
                <TableCell><Badge className="bg-accent">معمار ارشد</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>۲</TableCell>
                <TableCell>النا (Elena)</TableCell>
                <TableCell>۱,۷۵۰</TableCell>
                <TableCell><Badge variant="secondary">استاد</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}