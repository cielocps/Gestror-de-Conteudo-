'use client';

import React, { Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-surface">
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>
      <main className={cn(
        "flex-1 flex flex-col relative min-w-0 transition-all duration-300",
        isMobile ? "ml-0 pb-20" : "ml-20"
      )}>
        <Suspense fallback={<div className="h-20 border-b border-slate-200 bg-white" />}>
          <TopBar />
        </Suspense>
        <div className="flex-1 overflow-hidden">
          <Suspense fallback={<div className="p-8 animate-pulse bg-slate-50 h-full" />}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
