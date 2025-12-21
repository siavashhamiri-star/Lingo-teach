
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Award, Star, User, GraduationCap, Medal, Landmark, Users as UsersIcon, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const topSkillStudents = [
    { name: 'Elena', avatarId: 'award-student-1', detail: 'Reached Level 155 (English)' },
    { name: 'Kenji', avatarId: 'award-student-2', detail: 'Top Score in IELTS Writing' },
    { name: 'Sara', avatarId: 'award-student-3', detail: 'Mastered Advanced Persian Grammar' },
];

const topSkillTeachers = [
    { name: 'Dr. Reza Karimi', avatarId: 'award-teacher-1', detail: 'Highest Rated Konkur Tutor' },
    { name: 'Ms. Maryam Hedayati', avatarId: 'award-teacher-2', detail: 'Most Successful Student Reviews' },
]

const mostDedicatedLearners = [
    { name: 'David', avatarId: 'duel-opponent-4', detail: '40 hours of practice this month' },
    { name: 'Maria', avatarId: 'award-student-1', detail: 'Completed 50 lessons in a row' },
    { name: 'Hassan', avatarId: 'award-student-2', detail: 'Highest participation in community rooms' },
];

const topAmbassadors = [
  { rank: 1, name: 'Elena', avatarId: 'ambassador-1', metric: '25 Referrals, 5K Likes' },
  { rank: 2, name: 'Kian', avatarId: 'ambassador-2', metric: '18 Referrals, 3.2K Likes' },
  { rank: 3, name: 'You', avatarId: 'ambassador-3', metric: '5 Referrals, 1.1K Likes' },
];


export default function MonthlyAwardsPage() {

  const rankColors = ['text-yellow-500', 'text-slate-400', 'text-orange-500'];

  const findImage = (id: string) => PlaceHolderImages.find(p => p.id === id);

  return (
    <div>
      <PageHeader
        title="Monthly Hall of Fame"
        description="Celebrating the achievements and dedication of our community members."
        icon={Award}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="text-yellow-500" />Top Performers (Skill)</CardTitle>
                <CardDescription>Recognizing the highest levels of skill and expertise achieved this month.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><GraduationCap />Top Teachers</h3>
                    <div className="space-y-4">
                        {topSkillTeachers.map((user, index) => {
                            const avatar = findImage(user.avatarId);
                            return (
                                <div key={index} className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-primary">
                                        {avatar && <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />}
                                        <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.detail}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Separator />
                 <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><User />Top Students</h3>
                    <div className="space-y-4">
                        {topSkillStudents.map((user, index) => {
                             const avatar = findImage(user.avatarId);
                             return (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 w-8 justify-center">
                                        <Medal className={`w-6 h-6 ${rankColors[index] || 'text-muted-foreground'}`} />
                                    </div>
                                    <Avatar className="h-12 w-12 border">
                                        {avatar && <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />}
                                        <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.detail}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Medal className="text-primary"/>Top Ambassadors (Influence)</CardTitle>
                <CardDescription>Honoring the top 10 ambassadors who promote Afarinesh.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Alert>
                    <AlertTitle>How are ambassadors chosen?</AlertTitle>
                    <AlertDescription>
                        Top ambassadors are selected based on a combination of successful user referrals via their unique code, and the social media impact (likes, shares, views) of their creations using the #Afarinesh hashtag.
                    </AlertDescription>
                </Alert>
                {topAmbassadors.map((user, index) => {
                     const avatar = findImage(user.avatarId);
                     return (
                         <div key={index} className="flex items-center gap-4">
                            <div className="flex items-center gap-2 w-8 justify-center">
                                <span className={`font-bold text-xl ${rankColors[index] || 'text-primary'}`}>#{user.rank}</span>
                            </div>
                            <Avatar className="h-12 w-12 border">
                                {avatar && <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint}/>}
                                <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.metric}</p>
                            </div>
                        </div>
                    )
                })}
                 <p className="text-sm text-muted-foreground text-center pt-4">...and 7 other top ambassadors!</p>
            </CardContent>
        </Card>
      </div>

       <Card className="mt-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <Landmark className="w-8 h-8 text-primary" />
                    The Founders' Promise: From Ambassador to Architect
                </CardTitle>
                <CardDescription>
                    This is more than a leaderboard; it's the path to becoming a true founder of the Afarinesh world.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <blockquote className="border-l-4 border-accent pl-4 text-lg italic text-foreground">
                   "Here, the system must truly be based on meritocracy, positive thinking, sacrifice, patience, hope, belief, and effort. This is a place where those who genuinely strive and believe in the system will rise."
                </blockquote>
                <p className="text-muted-foreground" dir="rtl">
                    "در اینجا سیستم واقعاً باید بر مبنای شایسته‌سالاری، مثبت‌اندیشی، فداکاری، صبر، امید، باور و تلاش باشد. اینجا جاییست که آن کسانی که واقعاً تلاش می‌کنند و سیستم را باور دارند، بالا خواهند رفت."
                </p>
                 <Separator className="my-6"/>
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive-foreground">
                    <ShieldAlert className="h-4 w-4 text-destructive" />
                    <AlertTitle>The Grand Challenge for Founding Members</AlertTitle>
                    <AlertDescription>
                         <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>The **first person** to successfully refer **100 people** within the first month of launch will be awarded a **one-year seat** in the Hall of Fame.</li>
                            <li>The **first person** to successfully refer **1,000 people** within the first six months of launch will be honored with a **five-year seat** on the "Emperor's Council" and will be recognized as a member of the chosen board.</li>
                        </ul>
                    </AlertDescription>
                </Alert>
                
            </CardContent>
        </Card>
    </div>
  );
}
