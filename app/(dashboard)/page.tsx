'use client';

import React from 'react';
import Image from 'next/image';
import PostCard from '@/components/PostCard';
import StatCard from '@/components/StatCard';
import { Eye, Languages, Calendar, Info } from 'lucide-react';
import { motion } from 'motion/react';

const posts = [
  {
    author: "TechInsights",
    handle: "@techinsights",
    avatar: "https://picsum.photos/seed/tech/100/100",
    time: "2h",
    originalText: "The transition to localized AI models is accelerating. Companies are moving away from massive cloud-based LLMs to specialized edge inference.",
    translatedText: "A transição para modelos de IA localizados está acelerando. As empresas estão abandonando os grandes LLMs em nuvem para inferência especializada na borda.",
    isVerified: true
  },
  {
    author: "Design Insider",
    handle: "@design_daily",
    avatar: "https://picsum.photos/seed/design/100/100",
    time: "5h",
    originalText: "Spatial computing is forcing us to rethink how z-index and elevation work in modern UI kits. It's no longer just shadows.",
    translatedText: "A computação espacial está nos forçando a repensar como o z-index e a elevação funcionam em kits de UI modernos. Não são mais apenas sombras.",
    image: "https://picsum.photos/seed/ui/800/400",
    isVerified: true
  },
  {
    author: "Web3 Pulse",
    handle: "@web3pulse",
    avatar: "https://picsum.photos/seed/web3/100/100",
    time: "8h",
    originalText: "Decentralized social protocols are seeing a 40% month-over-month increase in active user identities. Ownership is the new utility.",
    translatedText: "Protocolos sociais descentralizados estão vendo um aumento de 40% mês a mês em identidades de usuários ativos. Propriedade é a nova utilidade.",
    isVerified: false
  }
];

import { useIsMobile } from '@/hooks/use-mobile';

export default function MonitoringPage() {
  const isMobile = useIsMobile();

  return (
    <div className={cn("flex h-full overflow-hidden", isMobile && "flex-col overflow-y-auto")}>
      {/* Center Feed Column */}
      <section className={cn("flex-1 overflow-y-auto px-4 md:px-6 py-6 md:py-8 custom-scrollbar", isMobile && "overflow-visible")}>
        {isMobile && (
          <div className="grid grid-cols-2 gap-3 mb-8">
            <StatCard 
              label="TOTAL" 
              value="1.284" 
              trend="+12%" 
              icon={Eye} 
              variant="primary" 
            />
            <StatCard 
              label="MÓDULOS" 
              value="342" 
              subtext="PT-BR" 
              icon={Languages} 
              variant="tertiary" 
            />
          </div>
        )}
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8 pb-12">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </section>

      {/* Right Column Stats Summary */}
      {!isMobile && (
        <aside className="w-80 bg-white p-6 flex flex-col gap-6 sticky top-0 h-full overflow-y-auto border-l border-slate-200 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Estatísticas do Projeto</h3>
            <div className="grid gap-3">
              <StatCard 
                label="TOTAL MONITORADO" 
                value="1.284" 
                trend="+12%" 
                icon={Eye} 
                variant="primary" 
              />
              <StatCard 
                label="MÓDULOS ATIVOS" 
                value="342" 
                subtext="PT-BR" 
                icon={Languages} 
                variant="tertiary" 
              />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-6 rounded-2xl bg-white flex flex-col gap-4 border border-slate-200 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Conclusão</p>
              <Info size={14} className="text-slate-300" />
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "84%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-indigo-500 h-full rounded-full" 
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">84% Sincronizado</span>
              <span className="text-xs text-indigo-600 font-bold">84%</span>
            </div>
          </motion.div>

          <div className="mt-auto pt-8 border-t border-slate-100">
            <div className="flex -space-x-3 mb-6 px-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 relative overflow-hidden">
                  <Image src={`https://picsum.photos/seed/${i + 40}/100/100`} alt="Membro da Equipe" fill className="object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">+5</div>
            </div>
            <p className="text-[10px] text-slate-500 px-2 leading-relaxed font-medium">Última sincronização completa há 4 minutos por Archive IA.</p>
          </div>
        </aside>
      )}
    </div>
  );
}

// Ensure cn is imported
import { cn } from '@/lib/utils';
