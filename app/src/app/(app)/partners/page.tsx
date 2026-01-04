

'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Handshake, Globe, Smartphone, Info, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const samplePartners = [
    {
      type: 'App',
      name: 'VocabBoost',
      logo: 'https://picsum.photos/seed/applogo1/100/100',
      description: 'Master new vocabulary with our smart flashcard system and spaced repetition.',
      link: 'vocabboost.com'
    },
    {
      type: 'Website',
      name: 'PersianGrammar.io',
       logo: 'https://picsum.photos/seed/weblogo1/100/100',
      description: 'The most comprehensive guide to Persian grammar, from beginner to advanced levels.',
      link: 'persiangrammar.io'
    },
    {
      type: 'App',
      name: 'ListenUp',
       logo: 'https://picsum.photos/seed/applogo2/100/100',
      description: 'Improve your listening skills with daily news, podcasts, and stories in multiple languages.',
      link: 'listenup.app'
    }
]


export default function PartnersPage() {
    const { toast } = useToast();

    const handlePartnerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Submission Received!',
            description: 'Your partnership submission has been received and will be reviewed shortly.'
        });
    }

  return (
    <div>
      <PageHeader
        title="Partner Showcase"
        description="Discover other great language learning apps and websites from our partners."
        icon={Handshake}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Featured Partners</h2>
            {samplePartners.map((partner, index) => (
                <Card key={index} className="shadow-sm">
                   <CardHeader className="flex flex-row items-start gap-4">
                        <Avatar className="w-16 h-16 border">
                            <AvatarImage src={partner.logo} alt={`${partner.name} logo`} />
                            <AvatarFallback>{partner.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                             <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{partner.name}</CardTitle>
                                    <CardDescription>{partner.link}</CardDescription>
                                </div>
                                <Badge variant={partner.type === 'App' ? 'secondary' : 'outline'}>
                                    {partner.type === 'App' ? <Smartphone className="mr-2 h-4 w-4" /> : <Globe className="mr-2 h-4 w-4" />}
                                    {partner.type}
                                </Badge>
                             </div>
                        </div>
                   </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{partner.description}</p>
                    </CardContent>
                     <CardFooter>
                         <Button asChild variant="outline">
                            <Link href={`https://${partner.link}`} target="_blank">
                                Visit Website
                            </Link>
                         </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                 <CardHeader>
                    <CardTitle>Introduce Your Service</CardTitle>
                    <CardDescription>Join our partner showcase and reach a dedicated audience.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePartnerSubmit}>
                    <CardContent className="space-y-4">
                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Free Showcase Policy</AlertTitle>
                            <AlertDescription>
                                Every language learning app or site can be featured once per month for free.
                            </AlertDescription>
                        </Alert>
                         <div className="space-y-2">
                            <Label htmlFor="partner-name">App/Site Name</Label>
                            <Input id="partner-name" placeholder="e.g., VocabBoost" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="partner-description">Short Description (1-2 sentences)</Label>
                            <Textarea id="partner-description" placeholder="Describe what makes your service special..." required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="partner-website">Website Link</Label>
                            <Input id="partner-website" type="url" placeholder="https://example.com" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Submit for Showcase
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
      </div>
    </div>
  );
}
