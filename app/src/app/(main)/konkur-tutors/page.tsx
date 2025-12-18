
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { BookMarked, Loader2, PlusCircle, School, ShieldCheck, UserCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const konkurTutors = [
    {
      name: 'Dr. Reza Karimi',
      specialty: 'Chemistry & Physics',
      description: 'Over 15 years of experience with top rankings. Known for simplifying complex topics.',
      isVerified: true
    },
    {
      name: 'Ms. Maryam Hedayati',
      specialty: 'Biology',
      description: 'Specialized methods for memorization and deep understanding of biology concepts for top medical school applicants.',
      isVerified: true
    },
]

const languageTutors = [
     {
      name: 'Mr. Kianoush Aria',
      specialty: 'English Language',
      description: 'IELTS 8.5 holder. Specialized in grammar and advanced vocabulary for the language-specific university entrance exam.',
      isVerified: true
    },
     {
      name: 'Ms. Sahar Tavakoli',
      specialty: 'French & German Language',
      description: 'MA in Translation Studies. Focus on reading comprehension and cloze tests for the language-specific exam.',
      isVerified: false
    },
    {
      name: 'Dr. Ahmad Alavi',
      specialty: 'Arabic Language',
      description: 'PhD in Arabic Literature. Specialized in translation techniques and grammar for the Konkur exam, with a track record of high-scoring students.',
      isVerified: true
    },
]


export default function KonkurTutorsPage() {
    const { toast } = useToast();

    const handleTutorSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Submission Received!',
            description: 'Your application has been submitted and will be reviewed by our team.'
        });
    }

  return (
    <div>
      <PageHeader
        title="Top Konkur Tutors"
        description="Find verified and top-rated tutors for university entrance exams."
        icon={BookMarked}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">National Konkur Tutors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {konkurTutors.map((tutor, index) => (
                        <Card key={index} className="shadow-sm">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{tutor.name}</CardTitle>
                                    {tutor.isVerified && <Badge>Verified</Badge>}
                                </div>
                                <CardDescription>{tutor.specialty}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{tutor.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">View Profile & Reviews</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <Separator />

             <div>
                <h2 className="text-2xl font-bold mb-4">Specialized Language Konkur Tutors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {languageTutors.map((tutor, index) => (
                        <Card key
={index} className="shadow-sm">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{tutor.name}</CardTitle>
                                    {tutor.isVerified && <Badge>Verified</Badge>}
                                </div>
                                <CardDescription>{tutor.specialty}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{tutor.description}</p>
                            </CardContent>
                             <CardFooter>
                                <Button variant="outline">View Profile & Reviews</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                 <CardHeader>
                    <CardTitle>Join the Ranks of Top Tutors</CardTitle>
                    <CardDescription>Showcase your expertise and reach thousands of dedicated students.</CardDescription>
                </CardHeader>
                <form onSubmit={handleTutorSubmit}>
                    <CardContent className="space-y-4">
                        <Alert>
                            <ShieldCheck className="h-4 w-4" />
                            <AlertTitle>Verification Process</AlertTitle>
                            <AlertDescription>
                                To maintain the quality of our platform, all submissions undergo a verification process. After submitting your initial information, our team will contact you to verify your credentials and track record.
                            </AlertDescription>
                        </Alert>
                         <div className="space-y-2">
                            <Label htmlFor="tutor-name">Your Name</Label>
                            <Input id="tutor-name" placeholder="e.g., Dr. Reza Karimi" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="tutor-specialty">Your Specialty</Label>
                            <Input id="tutor-specialty" placeholder="e.g., Chemistry, English Language Konkur" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="tutor-bio">Short Bio & Track Record</Label>
                            <Textarea id="tutor-bio" placeholder="Describe your experience, teaching methods, and student success stories..." required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Submit for Review
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
      </div>
    </div>
  );
}
