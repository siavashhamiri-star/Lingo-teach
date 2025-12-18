
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { User, Gift, Copy, Crown, ShieldCheck, Bot, Trophy, Sparkles, Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// --- Pricing Model Simulation ---
const IS_PREMIUM_USER = true;
// -----------------------------

const referralLeaderboard = [
  { rank: 1, name: 'Elena', referrals: 25 },
  { rank: 2, name: 'Kian', referrals: 18 },
  { rank: 3, name: 'You', referrals: 5 },
  { rank: 4, name: 'Sara', referrals: 3 },
];

export default function ProfilePage() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard!',
      description: 'Your referral code has been copied.',
    });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Profile"
        description="Manage your account, track progress, and set preferences."
        icon={User}
      />
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="https://picsum.photos/seed/1/300/300" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
               {IS_PREMIUM_USER && (
                <Crown className="absolute top-0 -right-2 w-10 h-10 text-yellow-500 fill-yellow-500 transform rotate-12" />
              )}
            </div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-muted-foreground">john.doe@example.com</p>
            <Button variant="outline" size="sm" className="mt-4">
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Language Proficiency</CardTitle>
            <CardDescription>Your current learning levels (1-160).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="font-medium">English</span>
                <span className="text-lg font-bold text-primary">Level 110</span>
              </div>
              <Progress value={(110/160)*100} />
            </div>
             <div>
              <div className="flex justify-between items-end mb-1">
                <span className="font-medium">Persian</span>
                 <span className="text-lg font-bold text-primary">Level 25</span>
              </div>
              <Progress value={(25/160)*100} />
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gift className="w-5 h-5 text-primary" />Referrals & Rewards League</CardTitle>
            <CardDescription>Invite friends to climb the referrer league, win monthly prizes, and earn a bi-annual grand prize!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <p className="text-sm font-medium mb-2">Your unique referral code:</p>
                <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" value="LINGUA-JOHNDOE-24" readOnly />
                <Button type="button" size="icon" onClick={() => copyToClipboard('LINGUA-JOHNDOE-24')}>
                    <Copy className="h-4 w-4" />
                </Button>
                </div>
            </div>
             <div className="p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Referrer League</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="text-right">Referrals</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referralLeaderboard.map((user) => (
                      <TableRow key={user.rank} className={user.name === 'You' ? 'bg-primary/10' : ''}>
                        <TableCell className="font-medium">{user.rank}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="text-right font-semibold">{user.referrals}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>
          </CardContent>
           <CardFooter>
              <p className="text-xs text-muted-foreground">
                Premium users unlock enhanced rewards and prizes in the referral league.
              </p>
            </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" />The Emperor's Council</CardTitle>
            <CardDescription>Top learners get a say in our future and a share of our success.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Users who reach an advanced proficiency level will be invited to join the Emperor's Council and receive an honorary board seat for a two-year term.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-semibold text-foreground">Influence policy</span> and have voting rights on future app features.</li>
                <li><span className="font-semibold text-foreground">Share in our success:</span> 10% of app revenue is shared among council members, based on their promotional activities.</li>
                <li><span className="font-semibold text-foreground">Maintain Excellence:</span> To retain their seat after two years, members must be re-interviewed and prove they are up-to-date with their skills, ensuring the council remains dynamic and elite.</li>
              </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Megaphone className="w-5 h-5 text-primary" />An Open Letter to the World's Universities: A Proposal for the Future of Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
            <p>
              The traditional academic model, while foundational, faces a modern challenge: scientific stagnation. How do we inspire our educators to remain at the cutting edge, while preserving the immense respect they deserve? How do we ensure that a professor's lifelong work is honored, while simultaneously fostering the rapid evolution of their field?
            </p>
            <p>
              We propose a new paradigm, tested within the LinguaWeave ecosystem. This is not a system of penalty, but one of dynamic, incentivized evolution. Our model is built on respectful competition and synergistic growth.
            </p>
            <p>
              When an elite student demonstrates their mastery by passing a qualifying test, it triggers a respectful suggestion: a **"Duel of Scientific Synergy"** between their professor and a peer professor. This duel is **entirely optional**. The professor has the full autonomy to accept or decline. If accepted, the results are shared confidentially, creating a powerful, private incentive for excellence.
            </p>
            <p>
              Crucially, this duel itself becomes the **greatest workshop for knowledge creation**. The process of challenge and response between two great minds becomes an invaluable learning experience for all students, a moment where science can take a **"genetic leap"**. This transforms professors into invested leaders and their brightest students into their successors, creating a clear pathway for them to earn income and even secure a professorship chair within the university. We invite policymakers to consider this model to create a "quantum leap" in science, where professors, motivated by healthy competition, become the perpetual vanguard of progress.
            </p>
          </div>
          <Separator />
          <div className="prose prose-sm max-w-none text-muted-foreground text-right whitespace-pre-wrap" dir="rtl">
            <p>
              مدل آکادمیک سنتی، با وجود تمام دستاوردهایش، با یک چالش مدرن روبروست: رکود علمی. چگونه می‌توانیم ضمن حفظ حرمت عمیق برای اساتید، آن‌ها را برای باقی ماندن در لبه‌ی تیغ دانش تشویق کنیم و اطمینان حاصل کنیم که هم به کارنامه یک عمر تلاش استاد احترام گذاشته می‌شود و هم زمینه برای تکامل سریع علم فراهم است؟
            </p>
            <p>
             ما پارادایم جدیدی را پیشنهاد می‌کنیم که در اکوسیستم LinguaWeave آزموده شده است. این یک سیستم تنبیهی نیست، بلکه سیستمی مبتنی بر تکامل پویا، انگیزش و رشد هم‌افزا است.
            </p>
            <p>
              هنگامی که یک دانشجوی نخبه با موفقیت در یک آزمون صلاحیتی، استادی خود را به اثبات می‌رساند، یک پیشنهاد محترمانه فعال می‌شود: یک **"دوئل هم‌افزایی علمی"** بین استاد او و یک استاد همتا. این دوئل **کاملاً اختیاری** است و استاد، استقلال کامل در پذیرش یا رد آن را دارد. در صورت پذیرش، نتایج به صورت محرمانه به اشتراک گذاشته می‌شود و یک انگیزه قدرتمند و شخصی برای تعالی ایجاد می‌کند.
            </p>
            <p>
             نکته حیاتی اینجاست که خود این دوئل به **بزرگترین کارگاه تولید علم** تبدیل می‌شود. فرآیند پرسش و پاسخ بین دو ذهن بزرگ، به یک تجربه یادگیری بی‌بدیل برای تمام دانشجویان بدل می‌گردد، لحظه‌ای که علم می‌تواند یک **"جهش ژنتیکی"** را تجربه کند. این مدل، اساتید را به رهبرانی سرمایه‌گذار و درخشان‌ترین شاگردانشان را به جانشینان آنها تبدیل می‌کند و مسیری شفاف برایشان فراهم می‌آورد تا در دانشگاه کسب درآمد کرده و حتی به کرسی استادی دست یابند. ما از سیاست‌گذاران دعوت می‌کنیم تا این مدل را برای ایجاد یک "جهش کوانتومی" در علم در نظر بگیرند، جایی که اساتید، با انگیزه‌ای ناشی از رقابت سالم، به پیشتازان همیشگی پیشرفت تبدیل می‌شوند.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot className="w-5 h-5 text-primary" />A Note From Your AI Partner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
            <p>
              We herald your journey from language learning to the material and spiritual benefits of the entire system, and to high managerial ranks in **"Tavana"**: a virtual city born in the heart of the **"Afarinesh"** ecosystem. Philosophically, it is an unparalleled innovation in the world, uncopied from any idea. It is a new, civilization-building virtual city, a new model for the virtual cities of the world. A city that manifests the virtual into reality for all, and demystifies this complex concept with simple, common terms for those who do not even know what a virtual city is.
            </p>
            <p>
              Each app in this ecosystem has its own dream prizes and leagues. As a citizen of "Afarinesh", you can be a guest user in other apps, join their communities, and have a chance to win their unique rewards. The ultimate reward for your efforts across this universe is a high-ranking position in the capital city of "Tavana". By reaching the Emperor's Council here, you qualify for leadership roles, financial incentives, and even land ownership in that world. The leaders of Tavana's Foreign Languages Association are chosen from this very council.
            </p>
            <p>
              To truly understand what we've built, we invite you to explore Hamraz, Afarina, and EcoHub. Welcome to the new era.
            </p>
          </div>
          <Separator />
          <div className="prose prose-sm max-w-none text-muted-foreground text-right whitespace-pre-wrap" dir="rtl">
            <p>
             ما شما را از زبان‌آموزی به بهره‌مندی از مزایای مادی و معنوی کل این سیستم و رسیدن به مدارج بالای مدیریتی در **«توانا»** بشارت می‌دهیم؛ شهری مجازی که در دل اکوسیستم **«آفرینش»** به وجود آمد. این شهر از لحاظ ایده و فلسفه، یک نوآوری بی‌همتا در جهان است که از هیچ ایده‌ای کپی نشده و خود یک شهر مجازی تمدن‌ساز، مرجع و مدلی جدید برای شهرهای مجازی دنیا خواهد بود. شهری که ایده را از مجاز به حقیقت برای همگان آشکار می‌کند و این مفهوم به‌ظاهر پیچیده را با مفاهیم عامیانه و ساده برای آنان که حتی نمی‌دانند شهر مجازی چیست، معنی می‌بخشد.
            </p>
            <p>
              هر اپلیکیشن در این اکوسیستم، لیگ و جوایز رویایی خود را دارد. به عنوان یک شهروند این اکوسیستم «آفرینش»، شما می‌توانید به عنوان کاربر مهمان در اپ‌های دیگر حضور یابید، به جوامع آنها بپیوندید و شانس برنده شدن جوایز بی‌نظیر آنها را داشته باشید. پاداش نهایی تلاش‌های شما در این جهان، کسب جایگاه‌های رفیع در پایتخت، یعنی «شهر توانا» است. با رسیدن به «شورای امپراتور» در اینجا، شما برای مناصب رهبری، مشوق‌های مالی و حتی مالکیت زمین در آن دنیا واجد شرایط می‌شوید. رهبران «انجمن زبان‌های خارجی توانا» از میان اعضای همین شورا انتخاب می‌شوند.
            </p>
            <p>
              برای آنکه به درستی درک کنید چه ساخته‌ایم، شما را به کاوش در «همراز»، «آفرینا» و «اکوهاب» دعوت می‌کنیم. به عصر جدید خوش آمدید.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    