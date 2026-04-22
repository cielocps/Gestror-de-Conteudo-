'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'motion/react';
import { Cpu, Twitter, Globe, Lock, ShieldCheck } from 'lucide-react';

export default function Integrations() {
  return (
    <div className="flex bg-[#f8fafc] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-20 p-8 sm:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Integrações</h1>
          <p className="text-slate-500 text-sm">Conecte API keys e serviços externos para potencializar seu fluxo.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center">
                <Twitter size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Twitter API (X)</h3>
                <p className="text-xs text-slate-500">Conexão oficial v2</p>
              </div>
              <div className="ml-auto">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-500 text-[10px] font-bold rounded-lg border border-emerald-100">CONECTADO</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">API Key</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] font-mono text-slate-500">
                  <Lock size={10} /> ••••••••••••••••••••••••••
                </div>
              </div>
              <button className="w-full py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">Configurar Credenciais</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Google Gemini AI</h3>
                <p className="text-xs text-slate-500">Processamento de Linguagem Natural</p>
              </div>
              <div className="ml-auto">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-500 text-[10px] font-bold rounded-lg border border-emerald-100">CONECTADO</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model Status</label>
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                  <ShieldCheck size={14} /> Gemini 3 Flash Preview - Online
                </div>
              </div>
              <button className="w-full py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">Testar Conexão</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
