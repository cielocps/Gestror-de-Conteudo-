'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings as SettingsIcon, User, Bell, Shield, Wallet, Globe, ChevronLeft, RefreshCw, Loader2, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const sections = [
  { id: 'profile', name: 'Perfil', icon: User, desc: 'Gerencie suas informações pessoais e avatar.' },
  { id: 'notifications', name: 'Notificações', icon: Bell, desc: 'Configure como você recebe alertas de sincronização.' },
  { id: 'security', name: 'Segurança', icon: Shield, desc: 'Proteja sua conta com 2FA e chaves de segurança.' },
  { id: 'billing', name: 'Faturamento', icon: Wallet, desc: 'Gerencie seus planos e métodos de pagamento.' },
  { id: 'language', name: 'Idioma e Região', icon: Globe, desc: 'Ajuste as preferências de localização do painel.' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isXConnected, setIsXConnected] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('x_connected') === 'true';
    }
    return false;
  });
  const [isImporting, setIsImporting] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Consultor Cielo',
    email: 'cielo.consultor@gmail.com',
    bio: 'Desenvolvedor e entusiasta de IA.',
    avatar: 'https://picsum.photos/seed/user123/200/200'
  });

  const [notificationConfig, setNotificationConfig] = useState({
    postReady: true,
    newAccountPost: false,
    systemAlerts: true,
    weeklyReport: true
  });

  const [billing, setBilling] = useState({
    plan: 'Pro Plan',
    status: 'Ativo',
    credits: '5,000',
    lastImport: ''
  });

  const [isImportingCredits, setIsImportingCredits] = useState(false);

  const [languageConfig, setLanguageConfig] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language_config');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) { /* ignore */ }
      }
    }
    return {
      enToPt: true,
      esToPt: true,
      autoDetect: true,
      mainLanguage: 'pt-BR'
    };
  });

  useEffect(() => {
    // Escutar por mudanças no localStorage vindas de outras abas ou da própria página
    const handleStorage = () => {
      setIsXConnected(localStorage.getItem('x_connected') === 'true');
      
      const updatedLangConfig = localStorage.getItem('language_config');
      if (updatedLangConfig) {
        try {
          setLanguageConfig(JSON.parse(updatedLangConfig));
        } catch (e) { /* ignore */ }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleUpdateLanguage = (key: keyof typeof languageConfig, value: boolean | string) => {
    const newConfig = { ...languageConfig, [key]: value };
    setLanguageConfig(newConfig as any);
    localStorage.setItem('language_config', JSON.stringify(newConfig));
  };

  const handleImportFromX = async () => {
    if (!isXConnected) {
      alert("Por favor, conecte sua conta do X na guia Integrações primeiro.");
      return;
    }

    try {
      setIsImporting(true);
      const res = await fetch('/api/auth/x/me');
      const data = await res.json();
      
      setProfile({
        name: data.name,
        email: profile.email, // Keeping existing email as X API might not return it
        bio: data.description,
        avatar: data.profile_image_url
      });
      
    } catch (error) {
      console.error("Erro ao importar dados do X:", error);
    } finally {
      setIsImporting(false);
    }
  };

  const renderProfileSection = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => setActiveSection(null)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ChevronLeft size={20} />
        </button>
        <h4 className="text-xl font-bold text-slate-800">Seu Perfil</h4>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-50 relative">
              <Image 
                src={profile.avatar} 
                alt="Avatar" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-lg shadow-md border border-slate-100 text-slate-500 hover:text-indigo-600 transition-colors">
              <Camera size={14} />
            </button>
          </div>
          
          <div className="flex-1">
            <h5 className="text-2xl font-black text-slate-800 tracking-tight">{profile.name}</h5>
            <p className="text-slate-400 text-sm font-medium mb-4">{profile.email}</p>
            <button 
              onClick={handleImportFromX}
              disabled={isImporting}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border",
                isXConnected 
                  ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-800" 
                  : "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
              )}
            >
              {isImporting ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              Importar Dados do X
            </button>
            {!isXConnected && (
              <p className="text-[10px] text-red-400 mt-2 font-bold uppercase tracking-widest">
                X não conectado. Vá em Integrações.
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Nome de Exibição</label>
            <input 
              type="text" 
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Bio / Descrição</label>
            <textarea 
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
            />
          </div>
          <div className="pt-4">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const handleImportCredits = async () => {
    if (!isXConnected) {
      alert("Por favor, conecte sua conta do X na guia Integrações primeiro.");
      return;
    }

    try {
      setIsImportingCredits(true);
      // Simulate API call to fetch usage/credits from X
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBilling(prev => ({
        ...prev,
        credits: '12,450',
        lastImport: new Date().toLocaleTimeString()
      }));
      
    } catch (error) {
      console.error("Erro ao importar créditos do X:", error);
    } finally {
      setIsImportingCredits(false);
    }
  };

  const redirectToXDev = () => {
    window.open('https://developer.x.com/en/portal/dashboard', '_blank');
  };

  const renderBillingSection = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => setActiveSection(null)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ChevronLeft size={20} />
        </button>
        <h4 className="text-xl font-bold text-slate-800">Faturamento e Créditos</h4>
      </div>

      <div className="grid gap-6">
        {/* Plan Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Plano Atual</p>
              <h5 className="text-3xl font-black text-slate-800 tracking-tighter">{billing.plan}</h5>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
              {billing.status}
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Wallet size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Créditos de API (X)</p>
                  <p className="text-lg font-black text-slate-800 leading-tight">{billing.credits}</p>
                </div>
              </div>
              <button 
                onClick={handleImportCredits}
                disabled={isImportingCredits}
                className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600 border border-transparent hover:border-slate-200 active:scale-95"
                title="Sincronizar com X Developer Console"
              >
                {isImportingCredits ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              </button>
            </div>
            {billing.lastImport && (
              <p className="text-[10px] text-slate-400 text-right font-medium italic pr-2">Última sincronização: {billing.lastImport}</p>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
            <button className="py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all border border-slate-200">
              Ver Histórico
            </button>
            <button className="py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
              Upgrade Plano
            </button>
          </div>
        </div>

        {/* X Developer Redirect Card */}
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          <div className="relative z-10">
            <h5 className="text-2xl font-black tracking-tight mb-3">X Developer Console</h5>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
              Gerencie suas chaves de API, monitore o uso detalhado de créditos e configure novos endpoints diretamente no painel do X.
            </p>
            <button 
              onClick={redirectToXDev}
              className="flex items-center gap-3 px-6 py-3 bg-white text-slate-900 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
            >
              Acessar Console do X
              <Globe size={14} className="opacity-40" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderNotificationsSection = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => setActiveSection(null)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ChevronLeft size={20} />
        </button>
        <h4 className="text-xl font-bold text-slate-800">Notificações</h4>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-slate-800">Post pronto para revisão</p>
              <p className="text-xs text-slate-400 font-medium">Receba um alerta imediato quando a IA terminar de processar um post agendado.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationConfig.postReady}
                onChange={() => setNotificationConfig({...notificationConfig, postReady: !notificationConfig.postReady})}
              />
              <div className="w-11 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-slate-800">Atividade em contas monitoradas</p>
              <p className="text-xs text-slate-400 font-medium">Notificar sempre que um dos perfis em sua grade de monitoramento efetuar uma nova postagem.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationConfig.newAccountPost}
                onChange={() => setNotificationConfig({...notificationConfig, newAccountPost: !notificationConfig.newAccountPost})}
              />
              <div className="w-11 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-slate-800">Alertas críticos do sistema</p>
              <p className="text-xs text-slate-400 font-medium">Avisos sobre falhas de sincronização ou limites de API atingidos.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationConfig.systemAlerts}
                onChange={() => setNotificationConfig({...notificationConfig, systemAlerts: !notificationConfig.systemAlerts})}
              />
              <div className="w-11 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
            Salvar Preferências
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderLanguageSection = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => setActiveSection(null)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ChevronLeft size={20} />
        </button>
        <h4 className="text-xl font-bold text-slate-800">Idioma e Região</h4>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-10">
        <div>
          <h5 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6">Preferências de Tradução AI</h5>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold text-slate-800">🇺🇸 Inglês para Português</p>
                <p className="text-xs text-slate-400 font-medium">Traduzir automaticamente posts de contas de língua inglesa.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={languageConfig.enToPt}
                  onChange={() => handleUpdateLanguage('enToPt', !languageConfig.enToPt)}
                />
                <div className="w-11 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold text-slate-800">🇪🇸 Espanhol para Português</p>
                <p className="text-xs text-slate-400 font-medium">Traduzir automaticamente posts de contas de língua espanhola.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={languageConfig.esToPt}
                  onChange={() => handleUpdateLanguage('esToPt', !languageConfig.esToPt)}
                />
                <div className="w-11 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-bold text-slate-800">Detecção Automática de Idioma</p>
                  <p className="text-xs text-slate-400 font-medium">Usar IA para identificar o idioma de origem sem intervenção manual.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={languageConfig.autoDetect}
                    onChange={() => handleUpdateLanguage('autoDetect', !languageConfig.autoDetect)}
                  />
                  <div className="w-11 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
            Salvar Preferências de Região
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full overflow-y-auto px-6 md:px-12 py-8 md:py-12 custom-scrollbar pb-32">
      <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
        <header>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
              <SettingsIcon size={20} className="text-white md:size-6" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">Configurações</h3>
              <p className="text-slate-400 text-xs md:text-sm font-medium">Gerencie suas preferências globais do sistema Archive.</p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!activeSection ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 md:gap-6"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveSection(section.id)}
                  className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-all cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors flex-shrink-0">
                      <section.icon size={20} className="md:size-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-base md:text-lg truncate">{section.name}</h4>
                      <p className="text-slate-500 text-xs md:text-sm line-clamp-1">{section.desc}</p>
                    </div>
                    <div className="text-slate-300 group-hover:text-indigo-400 transition-colors hidden sm:block">
                      <Globe size={18} className="md:size-5 rotate-[-45deg]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : activeSection === 'profile' ? (
            renderProfileSection()
          ) : activeSection === 'notifications' ? (
            renderNotificationsSection()
          ) : activeSection === 'billing' ? (
            renderBillingSection()
          ) : activeSection === 'language' ? (
            renderLanguageSection()
          ) : (
            <motion.div 
              key="fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200"
            >
               <button onClick={() => setActiveSection(null)} className="text-indigo-600 font-bold hover:underline mb-2 block w-full text-center">Voltar</button>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Módulo em Desenvolvimento</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!activeSection && (
          <section className="bg-red-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-red-100 mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h5 className="text-red-800 font-bold text-lg md:text-xl mb-1">Zona de Perigo</h5>
              <p className="text-red-600/70 text-xs md:text-sm">Ações irreversíveis relacionadas à sua conta e dados.</p>
            </div>
            <button className="w-full sm:w-auto bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 active:scale-95">
              Encerrar Conta
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
