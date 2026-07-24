import React from 'react';
import { ModuleView } from '../types';
import { Crown, Users, Sparkles, Bot, Calendar, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface ServicesSectionProps {
  setCurrentView: (view: ModuleView) => void;
  onOpenRDVModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ setCurrentView, onOpenRDVModal }) => {
  const services = [
    {
      title: "Executive Coaching & Alignement CODIR",
      subtitle: "Accompagnement de Haute Direction",
      desc: "Accompagnement individuel et collectif des Directeurs Généraux et membres du Comité de Direction pour renforcer la vision, la cohésion et la vitesse d'exécution.",
      features: [
        "Séminaires de cadrage stratégique CODIR à Bobo-Dioulasso ou sur site",
        "Coaching de posture pour DG & Cadres Dirigeants",
        "Gestion des conflits et gouvernance d'entreprise"
      ],
      icon: <Crown className="w-6 h-6 text-amber-400" />,
      cta: "Planifier un entretien",
      highlight: true
    },
    {
      title: "Formation Management & Performance Équipe",
      subtitle: "Montée en Compétences des Managers",
      desc: "Programmes intensifs pour structurer le management intermédiaire, développer le leadership d'écoute et stopper le gaspillage lié au turnover.",
      features: [
        "Parcours certifiant FOLO Management V2",
        "Outils pratiques de délégation et de feedback",
        "Ateliers de rétention des talents clés"
      ],
      icon: <Users className="w-6 h-6 text-blue-400" />,
      cta: "Découvrir le programme"
    },
    {
      title: "Transformation & Accompagnement IA",
      subtitle: "FOLO AI Lab",
      desc: "Intégration opérationnelle de l'Intelligence Artificielle Générative dans les processus managériaux, RH et de décision de votre organisation.",
      features: [
        "Diagnostic de maturité IA de vos équipes",
        "Formation des cadres aux outils IA (Gemini, ChatGPT)",
        "Automatisation des workflows de reporting et CRM"
      ],
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      cta: "Évaluer votre maturité IA"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Nos Domaines d'Intervention
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Offres d'Accompagnement Sur-Mesure
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base">
            Des solutions conçues spécifiquement pour les enjeux des entreprises d'Afrique de l'Ouest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border flex flex-col justify-between transition-all relative ${
                service.highlight
                  ? 'bg-[#171820] border-amber-400/50 shadow-2xl scale-[1.02]'
                  : 'bg-[#14151a] border-white/10 hover:border-white/30'
              }`}
            >
              {service.highlight && (
                <span className="absolute -top-3.5 left-8 px-3 py-1 bg-amber-400 text-black text-[10px] font-extrabold uppercase rounded-full shadow-lg">
                  Offre Phare FOLO
                </span>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    {service.icon}
                  </div>
                  <span className="text-[10px] text-white/50 uppercase font-mono">{service.subtitle}</span>
                </div>

                <h3 className="text-xl font-bold font-display text-white">{service.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed">{service.desc}</p>

                <ul className="space-y-2.5 pt-2 border-t border-white/10">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="text-xs text-white/90 flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    if (service.title.includes('IA')) {
                      setCurrentView('diagnostics');
                    } else {
                      onOpenRDVModal();
                    }
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    service.highlight
                      ? 'btn-primary'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <span>{service.cta}</span>
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
