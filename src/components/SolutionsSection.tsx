import React from 'react';
import { ModuleView } from '../types';
import { Crown, Users, Bot, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface SolutionsSectionProps {
  setCurrentView: (view: ModuleView) => void;
  onOpenRDVModal: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ setCurrentView, onOpenRDVModal }) => {
  const solutions = [
    {
      id: 'coaching',
      title: "Coaching Exécutif & Alignement CODIR",
      subtitle: "Haute Direction & Comités de Direction",
      desc: "Un accompagnement sur-mesure pour les Directeurs Généraux et membres du CODIR, visant à clarifier la vision stratégique, renforcer la cohésion et accélérer la prise de décision.",
      icon: <Crown className="w-6 h-6 text-amber-400" />,
      benefits: [
        "Alignement stratégique parfait au sein du Comité de Direction",
        "Renforcement de la posture de leadership et prise de hauteur",
        "Gestion sereine des situations complexes et des arbitrages"
      ],
      ctaLabel: "Réserver un entretien stratégique",
      action: () => onOpenRDVModal(),
      highlight: true
    },
    {
      id: 'leadership',
      title: "Leadership & Management d'Équipe",
      subtitle: "Montée en Puissance des Managers",
      desc: "Des programmes structurés pour transformer vos cadres et managers en leaders inspirants, capables de responsabiliser leurs équipes et de réduire le turnover.",
      icon: <Users className="w-6 h-6 text-blue-400" />,
      benefits: [
        "Culture de la délégation efficace et du feedback constructif",
        "Amélioration de l'engagement et de la rétention des talents",
        "Communication fluide et réduction des frictions internes"
      ],
      ctaLabel: "Découvrir le programme de leadership",
      action: () => onOpenRDVModal(),
      highlight: false
    },
    {
      id: 'ia',
      title: "IA au Service de la Performance",
      subtitle: "Transformation Digitale & Opérationnelle",
      desc: "L'intégration concrète et éthique de l'Intelligence Artificielle Générative dans les processus managériaux et de décision pour décupler la productivité des équipes.",
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      benefits: [
        "Automatisation des tâches à faible valeur ajoutée et synthèses",
        "Montée en compétences rapide des équipes sur les outils IA",
        "Gain de temps mesurable pour la stratégie et le terrain"
      ],
      ctaLabel: "Évaluer votre maturité IA",
      action: () => setCurrentView('diagnostics'),
      highlight: false
    }
  ];

  return (
    <section id="solutions" className="py-16 lg:py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Solutions Stratégiques
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Des Accompagnements Orientés Résultats
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
            Trois piliers d'intervention complémentaires pour libérer le potentiel collectif de votre entreprise et assurer un développement pérenne.
          </p>
        </div>

        {/* Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className={`p-8 rounded-2xl border flex flex-col justify-between transition-all relative ${
                sol.highlight
                  ? 'bg-[#171820] border-amber-400/50 shadow-2xl scale-[1.02]'
                  : 'bg-[#14151a] border-white/10 hover:border-white/30'
              }`}
            >
              {sol.highlight && (
                <span className="absolute -top-3.5 left-8 px-3.5 py-1 bg-amber-400 text-black text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-lg">
                  Accompagnement Phare FOLO
                </span>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    {sol.icon}
                  </div>
                  <span className="text-[10px] text-white/50 uppercase font-mono tracking-wider">
                    {sol.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white">
                  {sol.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {sol.desc}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Bénéfices Attendus :
                  </h4>
                  <ul className="space-y-2.5">
                    {sol.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-white/90 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-auto">
                <button
                  onClick={sol.action}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    sol.highlight
                      ? 'btn-primary shadow-lg shadow-amber-400/20'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <span>{sol.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
