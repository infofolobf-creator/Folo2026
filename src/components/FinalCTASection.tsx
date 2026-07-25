import React from 'react';
import { Sparkles, Calendar, ChevronRight, ShieldCheck, PhoneCall } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenRDVModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenRDVModal }) => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#0A0A0A] via-[#12131a] to-[#050507] text-white relative overflow-hidden border-t border-amber-400/20">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-6 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Passage à l'Action
        </div>

        {/* Exact Prompt Required Title */}
        <h2 className="heading-lg text-3xl sm:text-5xl font-extrabold font-display max-w-4xl mx-auto leading-tight">
          Prêt à développer durablement la performance de votre organisation ?
        </h2>

        {/* Exact Prompt Required Text */}
        <p className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Réservez un diagnostic stratégique avec FOLO afin d'identifier les leviers prioritaires de développement de votre entreprise.
        </p>

        {/* Exact Prompt Required CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenRDVModal}
            className="btn-primary w-full sm:w-auto text-sm py-4 px-9 rounded-xl font-bold flex items-center justify-center gap-2.5 shadow-2xl shadow-amber-400/25"
          >
            <Calendar className="w-4 h-4 fill-black" />
            <span>Réserver mon diagnostic</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Direct Contact Option */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-white/60">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Échange sans engagement
          </span>
          <span>•</span>
          <a
            href="https://wa.me/22604581198"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-400 hover:underline font-bold"
          >
            <PhoneCall className="w-4 h-4" /> Direct WhatsApp : +226 04 58 11 98
          </a>
        </div>

      </div>
    </section>
  );
};
