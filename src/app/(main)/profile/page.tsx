import { PageHeader } from '@/components/shared/page-header';
import { User, Gift, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';

export default function ProfilePage() {
  const profileAvatar = PlaceHolderImages.find((img) => img.id === 'profile-avatar');

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Profile"
        description="Manage your account, track progress, and set preferences."
        icon={User}
      />
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
              {profileAvatar && <AvatarImage src={profileAvatar.imageUrl} alt="User Avatar" />}
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-muted-foreground">john.doe@example.com</p>
            <Button variant="outline" size="sm" className="mt-4">
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Language Proficiency</CardTitle>
            <CardDescription>Your current learning levels (1-160).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="font-medium">English</span>
                <span className="text-lg font-bold text-primary">Level 110</span>
              </div>
              <Progress value={(110/160)*100} />
            </div>
             <div>
              <div className="flex justify-between items-end mb-1">
                <span className="font-medium">Persian</span>
                 <span className="text-lg font-bold text-primary">Level 25</span>
              </div>
              <Progress value={(25/160)*100} />
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gift className="w-5 h-5 text-primary" />Referral Program</CardTitle>
            <CardDescription>Invite friends and get 1 month of Premium for free!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium mb-2">Your referral code:</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" value="LINGUA-JOHNDOE-24" readOnly />
              <Button type="submit" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Linkedin className="w-5 h-5 text-blue-700" />LinkedIn Integration</CardTitle>
            <CardDescription>Showcase your language achievements on your LinkedIn profile.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button>
                <Linkedin className="mr-2 h-4 w-4"/> Connect to LinkedIn
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
