import React from 'react';
import { ModuleView } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Crown, 
  Users, 
  MessageSquareQuote, 
  HeartHandshake, 
  Award 
} from 'lucide-react';

interface HeroProps {
  setCurrentView: (view: ModuleView) => void;
  onOpenRDVModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentView }) => {
  const themes = [
    {
      keyword: "Leadership Stratégique",
      icon: <Crown className="w-6 h-6 text-amber-400" />,
      linkText: "Catalogue →",
      action: () => setCurrentView('resources')
    },
    {
      keyword: "Management Transversal",
      icon: <Users className="w-6 h-6 text-blue-400" />,
      linkText: "Catalogue →",
      action: () => setCurrentView('resources')
    },
    {
      keyword: "Feedback & Performance",
      icon: <MessageSquareQuote className="w-6 h-6 text-emerald-400" />,
      linkText: "Catalogue →",
      action: () => setCurrentView('resources')
    },
    {
      keyword: "Intelligence Relationnelle",
      icon: <HeartHandshake className="w-6 h-6 text-purple-400" />,
      linkText: "Catalogue →",
      action: () => setCurrentView('resources')
    }
  ];

  return (
    <section className="relative pt-16 lg:pt-28 pb-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#121318] to-[#0A0A0A]">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 danfani-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 text-center">
        
        {/* SECTION 1: QUE FAIRE MAINTENANT ? (Accroche unique et massive + Preuve visuelle + Un seul CTA) */}
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* 1. Accroche unique et massive */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display text-white leading-[1.1] tracking-tight">
            Dirigez avec clarté, <span className="text-amber-400">même dans l'incertitude</span>.
          </h1>

          {/* 2. Preuve visuelle avant argumentaire */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#171820] border border-amber-400/30 shadow-xl">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-black text-xs font-bold flex items-center justify-center border-2 border-[#171820]">DG</div>
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center border-2 border-[#171820]">DRH</div>
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center border-2 border-[#171820]">CEO</div>
              </div>
              <div className="text-left">
                <p className="text-sm font-extrabold text-white">40+ dirigeants & CODIR accompagnés</p>
                <p className="text-[11px] text-white/60">Bobo-Dioulasso & zone UEMOA</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold">
              <Award className="w-4 h-4" /> 98% de satisfaction mesurée
            </div>
          </div>

          {/* 3. Un seul call-to-action visible sur toute la page */}
          <div className="pt-4 max-w-md mx-auto">
            <button
              onClick={() => setCurrentView('diagnostics')}
              className="btn-primary w-full py-5 px-8 text-base sm:text-lg font-extrabold rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-400/25 hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5 fill-black" />
              <span>Recevoir mon diagnostic</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECTION 2: POUR QUI / QUELS SUJETS ? (Thématiques en icônes + mots-clés) */}
        <div className="mt-28 lg:mt-36 max-w-5xl mx-auto pt-12 border-t border-white/10">
          <p className="text-xs uppercase font-extrabold tracking-widest text-white/40 mb-8 font-mono">
            Thématiques d'accompagnement
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {themes.map((theme, i) => (
              <button
                key={i}
                onClick={theme.action}
                className="p-6 rounded-2xl bg-[#14151a] border border-white/10 hover:border-amber-400/50 hover:bg-[#191b22] transition-all text-left group flex flex-col justify-between h-40"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-fit group-hover:scale-110 transition-transform">
                  {theme.icon}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                    {theme.keyword}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400/80 group-hover:text-amber-400 mt-2">
                    {theme.linkText}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 3: QUI ÊTES-VOUS / QUELLE CONFIANCE ? (Témoignage en une ligne) */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-[#14151a] border border-amber-400/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50"></div>
            <p className="text-sm sm:text-base text-white/90 italic font-display">
              « Grâce à FOLO, nous avons clarifié notre stratégie en 3 semaines et renforcé l'alignement de notre CODIR. »
            </p>
            <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mt-2.5">
              — DG, Groupe Agro-industriel (Burkina Faso)
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
