import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BotMessageSquare, BrainCircuit, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/icons/logo';
import AfarineshLogo from '@/components/icons/afarinesh-logo';
import TavanaLogo from '@/components/icons/tavana-logo';

const featureCards = [
  {
    icon: <BotMessageSquare className="h-8 w-8 text-primary" />,
    title: 'Bilingual Chatbot',
    description: 'Practice Persian-to-English or English-to-Persian. Converse with our AI tutor.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Personalized Learning',
    description: 'AI-driven analysis of your skills to create tailored lessons and exercises.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Vibrant Community',
    description: 'Connect with fellow learners, form teams, and compete in Tavana.',
  },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">LinguaWeave</span>
        </Link>
        <Button asChild>
          <Link href="/dashboard">
            Enter Afarinesh <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>

      <main className="flex-grow text-center">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-foreground">
                The Art of Persian,
                <br />
                <span className="text-primary">Mastered with AI.</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                Welcome to Afarinesh (Creation). Join the innovative, AI-powered ecosystem to honor and learn the beautiful Persian language.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Start Your Journey</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="/philosophy-gems">Our Grand Vision</Link>
                </Button>
              </div>
            </div>
          </div>
          {heroImage && (
            <div className="absolute inset-0 -z-10 h-full w-full">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>
          )}
        </section>

        <section id="features" className="py-20 md:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline">A Smarter Way to Learn</h2>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {featureCards.map((feature, index) => (
                <Card key={index} className="bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section id="vision" className="py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-16 max-w-4xl mx-auto">
                    <Card className="bg-gradient-to-br from-primary/5 via-background to-accent/5 shadow-xl p-8">
                        <div className="flex flex-col items-center mb-8">
                             <TavanaLogo className="w-16 h-16 text-primary mb-2" />
                             <h2 className="text-3xl font-bold font-headline">Welcome to "Tavana"</h2>
                             <p className="text-muted-foreground">The Empowered City of Afarinesh</p>
                        </div>
                        <div className="text-center text-muted-foreground space-y-6">
                            <blockquote className="border-l-4 border-accent pl-4 italic text-foreground text-xl">
                                "You are me, and I am you. Together, we believe in each other. We are capable for one purpose: for creation, for empowerment, for each other."
                            </blockquote>
                            <p className="text-lg">
                                In Tavana, you are a citizen. Master skills to build a new civilization. Learning is the currency, and creativity is the industry.
                            </p>
                             <div className="pt-6">
                                <Button asChild size="lg">
                                  <Link href="/philosophy-gems">
                                    Read the Full Philosophy <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LinguaWeave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
