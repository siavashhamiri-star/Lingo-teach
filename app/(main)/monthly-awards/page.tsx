
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Award, Star, User, GraduationCap, Medal, Landmark, Users as UsersIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const topSkillStudents = [
    { name: 'Elena', avatar: 'https://picsum.photos/seed/student1/100/100', detail: 'Reached Level 155 (English)', imageHint: "woman portrait" },
    { name: 'Kenji', avatar: 'https://picsum.photos/seed/student2/100/100', detail: 'Top Score in IELTS Writing', imageHint: "man portrait" },
    { name: 'Sara', avatar: 'https://picsum.photos/seed/student3/100/100', detail: 'Mastered Advanced Persian Grammar', imageHint: "person portrait" },
];

const topSkillTeachers = [
    { name: 'Dr. Reza Karimi', avatar: 'https://picsum.photos/seed/tutor1/100/100', detail: 'Highest Rated Konkur Tutor', imageHint: "man professional" },
    { name: 'Ms. Maryam Hedayati', avatar: 'https://picsum.photos/seed/tutor2/100/100', detail: 'Most Successful Student Reviews', imageHint: "woman professional" },
]

const mostDedicatedLearners = [
    { name: 'David', avatar: 'https://picsum.photos/seed/student4/100/100', detail: '40 hours of practice this month', imageHint: "smiling person" },
    { name: 'Maria', avatar: 'https://picsum.photos/seed/student5/100/100', detail: 'Completed 50 lessons in a row', imageHint: "person headshot" },
    { name: 'Hassan', avatar: 'https://picsum.photos/seed/student6/100/100', detail: 'Highest participation in community rooms', imageHint: "man smiling" },
];

const topAmbassadors = [
  { rank: 1, name: 'Elena', avatar: 'https://picsum.photos/seed/student1/100/100', metric: '25 Referrals, 5K Likes', imageHint: "woman portrait" },
  { rank: 2, name: 'Kian', avatar: 'https://picsum.photos/seed/ambassador2/100/100', metric: '18 Referrals, 3.2K Likes', imageHint: "man headshot" },
  { rank: 3, name: 'You', avatar: 'https://picsum.photos/seed/1/100/100', metric: '5 Referrals, 1.1K Likes', imageHint: "person smiling" },
];


export default function MonthlyAwardsPage() {

  const rankColors = ['text-yellow-500', 'text-slate-400', 'text-orange-500'];

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
                        {topSkillTeachers.map((user, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border-2 border-primary">
                                    <AvatarImage src={user.avatar} data-ai-hint={user.imageHint} />
                                    <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Separator />
                 <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><User />Top Students</h3>
                    <div className="space-y-4">
                        {topSkillStudents.map((user, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="flex items-center gap-2 w-8 justify-center">
                                    <Medal className={`w-6 h-6 ${rankColors[index] || 'text-muted-foreground'}`} />
                                </div>
                                <Avatar className="h-12 w-12 border">
                                    <AvatarImage src={user.avatar} data-ai-hint={user.imageHint} />
                                    <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.detail}</p>
                                </div>
                            </div>
                        ))}
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
                {topAmbassadors.map((user, index) => (
                     <div key={index} className="flex items-center gap-4">
                        <div className="flex items-center gap-2 w-8 justify-center">
                            <span className={`font-bold text-xl ${rankColors[index] || 'text-primary'}`}>#{user.rank}</span>
                        </div>
                        <Avatar className="h-12 w-12 border">
                            <AvatarImage src={user.avatar} data-ai-hint={user.imageHint}/>
                            <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.metric}</p>
                        </div>
                    </div>
                ))}
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
                    "Rest assured that those who strive and sacrifice to introduce Afarinesh and the city of Tavana will be its founders, landowners, and most influential figures. They will be the ones who shape this city's identity and its decisions."
                </blockquote>
                 <p className="text-muted-foreground">
                    The top ambassadors in our community are not just users; they are on a direct path to becoming the future leaders of this ecosystem. Your efforts today build your influence and stake in the world of tomorrow.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
