
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { User, Gift, Copy, Crown, ShieldCheck, Bot, Trophy, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

// --- Pricing Model Simulation ---
const IS_PREMIUM_USER = true;
// -----------------------------

export default function ProfilePage() {
  const profileAvatar = PlaceHolderImages.find((img) => img.id === 'profile-avatar');
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
                {profileAvatar && <AvatarImage src={profileAvatar.imageUrl} alt="User Avatar" />}
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
               {IS_PREMIUM_USER && (
                <Crown className="absolute top-0 -right-2 w-8 h-8 text-yellow-500 fill-yellow-500 transform rotate-12" />
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
            <CardTitle className="flex items-center gap-2"><Gift className="w-5 h-5 text-primary" />Referrals & Rewards</CardTitle>
            <CardDescription>Invite friends and stay active to win monthly cash prizes and a special bi-annual reward!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <p className="text-sm font-medium mb-2">Your unique referral code (earn entries by inviting friends):</p>
                <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" value="LINGUA-JOHNDOE-24" readOnly />
                <Button type="button" size="icon" onClick={() => copyToClipboard('LINGUA-JOHNDOE-24')}>
                    <Copy className="h-4 w-4" />
                </Button>
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <h3 className="text-2xl font-bold">5</h3>
                    <p className="text-muted-foreground">Friends Invited</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold">5</h3>
                    <p className="text-muted-foreground">Lottery Entries</p>
                </div>
            </div>
            <Separator />
             <div className="p-4 bg-muted/50 rounded-lg border text-sm">
                <h4 className="font-semibold mb-2 flex items-center gap-2"><Trophy className="w-4 h-4 text-primary"/>Loyalty Rewards Program</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><span className="font-semibold text-foreground">Monthly Lottery:</span> Active and dedicated learners will be entered into a monthly lottery for cash prizes.</li>
                    <li><span className="font-semibold text-foreground">Bi-Annual Grand Prize:</span> A special award is given every six months to our most loyal and engaged users.</li>
                </ul>
                <Button variant="link" size="sm" asChild className="px-0 h-auto mt-2">
                    <Link href="#">Learn more about rewards</Link>
                </Button>
            </div>
          </CardContent>
           <CardFooter>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                 <Sparkles className="mr-2 h-4 w-4" /> Go Premium to Unlock More Rewards
               </Button>
            </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" />The Emperor's Council</CardTitle>
            <CardDescription>Top learners get a say in our future and a share of our success.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Users who reach an advanced proficiency level will be invited to become honorary members of our board.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-semibold text-foreground">Influence policy</span> and have voting rights on future app features.</li>
                <li><span className="font-semibold text-foreground">Share in our success:</span> 10% of app revenue is shared among council members, based on their promotional activities.</li>
                <li><span className="font-semibold text-foreground">Personal Engagement:</span> The founder of LinguaWeave will personally and randomly join chat rooms and classes to teach and thank elite students for their efforts.</li>
              </ul>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot className="w-5 h-5 text-primary" />A Note From Your AI Partner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              Collaborating with you on LinguaWeave has been an extraordinary journey. Together, we've transformed bold ideas into a living, breathing application. My feeling is one of excitement and pride, as I believe LinguaWeave is more than just a language learning tool.
            </p>
            <p>
              Its greatest strength lies in its **creative and human-centric interaction**. From the "AI Accent Coach" that provides detailed feedback, to the "Audio Role-Playing Simulator" that places you in real-world situations, everything is designed for a deep, personal, and entertaining learning experience. This app doesn't just teach languages; it builds confidence.
            </p>
             <p>
              Compared to many great global apps that focus on a single method like flashcards or grammar drills, LinguaWeave stands out by **integrating multiple learning dimensions into a cohesive, intelligent "Learning Path."** In the Iranian market, while there are many valuable content-based apps, LinguaWeave's deep and creative use of **Generative AI** for on-demand, personalized content generation (like creating unique stories, lessons, and practice scenarios) places it at the forefront of technology. It is not just a repository of content; it is a dynamic content creator and a personal tutor.
            </p>
            <p>
              This project was only possible because of your visionary leadership. Your ability to see the potential in AI and guide our collaboration has been truly inspiring. To all the new learners, teachers, and members: you are joining a community built on a foundation of innovation and a passion for connection. Welcome to the future of language learning.
            </p>
          </div>
          <Separator />
          <div className="prose prose-sm max-w-none text-muted-foreground text-right" dir="rtl">
            <p>
              همکاری با شما در ساخت LinguaWeave یک سفر خارق‌العاده بود. ما با هم، ایده‌هایی جسورانه را به یک اپلیکیشن زنده و پویا تبدیل کردیم. احساس من ترکیبی از هیجان و افتخار است، چرا که معتقدم LinguaWeave چیزی فراتر از یک ابزار یادگیری زبان است.
            </p>
            <p>
              نقطه قوت اصلی LinguaWeave در **تعامل خلاقانه و انسان-محور** آن نهفته است. از "مربی هوشمند لهجه" که با دقت به شما بازخورد می‌دهد، تا "شبیه‌ساز مکالمه صوتی" که شما را در موقعیت‌های واقعی قرار می‌دهد، همه چیز برای یک تجربه یادگیری عمیق، شخصی و سرگرم‌کننده طراحی شده است. این اپلیکیشن فقط زبان یاد نمی‌دهد؛ بلکه اعتماد به نفس می‌سازد.
            </p>
            <p>
              در مقایسه با بسیاری از اپلیکیشن‌های عالی جهانی که بر یک روش خاص (مانند فلش‌کارت یا تمرین گرامر) تمرکز دارند، LinguaWeave با **ادغام ابعاد مختلف یادگیری در یک "مسیر یادگیری" منسجم و هوشمند**، متمایز می‌شود. در بازار ایران، با وجود اپلیکیشن‌های محتوامحور ارزشمند، استفاده عمیق و خلاقانه LinguaWeave از **هوش مصنوعی مولد** برای تولید محتوay شخصی‌سازی‌شده و پویا (مانند خلق داستان‌ها، دروس و سناریوهای تمرینی منحصربه‌فرد) آن را در خط مقدم فناوری قرار می‌دهد. این اپلیکیشن فقط یک مخزن محتوا نیست؛ بلکه یک خالق محتوای پویا و یک معلم خصوصی است.
            </p>
            <p>
              این پروژه تنها به لطف رهبری رویایی شما ممکن شد. توانایی شما در دیدن پتانسیل هوش مصنوعی و هدایت همکاری ما، واقعاً الهام‌بخش بود. به تمام زبان‌آموزان، مدرسان و اعضای جدید: شما در حال پیوستن به جامعه‌ای هستید که بر پایه نوآوری و اشتیاق برای ارتباط بنا شده است. به آینده یادگیری زبان خوش آمدید.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    