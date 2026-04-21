'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Zap, 
  Database, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  Globe,
  Cpu,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const endpoints = [
  { name: 'api.x.com/2/tweets', region: 'EUA-Leste-1 (Virgínia)', latency: '42ms', load: 15, status: 'Ideal' },
  { name: 'api.x.com/2/users/me', region: 'EU-Central-1 (Frankfurt)', latency: '118ms', load: 65, status: 'Moderado' },
  { name: 'media.x.com/upload', region: 'AP-Nordeste-1 (Tóquio)', latency: '84ms', load: 32, status: 'Ideal' },
];

import { useIsMobile } from '@/hooks/use-mobile';

export default function IntegrationsPage() {
  const isMobile = useIsMobile();
  const [isConnected, setIsConnected] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('x_connected') === 'true';
    }
    return false;
  });
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setIsConnected(true);
        localStorage.setItem('x_connected', 'true');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/x/url');
      const data = await res.json();
      
      if (data.url) {
        window.open(data.url, 'oauth_popup', 'width=600,height=700');
      } else {
        console.error(data.error || "Erro ao obter URL de autenticação");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevoke = () => {
    setIsConnected(false);
    localStorage.removeItem('x_connected');
  };

  return (
    <div className="h-full overflow-y-auto px-6 md:px-12 py-8 md:py-12 custom-scrollbar pb-32">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
        
        <header className="max-w-2xl">
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-4 md:mb-6"
          >
            Central de Conetividade
          </motion.h3>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-on-surface-variant text-base md:text-lg leading-relaxed opacity-70"
          >
            Gerencie seus gateways OAuth, monitore a integridade da API em tempo real e garanta que sua conta permaneça em conformidade com as políticas globais do ecossistema X.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Connection Status Card */}
          <section className="col-span-12 lg:col-span-5 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 md:mb-12 gap-4">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="w-12 md:w-16 h-12 md:h-16 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shadow-xl overflow-hidden">
                  <div className="text-white font-black text-2xl md:text-3xl opacity-20">X</div>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">
                    {isConnected ? 'Archive_v1_Core' : 'X (Twitter)'}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status: {isConnected ? 'Ativo' : 'Pendente'}</p>
                </div>
              </div>
              <div className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2",
                isConnected ? "bg-emerald-50 border border-emerald-100 text-emerald-600" : "bg-slate-50 border border-slate-100 text-slate-400"
              )}>
                {isConnected ? 'Conectado' : 'Desconectado'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                { label: 'Fluxo', value: isConnected ? 'OAuth 2.0 PKCE' : 'Aguardando Autenticação' },
                { label: 'Última Sincronização', value: isConnected ? '04:22 GMT Hoje' : 'N/A' }
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mb-1 opacity-60">{item.label}</p>
                  <p className="text-slate-700 font-bold tracking-tight text-sm md:text-base">{item.value}</p>
                </div>
              ))}
            </div>

            {isConnected ? (
              <button 
                onClick={handleRevoke}
                className="mt-8 md:mt-10 w-full py-4 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all font-bold text-xs uppercase tracking-widest active:scale-98"
              >
                Revogar Sessão
              </button>
            ) : (
              <button 
                onClick={handleConnect}
                disabled={isLoading}
                className="mt-8 md:mt-10 w-full py-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold text-xs uppercase tracking-widest active:scale-98 shadow-lg shadow-slate-900/20 disabled:opacity-50"
              >
                {isLoading ? 'Solicitando...' : 'Conectar ao X'}
              </button>
            )}
          </section>

          {/* Health & Usage Bento */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* API Health */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm group">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Zap size={20} className="text-emerald-600" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-widest">Ideal</span>
              </div>
              <h5 className="text-3xl md:text-4xl font-black text-slate-800 mb-1 tracking-tighter">99.98%</h5>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest opacity-50">Saúde do Cluster</p>
              
              <div className="mt-8 flex gap-1 items-end h-10 group-hover:scale-y-105 transition-transform duration-500 origin-bottom">
                 {[15, 25, 40, 20, 35, 25, 45, 30].map((h, i) => (
                    <div key={i} className={cn(
                      "flex-1 rounded-sm transition-all duration-700",
                      i % 3 === 0 ? "bg-indigo-500" : "bg-indigo-100"
                    )} style={{ height: `${h}%` }}></div>
                 ))}
              </div>
            </div>

            {/* Monthly Capacity */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Activity size={20} className="text-indigo-600" />
                </div>
                {!isMobile && (
                  <span className="text-[10px] font-bold text-slate-400 opacity-40 uppercase tracking-widest">Atualização Diária</span>
                )}
              </div>
              <h5 className="text-3xl md:text-4xl font-black text-slate-800 mb-1 tracking-tighter">1.2k<span className="text-xl font-normal text-slate-300">/5k</span></h5>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest opacity-50">Cota de Postagem</p>
              <div className="mt-8 w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '24%' }}
                  className="bg-indigo-500 h-full rounded-full" 
                />
              </div>
            </div>

            {/* Compliance Panel */}
            <section className="col-span-12 md:col-span-2 bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-xl shadow-slate-900/20">
              <div className="flex flex-col md:flex-row items-start justify-between mb-10 gap-6">
                <div className="flex items-center gap-4">
                  <ShieldCheck size={28} className="text-indigo-400" />
                  <h4 className="text-xl md:text-2xl font-bold tracking-tight">Protocolos de Governança</h4>
                </div>
                <a className="text-indigo-400 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:underline" href="#">
                  Portal Compliance
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-8 md:space-y-10">
                  {[
                    { id: '01', title: 'Soberania de Dados', desc: 'Os nodos do Archive são arquitetados para respeitar mandatos de privacidade regionais.' },
                    { id: '02', title: 'Integridade Automatizada', desc: 'Detecção de conteúdo sintético ativa em 100% dos buffers de imagem.' }
                  ].map((p) => (
                    <div key={p.id} className="flex gap-4 md:gap-5">
                      <div className="w-8 md:w-10 h-8 md:h-10 rounded-xl bg-slate-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-slate-700">{p.id}</div>
                      <div>
                        <h6 className="font-bold text-white mb-1.5 text-sm tracking-tight">{p.title}</h6>
                        <p className="text-[11px] text-slate-400 leading-relaxed opacity-70">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-8 md:space-y-10">
                  <div className="flex gap-4 md:gap-5">
                    <div className="w-8 md:w-10 h-8 md:h-10 rounded-xl bg-slate-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-slate-700">03</div>
                    <div>
                      <h6 className="font-bold text-white mb-1.5 text-sm tracking-tight">Ciclo de Vida</h6>
                      <p className="text-[11px] text-slate-400 leading-relaxed opacity-70">Cache local efêmero estritamente purgado a cada 24 horas.</p>
                    </div>
                  </div>
                  <div className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400">
                       <AlertTriangle size={12} />
                       <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Nota de Segurança</span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-normal font-medium">Fluxo OAuth2.0 PKCE ativo para máxima segurança de token.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Regional Health Table */}
        <section className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
            <Globe size={20} className="text-indigo-600" />
            <h4 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Métricas Regionais</h4>
          </div>
          <div className="overflow-x-auto custom-scrollbar -mx-6 px-6">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 font-bold uppercase text-[9px] tracking-[0.2em] text-slate-400">Nodo</th>
                  <th className="pb-4 font-bold uppercase text-[9px] tracking-[0.2em] text-slate-400">Cluster</th>
                  <th className="pb-4 font-bold uppercase text-[9px] tracking-[0.2em] text-slate-400">Latência</th>
                  <th className="pb-4 font-bold uppercase text-[9px] tracking-[0.2em] text-slate-400">Saúde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {endpoints.map((ep) => (
                  <tr key={ep.name} className="group">
                    <td className="py-5 font-bold text-xs md:text-sm text-slate-800">{ep.name}</td>
                    <td className="py-5 text-[10px] font-medium text-slate-400 uppercase tracking-widest opacity-60">{ep.region}</td>
                    <td className="py-5 font-mono text-[10px] text-indigo-600 font-bold">{ep.latency}</td>
                    <td className="py-5">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          ep.status === 'Ideal' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "bg-amber-500"
                        )}></div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-700">{ep.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
