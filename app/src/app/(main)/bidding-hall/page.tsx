
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Gavel, Languages, BookText, FileText, PlusCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const sampleProjects = [
    {
      id: 1,
      type: 'Translation',
      title: 'Translate a 500-word business article from English to Persian',
      budget: 'Up to $25',
      bids: 5,
      icon: Languages,
    },
    {
      id: 2,
      type: 'Content Creation',
      title: 'Write a short, engaging children\'s story about a dragon who loves to cook',
      budget: 'Up to $30',
      bids: 8,
      icon: BookText,
    },
    {
      id: 3,
      type: 'Technical Writing',
      title: 'Create a 1-page summary of a scientific paper on AI',
      budget: 'Up to $50',
      bids: 3,
      icon: FileText,
    }
]


export default function BiddingHallPage() {
    const { toast } = useToast();

    const handlePostProject = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Project Posted!',
            description: 'Your project is now open for bids from our language experts.'
        });
    }
    
    const handlePlaceBid = (projectId: number) => {
        toast({
            title: 'Bid Placed!',
            description: `Your bid for project #${projectId} has been submitted.`
        });
    }

  return (
    <div>
      <PageHeader
        title="Content Bidding Hall"
        description="Post a project and let experts bid to create it for you. The core of the Afarinesh economy."
        icon={Gavel}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Open for Bids</h2>
            {sampleProjects.map((project) => (
                <Card key={project.id} className="shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <Badge variant='secondary' className="gap-2">
                                <project.icon className="h-4 w-4" />
                                {project.type}
                            </Badge>
                            <div className="text-right">
                                <p className="font-bold">{project.budget}</p>
                                <p className="text-xs text-muted-foreground">{project.bids} bids so far</p>
                            </div>
                        </div>
                        <CardTitle className="pt-2">{project.title}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={() => handlePlaceBid(project.id)}>
                            <Gavel className="mr-2 h-4 w-4" />
                            Place a Bid
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                 <CardHeader>
                    <CardTitle>Post a New Project</CardTitle>
                    <CardDescription>Get custom content created by the community.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePostProject}>
                    <CardContent className="space-y-4">
                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>How It Works</AlertTitle>
                            <AlertDescription>
                                Post your project, receive bids from qualified users, and select the best one. Payment is held securely until the work is completed and approved.
                            </AlertDescription>
                        </Alert>
                         <div className="space-y-2">
                            <Label htmlFor="project-title">Project Title</Label>
                            <Input id="project-title" placeholder="e.g., Translate a short email" required />
                        </div>
                         <div className="space-y-2">
                             <Label htmlFor="project-type">Project Type</Label>
                             <Select required>
                                <SelectTrigger id="project-type">
                                    <SelectValue placeholder="Select a project type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="translation"><div className="flex items-center gap-2"><Languages className="h-4 w-4" /> Translation</div></SelectItem>
                                    <SelectItem value="content-creation"><div className="flex items-center gap-2"><BookText className="h-4 w-4" /> Content Creation</div></SelectItem>
                                    <SelectItem value="technical-writing"><div className="flex items-center gap-2"><FileText className="h-4 w-4" /> Technical Writing</div></SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                             </Select>
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="project-description">Detailed Description</Label>
                            <Textarea id="project-description" placeholder="Describe your requirements, length, and any other details..." required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="project-budget">Your Budget (USD)</Label>
                            <Input id="project-budget" type="number" placeholder="e.g., 25" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Post Project to Bidding Hall
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
      </div>
    </div>
  );
}
