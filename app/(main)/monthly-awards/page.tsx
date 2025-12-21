
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Award, Star, User, GraduationCap, Medal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const topSkillStudents = [
    { name: 'Elena', avatar: 'https://picsum.photos/seed/student1/100/100', detail: 'Reached Level 155 (English)'},
    { name: 'Kenji', avatar: 'https://picsum.photos/seed/student2/100/100', detail: 'Top Score in IELTS Writing'},
    { name: 'Sara', avatar: 'https://picsum.photos/seed/student3/100/100', detail: 'Mastered Advanced Persian Grammar'},
];

const topSkillTeachers = [
    { name: 'Dr. Reza Karimi', avatar: 'https://picsum.photos/seed/tutor1/100/100', detail: 'Highest Rated Konkur Tutor'},
    { name: 'Ms. Maryam Hedayati', avatar: 'https://picsum.photos/seed/tutor2/100/100', detail: 'Most Successful Student Reviews'},
]

const mostDedicatedLearners = [
    { name: 'David', avatar: 'https://picsum.photos/seed/student4/100/100', detail: '40 hours of practice this month'},
    { name: 'Maria', avatar: 'https://picsum.photos/seed/student5/100/100', detail: 'Completed 50 lessons in a row'},
    { name: 'Hassan', avatar: 'https://picsum.photos/seed/student6/100/100', detail: 'Highest participation in community rooms'},
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                    <AvatarImage src={user.avatar} />
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
                                    <AvatarImage src={user.avatar} />
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
                <CardTitle className="flex items-center gap-2"><Medal className="text-primary"/>Most Dedicated Learners (Effort)</CardTitle>
                <CardDescription>Honoring the incredible hard work and consistency of our students.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {mostDedicatedLearners.map((user, index) => (
                     <div key={index} className="flex items-center gap-4">
                        <div className="flex items-center gap-2 w-8 justify-center">
                            <span className="font-bold text-xl text-primary">#{index + 1}</span>
                        </div>
                        <Avatar className="h-12 w-12 border">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.detail}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
