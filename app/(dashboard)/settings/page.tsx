'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, User, Bell, Shield, Wallet, Globe } from 'lucide-react';

const sections = [
  { id: 'profile', name: 'Perfil', icon: User, desc: 'Gerencie suas informações pessoais e avatar.' },
  { id: 'notifications', name: 'Notificações', icon: Bell, desc: 'Configure como você recebe alertas de sincronização.' },
  { id: 'security', name: 'Segurança', icon: Shield, desc: 'Proteja sua conta com 2FA e chaves de segurança.' },
  { id: 'billing', name: 'Faturamento', icon: Wallet, desc: 'Gerencie seus planos e métodos de pagamento.' },
  { id: 'language', name: 'Idioma e Região', icon: Globe, desc: 'Ajuste as preferências de localização do painel.' },
];

export default function SettingsPage() {
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

        <div className="grid gap-4 md:gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
        </div>

        <section className="bg-red-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-red-100 mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h5 className="text-red-800 font-bold text-lg md:text-xl mb-1">Zona de Perigo</h5>
            <p className="text-red-600/70 text-xs md:text-sm">Ações irreversíveis relacionadas à sua conta e dados.</p>
          </div>
          <button className="w-full sm:w-auto bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 active:scale-95">
            Encerrar Conta
          </button>
        </section>
      </div>
    </div>
  );
}
