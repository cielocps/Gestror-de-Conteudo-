'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { CheckCircle2, Repeat, Send, Verified, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostCardProps {
  author: string;
  handle: string;
  avatar: string;
  time: string;
  originalText: string;
  translatedText: string;
  image?: string;
  isVerified?: boolean;
}

export default function PostCard({ 
  author, 
  handle, 
  avatar, 
  time, 
  originalText, 
  translatedText, 
  image,
  isVerified = true 
}: PostCardProps) {
  return (
    <motion.article 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-2xl p-6 transition-shadow duration-300 shadow-sm hover:shadow-md border border-slate-200 group"
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-xl ring-1 ring-slate-200 overflow-hidden relative flex-shrink-0 bg-slate-50">
          <Image 
            src={avatar} 
            alt={author} 
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <div className="flex items-center gap-1 group/author">
                <span className="font-bold text-slate-800 truncate hover:underline cursor-pointer">{author}</span>
                {isVerified && <Verified size={14} className="text-primary fill-primary/10 flex-shrink-0" />}
                <span className="text-slate-400 text-sm ml-1 truncate">{handle} · {time}</span>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Conteúdo Original</span>
                  <p className="text-slate-600 text-sm leading-relaxed">{originalText}</p>
                </div>
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Globe size={10} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Conversão PT-BR</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic opacity-90">{translatedText}</p>
                </div>
              </div>
              
              {image && (
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 aspect-video relative bg-slate-100">
                  <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-white/80 backdrop-blur rounded text-[10px] font-bold uppercase text-slate-600">Mídia Anexada</div>
                  <Image 
                    src={image} 
                    alt="Conteúdo do post" 
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex gap-3 justify-end">
            <motion.button 
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors border border-slate-200 flex items-center gap-2"
            >
              <Send size={14} />
              Revisar
            </motion.button>
            <motion.button 
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2"
            >
              <Repeat size={14} />
              Publicar
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
