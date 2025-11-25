
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { BrainCircuit, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { menuItems } from '@/lib/menu-items';
import { Progress } from '@/components/ui/progress';

const learningPlan = [
    { day: 'Monday', title: 'Start with a Story', description: 'Boost your comprehension with a new bilingual story.', href: '/stories', completed: true },
    { day: 'Tuesday', title: 'Translation Challenge', description: 'Practice new vocabulary from yesterday\'s story.', href: '/translation', completed: true },
    { day: 'Wednesday', title: 'Conversation Practice', description: 'Discuss the story topic with the AI chatbot.', href: '/chatbot', completed: false },
    { day: 'Thursday', title: 'Accent Training', description: 'Perfect your pronunciation of key phrases.', href: '/accent-training', completed: false },
    { day: 'Friday', title: 'Weekly Listening', description: 'Listen to an article related to your goals.', href: '/listening', completed: false },
    { day: 'Saturday', title: 'IELTS Speaking Prep', description: 'Join an AI-led workshop for exam success.', href: '/ielts-toefl-prep', premium: true, completed: false },
    { day: 'Sunday', title: 'Review & Relax', description: 'Review your flashcards in the Leitner Box.', href: '/leitner-box', completed: false },
]

export default function LearningPathPage() {
    
    const getIconForHref = (href: string) => {
        const menuItem = menuItems.find(item => item.href === href);
        return menuItem ? <menuItem.icon className="w-6 h-6 text-primary" /> : <BrainCircuit className="w-6 h-6 text-primary" />;
    }

    const completedCount = learningPlan.filter(item => item.completed).length;
    const progressPercentage = (completedCount / learningPlan.length) * 100;

  return (
    <div>
      <PageHeader
        title="Your Learning Path"
        description="Your AI-powered weekly plan to language mastery."
        icon={BrainCircuit}
      />
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>This Week's Progress</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Your weekly goal</span>
                  <span className="text-sm text-muted-foreground">
                    {completedCount} / {learningPlan.length} tasks
                  </span>
                </div>
                <Progress value={progressPercentage} />
            </CardContent>
        </Card>

      <div className="relative">
         <div className="absolute left-4 md:left-6 top-0 h-full w-0.5 bg-border -z-10" />

        <div className="space-y-8">
            {learningPlan.map((item, index) => (
                <div key={index} className="flex items-start gap-4 md:gap-8">
                    <div className="flex items-center flex-col gap-2">
                         <div className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border-2 ${item.completed ? 'bg-primary border-primary' : 'bg-background border-border'}`}>
                             {item.completed ? (
                                <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
                             ) : (
                                <span className={`text-xs md:text-sm font-bold ${item.completed ? 'text-primary-foreground' : 'text-muted-foreground'}`}>{item.day.substring(0,3)}</span>
                             )}
                        </div>
                    </div>

                    <Card className={`flex-1 ${item.completed ? 'opacity-60' : 'shadow-md'}`}>
                        <CardHeader className="flex flex-row items-start justify-between gap-4">
                            <div className="space-y-1.5">
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </div>
                            <div className="bg-primary/10 p-3 rounded-lg">
                                {getIconForHref(item.href)}
                            </div>
                        </CardHeader>
                         <CardContent>
                            <Button asChild variant={item.completed ? "secondary" : "default"} size="sm" disabled={item.completed}>
                                <Link href={item.href}>
                                    {item.completed ? 'Completed' : 'Start Task'}
                                    {!item.completed && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Link>
                            </Button>
                             {item.premium && <Badge variant="destructive" className="ml-2">Premium</Badge>}
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
