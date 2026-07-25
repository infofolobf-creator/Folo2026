import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Comment se déroule un accompagnement en coaching exécutif chez FOLO ?",
      a: "Un parcours typique débute par un entretien de cadrage stratégique avec la direction afin de définir des objectifs clairs et mesurables. S'ensuivent des séances individuelles ou collectives régulières (en présentiel ou distanciel) étalées sur plusieurs mois, complétées par un bilan intermédiaire et une évaluation d'impact finale."
    },
    {
      q: "Quelle est la durée moyenne d'un programme de coaching ou de formation ?",
      a: "Les diagnostics stratégiques s'effectuent sur quelques jours. Pour un coaching exécutif individuel ou d'équipe (CODIR), la durée varie généralement entre 3 et 6 mois afin d'assurer l'ancrage profond des nouvelles compétences et postures de leadership."
    },
    {
      q: "Comment l'Intelligence Artificielle est-elle intégrée dans vos accompagnements ?",
      a: "Nous utilisons l'IA sous deux formes : d'une part comme outil d'évaluation accélérée lors de la phase de diagnostic, et d'autre part comme levier opérationnel dans nos formations pour former vos cadres aux cas d'usage concrets de l'IA générative (rédaction, synthèse, gain de temps, aide à la décision)."
    },
    {
      q: "Pour quel type et quelle taille d'entreprise vos interventions sont-elles adaptées ?",
      a: "Nos interventions s'adressent prioritairement aux dirigeants de PME en forte croissance, grandes entreprises, filiales de groupes régionaux, institutions et organisations de la zone UEMOA (Burkina Faso, Côte d'Ivoire, Sénégal, etc.) désireuses de franchir un cap d'organisation."
    },
    {
      q: "Comment est garantie la confidentialité des échanges et des données d'entreprise ?",
      a: "La confidentialité est le socle absolu de notre métier. Un accord de confidentialité strict (NDA) est signé dès l'initialisation de nos échanges. Aucune donnée d'entreprise n'est partagée à des tiers."
    },
    {
      q: "Quelles sont les étapes pour réserver un diagnostic stratégique ?",
      a: "Il vous suffit de cliquer sur le bouton 'Réserver un diagnostic stratégique', de sélectionner votre créneau ou de remplir notre formulaire rapide. Un consultant FOLO prendra contact avec vous sous 24h pour valider les éléments préalables."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#0F1015] text-white">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Réponses aux Dirigeants
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Foire Aux Questions (FAQ)
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
            Retrouvez les réponses claires aux questions fréquemment posées par les chefs d'entreprise, DRH et managers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#14151a] border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 bg-black/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact WhatsApp prompt */}
        <div className="mt-12 text-center text-xs text-white/60">
          <p>
            Vous avez une question spécifique ? Contactez directement FOLO sur WhatsApp :{" "}
            <a
              href="https://wa.me/22604581198"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1 ml-1"
            >
              <MessageCircle className="w-3.5 h-3.5" /> +226 04 58 11 98
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
