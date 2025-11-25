import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
  premium?: boolean;
};

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  level: {
    en: number;
    fa: number;
  };
  preferences: {
    targetLanguage: 'en' | 'fa';
  };
};
