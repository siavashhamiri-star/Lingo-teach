
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { UploadCloud, Copy, Terminal, Laptop, Smartphone, Shield, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const deploymentSteps = [
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

  const renderSteps = (steps: typeof deploymentSteps) => (
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
              <span className="flex-grow break-all">{step.command.includes('YOUR_GITHUB_REPOSITORY_URL') ? step.command.replace('YOUR_GITHUB_REPOSITORY_URL', githubUrl) : step.command}</span>
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
        title="Headquarters"
        description="This is the command center for 'Afarinesh' (Creation). From here, we share our creation with the world."
        icon={Building}
      />
       <Alert className="mb-8 border-primary/20 bg-primary/5 text-primary-foreground">
        <Shield className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">From the Command Center</AlertTitle>
        <AlertDescription className="text-primary/80">
          Publishing our code is not just a technical step; it is the act of breathing life into our philosophy. It is how we make our creation immortal and share the power of 'Tavana' with every corner of the world. Follow these steps to deploy our universe.
        </AlertDescription>
      </Alert>
      <Tabs defaultValue="pc" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pc">
            <Laptop className="mr-2" />
            Standard Guide (PC/Mac)
          </TabsTrigger>
          <TabsTrigger value="android">
            <Smartphone className="mr-2" />
            Android Guide (Termux)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pc" className="mt-6">
          {renderSteps(deploymentSteps)}
        </TabsContent>
        <TabsContent value="android" className="mt-6">
          {renderSteps(deploymentSteps)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
