import React from 'react';
import { ModuleView } from '../types';
import { Sparkles, User, Users2, Check, ArrowRight, Calendar } from 'lucide-react';

interface OffersSectionProps {
  setCurrentView: (view: ModuleView) => void;
  onOpenRDVModal: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ setCurrentView, onOpenRDVModal }) => {
  const offers = [
    {
      id: 'diagnostic',
      title: "Diagnostic Stratégique",
      target: "Pour toute entreprise souhaitant faire le point",
      desc: "Une évaluation claire et structurée des forces, faiblesses et opportunités de votre organisation pour identifier vos leviers de croissance immédiats.",
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      features: [
        "Cartographie rapide des freins managériaux",
        "Rapport de synthèse personnalisé",
        "Restitution et recommandations prioritaires",
        "Accès aux outils d'évaluation en ligne"
      ],
      popular: false,
      ctaLabel: "Demander un rendez-vous",
      action: onOpenRDVModal
    },
    {
      id: 'individuel',
      title: "Coaching Individuel",
      target: "Pour Dirigeants, DG, Directeurs & Cadres",
      desc: "Un accompagnement confidentiel et sur-mesure pour développer votre leadership, affirmer votre posture et franchir des cap stratégiques majeurs.",
      icon: <User className="w-6 h-6 text-amber-400" />,
      features: [
        "Entretiens individuels réguliers",
        "Travail approfondi sur la posture et la décision",
        "Gestion du stress et de la charge mentale",
        "Plan d'action et suivi d'impact personnalisé"
      ],
      popular: true,
      ctaLabel: "Demander un rendez-vous",
      action: onOpenRDVModal
    },
    {
      id: 'equipe',
      title: "Coaching d'Équipe & CODIR",
      target: "Pour Comités de Direction & Équipes Clés",
      desc: "Un dispositif collectif pour aligner la gouvernance, renforcer la confiance mutuelle, dépasser les silos et dynamiser la performance collective.",
      icon: <Users2 className="w-6 h-6 text-blue-400" />,
      features: [
        "Séminaires d'alignement stratégique CODIR",
        "Ateliers de résolution de conflits et synergie",
        "Co-construction de la vision d'entreprise",
        "Ancrage d'une culture de haute responsabilité"
      ],
      popular: false,
      ctaLabel: "Demander un rendez-vous",
      action: onOpenRDVModal
    }
  ];

  return (
    <section id="offres" className="py-16 lg:py-24 bg-[#0F1015] text-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" /> Nos Formats d'Intervention
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Des Offres Adaptées à Vos Enjeux
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
            Choisissez le format d'accompagnement le plus adapté aux besoins actuels de votre gouvernance et de vos équipes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`p-8 rounded-2xl border flex flex-col justify-between transition-all relative ${
                offer.popular
                  ? 'bg-[#171820] border-amber-400/60 shadow-2xl scale-[1.02]'
                  : 'bg-[#14151a] border-white/10 hover:border-white/30'
              }`}
            >
              {offer.popular && (
                <span className="absolute -top-3.5 left-8 px-3.5 py-1 bg-amber-400 text-black text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-lg">
                  Recommandé par nos clients
                </span>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    {offer.icon}
                  </div>
                  <span className="text-[10px] text-amber-400 uppercase font-mono font-semibold">
                    Format Exécutif
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-1 font-mono uppercase tracking-wider">
                    {offer.target}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {offer.desc}
                </p>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Inclus dans l'accompagnement :
                  </span>
                  <ul className="space-y-2.5">
                    {offer.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-white/80 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={offer.action}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    offer.popular
                      ? 'btn-primary shadow-lg shadow-amber-400/20'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{offer.ctaLabel}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
