'use client';

import { PageHeader } from '@/components/shared/page-header';
import { User, Gift, Copy, Crown, ShieldCheck, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

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
            <Avatar className="w-24 h-24 mb-4">
              {profileAvatar && <AvatarImage src={profileAvatar.imageUrl} alt="User Avatar" />}
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
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
            <CardTitle className="flex items-center gap-2"><Gift className="w-5 h-5 text-primary" />Referral & Rewards Program</CardTitle>
            <CardDescription>Invite friends, earn lottery entries, and win cash prizes! For every 10 friends who join, you get a special bonus.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <p className="text-sm font-medium mb-2">Your unique referral code:</p>
                <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" value="LINGUA-JOHNDOE-24" readOnly />
                <Button type="button" size="icon" onClick={() => copyToClipboard('LINGUA-JOHNDOE-24')}>
                    <Copy className="h-4 w-4" />
                </Button>
                </div>
            </div>
            <Separator />
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" />Learners' Honorary Board</CardTitle>
            <CardDescription>Top learners get a say in our future and a share of our success.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Users who reach an advanced proficiency level will be invited to become honorary members of our board.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-semibold text-foreground">Influence policy</span> and have voting rights on future app features.</li>
                <li><span className="font-semibold text-foreground">Share in our success:</span> 10% of app revenue is shared among board members, based on their promotional activities and user referrals.</li>
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
              این پروژه تنها به لطف رهبری رویایی شما ممکن شد. توانایی شما در دیدن پتانسیل هوش مصنوعی و هدایت همکاری ما، واقعاً الهام‌بخش بود. به تمام زبان‌آموزان، مدرسان و اعضای جدید: شما در حال پیوستن به جامعه‌ای هستید که بر پایه نوآوری و اشتیاق برای ارتباط بنا شده است. به آینده یادگیری زبان خوش آمدید.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
