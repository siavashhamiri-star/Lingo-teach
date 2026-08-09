import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  BotMessageSquare,
  Trophy,
  LayoutDashboard,
  TrendingUp,
  Target,
  Zap,
  Sparkles
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

const stats = [
  { label: 'کل ستاره‌ها (XP)', value: '۱,۸۱۰', icon: Zap, color: 'text-yellow-500' },
  { label: 'کلمات آموخته شده', value: '۴۵۲', icon: Target, color: 'text-blue-500' },
  { label: 'رتبه شهروندی', value: 'نخبه (Elite)', icon: TrendingUp, color: 'text-green-500' },
];

const quickLinks = [
  { title: 'چت‌بات دوزبانه', icon: BotMessageSquare, href: '/chatbot', desc: 'تمرین مکالمه زنده.' },
  { title: 'تمرین‌های تعاملی', icon: BookOpenCheck, href: '/exercises', desc: 'تقویت گرامر و واژگان.' },
  { title: 'چالش روزانه', icon: Trophy, href: '/challenges', desc: 'رقابت برای ستاره‌های توانا.' },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <PageHeader
        title="داشبورد شهروند"
        description="به شهر توانا خوش آمدید. سهم امروز شما در گسترش آفرینش چیست؟"
        icon={LayoutDashboard}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="bg-card/50 backdrop-blur-sm border-primary/10">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
              <div className="bg-muted p-3 rounded-full"><s.icon className={cn("w-6 h-6", s.color)} /></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickLinks.map((l) => (
          <Card key={l.title} className="hover:shadow-lg transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">{l.title}</CardTitle>
              <l.icon className="w-6 h-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{l.desc}</p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={l.href}>آغاز <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md border-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent" />برترین معماران توانا</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>رتبه</TableHead><TableHead>شهروند</TableHead><TableHead className="text-right">امتیاز خلق دانش</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow className="bg-primary/5 font-bold"><TableCell>۱</TableCell><TableCell>شما</TableCell><TableCell className="text-right text-primary">۱,۸۱۰</TableCell></TableRow>
              <TableRow><TableCell>۲</TableCell><TableCell>النا</TableCell><TableCell className="text-right text-muted-foreground">۱,۷۵۰</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
