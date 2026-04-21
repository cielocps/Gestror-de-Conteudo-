'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Files as RuleFolder, 
  SendHorizontal as ScheduleSend, 
  Cpu as Api,
  Settings,
  HelpCircle,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

import Image from 'next/image';

const navItems = [
  { name: 'Monitoramento', icon: LayoutDashboard, href: '/' },
  { name: 'Regras de Curadoria', icon: RuleFolder, href: '/curation-rules' },
  { name: 'Fila de Postagem', icon: ScheduleSend, href: '/posting-queue' },
  { name: 'Integrações', icon: Api, href: '/integrations' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#0f172a] border-t border-slate-800 flex items-center justify-around px-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} title={item.name}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-3 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-slate-500"
                )}
              >
                <item.icon size={24} />
              </motion.div>
            </Link>
          );
        })}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20"
        >
          <Plus size={24} strokeWidth={3} />
        </motion.button>
      </nav>
    );
  }

  return (
    <aside className="h-screen w-20 fixed left-0 top-0 bg-[#0f172a] flex flex-col items-center py-8 gap-10 border-r border-on-surface-variant/10 z-50 overflow-y-auto custom-scrollbar no-scrollbar-buttons">
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(79,70,229,0.3)] mb-2"
        >
          <div className="text-white font-black text-2xl">A</div>
        </motion.div>
      </div>

      <nav className="flex-1 flex flex-col items-center gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} title={item.name}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/30" 
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                )}
              >
                <item.icon size={22} className={cn(isActive && "stroke-[2.5px]")} />
              </motion.div>
            </Link>
          );
        })}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 mt-4"
          title="Nova Postagem"
        >
          <Plus size={22} strokeWidth={3} />
        </motion.button>
      </nav>

      <div className="mt-auto flex flex-col items-center gap-6">
        <Link href="/settings" title="Configurações">
          <div className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
            <Settings size={22} />
          </div>
        </Link>
        
        <div className="relative w-10 h-10 group cursor-pointer">
          <Image 
            src="https://picsum.photos/seed/curator/100/100" 
            alt="Perfil do Gestor" 
            fill
            className="rounded-full bg-slate-800 border-2 border-slate-700 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0f172a] rounded-full"></div>
        </div>
      </div>
    </aside>
  );
}
