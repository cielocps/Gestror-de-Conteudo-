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
  Plus,
  LogIn,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

const navItems = [
  { name: 'Monitoramento', icon: LayoutDashboard, href: '/' },
  { name: 'Regras de Curadoria', icon: RuleFolder, href: '/curation-rules' },
  { name: 'Fila de Postagem', icon: ScheduleSend, href: '/posting-queue' },
  { name: 'Integrações', icon: Api, href: '/integrations' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isAuthenticated, login, logout, loading } = useAuth();

  return (
    <aside className="h-screen w-20 fixed left-0 top-0 bg-[#0f172a] flex flex-col items-center py-6 gap-6 border-r border-slate-800/50 z-50 overflow-y-auto scrollbar-hide shrink-0">
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 mb-2 shrink-0"
        >
          <div className="text-white font-black text-2xl">A</div>
        </motion.div>
      </div>

      <nav className="flex-1 flex flex-col items-center gap-4">
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
                <item.icon size={22} />
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-4 pb-4">
        <Link href="/settings" title="Configurações">
          <div className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-800">
            <Settings size={22} />
          </div>
        </Link>
        
        <div className="flex flex-col items-center gap-4">
          {!isAuthenticated ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={login}
              disabled={loading}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all border border-primary/20"
              title="Entrar com X"
            >
              <LogIn size={22} />
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="text-slate-500 hover:text-red-400 transition-colors"
                title="Sair"
              >
                <LogOut size={18} />
              </motion.button>
              
              <div className="relative w-10 h-10 group cursor-pointer">
                <Image 
                  src="https://picsum.photos/seed/curator/100/100" 
                  alt="Perfil" 
                  fill
                  className="rounded-full bg-slate-800 border-2 border-slate-700 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
