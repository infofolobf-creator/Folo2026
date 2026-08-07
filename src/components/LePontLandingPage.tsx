import React, { useEffect } from 'react';

interface LePontLandingPageProps {
  onBackToMain?: () => void;
}

export const LePontLandingPage: React.FC<LePontLandingPageProps> = ({ onBackToMain }) => {
  useEffect(() => {
    // Inject Chariow widget script dynamically if needed
    const existingScript = document.getElementById('chariow-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'chariow-script';
      script.src = 'https://chariow.com/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between items-center px-4 py-12 sm:py-20 font-body selection:bg-[#ffcc00] selection:text-black">
      
      {/* Optional discrete brand marker */}
      <header className="w-full max-w-3xl flex justify-between items-center mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-white/40">
          Éditions FOLO Executive
        </span>
        {onBackToMain && (
          <button
            onClick={onBackToMain}
            className="text-xs text-white/50 hover:text-[#ffcc00] transition-colors underline"
          >
            ← Retour au site principal
          </button>
        )}
      </header>

      <main className="w-full max-w-3xl mx-auto flex flex-col items-center text-center space-y-16 sm:space-y-20">
        
        {/* 1. ACCROCHE UNIQUE */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display text-white leading-tight tracking-tight">
            Diaspora + Local = <span className="text-[#ffcc00]">Duo Gagnant</span>
          </h1>
          <p className="text-xl sm:text-2xl text-amber-200/90 font-medium font-display max-w-2xl mx-auto">
            Ce qu'on ne vous a pas dit avant votre retour
          </p>
        </div>

        {/* 2. PREUVE VISUELLE (Couverture en pleine largeur) */}
        <div className="w-full max-w-xl mx-auto overflow-hidden rounded-3xl shadow-2xl border border-[#ffcc00]/30 bg-[#14151a]">
          <img
            src="/le_pont_book_cover.jpg"
            alt="Livre Le Pont - Diaspora + Local = Duo Gagnant"
            className="w-full h-auto object-cover shadow-2xl hover:scale-102 transition-transform duration-500"
          />
        </div>

        {/* 3. ARGUMENT COURT */}
        <div className="max-w-xl mx-auto px-2">
          <p className="text-base sm:text-xl text-white/90 leading-relaxed font-body">
            Ce livre est conçu pour les entrepreneurs, cadres et investisseurs de la diaspora qui préparent leur retour ou un projet en Afrique, pour réussir l'alliance incontournable entre compétences internationales et réalités locales.
          </p>
        </div>

        {/* 4. BLOC URGENCE */}
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#ffcc00]/10 border-2 border-[#ffcc00] shadow-xl text-center space-y-2">
          <p className="text-xl sm:text-3xl font-extrabold text-[#ffcc00] tracking-tight">
            Prix promo 10 000 FCFA{' '}
            <span className="line-through text-white/40 text-base font-normal block sm:inline ml-1">
              (au lieu de 12 500 FCFA)
            </span>
          </p>
          <p className="text-xs sm:text-sm font-extrabold text-[#ffcc00]/90 uppercase tracking-widest pt-1">
            — valable jusqu'au 30 novembre 2026
          </p>
        </div>

        {/* 5. CTA UNIQUE (Widget Chariow) */}
        <div className="w-full max-w-md my-4">
          <div id="chariow-widget-container" className="chariow-widget flex justify-center">
            <a
              href="https://chariow.com/pay/le-pont"
              data-chariow-product="le-pont"
              target="_blank"
              rel="noopener noreferrer"
              className="chariow-btn w-full py-5 px-8 rounded-2xl text-lg sm:text-xl font-extrabold text-black bg-[#ffcc00] hover:bg-[#e6b800] transition-all shadow-2xl shadow-[#ffcc00]/30 hover:scale-105 flex items-center justify-center gap-3 border-none cursor-pointer"
              style={{ backgroundColor: '#ffcc00', color: '#000000' }}
            >
              <span>🛒 Acheter le livre maintenant (10 000 FCFA)</span>
            </a>
          </div>
        </div>

        {/* 6. TÉMOIGNAGE EN UNE LIGNE */}
        <div className="w-full max-w-lg mx-auto pt-2">
          <blockquote className="text-sm sm:text-base italic text-white/80 font-display">
            « Un guide indispensable et pragmatique pour transformer l'expérience de la diaspora en succès sur le terrain. »
          </blockquote>
          <p className="text-xs font-bold text-[#ffcc00] uppercase tracking-wider mt-3">
            — Ousmane K., Entrepreneur réinstallé à Ouagadougou
          </p>
        </div>

      </main>

      <footer className="w-full max-w-3xl text-center mt-16 pt-8 border-t border-white/10 text-xs text-white/40">
        © 2026 FOLO — Tous droits réservés.
      </footer>
    </div>
  );
};
