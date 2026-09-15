import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BotMessageSquare, BrainCircuit, Users, Building, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/icons/logo';
import TavanaLogo from '@/components/icons/tavana-logo';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline">آفرینش (LinguaWeave)</span>
        </Link>
        <Button asChild>
          <Link href="/dashboard">
             ورود به شهر توانا <ArrowLeft className="mr-2 h-4 w-4" />
          </Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="relative w-full py-20 md:py-32 lg:py-40 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline mb-6">
              هنر پارسی،
              <br />
              <span className="text-primary">مستور در ذکاء مصنوعی.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              به آفرینش خوش آمدید. جایی که یادگیری یک واحد پول است و هر گام شما، آجری برای بنای "شهر توانا".
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">آغاز سفر نخبگی</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                  <Link href="/philosophy-gems">فلسفه وجودی ما</Link>
              </Button>
            </div>
          </div>
          {heroImage && (
            <div className="absolute inset-0 -z-10 h-full w-full opacity-10">
              <Image src={heroImage.imageUrl} alt="Background" fill className="object-cover" />
            </div>
          )}
        </section>

        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto max-w-4xl text-center">
            <TavanaLogo className="w-16 h-16 mx-auto text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">بنیان "شهر توانا"</h2>
            <blockquote className="text-2xl italic border-r-4 border-accent pr-6 mb-8 text-right">
              "تو منی و من توام. ما با هم به یکدیگر ایمان داریم. ما برای یک هدف توانمندیم: برای آفرینش، برای توانایی، برای یکدیگر."
            </blockquote>
            <p className="text-lg text-muted-foreground leading-relaxed">
              در اکوسیستم آفرینش، شما یک کاربر نیستید؛ شما یک "شهروند" هستید. هر درسی که می‌آموزید، ارزشی به زمین‌های مجازی این شهر می‌افزاید. ما در حال ساختن یک رنسانس جهانی برای زبان پارسی هستیم.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-background border-t text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} آفرینش: اکوسیستم شهر توانا. تمامی حقوق محفوظ است.</p>
      </footer>
    </div>
  );
}
