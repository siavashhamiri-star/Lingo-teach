import type { NavItem } from '@/lib/types';
import {
  BookOpenCheck,
  BookText,
  BotMessageSquare,
  BrainCircuit,
  Camera,
  Ear,
  Languages,
  LayoutDashboard,
  MicVocal,
  Music,
  Package,
  Trophy,
  User,
  Users,
} from 'lucide-react';

export const menuItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chatbot', label: 'Chatbot', icon: BotMessageSquare },
  { href: '/learning-path', label: 'Learning Path', icon: BrainCircuit },
  { href: '/exercises', label: 'Exercises', icon: BookOpenCheck },
  { href: '/accent-training', label: 'Accent Training', icon: MicVocal },
  { href: '/leitner-box', label: 'Leitner Box', icon: Package },
  { href: '/stories', label: 'Bilingual Stories', icon: BookText },
  { href: '/translation', label: 'Translation', icon: Languages },
  { href: '/listening', label: 'Listening', icon: Ear },
  { href: '/challenges', label: 'Challenges', icon: Trophy },
  { href: '/object-identifier', label: 'Object Identifier', icon: Camera },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/karaoke', label: 'Karaoke', icon: Music, premium: true },
  { href: '/profile', label: 'Profile', icon: User },
];
