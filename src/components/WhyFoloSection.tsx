import React from 'react';
import { Target, Globe, Award, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface WhyFoloSectionProps {
  onOpenRDVModal: () => void;
}

export const WhyFoloSection: React.FC<WhyFoloSectionProps> = ({ onOpenRDVModal }) => {
  const pillars = [
    {
      title: "Une approche 100% personnalisée",
      desc: "Pas de formules génériques. Nous concevons chaque parcours en fonction de la taille de votre entreprise, de votre culture d'organisation et de vos priorités stratégiques.",
      icon: <Target className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Ancrage local & connaissance du contexte africain",
      desc: "Basés à Bobo-Dioulasso et actifs dans la zone UEMOA, nous maîtrisons parfaitement les spécificités managériales et culturelles de nos entreprises.",
      icon: <Globe className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "Un accompagnement orienté résultats",
      desc: "Nous ne nous contentons pas de transmettre des concepts : nous définissons des indicateurs de réussite clairs pour mesurer l'impact sur le terrain.",
      icon: <Award className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Outils modernes & Intégration de l'IA",
      desc: "Nous combinons le coaching de haute direction avec les technologies décisionnelles les plus avancées pour simplifier l'exécution au quotidien.",
      icon: <Sparkles className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Suivi rigoureux après l'intervention",
      desc: "Notre mission continue après les séances. Nous assurons un suivi post-accompagnement pour garantir l'ancrage durable des nouvelles pratiques.",
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Notre Différence
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Pourquoi Choisir FOLO ?
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
            L'alliance unique de l'expertise en Executive Coaching, de la compréhension fine du terrain africain et des technologies modernes.
          </p>
        </div>

        {/* Grid of 5 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-[#14151a] border border-white/10 hover:border-amber-400/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 w-fit">
                  {pillar.icon}
                </div>

                <h3 className="text-lg font-bold font-display text-white">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Action Box */}
          <div className="p-8 rounded-2xl bg-[#171820] border border-amber-400/40 flex flex-col justify-between text-left space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Prochaine Étape
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                Discutons de vos projets stratégiques
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Planifiez un échange de 30 minutes avec nos experts pour évaluer vos leviers prioritaires.
              </p>
            </div>

            <button
              onClick={onOpenRDVModal}
              className="btn-primary py-3.5 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2 w-full"
            >
              <span>Prendre rendez-vous</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
