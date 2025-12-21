
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/icons/logo';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
    const { toast } = useToast();

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual signup logic with Firebase
        toast({
            title: "Signup Temporarily Disabled",
            description: "We're finalizing our systems. Please check back shortly.",
        });
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
             <div className="flex justify-center items-center gap-2 mb-4">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">LinguaWeave</span>
            </div>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Enter your information to become a citizen of Afarinesh.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Create Account
                </Button>
            </CardContent>
        </form>
        <div className="mt-4 mb-6 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
                Login
            </Link>
        </div>
        </Card>
    </div>
  );
}
