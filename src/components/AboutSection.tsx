import React from 'react';
import { MapPin, Award, ShieldCheck, Users, Target, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenRDVModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenRDVModal }) => {
  return (
    <section className="py-16 lg:py-24 bg-[#0F1015] text-white relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> À Propos de FOLO
            </div>

            <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display leading-tight">
              L'Excellence du <span className="text-amber-400">Coaching & de la Formation</span> de Haute Direction
            </h2>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Basé à <strong className="text-amber-400">Bobo-Dioulasso (Burkina Faso)</strong> et intervenant sur l'ensemble de l'espace UEMOA (Ouagadougou, Abidjan, Dakar), FOLO accompagne les Dirigeants, Directeurs Généraux, DRH et Comités de Direction dans l'atteinte de performances durables.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Ancrage Territorial & Rayonnement Régional</h3>
                  <p className="text-xs text-white/60 mt-1">Siège social stratégique à Bobo-Dioulasso, avec une réactivité d'intervention à Ouagadougou et dans toute l'Afrique de l'Ouest.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <Target className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Méthodologie Certifiée & IA Intégrée</h3>
                  <p className="text-xs text-white/60 mt-1">Combinaison unique d'Executive Coaching, de facilitation d'équipe et d'outils d'évaluation dopés par l'Intelligence Artificielle.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <Users className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Focus Dirigeants, CODIR & Managers</h3>
                  <p className="text-xs text-white/60 mt-1">Parcours sur-mesure répondant aux défis spécifiques des entreprises en forte croissance et institutions d'Afrique francophone.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenRDVModal}
                className="btn-primary text-xs py-3.5 px-6 rounded-xl font-bold flex items-center gap-2"
              >
                <span>Échanger avec un Consultant FOLO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="bg-[#171820] border border-amber-400/30 rounded-2xl p-8 shadow-2xl relative space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">FOLO Hub Bobo-Dioulasso</span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  Afrique Francophone
                </span>
              </div>

              <div className="space-y-4 text-xs text-white/80">
                <p>
                  "Notre vision est de doter les leaders africains d'outils décisionnels et managériaux de classe mondiale pour accélérer la croissance de leurs entreprises."
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex justify-between font-bold text-amber-400">
                    <span>Satisfactions Clients CODIR</span>
                    <span>98%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full" style={{ width: '98%' }}></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex justify-between font-bold text-emerald-400">
                    <span>Rétention des Cadres après Parcours</span>
                    <span>+85%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-right">
                <p className="text-xs font-bold text-white">L'Équipe FOLO Coaching & Formation</p>
                <p className="text-[10px] text-amber-400 font-mono">Bobo-Dioulasso • Burkina Faso</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
