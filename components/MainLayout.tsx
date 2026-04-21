'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className={cn(
        "flex-1 flex flex-col relative min-w-0 transition-all duration-300",
        isMobile ? "ml-0 pb-20" : "ml-20"
      )}>
        <TopBar />
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

// Add cn helper import if needed, or use template literals
import { cn } from '@/lib/utils';
