'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Globe, 
  CreditCard, 
  Bell, 
  ExternalLink, 
  Download, 
  Check,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type SettingsTab = 'profile' | 'language' | 'billing' | 'notifications';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user, login } = useAuth();
  
  const [langConfig, setLangConfig] = useState({
    enToPt: true,
    esToPt: true,
    autoDetect: true
  });

  const [notifications, setNotifications] = useState({
    postReady: true,
    monitoredPost: false
  });

  const handleLangToggle = (key: keyof typeof langConfig) => {
    const newConfig = { ...langConfig, [key]: !langConfig[key] };
    setLangConfig(newConfig);
    localStorage.setItem('language_config', JSON.stringify(newConfig));
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8 sm:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Configurações</h1>
          <p className="text-slate-500 text-sm">Gerencie sua conta, preferências de idioma e faturamento.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar de Tabs */}
          <div className="w-full lg:w-64 space-y-2">
            {[
              { id: 'profile', label: 'Perfil', icon: User },
              { id: 'language', label: 'Idioma e Região', icon: Languages },
              { id: 'billing', label: 'Faturamento', icon: CreditCard },
              { id: 'notifications', label: 'Notificações', icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-slate-500 hover:bg-white hover:text-slate-800 border border-transparent hover:border-slate-200"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Conteúdo da Tab */}
          <div className="flex-1 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
              >
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 mb-6">Seu Perfil</h2>
                      <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="relative w-20 h-20">
                          <Image 
                            src="https://picsum.photos/seed/curator/200/200" 
                            alt="Avatar" 
                            fill
                            className="rounded-2xl object-cover bg-slate-200"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-800 text-lg">Curador X</h3>
                          <p className="text-slate-500 text-sm">@curador_ia</p>
                        </div>
                        <button 
                          onClick={login}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Download size={14} /> Importar Dados do X
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nome de Exibição</label>
                        <input type="text" defaultValue="Curador X" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Handle (@)</label>
                        <input type="text" defaultValue="curador_ia" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'language' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 mb-2">Preferências de Idioma</h2>
                      <p className="text-slate-500 text-sm mb-6">Configure como a IA deve traduzir os posts monitorados.</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                              <span className="font-bold">EN</span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">Inglês para Português</p>
                              <p className="text-xs text-slate-500">Traduzir automaticamente posts em inglês.</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleLangToggle('enToPt')}
                            className={cn(
                              "w-12 h-6 rounded-full transition-all relative",
                              langConfig.enToPt ? "bg-primary" : "bg-slate-300"
                            )}
                          >
                            <div className={cn(
                              "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all",
                              langConfig.enToPt ? "translate-x-6" : "translate-x-0"
                            )} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                              <span className="font-bold">ES</span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">Espanhol para Português</p>
                              <p className="text-xs text-slate-500">Traduzir automaticamente posts em espanhol.</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleLangToggle('esToPt')}
                            className={cn(
                              "w-12 h-6 rounded-full transition-all relative",
                              langConfig.esToPt ? "bg-primary" : "bg-slate-300"
                            )}
                          >
                            <div className={cn(
                              "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all",
                              langConfig.esToPt ? "translate-x-6" : "translate-x-0"
                            )} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 mb-2">Faturamento e Créditos</h2>
                      <p className="text-slate-500 text-sm mb-6">Acompanhe seu consumo de API e créditos do desenvolvedor do X.</p>
                      
                      <div className="p-6 bg-slate-900 rounded-2xl text-white">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">X Developer Credits</p>
                            <h3 className="text-3xl font-black">2.450 / 5.000</h3>
                          </div>
                          <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold">
                            ATIVA
                          </div>
                        </div>
                        
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
                          <div className="h-full bg-primary w-[49%]" />
                        </div>

                        <button 
                          onClick={() => window.open('https://developer.x.com/en/portal/dashboard', '_blank')}
                          className="w-full flex items-center justify-center gap-2 py-4 bg-white/10 hover:bg-white/20 transition-all rounded-xl text-sm font-bold border border-white/5"
                        >
                          <ExternalLink size={16} /> Ir para o Console de Desenvolvedor X
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 mb-2">Configurações de Notificação</h2>
                      <p className="text-slate-500 text-sm mb-6">Escolha quando deseja ser alertado pelo sistema.</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                              <Check size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">Post Pronto</p>
                              <p className="text-xs text-slate-500">Notificar quando a curadoria finalizar a preparação de um post.</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setNotifications({ ...notifications, postReady: !notifications.postReady })}
                            className={cn(
                              "w-12 h-6 rounded-full transition-all relative",
                              notifications.postReady ? "bg-primary" : "bg-slate-300"
                            )}
                          >
                            <div className={cn(
                              "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all",
                              notifications.postReady ? "translate-x-6" : "translate-x-0"
                            )} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                              <Bell size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">Contas Monitoradas</p>
                              <p className="text-xs text-slate-500">Notificar quando qualquer conta monitorada efetuar uma postagem.</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setNotifications({ ...notifications, monitoredPost: !notifications.monitoredPost })}
                            className={cn(
                              "w-12 h-6 rounded-full transition-all relative",
                              notifications.monitoredPost ? "bg-primary" : "bg-slate-300"
                            )}
                          >
                            <div className={cn(
                              "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all",
                              notifications.monitoredPost ? "translate-x-6" : "translate-x-0"
                            )} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
