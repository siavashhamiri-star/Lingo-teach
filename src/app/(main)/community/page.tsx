
'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Users, GraduationCap, School, MessageSquare, ArrowRight, UserCheck, Laugh } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const communityRooms = [
  {
    title: 'General Language Exchange',
    description: 'Practice English and Persian with learners from around the world at all levels.',
    icon: MessageSquare,
    onlineCount: 128,
    tags: ['All Levels', 'Conversation', 'Practice'],
  },
  {
    title: 'Kids\' Corner (Ages 7-12)',
    description: 'A fun and safe space for young learners to practice with games, stories, and friends.',
    icon: Laugh,
    onlineCount: 56,
    tags: ['Kids', 'Games', 'Fun'],
  },
  {
    title: "Teachers' Lounge",
    description: 'A dedicated space for language teachers to share resources, methods, and insights.',
    icon: School,
    onlineCount: 23,
    tags: ['Educators', 'Methodology', 'Networking'],
    isExclusive: true,
  },
  {
    title: 'Exam Experts Corner',
    description: 'Connect with users who hold IELTS, TOEFL, or Duolingo certificates for tips and advice.',
    icon: GraduationCap,
    onlineCount: 42,
    tags: ['IELTS', 'TOEFL', 'Exam Prep'],
    isExclusive: true,
  },
  {
    title: 'Advanced Discussion',
    description: 'Engage in deep conversations on complex topics with fluent and advanced speakers.',
    icon: UserCheck,
    onlineCount: 31,
    tags: ['Advanced', 'Debate', 'Fluency'],
  },
];


export default function CommunityPage() {
  return (
    <div>
      <PageHeader
        title="Community Hub"
        description="Connect with learners and practice in language exchange rooms."
        icon={Users}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityRooms.map((room) => (
            <Card key={room.title} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="bg-primary/10 p-3 rounded-lg">
                           <room.icon className="w-6 h-6 text-primary" />
                        </div>
                        {room.isExclusive && <Badge variant="destructive">Exclusive</Badge>}
                    </div>
                    <CardTitle className="pt-4">{room.title}</CardTitle>
                    <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                     <div className="flex flex-wrap gap-2">
                        {room.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                        <span className="font-bold text-primary">{room.onlineCount}</span> users online
                    </div>
                    <Button variant="outline" size="sm">
                        Join Room <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
