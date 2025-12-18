
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Megaphone, Building, User, Info, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const sampleAds = [
    {
      type: 'Teacher',
      name: 'Dr. Anahita Rezai, PhD',
      title: 'IELTS Speaking & Writing Expert',
      description: 'Ace your IELTS test with personalized coaching. I offer mock tests, detailed feedback, and strategies to boost your score to 7+.',
      contact: 'Contact via app message',
      isVerified: true
    },
    {
      type: 'Institute',
      name: 'ZabanNegar Institute',
      title: 'General English & TOEFL Prep Courses',
      description: 'New semester registration is open! We offer online and in-person classes for all levels. Free placement test available.',
      contact: 'zabanegar.com',
      isVerified: true
    },
    {
      type: 'Teacher',
      name: 'Kian Parsa',
      title: 'Conversational Persian Tutor',
      description: 'Learn to speak Persian like a native! I focus on practical conversation skills for everyday situations and travel.',
      contact: 'Telegram: @KianParsa',
      isVerified: false
    }
]


export default function AdPlatformPage() {
    const { toast } = useToast();

    const handlePostAd = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Ad Submitted!',
            description: 'Your ad has been submitted for review and will be posted shortly.'
        });
    }

  return (
    <div>
      <PageHeader
        title="Ad Platform"
        description="Connect with language teachers and institutes."
        icon={Megaphone}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Featured Ads</h2>
            {sampleAds.map((ad, index) => (
                <Card key={index} className="shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <Badge variant={ad.type === 'Institute' ? 'secondary' : 'outline'}>
                                {ad.type === 'Institute' ? <Building className="mr-2 h-4 w-4" /> : <User className="mr-2 h-4 w-4" />}
                                {ad.type}
                            </Badge>
                             {ad.isVerified && <Badge>Verified</Badge>}
                        </div>
                        <CardTitle className="pt-2">{ad.title}</CardTitle>
                        <CardDescription>By {ad.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{ad.description}</p>
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm font-semibold">Contact: {ad.contact}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                 <CardHeader>
                    <CardTitle>Post Your Ad</CardTitle>
                    <CardDescription>Reach thousands of dedicated language learners.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePostAd}>
                    <CardContent className="space-y-4">
                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Free Ad Policy</AlertTitle>
                            <AlertDescription>
                                Every teacher and institute can post one free ad per month. Additional ads require a premium plan.
                            </AlertDescription>
                        </Alert>
                         <div className="space-y-2">
                            <Label htmlFor="ad-title">Ad Title</Label>
                            <Input id="ad-title" placeholder="e.g., IELTS Prep Course" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="ad-description">Description</Label>
                            <Textarea id="ad-description" placeholder="Describe your service, course, or offer..." required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ad-contact">Contact Info</Label>
                            <Input id="ad-contact" placeholder="e.g., your website, email, or social media" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Post My Free Ad
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
      </div>
    </div>
  );
}

    