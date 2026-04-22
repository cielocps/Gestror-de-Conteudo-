'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import { useAuth } from '@/context/AuthContext';
import { Search, SlidersHorizontal, RefreshCcw, LogIn, Twitter, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const DUMMY_POSTS = [
  {
    author: "X Business",
    handle: "@XBusiness",
    avatar: "https://picsum.photos/seed/xbiz/100/100",
    time: "2h",
    originalText: "We are excited to announce new API improvements for developers building AI-powered apps on X! These updates will streamline the integration of LLMs and enhance data retrieval speed.",
    image: "https://picsum.photos/seed/growth/800/400"
  },
  {
    author: "The Verge",
    handle: "@verge",
    avatar: "https://picsum.photos/seed/verge/100/100",
    time: "4h",
    originalText: "The future of social media isn't just about sharing, it's about intelligent curation. AI is helping users find meaningful conversations amongst the noise.",
    isVerified: true
  }
];

export default function Home() {
  const { isAuthenticated, login, loading } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex bg-[#f8fafc] min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-20 p-8 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-primary/5 text-center"
          >
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Zap size={40} className="fill-primary" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Bem-vindo ao Archive</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Conecte sua conta do X para começar a monitorar tendências, curar conteúdo e gerenciar suas postagens com IA.
            </p>
            
            <button 
              onClick={login}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95 disabled:opacity-50"
            >
              <Twitter size={20} className="fill-white" />
              Entrar com X
            </button>
            
            <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <LogIn size={12} /> Login Seguro via OAuth 2.0
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-surface min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8 sm:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Monitoramento de Conteúdo</h1>
            <p className="text-slate-500 text-sm">Curadoria inteligente de tendências globais do X em tempo real.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Pesquisar posts..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
              <SlidersHorizontal size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
              <RefreshCcw size={16} /> Atualizar
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Recentes</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">Tempo Real</span>
            </div>
            
            {DUMMY_POSTS.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
          
          <div className="hidden lg:block space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Tendências e Insights</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-1 rounded">IA Ativa</span>
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-6 text-white min-h-[400px] border border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Análise de Sentimento Global</span>
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="opacity-60 uppercase tracking-wider font-bold">Tech & AI</span>
                    <span className="text-emerald-400 font-bold">92% Positivo</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="opacity-60 uppercase tracking-wider font-bold">Web3 & Crypto</span>
                    <span className="text-amber-400 font-bold">45% Neutro</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "45%" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-sm font-bold mb-4 uppercase tracking-wider opacity-60">Sugestões de Conteúdo</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['#DevTips', '#NextJS', '#TwitterAPI', '#AIModern'].map((tag) => (
                      <div key={tag} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-[10px] font-bold text-slate-400 hover:text-white hover:border-slate-600 transition-colors cursor-pointer">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
