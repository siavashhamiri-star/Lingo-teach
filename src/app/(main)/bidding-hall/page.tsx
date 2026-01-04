

'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Gavel, Star, TrendingUp, Hand, Users, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const currentBids = [
    {
      rank: 1,
      bidder: 'VocabBoost App',
      bidAmount: '5,000 Stars / day',
      target: 'Levels 20-80'
    },
    {
      rank: 2,
      bidder: 'PersianGrammar.io',
      bidAmount: '4,500 Stars / day',
      target: 'All Levels'
    },
    {
      rank: 3,
      bidder: 'ListenUp App',
      bidAmount: '4,200 Stars / day',
      target: 'Levels 80+'
    },
]


export default function BiddingHallPage() {
    const { toast } = useToast();

    const handlePlaceBid = () => {
        toast({
            title: 'Bidding is currently closed.',
            description: 'The next bidding cycle will open at the beginning of next month.'
        });
    }

  return (
    <div>
      <PageHeader
        title="The Bidding Hall"
        description="The heart of our Dynamic Meritocracy. Bid with your earned Stars for prestigious rewards."
        icon={Gavel}
      />
       <Alert className="mb-8 border-primary/20 bg-primary/5 text-primary-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">What is the Bidding Hall?</AlertTitle>
        <AlertDescription className="text-primary/80">
         This is where your hard-earned Stars (XP) become true power. Instead of paying with money, you bid with the merit you've earned. Higher bids win prestigious opportunities, from ad space to becoming a featured tutor. This is "Dynamic Meritocracy" in action: your success is directly proportional to your effort and skill.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><TrendingUp />Live Bids for Ad Placements</CardTitle>
                    <CardDescription>Top bidders get their service featured on our platform.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[50px]">Rank</TableHead>
                            <TableHead>Bidder</TableHead>
                            <TableHead>Target Audience</TableHead>
                            <TableHead className="text-right">Current Bid (per day)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentBids.map((bid) => (
                            <TableRow key={bid.rank}>
                                <TableCell className="font-medium">{bid.rank}</TableCell>
                                <TableCell>{bid.bidder}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{bid.target}</Badge>
                                </TableCell>
                                <TableCell className="text-right font-semibold flex items-center justify-end gap-1.5">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    {bid.bidAmount.split(' ')[0]}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                 <CardFooter>
                    <Button onClick={handlePlaceBid}>
                        <Hand className="mr-2 h-4 w-4" />
                        Place Your Bid
                    </Button>
                </CardFooter>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users />Bidding for Top Tutor & Partner Slots</CardTitle>
                    <CardDescription>Verified tutors and partners can bid to be featured at the top of their respective pages for one month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This bidding cycle is currently closed. Check back at the beginning of next month to bid for a top spot and increase your visibility.</p>
                </CardContent>
                 <CardFooter>
                    <Button onClick={handlePlaceBid} disabled>
                        <Hand className="mr-2 h-4 w-4" />
                        Bidding Closed
                    </Button>
                </CardFooter>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-20 bg-background/70 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle>The Rules of the Hall</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                   <p>1. All bids are placed using <span className="font-bold text-foreground">Stars (XP)</span>, not real money.</p>
                   <p>2. Bidding cycles for different opportunities open at the beginning of each month.</p>
                   <p>3. Stars used for bidding are consumed, so bid wisely!</p>
                   <p>4. This system ensures that those who contribute most to our ecosystem are rewarded with the most visibility.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
