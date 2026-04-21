'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Sparkles, Trash2, Globe, Scan, Brain, Info, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialRules = [
  { 
    id: 'translate', 
    name: 'Auto-traduzir para PT-BR', 
    desc: 'Localização por IA para todo conteúdo de texto', 
    icon: Globe, 
    enabled: true 
  },
  { 
    id: 'caption', 
    name: 'Auto-legenda de mídia', 
    desc: 'Gerar texto alternativo usando Vision AI', 
    icon: Scan, 
    enabled: false 
  },
  { 
    id: 'tone', 
    name: 'Ajuste de Tom por IA', 
    desc: 'Normalizar vocabulário para a voz da marca', 
    icon: Brain, 
    enabled: true 
  },
];

const initialAccounts = [
  { name: 'UX Collective', handle: '@uxdesigncc', status: 'Ativo', volume: '1.4k posts', avatar: 'https://picsum.photos/seed/ux/100/100' },
  { name: 'Venture Capital', handle: '@vcfunding_io', status: 'Limitado', volume: '428 posts', avatar: 'https://picsum.photos/seed/vc/100/100' },
  { name: 'TechCrunch', handle: '@TechCrunch', status: 'Ativo', volume: '8.2k posts', avatar: 'https://picsum.photos/seed/tc/100/100' },
  { name: 'AI Daily', handle: '@aidailynews', status: 'Pausado', volume: '0 posts', avatar: 'https://picsum.photos/seed/ai/100/100' },
];

export default function CurationRulesPage() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [newHandle, setNewHandle] = useState('');

  const handleAddAccount = () => {
    if (!newHandle.trim()) return;
    
    // Clean handle (remove @ if present)
    const handle = newHandle.startsWith('@') ? newHandle : `@${newHandle}`;
    
    // Check if already exists
    if (accounts.find(a => a.handle.toLowerCase() === handle.toLowerCase())) {
      alert('Esta conta já está sendo monitorada.');
      return;
    }

    const newAccount = {
      name: handle.substring(1), // Mock name using handle
      handle: handle,
      status: 'Ativo',
      volume: '0 posts',
      avatar: `https://picsum.photos/seed/${handle}/100/100`
    };

    setAccounts([newAccount, ...accounts]);
    setNewHandle('');
  };

  const handleRemoveAccount = (handle: string) => {
    setAccounts(accounts.filter(a => a.handle !== handle));
  };

  return (
    <div className="h-full overflow-y-auto px-6 md:px-12 py-12 custom-scrollbar pb-32">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="max-w-2xl text-left">
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-6"
            >
              Regras de Curadoria e <br/>
              <span className="text-primary-container">Gestão de Contas</span>
            </motion.h3>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-on-surface-variant text-base md:text-lg leading-relaxed opacity-70"
            >
              Defina as camadas de inteligência que processam os dados recebidos. Configure os perfis monitorados e aplique filtros algorítmicos para automatizar a curadoria do seu feed.
            </motion.p>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-8 py-3.5 rounded-full bg-surface-high text-on-surface font-bold text-sm hover:bg-surface-lowest transition-all active:scale-95 border border-on-surface-variant/10">Exportar Config</button>
            <button className="flex-1 md:flex-none px-10 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95">Salvar Todas as Regras</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Rule Engine */}
          <div className="lg:col-span-4 space-y-10 order-2 lg:order-1">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-tertiary mb-3">Motor de Regras</h4>
              <div className="h-1 w-12 bg-tertiary rounded-full"></div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl space-y-8 border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <h5 className="text-xl font-bold text-slate-800">Camada de Inteligência</h5>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Status: Ativo</p>
              </div>

              <div className="space-y-6">
                {initialRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between group">
                    <div className="flex flex-col gap-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2">
                        <rule.icon size={14} className="text-indigo-600 flex-shrink-0" />
                        <span className="font-bold text-sm text-slate-700 truncate">{rule.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium leading-tight">{rule.desc}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" defaultChecked={rule.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-100 border border-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Sparkles size={16} className="text-indigo-600 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Latência Neural: 1.2s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Monitored Handles */}
          <div className="lg:col-span-8 space-y-10 order-1 lg:order-2">
            <div className="flex justify-between items-center px-2">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-3">Grade de Monitoramento</h4>
                <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Capacidade: {accounts.length}/250</span>
            </div>

            <form 
              onSubmit={(e) => { e.preventDefault(); handleAddAccount(); }}
              className="bg-white p-2 rounded-xl flex items-center group transition-all focus-within:ring-2 focus-within:ring-indigo-100 border border-slate-200 shadow-sm"
            >
              <span className="pl-4 md:pl-6 text-slate-300 font-black text-lg select-none opacity-40">@</span>
              <input 
                type="text" 
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                className="bg-transparent border-none text-slate-800 focus:ring-0 w-full font-bold placeholder:text-slate-200 tracking-tight" 
                placeholder="Pesquisar ou adicionar perfis..." 
              />
              <button 
                type="submit"
                className="bg-slate-900 text-white px-4 md:px-8 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-transform active:scale-95 mr-1 hover:bg-slate-800 flex-shrink-0"
              >
                Add Nodo
              </button>
            </form>

            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm overflow-x-auto custom-scrollbar">
              <table className="w-full text-left min-w-[500px]">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Conta</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Velocidade</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Config</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {accounts.map((account) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={account.handle} 
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-slate-200 flex-shrink-0">
                             <Image 
                               src={account.avatar} 
                               alt={account.name}
                               fill
                               className="object-cover"
                               referrerPolicy="no-referrer"
                             />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-sm text-slate-800 truncate">{account.name}</span>
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest opacity-60 leading-none mt-1 truncate">{account.handle}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            account.status === 'Ativo' ? "bg-emerald-500" :
                            account.status === 'Limitado' ? "bg-amber-500" : "bg-slate-300"
                          )}></div>
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-widest",
                            account.status === 'Ativo' ? "text-emerald-700" : "text-slate-500"
                          )}>{account.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-mono font-bold text-slate-500">{account.volume}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handleRemoveAccount(account.handle)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-300 hover:text-red-500 border border-transparent hover:border-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {accounts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-10 text-center text-slate-400 text-sm italic">
                        Nenhuma conta sendo monitorada. Adicione uma acima.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Capacity Info Card */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 border border-slate-200 shadow-sm transition-all hover:border-slate-300">
          <div className="w-full lg:w-1/3">
            <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
              <Brain size={40} className="text-indigo-600" />
            </div>
            <h5 className="text-3xl font-bold tracking-tighter mb-3 text-slate-800">Análise de Nodos</h5>
            <p className="text-slate-500 leading-relaxed opacity-70">A utilização da capacidade é ideal em todos os clusters regionais. A alocação de recursos está balanceada para entregas em sub-segundos.</p>
          </div>
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { lab: 'CARGA SIST', val: '92%' },
               { lab: 'EFIC NODO', val: '14%' },
               { lab: 'AJUS VOZ', val: '68%' },
               { lab: 'TOTAL NODES', val: '1.204' }
             ].map((stat) => (
               <div key={stat.lab} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                 <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">{stat.lab}</p>
                 <p className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">{stat.val}</p>
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
}
