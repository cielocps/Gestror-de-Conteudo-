'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'motion/react';
import { 
  Search, 
  Plus, 
  Trash2, 
  Clock, 
  Settings2,
  Save,
  Twitter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const INITIAL_ACCOUNTS = [
  { id: '1', name: 'X Business', handle: '@XBusiness', avatar: 'https://picsum.photos/seed/xbiz/100/100', interval: 15 },
  { id: '2', name: 'The Verge', handle: '@verge', avatar: 'https://picsum.photos/seed/verge/100/100', interval: 30 },
  { id: '3', name: 'OpenAI', handle: '@OpenAI', avatar: 'https://picsum.photos/seed/openai/100/100', interval: 60 },
];

export default function CurationRulesPage() {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  
  const updateInterval = (id: string, interval: number) => {
    setAccounts(accounts.map(acc => acc.id === id ? { ...acc, interval } : acc));
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8 sm:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Regras de Curadoria</h1>
            <p className="text-slate-500 text-sm">Gerencie quais contas o sistema monitora e a frequência de consulta.</p>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
            <Plus size={18} /> Adicionar Conta
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Contas Monitoradas</h2>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={14} />
                <input 
                  type="text" 
                  placeholder="Filtrar contas..." 
                  className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-48"
                />
              </div>
            </div>

            <div className="space-y-4">
              {accounts.map((account) => (
                <motion.div 
                  key={account.id}
                  layout
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6"
                >
                  <div className="w-14 h-14 relative flex-shrink-0">
                    <Image 
                      src={account.avatar} 
                      alt={account.name} 
                      fill
                      className="rounded-2xl object-cover bg-slate-100 ring-1 ring-slate-100"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-800 truncate">{account.name}</h3>
                      <Twitter size={14} className="text-sky-500" />
                    </div>
                    <p className="text-slate-400 text-xs font-medium">{account.handle}</p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} /> Intervalo (min)
                      </label>
                      <select 
                        value={account.interval}
                        onChange={(e) => updateInterval(account.id, parseInt(e.target.value))}
                        className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      >
                        <option value={15}>15 min</option>
                        <option value={30}>30 min</option>
                        <option value={60}>1 hora</option>
                        <option value={120}>2 horas</option>
                        <option value={1440}>A cada 24h</option>
                      </select>
                    </div>

                    <button className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Settings2 size={24} className="text-primary" />
                <h3 className="text-lg font-bold">Configuração Global</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Limite de Posts Diários</p>
                  <div className="flex items-center gap-4">
                    <input type="range" className="flex-1 accent-primary" />
                    <span className="font-bold text-primary">50</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prioridade da IA</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 bg-primary text-white text-[10px] font-bold rounded-lg border border-primary">Alta Velocidade</button>
                    <button className="py-2 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-lg border border-slate-700 hover:text-white transition-colors">Alta Precisão</button>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 mt-4 hover:scale-[1.02] transition-transform active:scale-[0.98]">
                  <Save size={18} /> Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
