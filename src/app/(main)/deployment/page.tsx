

'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Building, GitBranch, Github, Server, UploadCloud } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const githubSteps = [
    "Configure your Git identity.",
    "Create a new repository on GitHub.com.",
    "Initialize a local repository in your project folder.",
    "Add, commit, and rename the main branch.",
    "Connect your local repo to the remote GitHub repo.",
    "Push your code to GitHub."
]

const firebaseSteps = [
    "Create a new project in the Firebase Console.",
    "Navigate to App Hosting and connect to GitHub.",
    "Authorize Firebase to access your repository.",
    "Select your repository and `main` branch.",
    "Leave the 'Root directory' blank.",
    "Finish and deploy. Your app will go live automatically!"
]


export default function DeploymentPage() {

  return (
    <div>
      <PageHeader
        title="Headquarters: Deployment Center"
        description="Guides and status for publishing and deploying your application."
        icon={Building}
      />
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Github className="w-8 h-8"/>
                    <CardTitle className="text-2xl">Step 1: Publish to GitHub</CardTitle>
                </div>
                <CardDescription>Follow these steps to get your code onto GitHub. Full details are in `GITHUB-DEPLOYMENT-GUIDE.md`.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Show Publishing Steps</AccordionTrigger>
                        <AccordionContent>
                           <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                             {githubSteps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                           </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                     <div className="w-8 h-8 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" className="w-full h-full fill-current text-yellow-500">
                            <path d="M21.938 4.75a3 3 0 0 0-2.613 4.5l23.5 42a3 3 0 0 0 5.225 0l23.5-42a3 3 0 0 0-2.612-4.5zM77.438 29.75a3 3 0 0 0-3.618 1.969L51 82.25l-22.813-50.531a3 3 0 0 0-5.562 2.562l25.625 57a3 3 0 0 0 5.52 0l25.625-57a3 3 0 0 0-1.952-4.531z"/>
                        </svg>
                    </div>
                    <CardTitle className="text-2xl">Step 2: Deploy with Firebase</CardTitle>
                </div>
                <CardDescription>Automatically deploy your app every time you push to GitHub. Full details are in `FIREBASE-HOSTING-GUIDE.md`.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Show Deployment Steps</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                {firebaseSteps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                           </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

