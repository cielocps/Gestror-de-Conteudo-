'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, MoreHorizontal, Edit, Trash2, Calendar, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const queueItems = [
  {
    id: "#8492",
    platform: "TWEET",
    status: "Pronto para Publicar",
    time: "14:30 • 24 Out",
    original: "The intersection of AI and human intuition isn't just a trend; it's the new baseline for high-velocity software engineering. #FutureOfWork",
    translation: "A interseção entre IA e intuição humana não é apenas uma tendência; é o novo patamar para a engenharia de software de alta velocidade. #FuturoDoTrabalho",
    color: "primary"
  },
  {
    id: "#8491",
    platform: "TWEET",
    status: "Aguardando Aprovação",
    time: "09:00 • 25 Out",
    original: "Design systems are the API of the product team. If you break the contract, you break the product. Don't ship technical debt disguised as \"innovation\".",
    translation: "Sistemas de design são a API da equipe de produto. Se você quebra o contrato, quebra o produto. Não entregue dívida técnica disfarçada de \"inovação\".",
    color: "tertiary"
  }
];

import { useIsMobile } from '@/hooks/use-mobile';

export default function PostingQueuePage() {
  const [activeTab, setActiveTab] = useState('Fila Pendente');
  const isMobile = useIsMobile();

  return (
    <div className="h-full overflow-y-auto px-4 md:px-8 py-6 md:py-10 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
        
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-surface-lowest w-full md:w-fit p-1 rounded-full border border-on-surface-variant/5">
          {['Fila Pendente', 'Histórico Publicado'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 md:flex-none px-4 md:px-8 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300",
                activeTab === tab 
                  ? "bg-surface-high text-on-surface shadow-lg" 
                  : "text-on-surface-variant hover:text-on-surface opacity-50 hover:opacity-100"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Section Header */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant opacity-50">Agendado para Amanhã</span>
            <div className="h-px flex-1 bg-on-surface-variant/10"></div>
          </div>

          <div className="space-y-4 md:space-y-6">
            {queueItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white hover:border-slate-300 transition-all duration-300 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 border border-slate-200 shadow-sm"
              >
                <div className="flex items-center gap-4 md:block">
                  <div className="flex-shrink-0 w-10 md:w-12 h-10 md:h-12 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-200">
                    <div className="text-slate-300 font-black text-xl">X</div>
                  </div>
                  {isMobile && (
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">{item.platform} {item.id}</span>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1",
                        item.color === 'primary' ? "text-indigo-600" : "text-emerald-600"
                      )}>
                        {item.status}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {!isMobile && (
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">{item.platform} {item.id}</span>
                        <span className={cn(
                          "text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1",
                          item.color === 'primary' ? "text-indigo-600" : "text-emerald-600"
                        )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", item.color === 'primary' ? "bg-indigo-500" : "bg-emerald-500")}></div>
                          {item.status}
                        </span>
                      </div>
                      
                      <div className="bg-slate-50 px-4 py-2 rounded-lg flex items-center gap-2 border border-slate-200">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-600">{item.time}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 md:mt-6">
                    <div className="space-y-2">
                      {!isMobile && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fluxo de Entrada</span>
                        </div>
                      )}
                      <p className="text-slate-700 text-sm leading-relaxed font-medium">{item.original}</p>
                    </div>

                    <div className="space-y-2 lg:border-l lg:border-slate-100 lg:pl-8">
                      {!isMobile && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Localização</span>
                        </div>
                      )}
                      <p className="text-slate-700 text-sm leading-relaxed font-medium bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border md:border-none border-slate-100">{item.translation}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between mt-6 md:mt-8 border-t border-slate-100 pt-6 gap-4">
                    <div className="w-full sm:w-auto">
                      {item.status === 'Aguardando Aprovação' && (
                        <motion.button 
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto bg-indigo-600 text-white text-[10px] font-bold tracking-widest py-2.5 px-6 rounded-lg shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 uppercase"
                        >
                          <Lock size={12} strokeWidth={2.5} />
                          Finalizar
                        </motion.button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 md:gap-2">
                      {isMobile && (
                        <div className="flex items-center gap-2 mr-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <Clock size={12} className="text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-600">{item.time}</span>
                        </div>
                      )}
                      <button className="p-2.5 md:p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-slate-800 border md:border-transparent border-slate-100 hover:border-slate-200">
                        <Edit size={16} />
                      </button>
                      <button className="p-2.5 md:p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-slate-800 border md:border-transparent border-slate-100 hover:border-slate-200">
                        <Calendar size={16} />
                      </button>
                      <button className="p-2.5 md:p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600 border md:border-transparent border-slate-100 hover:border-red-100">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Already Published Section */}
          <div className="flex items-center gap-4 pt-12">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant opacity-30">Já Publicado</span>
            <div className="h-px flex-1 bg-on-surface-variant/5"></div>
          </div>

          <article className="bg-surface-lowest/50 rounded-3xl p-6 flex gap-6 opacity-60 border border-on-surface-variant/5 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-surface-lowest flex items-center justify-center">
              <div className="text-on-surface-variant font-black text-xl opacity-20">X</div>
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <span className="text-on-surface-variant text-[10px] font-black tracking-widest uppercase">TWEET #8480</span>
                    <span className="text-on-surface-variant text-[11px] font-bold uppercase flex items-center gap-1.5 mt-1">
                      <CheckCircle2 size={14} className="text-primary-container" />
                      Publicado há 2h
                    </span>
                  </div>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                  <p className="text-on-surface text-sm italic font-medium">&quot;The speed of a startup is the number of small decisions made per hour that are correct.&quot;</p>
                  <p className="text-on-surface text-sm font-medium lg:border-l lg:border-on-surface-variant/10 lg:pl-8">&quot;A velocidade de uma startup é o número de pequenas decisões tomadas por hora que estão corretas.&quot;</p>
               </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
