'use client';

import React from 'react';
import { Search, Bell, SlidersHorizontal, Share2, User, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';

export default function TopBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  
  const [searchValue, setSearchValue] = React.useState(searchParams.get('q') || '');

  const handleSearch = (val: string) => {
    setSearchValue(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPageTitle = () => {
    switch(pathname) {
      case '/': return 'Monitoramento';
      case '/curation-rules': return 'Curadoria';
      case '/posting-queue': return 'Postagem';
      case '/integrations': return 'Integrações';
      case '/settings': return 'Configurações';
      default: return 'Painel';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 flex justify-between items-center px-6 md:px-8 h-20 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 line-clamp-1">{getPageTitle()}</h2>
          {!isMobile && (
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Projeto: Arquivo de Conteúdo X</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {!isMobile && (
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Pesquisar arquivo..." 
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 w-64 text-sm focus:ring-1 focus:ring-primary transition-all outline-none placeholder:text-slate-400"
            />
          </div>
        )}
        
        <div className="flex gap-2 md:gap-3">
          {!isMobile && (
            <motion.button 
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Filtrar
            </motion.button>
          )}
          <motion.button 
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 md:px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:brightness-110 transition-all flex items-center gap-1"
          >
            {isMobile ? <Plus size={18} /> : 'Criar Novo'}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
