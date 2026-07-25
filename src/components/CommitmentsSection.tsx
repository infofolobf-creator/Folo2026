import React from 'react';
import { ShieldCheck, UserCheck, Target, RefreshCw, Lock, FileText, Building2 } from 'lucide-react';

export const CommitmentsSection: React.FC = () => {
  const commitments = [
    {
      title: "Confidentialité Absolue",
      desc: "Tous les échanges, données stratégiques et comptes-rendus d'accompagnement sont couverts par un accord de confidentialité strict (NDA).",
      icon: <Lock className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Accompagnement Sur-Mesure",
      desc: "Chaque organisation est unique. Nous refusons les modèles préconçus pour adapter nos méthodologies à la réalité exacte de votre entreprise.",
      icon: <UserCheck className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "Orientation Vers Les Résultats",
      desc: "Nos interventions visent des changements d'habitudes durables et mesurables sur la performance globale et le climat managérial.",
      icon: <Target className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Amélioration Continue",
      desc: "Nous faisons évoluer nos programmes grâce au retour d'expérience terrain et aux meilleures pratiques internationales en leadership et IA.",
      icon: <RefreshCw className="w-6 h-6 text-purple-400" />
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0A0A0A] text-white border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Éthique & Rigueur
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Nos Engagements d'Excellence
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
            La confiance des dirigeants repose sur des principes éthiques inflexibles et une exigence de qualité permanente.
          </p>
        </div>

        {/* Commitment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, index) => (
            <div
              key={index}
              className="p-7 rounded-2xl bg-[#14151a] border border-white/10 hover:border-amber-400/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 w-fit">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Prepared Extensible Case Studies Container */}
        <div className="mt-16 p-8 rounded-2xl bg-[#121318] border border-white/10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/60 text-[11px] font-mono uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-amber-400" /> Références & Cas Client
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Un accompagnement respectueux de l'anonymat de nos partenaires
          </h3>
          <p className="text-xs text-white/70 max-w-2xl mx-auto leading-relaxed">
            Pour des raisons de confidentialité stratégique, nous ne divulguons pas publiquement l'identité de nos clients comités de direction sans leur accord explicite. Des études de cas anonymisées et références sectorielles sont présentées lors des entretiens préalables.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-amber-400">
            <FileText className="w-4 h-4" />
            <span>Cas sectoriels disponibles sur demande lors du diagnostic</span>
          </div>
        </div>

      </div>
    </section>
  );
};
