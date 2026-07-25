import React from 'react';
import { Search, BarChart2, Compass, Award, LineChart, ChevronRight } from 'lucide-react';

interface MethodSectionProps {
  onOpenRDVModal: () => void;
}

export const MethodSection: React.FC<MethodSectionProps> = ({ onOpenRDVModal }) => {
  const steps = [
    {
      number: "01",
      title: "Diagnostic",
      desc: "Analyse approfondie de la situation initiale, identification des leviers et des points de blocage.",
      icon: <Search className="w-5 h-5 text-amber-400" />
    },
    {
      number: "02",
      title: "Analyse",
      desc: "Restitution des résultats, cartographie des besoins et validation conjointe des priorités.",
      icon: <BarChart2 className="w-5 h-5 text-blue-400" />
    },
    {
      number: "03",
      title: "Plan d'action",
      desc: "Co-construction d'une feuille de route pragmatique, adaptée à vos contraintes opérationnelles.",
      icon: <Compass className="w-5 h-5 text-emerald-400" />
    },
    {
      number: "04",
      title: "Accompagnement",
      desc: "Mise en œuvre des séances de coaching, ateliers managériaux et intégration des outils.",
      icon: <Award className="w-5 h-5 text-purple-400" />
    },
    {
      number: "05",
      title: "Mesure des résultats",
      desc: "Évaluation de l'impact, suivi de l'engagement des équipes et ajustements pour ancrer les acquis.",
      icon: <LineChart className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <section id="method" className="py-16 lg:py-24 bg-[#0F1015] text-white relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Méthodologie Éprouvée
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            La Méthode d'Accompagnement FOLO
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
            Un parcours structuré en 5 étapes clés pour garantir une transformation fluide, progressive et mesurable.
          </p>
        </div>

        {/* Visual Timeline / Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#14151a] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-extrabold text-amber-400/40 group-hover:text-amber-400 transition-colors">
                    {step.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold font-display text-white">
                  {step.title}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-amber-400/30">
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#171820] border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white font-display">
              Chaque étape est adaptée au contexte spécifique de votre entreprise
            </h4>
            <p className="text-xs text-white/70">
              Prêt à démarrer par un diagnostic initial offert ?
            </p>
          </div>

          <button
            onClick={onOpenRDVModal}
            className="btn-primary text-xs py-3 px-6 rounded-xl font-bold flex items-center gap-2 flex-shrink-0"
          >
            <span>Planifier l'étape 1 : Diagnostic</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
