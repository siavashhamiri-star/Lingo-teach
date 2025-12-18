
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { UploadCloud, Copy, Check, Terminal, Laptop, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const androidSteps = [
  {
    title: 'Initialize Git Repository',
    description: 'Tell Git to start tracking this project. This is done only once per project.',
    command: 'git init',
  },
  {
    title: 'Add All Files',
    description: 'Prepare all project files to be saved in the repository.',
    command: 'git add .',
  },
  {
    title: 'Create First Commit',
    description: 'Save the current state of your project with a descriptive message.',
    command: 'git commit -m "First commit: Initial project setup"',
  },
    {
    title: 'Rename Branch to main',
    description: 'Rename the default branch to "main", which is the modern standard.',
    command: 'git branch -M main',
  },
  {
    title: 'Connect to GitHub',
    description: 'Connect your local repository to the empty one you created on GitHub.',
    command: 'git remote add origin YOUR_GITHUB_REPOSITORY_URL',
    isInput: true,
  },
  {
    title: 'Push to GitHub',
    description: 'Send all your committed files to your GitHub repository, making it live.',
    command: 'git push -u origin main',
  },
];


export default function DeploymentPage() {
  const { toast } = useToast();
  const [githubUrl, setGithubUrl] = useState('https://github.com/YourUsername/YourRepo.git');

  const copyToClipboard = (text: string) => {
    // Replace placeholder for the command with the actual URL
    const commandToCopy = text.includes('YOUR_GITHUB_REPOSITORY_URL') ? text.replace('YOUR_GITHUB_REPOSITORY_URL', githubUrl) : text;
    navigator.clipboard.writeText(commandToCopy);
    toast({
      title: 'Copied to Clipboard!',
      description: `The command "${commandToCopy}" has been copied.`,
    });
  };

  const renderSteps = (steps: typeof androidSteps) => (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Step {index + 1}: {step.title}</CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {step.isInput && (
              <div className="mb-4 space-y-2">
                <Label htmlFor="github-url">Your GitHub Repository URL</Label>
                <Input 
                  id="github-url" 
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="Paste your GitHub repository URL here"
                />
              </div>
            )}
            <div className="flex items-center gap-4 p-3 bg-muted rounded-md font-mono text-sm">
              <Terminal className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-grow break-all">{step.command}</span>
              <Button size="icon" variant="ghost" onClick={() => copyToClipboard(step.command)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Deployment Guide"
        description="Publish your app to GitHub with these simple step-by-step guides."
        icon={UploadCloud}
      />
      <Tabs defaultValue="android" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="android">
            <Smartphone className="mr-2" />
            Android Guide (Termux)
          </TabsTrigger>
          <TabsTrigger value="pc">
            <Laptop className="mr-2" />
            Standard Guide (PC/Mac)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="android" className="mt-6">
          {renderSteps(androidSteps)}
        </TabsContent>
        <TabsContent value="pc" className="mt-6">
          {renderSteps(androidSteps)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

