
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BotMessageSquare, BrainCircuit, Users, Building, Sparkles, Globe } from 'lucide-react';
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
    description: 'Practice Persian-to-English or English-to-Persian. Converse with our AI, learning from real film and speech snippets.',
    image: PlaceHolderImages.find((img) => img.id === 'chatbot-roleplay'),
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Personalized Learning',
    description: 'AI-driven analysis of your skills to create tailored lessons and exercises just for you.',
    image: PlaceHolderImages.find((img) => img.id === 'interactive-exercise'),
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Vibrant Community',
    description: 'Connect with fellow learners, form teams, and compete in monthly championships.',
    image: PlaceHolderImages.find((img) => img.id === 'community-connect'),
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

      <main className="flex-grow">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-foreground">
                The Art of Persian,
                <br />
                <span className="text-primary">Mastered with AI.</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                Welcome to Afarinesh (Creation). Our primary mission is to teach the rich and beautiful Persian language to English speakers through an innovative, AI-powered ecosystem.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Start Your Journey</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="#vision">Our Grand Vision</Link>
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
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>
          )}
        </section>

        <section id="features" className="py-20 md:py-28 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline">A Smarter Way to Learn</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                LinguaWeave combines cutting-edge AI with proven learning methods to create an unparalleled language learning experience.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureCards.map((feature, index) => (
                <Card key={index} className="bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
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
                 <div className="text-center max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col items-center">
                           <AfarineshLogo className="w-10 h-10 text-accent" />
                           <p className="text-xs text-muted-foreground mt-1">Powered by GFBNewMeta</p>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold font-headline">
                            More Than an App, A New World
                        </h2>
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground">
                        LinguaWeave is your gateway into <span className="font-bold text-primary">"Afarinesh"</span> (Creation), a revolutionary ecosystem where learning leads to creation, and creation leads to empowerment.
                    </p>
                </div>
                <div className="mt-16 max-w-4xl mx-auto">
                    <Card className="bg-gradient-to-br from-primary/5 via-background to-accent/5 shadow-xl">
                        <CardHeader className="text-center">
                            <div className='flex flex-col items-center mb-4'>
                                <TavanaLogo className="w-12 h-12 mx-auto text-primary" />
                                <p className='text-xs text-muted-foreground mt-1'>Powered by GFBNewMeta</p>
                            </div>
                            <CardTitle className="text-2xl">Welcome to "Tavana" (The Empowered City)</CardTitle>
                            <CardDescription>The heart of the Afarinesh ecosystem.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground space-y-4">
                            <blockquote className="border-l-4 border-accent pl-4 italic text-foreground">
                                "You are me, and I am you. Together, we believe in each other. We are capable for one purpose: for creation, for empowerment, for each other."
                            </blockquote>
                            <p>
                                In Tavana, you are not just a user; you are a citizen. Every lesson you learn, every skill you master, and every creation you build contributes to the growth of this virtual city. Your effort doesn't just build your future; it builds a new civilization.
                            </p>
                            <p className="font-semibold text-foreground">
                                Here, learning is the currency, creativity is the industry, and community is the foundation. Join us, and build your dreams while building the city of dreams.
                            </p>
                            <p className="font-bold text-accent" dir="rtl">
                                شهر توانایی که به امید حق با برآوردهایی که می‌شود در آینده نزدیک ارزش افزوده هر زمین آن بسیار بسیار زیاد خواهد بود.
                            </p>
                             <div className="pt-4">
                                <Button asChild>
                                  <Link href="/philosophy-gems">
                                    Read the Full Philosophy <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <section id="global-vision" className="py-20 md:py-28 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline flex items-center justify-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                Our Global Vision
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our journey begins with a clear mission, but our ambition knows no borders.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-background/80">
                <CardHeader>
                  <CardTitle>A Universal Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Should this innovative language learning methodology be embraced by enthusiasts, we are committed to adapting it for other major world languages. Our vision is to build a global infrastructure for a new era of language education, inspired by this foundational model.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/80">
                <CardHeader>
                  <CardTitle>An Invitation to Learn Persian</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We extend a warm invitation to all English speakers who are passionate about learning the rich Persian language. Join our community and become part of this creative and empowering journey.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LinguaWeave. All rights reserved.</p>
           <p className="text-xs mt-2 italic">
            "We are capable for one purpose: for creation, for ability, for each other."
          </p>
        </div>
      </footer>
    </div>
  );
}
