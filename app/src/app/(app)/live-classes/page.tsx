

'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { School, Video, Calendar, Clock, Tag, Banknote, Sparkles, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const upcomingClasses = [
    {
      title: 'جمع‌بندی فیزیک کنکور - مبحث حرکت‌شناسی',
      tutor: 'Dr. Reza Karimi',
      tutorAvatar: 'https://picsum.photos/seed/tutor1/100/100',
      date: '1403/05/10',
      time: '18:00 - 20:00',
      price: '350,000 تومان',
      isLive: true,
    },
    {
      title: 'تکنیک‌های تست‌زنی زیست‌شناسی گیاهی',
      tutor: 'Ms. Maryam Hedayati',
      tutorAvatar: 'https://picsum.photos/seed/tutor2/100/100',
      date: '1403/05/12',
      time: '16:00 - 18:00',
      price: '300,000 تومان',
    },
    {
      title: 'کلاس فوق‌العاده درک مطلب زبان انگلیسی کنکور',
      tutor: 'Mr. Kianoush Aria',
      tutorAvatar: 'https://picsum.photos/seed/tutor3/100/100',
      date: '1403/05/15',
      time: '19:00 - 20:30',
      price: '250,000 تومان',
    },
]


export default function LiveClassesPage() {
    const { toast } = useToast();

    const handleRegister = (className: string) => {
        toast({
            title: 'ثبت‌نام اولیه انجام شد!',
            description: `شما برای کلاس «${className}» پیش‌ثبت‌نام شدید. لطفاً برای تکمیل ثبت‌نام، هزینه را پرداخت کنید.`
        });
    }

  return (
    <div>
      <PageHeader
        title="کلاس‌های زنده کنکور"
        description="در کلاس‌های آنلاین اساتید برتر شرکت کنید و برای کنکور آماده شوید."
        icon={School}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">کلاس‌های پیش رو</h2>
            {upcomingClasses.map((cls, index) => (
                <Card key={index} className="shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">{cls.title}</CardTitle>
                            {cls.isLive && (
                                <Badge variant="destructive" className="flex gap-1.5 animate-pulse">
                                    <Video className="h-4 w-4" />
                                    هم‌اکنون زنده
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                             <Avatar className="w-8 h-8 border">
                                <AvatarImage src={cls.tutorAvatar} alt={cls.tutor} />
                                <AvatarFallback>{cls.tutor.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <CardDescription>توسط {cls.tutor}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-sm">
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4"/>
                            <span>تاریخ: {cls.date}</span>
                         </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4"/>
                             <span>ساعت: {cls.time}</span>
                         </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Tag className="w-4 h-4"/>
                             <span>قیمت: <span className="font-bold text-foreground">{cls.price}</span></span>
                         </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => handleRegister(cls.title)}>
                            ثبت‌نام در کلاس
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" />کلاس خود را برگزار کنید</CardTitle>
                    <CardDescription>دانش خود را با هزاران داوطلب کنکور به اشتراک بگذارید و کسب درآمد کنید.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert>
                        <Banknote className="h-4 w-4" />
                        <AlertTitle>فرآیند مالی و تسویه حساب</AlertTitle>
                        <AlertDescription>
                            هزینه کلاس توسط دانش‌آموزان مستقیماً به حساب LinguaWeave واریز می‌شود. پس از اتمام موفقیت‌آمیز هر جلسه، سهم <strong>۷۰ درصدی</strong> استاد طبق قرارداد به حساب ایشان واریز می‌گردد و <strong>۳۰ درصد</strong> به عنوان کمیسیون به پلتفرم تعلق می‌گیرد.
                        </AlertDescription>
                    </Alert>
                    <p className="text-sm text-muted-foreground">
                        برای پیوستن به جمع اساتید ما و شروع به برگزاری کلاس، لطفاً ابتدا پروفایل خود را در بخش "اساتید برتر کنکور" ثبت و تایید کنید. پس از تایید، پنل برگزاری کلاس برای شما فعال خواهد شد.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button type="button" className="w-full" variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        شروع فرآیند همکاری
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
