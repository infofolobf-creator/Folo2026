import React, { useState } from 'react';
import { DIAGNOSTICS_DATA } from '../data/platformData';
import { DiagnosticConfig, DiagnosticCategory, DiagnosticResult } from '../types';
import { 
  Sparkles, 
  Crown, 
  Users, 
  Target, 
  UserMinus, 
  Bot, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  RefreshCw,
  Send,
  Building,
  Mail,
  Phone,
  User,
  MapPin
} from 'lucide-react';

interface DiagnosticsModuleProps {
  onOpenPDFModal: (result: DiagnosticResult, leadData: any) => void;
  onOpenRDVModal: () => void;
}

export const DiagnosticsModule: React.FC<DiagnosticsModuleProps> = ({ onOpenPDFModal, onOpenRDVModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<DiagnosticCategory>('leadership');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  // Form states for prospect capture
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+226 ');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Directeur Général');
  const [city, setCity] = useState('Bobo-Dioulasso');
  const [isLeadCreated, setIsLeadCreated] = useState(false);

  const activeConfig = DIAGNOSTICS_DATA.find(d => d.id === selectedCategory) || DIAGNOSTICS_DATA[0];
  const currentQuestion = activeConfig.questions[currentQuestionIndex] || activeConfig.questions[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-5 h-5 text-amber-400" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-400" />;
      case 'Target': return <Target className="w-5 h-5 text-emerald-400" />;
      case 'UserMinus': return <UserMinus className="w-5 h-5 text-rose-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-purple-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-indigo-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleSelectOption = (questionId: string, score: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeConfig.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateAndShowResult();
    }
  };

  const calculateAndShowResult = async () => {
    setIsSubmitting(true);
    let totalPossible = activeConfig.questions.length * 10;
    let totalScore = 0;

    activeConfig.questions.forEach(q => {
      totalScore += userAnswers[q.id] || 5;
    });

    const scaledScore = Math.round((totalScore / totalPossible) * 100);
    const level: 'Critique' | 'Moyen' | 'Avancé' | 'Excellence' = 
      scaledScore >= 80 ? 'Excellence' : scaledScore >= 60 ? 'Avancé' : scaledScore >= 40 ? 'Moyen' : 'Critique';

    // Call backend API for AI generation
    try {
      const response = await fetch('/api/gemini/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: activeConfig.title,
          scoreTotal: scaledScore,
          companyName: company || 'Organisation',
          role
        })
      });
      const data = await response.json();

      const result: DiagnosticResult = {
        id: `diag-${Date.now()}`,
        category: selectedCategory,
        scoreTotal: scaledScore,
        level,
        dimensions: [
          { name: 'Alignement Strategique', score: Math.min(100, scaledScore + 5) },
          { name: 'Agilite Decisionnelle', score: Math.max(20, scaledScore - 10) },
          { name: 'Culture & Engagement', score: scaledScore },
          { name: 'Maturite Digitale & IA', score: Math.min(100, scaledScore + 2) }
        ],
        keyRisks: [
          scaledScore < 50 ? "Lenteur dans les prises de décision du CODIR" : "Risque de surcharge managériale",
          "Déconnexion potentielle entre objectifs stratégiques et exécution terrain",
          "Besoin d'accompagnement sur l'adoption des outils d'IA générative"
        ],
        recommendations: data.recommendations || [
          "Mettre en place un séminaire de cadrage CODIR à Bobo-Dioulasso.",
          "Déployer le programme FOLO Executive Leadership 2026.",
          "Digitaliser le suivi des KPIs managériaux via l'Assistant IA FOLO."
        ],
        suggestedPrograms: [
          'Programme Executive Leadership & CODIR',
          'Atelier Agilité Managériale & Rétention Talents',
          'Accompagnement Sur-Mesure FOLO'
        ],
        createdAt: new Date().toLocaleDateString('fr-FR')
      };

      setDiagnosticResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterProspectAndSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    try {
      await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          company,
          role,
          city,
          country: 'Burkina Faso',
          diagnosticCategory: selectedCategory,
          notes: `Diagnostic ${activeConfig.title} réalisé avec score ${diagnosticResult?.scoreTotal}/100`
        })
      });
      setIsLeadCreated(true);
    } catch (err) {
      console.error(err);
      setIsLeadCreated(true);
    }
  };

  const resetDiagnostic = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setDiagnosticResult(null);
    setIsLeadCreated(false);
  };

  return (
    <section className="py-12 lg:py-20 bg-[#0A0A0A] text-white">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-8">
        {/* Module Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Module Diagnostics IA FOLO
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Diagnostics Intelligents de Performance
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base">
            Évaluez la santé organisationnelle de votre entreprise en quelques clics. Recevez une analyse par IA et un rapport PDF personnalisable.
          </p>
        </div>

        {/* Categories Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-12">
          {DIAGNOSTICS_DATA.map((diag) => {
            const isSelected = selectedCategory === diag.id;
            return (
              <button
                key={diag.id}
                onClick={() => {
                  setSelectedCategory(diag.id);
                  resetDiagnostic();
                }}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400 text-amber-400 shadow-lg'
                    : 'bg-[#14151a] border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  {getIcon(diag.iconName)}
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                    {diag.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold leading-tight line-clamp-2 mt-2">{diag.title.replace('Diagnostic ', '')}</h3>
                  <p className="text-[10px] text-white/40 mt-1">{diag.estimatedTimeMinutes} min</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Runner or Result Panel */}
        {!diagnosticResult ? (
          <div className="max-w-4xl mx-auto bg-[#14151a] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Diagnostic {currentQuestionIndex + 1} sur {activeConfig.questions.length}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                  {activeConfig.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/50 block">Temps estimé</span>
                <span className="text-sm font-bold text-amber-400">{activeConfig.estimatedTimeMinutes} minutes</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                  {currentQuestion.text}
                </h4>
                {currentQuestion.subtext && (
                  <p className="text-xs text-white/60 mt-1 italic">{currentQuestion.subtext}</p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = userAnswers[currentQuestion.id] === opt.score;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.score)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-amber-400/20 border-amber-400 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected ? 'border-amber-400 bg-amber-400 text-black font-bold text-xs' : 'border-white/30'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-relaxed">{opt.label}</p>
                        {isSelected && (
                          <p className="text-xs text-amber-300 mt-2 font-mono bg-amber-400/10 p-2 rounded border border-amber-400/20">
                            💡 {opt.feedback}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress & Actions */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="w-1/2 bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / activeConfig.questions.length) * 100}%` }}
                  ></div>
                </div>

                <button
                  disabled={userAnswers[currentQuestion.id] === undefined || isSubmitting}
                  onClick={handleNextQuestion}
                  className="btn-primary text-xs py-3 px-6 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Analyse IA en cours...
                    </>
                  ) : currentQuestionIndex < activeConfig.questions.length - 1 ? (
                    <>
                      <span>Question Suivante</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-black" />
                      <span>Obtenir Mon Diagnostic</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* RESULT DISPLAY PANEL */
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#14151a] border border-amber-400/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-500"></div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-b border-white/10 pb-8">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Diagnostic Complété avec Succès
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-2">
                    {activeConfig.title}
                  </h3>
                  <p className="text-xs text-white/60 mt-1">Calculé selon la méthodologie d'évaluation FOLO V2 (Bobo-Dioulasso)</p>
                </div>

                <div className="flex items-center gap-6 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-center">
                    <span className="text-xs text-white/50 uppercase tracking-wider block">Score Global</span>
                    <span className="stat-number text-4xl sm:text-5xl">{diagnosticResult.scoreTotal}<span className="text-lg text-white/40">/100</span></span>
                  </div>
                  <div className="h-10 w-px bg-white/10"></div>
                  <div>
                    <span className="text-xs text-white/50 uppercase tracking-wider block">Maturité</span>
                    <span className={`text-sm font-bold uppercase px-3 py-1 rounded-full ${
                      diagnosticResult.level === 'Excellence' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      diagnosticResult.level === 'Avancé' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {diagnosticResult.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dimensions breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div>
                  <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-400" /> Évaluation par Axes Stratégiques
                  </h4>
                  <div className="space-y-4">
                    {diagnosticResult.dimensions.map((dim, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-xs font-medium mb-1">
                          <span className="text-white/80">{dim.name}</span>
                          <span className="text-amber-400 font-bold">{dim.score}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-amber-400 to-amber-500 h-full"
                            style={{ width: `${dim.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" /> Points de Vigilance Détectés
                  </h4>
                  <ul className="space-y-2">
                    {diagnosticResult.keyRisks.map((risk, idx) => (
                      <li key={idx} className="text-xs text-white/80 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-6 mb-8">
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Recommandations Stratégiques FOLO IA
                </h4>
                <div className="space-y-2 text-xs text-white/90 leading-relaxed">
                  {diagnosticResult.recommendations.map((rec, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">{i + 1}.</span> {rec}
                    </p>
                  ))}
                </div>
              </div>

              {/* Prospect Qualification Form & PDF Report Generation */}
              {!isLeadCreated ? (
                <form onSubmit={handleRegisterProspectAndSync} className="bg-[#0A0A0A] p-6 rounded-xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-emerald-400" /> Générer & Recevoir Mon Rapport PDF Personnalisé
                    </h4>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Synchro CRM & Lead Factory
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Nom & Prénom *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Moussa Sawadogo"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Email Professionnel *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="moussa@entreprise.bf"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Téléphone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+226 04 58 11 98"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Entreprise / Organisation</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Coris Bank, SN CITEC, etc."
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Fonction</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-[#14151a] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                      >
                        <option value="Directeur Général">Directeur Général / DG</option>
                        <option value="Directeur des Ressources Humaines">Directeur des Ressources Humaines / DRH</option>
                        <option value="Membre CODIR">Membre Comité de Direction</option>
                        <option value="Manager">Manager de Proximité</option>
                        <option value="Entrepreneur">Entrepreneur / Fondateur</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Ville d'Implantation</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#14151a] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                      >
                        <option value="Bobo-Dioulasso">📍 Bobo-Dioulasso (Siège Folo)</option>
                        <option value="Ouagadougou">Ouagadougou</option>
                        <option value="Koudougou">Koudougou</option>
                        <option value="Abidjan">Abidjan (CI)</option>
                        <option value="Dakar">Dakar (SN)</option>
                        <option value="Autre">Autre Afrique de l'Ouest</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-xs py-3.5 rounded-lg font-bold flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 fill-black" />
                    <span>Enregistrer mon Profil & Accéder à mon Rapport PDF</span>
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-center space-y-2">
                  <p className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Profil enregistré & synchronisé avec FOLO CRM & Lead Factory !
                  </p>
                  <p className="text-[11px] text-white/70">
                    Un consultant FOLO de Bobo-Dioulasso étudiera vos réponses.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                <button
                  onClick={resetDiagnostic}
                  className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-xs font-medium flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Recommencer le Diagnostic
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenPDFModal(diagnosticResult, { fullName, company, email, phone })}
                    className="px-5 py-2.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-400 border border-amber-400/40 text-xs font-bold flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> Télécharger / Imprimer le Rapport PDF
                  </button>

                  <button
                    onClick={onOpenRDVModal}
                    className="btn-primary text-xs py-2.5 px-5 rounded-lg font-bold flex items-center gap-2"
                  >
                    <span>Prendre RDV avec un Expert FOLO</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
