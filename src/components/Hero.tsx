import React from 'react';
import { ModuleView } from '../types';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, TrendingUp, Users, Award, MapPin, ChevronRight } from 'lucide-react';

interface HeroProps {
  setCurrentView: (view: ModuleView) => void;
  onOpenRDVModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentView, onOpenRDVModal }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 lg:pt-20 pb-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#121318] to-[#0A0A0A]">
      {/* Background Subtle Danfani Mesh & Glow */}
      <div className="absolute inset-0 danfani-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 text-center">
        {/* Location / Positioning Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-8 text-xs font-semibold tracking-wider uppercase">
          <MapPin className="w-3.5 h-3.5" /> Cabinet d'Excellence • Bobo-Dioulasso, Burkina Faso & UEMOA
        </div>

        {/* Main Heading - Exact Prompt Requirement */}
        <h1 className="heading-lg max-w-5xl mx-auto text-white leading-tight font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl">
          Développez des équipes plus performantes et un <span className="text-amber-400">leadership durable</span>.
        </h1>

        {/* Subtitle - Exact Prompt Requirement */}
        <p className="mt-6 text-base sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-body">
          FOLO accompagne les dirigeants et les organisations dans l'amélioration durable de leur performance grâce au coaching exécutif, au leadership et à l'intelligence artificielle.
        </p>

        {/* Core Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenRDVModal}
            className="btn-primary w-full sm:w-auto text-sm py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20"
          >
            <Calendar className="w-4 h-4 fill-black" />
            <span>Réserver un diagnostic stratégique</span>
          </button>

          <button
            onClick={() => scrollToSection('solutions')}
            className="btn-outline w-full sm:w-auto text-sm py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 border-white/30 hover:border-amber-400 text-white"
          >
            <span>Découvrir notre approche</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Diagnostic Highlight Card */}
        <div className="mt-14 max-w-3xl mx-auto p-8 rounded-2xl bg-[#171820] border border-amber-400/40 shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-500"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="w-4 h-4" /> Diagnostic Stratégique d'Organisation
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Évaluez gratuitement les leviers de performance de votre entreprise
              </h2>
              <p className="text-xs sm:text-sm text-white/70">
                Obtenez immédiatement un aperçu clair de votre maturité managériale et organisationnelle.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('diagnostics')}
              className="btn-primary text-xs py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 flex-shrink-0 w-full md:w-auto"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Réaliser le diagnostic en ligne</span>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 font-medium">
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-400" /> Confidentialité stricte assurée</span>
          <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400" /> Approche axée sur les résultats</span>
          <span className="flex items-center gap-2"><Users className="w-4 h-4 text-blue-400" /> Accompagnement des Dirigeants & DRH</span>
          <span className="flex items-center gap-2"><Award className="w-4 h-4 text-purple-400" /> Expertise Afrique Francophone</span>
        </div>
      </div>
    </section>
  );
};
