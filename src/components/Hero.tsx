import React from 'react';
import { ModuleView } from '../types';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, TrendingUp, Users, Award, MapPin } from 'lucide-react';

interface HeroProps {
  setCurrentView: (view: ModuleView) => void;
  onOpenRDVModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentView, onOpenRDVModal }) => {
  return (
    <section className="relative pt-12 lg:pt-20 pb-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#121318] to-[#0A0A0A]">
      {/* Background Subtle Danfani Mesh */}
      <div className="absolute inset-0 danfani-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 text-center">
        {/* Badge HQ Bobo-Dioulasso */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-8 text-xs font-semibold tracking-wider uppercase">
          <MapPin className="w-3.5 h-3.5" /> Siège social à Bobo-Dioulasso • Burkina Faso & UEMOA
        </div>

        {/* Main Heading */}
        <h1 className="heading-lg max-w-5xl mx-auto text-white leading-tight font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl">
          Plateforme Intelligente de <span className="text-amber-400">Leadership Executive</span> & Diagnostics IA
        </h1>

        <p className="mt-6 text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-body">
          Accompagnement d'excellence des Dirigeants, Directeurs Généraux, DRH et Comités de Direction en Afrique Francophone. Mesurez vos leviers de performance et transformez vos équipes.
        </p>

        {/* Highlight Executive Card: "Évaluez gratuitement la performance de votre organisation" */}
        <div className="mt-10 max-w-3xl mx-auto p-8 rounded-2xl bg-[#17181f] border border-amber-400/40 shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-500"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="w-4 h-4" /> Diagnostic IA en 3 minutes
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Évaluez gratuitement la performance de votre organisation
              </h2>
              <p className="text-xs sm:text-sm text-white/70">
                Obtenez immédiatement un score de maturité, une cartographie des risques et votre rapport PDF personnalisé.
              </p>
            </div>

            {/* Core CTAs requested */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto flex-shrink-0">
              <button
                onClick={() => setCurrentView('diagnostics')}
                className="btn-primary text-xs py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>Faire un diagnostic</span>
              </button>

              <button
                onClick={onOpenRDVModal}
                className="btn-outline text-xs py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 border-white/30 hover:border-amber-400 text-white"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Prendre un rendez-vous stratégique</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick KPI Counters */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="stat-number text-3xl sm:text-4xl">8+</div>
            <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">Diagnostics IA</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="stat-number text-3xl sm:text-4xl text-emerald-400">7</div>
            <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">Calculateurs ROI</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="stat-number text-3xl sm:text-4xl text-blue-400">100%</div>
            <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">Connecté Lead Factory</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="stat-number text-3xl sm:text-4xl text-purple-400">24/7</div>
            <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">Assistant IA FOLO</p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 font-medium">
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-400" /> Données sécurisées & confidentielles</span>
          <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400" /> Méthodologie certifiée FOLO</span>
          <span className="flex items-center gap-2"><Users className="w-4 h-4 text-blue-400" /> Accompagnement CODIR & DRH</span>
          <span className="flex items-center gap-2"><Award className="w-4 h-4 text-purple-400" /> Facturation Franc CFA (XOF)</span>
        </div>
      </div>
    </section>
  );
};
