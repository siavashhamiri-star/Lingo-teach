

'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Megaphone, Handshake, Target, BarChart2, PlusCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const adPackages = [
    {
      name: 'Starter',
      price: 'Free',
      features: ['Showcase in Partner section for 1 month', '1 featured post in community']
    },
    {
      name: 'Professional',
      price: 'Bidding-based',
      features: ['Dedicated ad banner on relevant pages', 'Targeted audience based on level', 'Performance analytics']
    },
     {
      name: 'Enterprise',
      price: 'Contact Us',
      features: ['Full platform sponsorship', 'API integration', 'Custom campaigns']
    },
]


export default function AdPlatformPage() {
    const { toast } = useToast();

    const handleAdSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Campaign Submitted for Review!',
            description: 'Your advertising campaign details have been submitted. Our team will review it and get back to you shortly.'
        });
    }

  return (
    <div>
      <PageHeader
        title="Advertising Platform"
        description="Reach a highly engaged audience of language learners and educators."
        icon={Megaphone}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Target />Why Advertise with Us?</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg"><Handshake className="w-6 h-6 text-primary" /></div>
                        <div>
                            <h3 className="font-semibold">Engaged Community</h3>
                            <p className="text-muted-foreground text-sm">Connect with thousands of dedicated students, teachers, and language enthusiasts who are actively seeking learning tools.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg"><BarChart2 className="w-6 h-6 text-primary" /></div>
                        <div>
                            <h3 className="font-semibold">Targeted Reach</h3>
                            <p className="text-muted-foreground text-sm">Promote your app, website, or services directly to users based on their language level, goals, and interests.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

             <h2 className="text-2xl font-bold">Our Advertising Packages</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {adPackages.map((pkg, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{pkg.name}</CardTitle>
                            <CardDescription className="text-2xl font-bold text-primary">{pkg.price}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2">
                             {pkg.features.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                                    <span className="text-muted-foreground text-sm">{feature}</span>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button variant={pkg.name === "Starter" ? "outline" : "default"} className="w-full">
                                {pkg.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
             </div>

        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                 <CardHeader>
                    <CardTitle>Launch Your Campaign</CardTitle>
                    <CardDescription>Submit your ad for review. For bidding-based packages, please visit the Bidding Hall.</CardDescription>
                </CardHeader>
                <form onSubmit={handleAdSubmit}>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="company-name">Your Company/App Name</Label>
                            <Input id="company-name" placeholder="e.g., VocabBoost" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="ad-copy">Ad Copy / Slogan</Label>
                            <Input id="ad-copy" placeholder="e.g., Master vocabulary faster." required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="ad-details">Additional Details</Label>
                            <Textarea id="ad-details" placeholder="Briefly describe your service and target audience..." />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Submit Campaign
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
      </div>
    </div>
  );
}
