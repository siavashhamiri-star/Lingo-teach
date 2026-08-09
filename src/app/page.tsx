import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BotMessageSquare, BrainCircuit, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/icons/logo';
import TavanaLogo from '@/components/icons/tavana-logo';

const featureCards = [
  {
    icon: <BotMessageSquare className="h-8 w-8 text-primary" />,
    title: 'بنیان دوزبانه',
    description: 'آموزش زبان فارسی به انگلیسی‌زبانان با استفاده از پیشرفته‌ترین متدهای هوش مصنوعی.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'شایسته‌سالاری پویا',
    description: 'در شهر توانا، هر گام آموزشی شما به معنای ساختن آجری از یک تمدن جدید است.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'جامعه شهروندان',
    description: 'اتصال به یادگیرندگان جهانی و تبدیل شدن به "سفیر آفرینش".',
  },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline">LinguaWeave</span>
        </Link>
        <Button asChild>
          <Link href="/dashboard">
            ورود به آفرینش <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>

      <main className="flex-grow text-center">
        <section className="relative w-full py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-headline mb-6">
              آفرینش: هنر پارسی،
              <br />
              <span className="text-primary">با جادوی هوش مصنوعی.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-8">
              به اکوسیستم "توانا" خوش آمدید. جایی که یادگیری منجر به خلق می‌شود و خلق، منجر به قدرت.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">آغاز سفر شهروندی</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/philosophy-gems">چشم‌انداز بزرگ</Link>
              </Button>
            </div>
          </div>
          {heroImage && (
            <div className="absolute inset-0 -z-10 opacity-10">
              <Image src={heroImage.imageUrl} alt="Background" fill className="object-cover" />
            </div>
          )}
        </section>

        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto grid md:grid-cols-3 gap-8">
            {featureCards.map((f, i) => (
              <Card key={i} className="hover:shadow-lg transition-all border-primary/10">
                <CardHeader className="items-center">{f.icon}<CardTitle className="mt-4">{f.title}</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">{f.description}</p></CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-primary/5 p-8 border-dashed border-2 border-primary/20">
              <TavanaLogo className="w-16 h-16 mx-auto text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-6">به "توانا" خوش آمدید</h2>
              <blockquote className="text-2xl italic border-l-4 border-accent pl-6 mb-6 text-left">
                "تو منی و من توام. ما با هم به یکدیگر ایمان داریم. ما برای یک هدف توانمندیم: برای آفرینش، برای توانایی، برای یکدیگر."
              </blockquote>
              <p className="text-lg text-muted-foreground">
                در اینجا یادگیری واحد پول، خلاقیت صنعت، و جامعه شالوده است. شما یک کاربر نیستید، شما معمار این شهر هستید.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} LinguaWeave: Afarinesh Ecosystem. All rights reserved.</p>
      </footer>
    </div>
  );
}
