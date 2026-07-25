import React from 'react';
import { AlertCircle, Users, MessageSquareX, RefreshCw, Bot, ArrowRight } from 'lucide-react';

interface ChallengesSectionProps {
  onOpenRDVModal: () => void;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({ onOpenRDVModal }) => {
  const challenges = [
    {
      icon: <Users className="w-6 h-6 text-amber-400" />,
      title: "Manque d'engagement des équipes",
      desc: "Perte de motivation, baisse d'initiative et risque élevé d'usure ou de départ des talents clés.",
      impact: "Baisse de productivité et coûts cachés de renouvellement des effectifs."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-rose-400" />,
      title: "Difficultés managériales",
      desc: "Managers de proximité sous pression, manque de posture de leadership et difficultés à déléguer efficacement.",
      impact: "Goulots d'étranglement décisionnels et surcharge de la direction."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-400" />,
      title: "Résistance au changement",
      desc: "Frictions lors des réorganisations, peur des nouvelles méthodologies et perte de vitesse opérationnelle.",
      impact: "Projets stratégiques freinés et retards dans l'exécution."
    },
    {
      icon: <MessageSquareX className="w-6 h-6 text-orange-400" />,
      title: "Problèmes de communication interne",
      desc: "Silos entre départements, circulation fluide limitée de l'information et décalage d'alignement avec le CODIR.",
      impact: "Doublons de travail, incompréhensions et climat de tension."
    },
    {
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      title: "Besoin d'intégrer l'Intelligence Artificielle",
      desc: "Incertitude face à la déferlante IA, manque de formation des cadres et absence de feuille de route technologique.",
      impact: "Perte de compétitivité face aux organisations plus agiles."
    }
  ];

  return (
    <section id="challenges" className="py-16 lg:py-24 bg-[#0F1015] text-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" /> Réalités & Défis des Organisations
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Les Défis Majeurs des Entreprises & Dirigeants
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
            Dans un environnement économique en constante évolution, les dirigeants font face à des freins critiques qui impactent directement la rentabilité et la croissance.
          </p>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="p-7 rounded-2xl bg-[#14151a] border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 w-fit group-hover:bg-amber-400/10 group-hover:border-amber-400/30 transition-colors">
                  {challenge.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {challenge.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-[11px] font-semibold text-amber-400/90 block uppercase tracking-wider font-mono">
                  Impact direct :
                </span>
                <p className="text-xs text-white/60 mt-1">
                  {challenge.impact}
                </p>
              </div>
            </div>
          ))}

          {/* CTA Challenge Card */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-[#1c1d26] to-[#12131a] border border-amber-400/30 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                Diagnostic Personnalisé
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                Vous identifiez l'un de ces freins dans votre organisation ?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Transformez ces défis en opportunités stratégiques grâce à un accompagnement ciblé et adapté à vos objectifs d'affaires.
              </p>
            </div>

            <button
              onClick={onOpenRDVModal}
              className="mt-6 btn-primary py-3.5 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2 w-full"
            >
              <span>Échanger sur vos enjeux</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
