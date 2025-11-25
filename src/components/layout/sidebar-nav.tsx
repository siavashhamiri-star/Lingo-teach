'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/lib/menu-items';
import type { NavItem } from '@/lib/types';
import { Badge } from '../ui/badge';

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-sidebar-foreground">
          <Logo className="w-7 h-7" />
          <span className="group-data-[collapsible=icon]:hidden font-headline">LinguaWeave</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item: NavItem) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={{ children: item.label, className: 'bg-primary text-primary-foreground' }}
                className={cn(
                  item.premium && 'text-yellow-400 hover:text-yellow-300',
                  isActive(item.href) && item.premium && 'bg-accent/20 text-yellow-300 hover:bg-accent/30'
                )}
              >
                <Link href={item.disabled ? '#' : item.href} aria-disabled={item.disabled}>
                  <item.icon />
                  <span>{item.label}</span>
                  {item.premium && <Crown className="ml-auto h-4 w-4 text-yellow-400" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="p-2 group-data-[collapsible=icon]:p-0">
          <Button variant="outline" className="w-full justify-center bg-accent text-accent-foreground hover:bg-accent/90 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0">
            <Sparkles className="mr-2 group-data-[collapsible=icon]:mr-0" />
            <span className="group-data-[collapsible=icon]:hidden">Go Premium</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
