'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  subtext?: string;
  icon: LucideIcon;
  variant?: 'primary' | 'tertiary';
}

export default function StatCard({ 
  label, 
  value, 
  trend, 
  subtext, 
  icon: Icon,
  variant = 'primary'
}: StatCardProps) {
  const iconColor = variant === 'primary' ? 'text-primary' : 'text-emerald-600';
  const iconBg = variant === 'primary' ? 'bg-indigo-50' : 'bg-emerald-50';
  
  const isPositive = trend?.startsWith('+');
  const trendColor = isPositive ? 'text-emerald-600' : 'text-red-500';

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm flex flex-col gap-3 group"
    >
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", iconBg)}>
          <Icon className={cn(iconColor)} size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-800 tracking-tight">{value}</span>
            {trend && <span className={cn("text-[10px] font-bold", trendColor)}>{trend}</span>}
            {subtext && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60 ml-auto">{subtext}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
