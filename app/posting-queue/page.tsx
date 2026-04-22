'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'motion/react';
import { Clock, Send, Search, Filter } from 'lucide-react';

export default function PostingQueue() {
  return (
    <div className="flex bg-[#f8fafc] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-20 p-8 sm:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Fila de Postagem</h1>
          <p className="text-slate-500 text-sm">Gerencie o agendamento e a publicação dos seus conteúdos curados.</p>
        </header>

        <div className="bg-white rounded-3xl p-12 border border-slate-200 border-dashed flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
            <Clock size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Fila Vazia</h3>
          <p className="text-slate-500 text-sm max-w-xs">Você ainda não tem posts agendados. Vá para o monitoramento para começar a curadoria.</p>
        </div>
      </main>
    </div>
  );
}
