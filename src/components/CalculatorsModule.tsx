import React, { useState } from 'react';
import { CalculatorType, CalculatorResult } from '../types';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  Bot, 
  Target, 
  Award, 
  BarChart2, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface CalculatorsModuleProps {
  onOpenRDVModal: () => void;
}

export const CalculatorsModule: React.FC<CalculatorsModuleProps> = ({ onOpenRDVModal }) => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('roi_formation');

  // Input States
  // 1. ROI Formation
  const [numEmployees, setNumEmployees] = useState<number>(25);
  const [avgSalaryXOF, setAvgSalaryXOF] = useState<number>(450000); // 450k FCFA
  const [trainingCostXOF, setTrainingCostXOF] = useState<number>(3500000); // 3.5M FCFA
  const [productivityGainPercent, setProductivityGainPercent] = useState<number>(15);

  // 2. Turnover Cost
  const [cadresDepartNumber, setCadresDepartNumber] = useState<number>(3);
  const [cadreMonthlySalaryXOF, setCadreMonthlySalaryXOF] = useState<number>(850000); // 850k FCFA

  // 3. Bad Management
  const [totalStaff, setTotalStaff] = useState<number>(50);
  const [managementQualityScore, setManagementQualityScore] = useState<number>(4); // out of 10

  // 4. Meeting Time
  const [weeklyMeetingHours, setWeeklyMeetingHours] = useState<number>(12);
  const [managersCount, setManagersCount] = useState<number>(10);

  // 5. IA Gain
  const [teamSizeIA, setTeamSizeIA] = useState<number>(15);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState<number>(6);

  // Calculations
  const calculateResult = (): CalculatorResult => {
    switch (activeCalculator) {
      case 'roi_formation': {
        const annualPayroll = numEmployees * avgSalaryXOF * 12;
        const annualProductivityGain = annualPayroll * (productivityGainPercent / 100);
        const netGain = annualProductivityGain - trainingCostXOF;
        const roiPercent = Math.round((netGain / trainingCostXOF) * 100);

        return {
          title: "Calculateur de ROI d'un Programme de Formation",
          primaryValue: `${roiPercent}%`,
          primaryUnit: "de Retour sur Investissement",
          secondaryLabel: "Gain Financier Net Annuel",
          secondaryValue: `${(netGain / 1000000).toFixed(2)} Millions FCFA`,
          breakdown: [
            { label: "Coût Total de Formation", value: trainingCostXOF, formatted: `${(trainingCostXOF / 1000000).toFixed(2)} M FCFA` },
            { label: "Gain Brut de Productivité", value: annualProductivityGain, formatted: `${(annualProductivityGain / 1000000).toFixed(2)} M FCFA` },
            { label: "Gain Net Après Amortissement", value: netGain, formatted: `${(netGain / 1000000).toFixed(2)} M FCFA` }
          ],
          chartData: [
            { name: "An 1", actuel: trainingCostXOF / 1000000, optimise: (annualProductivityGain) / 1000000 },
            { name: "An 2", actuel: trainingCostXOF / 1000000, optimise: (annualProductivityGain * 1.8) / 1000000 },
            { name: "An 3", actuel: trainingCostXOF / 1000000, optimise: (annualProductivityGain * 2.5) / 1000000 }
          ],
          insights: [
            `Une augmentation de ${productivityGainPercent}% de productivité sur ${numEmployees} collaborateurs génère ${(annualProductivityGain / 1000000).toFixed(2)}M FCFA de valeur additionnelle.`,
            `L'investissement initial dans le programme FOLO est rentabilisé dès le ${Math.round((trainingCostXOF / annualProductivityGain) * 12)}ème mois.`
          ],
          recommendedAction: "Planifier le module FOLO Management & Leadership pour vos managers."
        };
      }

      case 'cost_turnover': {
        // Cost of turnover ~ 6 months of salary + recruitment + onboarding
        const costPerCadre = cadreMonthlySalaryXOF * 7.5;
        const totalTurnoverCost = costPerCadre * cadresDepartNumber;

        return {
          title: "Calculateur du Coût du Turnover des Talents Clés",
          primaryValue: `${(totalTurnoverCost / 1000000).toFixed(2)} M FCFA`,
          primaryUnit: "Coût d'Attrition Annuel",
          secondaryLabel: "Coût Moyen par Cadre Parti",
          secondaryValue: `${(costPerCadre / 1000000).toFixed(2)} M FCFA`,
          breakdown: [
            { label: "Perte de Productivité & Transition", value: costPerCadre * 0.4 * cadresDepartNumber, formatted: `${((costPerCadre * 0.4 * cadresDepartNumber) / 1000000).toFixed(2)} M FCFA` },
            { label: "Frais de Recrutement & Intégration", value: costPerCadre * 0.3 * cadresDepartNumber, formatted: `${((costPerCadre * 0.3 * cadresDepartNumber) / 1000000).toFixed(2)} M FCFA` },
            { label: "Fuite du Savoir-Faire & Mémoire", value: costPerCadre * 0.3 * cadresDepartNumber, formatted: `${((costPerCadre * 0.3 * cadresDepartNumber) / 1000000).toFixed(2)} M FCFA` }
          ],
          chartData: [
            { name: "Situation Actuelle", actuel: totalTurnoverCost / 1000000, optimise: (totalTurnoverCost * 0.3) / 1000000 },
            { name: "Avec Rétention FOLO", actuel: totalTurnoverCost / 1000000, optimise: (totalTurnoverCost * 0.15) / 1000000 }
          ],
          insights: [
            `Le départ de ${cadresDepartNumber} cadre(s) vous coûte ${(totalTurnoverCost / 1000000).toFixed(2)} Millions FCFA en recrutement, formation et perte de savoir.`,
            "Un programme d'accompagnement et d'alignement CODIR réduit la fuite des talents de plus de 65%."
          ],
          recommendedAction: "Activer le diagnostic FOLO Rétention & Climat Social à Bobo-Dioulasso."
        };
      }

      case 'cost_bad_management': {
        const annualMass = totalStaff * avgSalaryXOF * 12;
        const wasteFactor = (10 - managementQualityScore) * 0.035; // 3.5% loss per point under 10
        const annualLoss = annualMass * wasteFactor;

        return {
          title: "Calculateur du Coût du Mauvais Management",
          primaryValue: `${(annualLoss / 1000000).toFixed(2)} M FCFA`,
          primaryUnit: "Gaspillage Annuel estimé",
          secondaryLabel: "Part de la Masse Salariale Perdue",
          secondaryValue: `${(wasteFactor * 100).toFixed(1)}%`,
          breakdown: [
            { label: "Démotivation & Présentéisme", value: annualLoss * 0.5, formatted: `${((annualLoss * 0.5) / 1000000).toFixed(2)} M FCFA` },
            { label: "Erreurs Opérationnelles & Re-travail", value: annualLoss * 0.3, formatted: `${((annualLoss * 0.3) / 1000000).toFixed(2)} M FCFA` },
            { label: "Tensions & Friction RH", value: annualLoss * 0.2, formatted: `${((annualLoss * 0.2) / 1000000).toFixed(2)} M FCFA` }
          ],
          chartData: [
            { name: "Actuel (Score " + managementQualityScore + "/10)", actuel: annualLoss / 1000000, optimise: (annualLoss * 0.2) / 1000000 },
            { name: "Cible FOLO (Score 9/10)", actuel: annualLoss / 1000000, optimise: 0 }
          ],
          insights: [
            `Un niveau managérial évalué à ${managementQualityScore}/10 détruit environ ${(wasteFactor * 100).toFixed(1)}% de votre masse salariale.`,
            "Former vos managers aux postures d'écoute et d'agilité supprime directement ce gaspillage."
          ],
          recommendedAction: "Inscrire vos managers au parcours FOLO Efficacité Managériale."
        };
      }

      case 'lost_meeting_time': {
        const hourlyRate = (avgSalaryXOF * 1.5) / 160; // Approximate hourly cost
        const hoursPerYearPerManager = weeklyMeetingHours * 46;
        const totalHours = hoursPerYearPerManager * managersCount;
        const totalCost = totalHours * hourlyRate;
        const potentialSavings = totalCost * 0.4; // 40% time saved with agile meetings

        return {
          title: "Calculateur du Temps Perdu en Réunions Inefficaces",
          primaryValue: `${Math.round(totalHours)} Heures/an`,
          primaryUnit: "Perdues collectivement",
          secondaryLabel: "Équivalent Financier Perdu",
          secondaryValue: `${(totalCost / 1000000).toFixed(2)} M FCFA`,
          breakdown: [
            { label: "Coût Global Réunions", value: totalCost, formatted: `${(totalCost / 1000000).toFixed(2)} M FCFA` },
            { label: "Economie Réalisable (Méthode FOLO)", value: potentialSavings, formatted: `${(potentialSavings / 1000000).toFixed(2)} M FCFA` }
          ],
          chartData: [
            { name: "Heures Réunions / Semaine", actuel: weeklyMeetingHours * managersCount, optimise: (weeklyMeetingHours * 0.6) * managersCount }
          ],
          insights: [
            `Vos ${managersCount} managers passent ${weeklyMeetingHours}h par semaine en réunion. 40% de ce temps peut être libéré pour des tâches à forte valeur ajoutée.`,
            `C'est l'équivalent de ${(potentialSavings / 1000000).toFixed(2)} M FCFA récupérés chaque année.`
          ],
          recommendedAction: "Déployer la charte FOLO Réunions Agiles & Prise de Décision Rapide."
        };
      }

      case 'ia_gain': {
        const hoursSavedYear = hoursSavedPerWeek * 46 * teamSizeIA;
        const hourlyRate = (avgSalaryXOF * 1.3) / 160;
        const gainXOF = hoursSavedYear * hourlyRate;

        return {
          title: "Calculateur du Gain Potentiel grâce à l'IA Générative",
          primaryValue: `${(gainXOF / 1000000).toFixed(2)} M FCFA`,
          primaryUnit: "Gains de Productivité Annuels",
          secondaryLabel: "Heures Libérées par An",
          secondaryValue: `${hoursSavedYear.toLocaleString()} hrs`,
          breakdown: [
            { label: "Génération de Rapports & Syntheses", value: gainXOF * 0.4, formatted: `${((gainXOF * 0.4) / 1000000).toFixed(2)} M FCFA` },
            { label: "Analyse de Données & CRM Automatisé", value: gainXOF * 0.35, formatted: `${((gainXOF * 0.35) / 1000000).toFixed(2)} M FCFA` },
            { label: "Communication Client & Prospection", value: gainXOF * 0.25, formatted: `${((gainXOF * 0.25) / 1000000).toFixed(2)} M FCFA` }
          ],
          chartData: [
            { name: "Sans IA", actuel: 0, optimise: gainXOF / 1000000 },
            { name: "Avec IA FOLO", actuel: gainXOF / 1000000, optimise: (gainXOF * 1.5) / 1000000 }
          ],
          insights: [
            `Un gain moyen de ${hoursSavedPerWeek}h/semaine par collaborateur libère ${hoursSavedYear} heures réinvestissables dans la stratégie client.`,
            "FOLO AI Lab vous accompagne pour configurer des agents IA personnalisés."
          ],
          recommendedAction: "Demander une démonstration FOLO AI Lab pour votre entreprise."
        };
      }

      default: {
        return {
          title: "Calculateur de Performance Collective",
          primaryValue: "+28%",
          primaryUnit: "d'Efficacité Globale",
          secondaryLabel: "Impact Estimé sur le CA",
          secondaryValue: "+18 Millions FCFA",
          breakdown: [],
          chartData: [{ name: "Standard", actuel: 100, optimise: 128 }],
          insights: ["Optimisez l'alignement CODIR pour libérer la valeur de vos équipes."],
          recommendedAction: "Contacter l'équipe FOLO à Bobo-Dioulasso."
        };
      }
    }
  };

  const result = calculateResult();

  return (
    <section className="py-12 lg:py-20 bg-[#0A0A0A] text-white">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" /> Calculateurs de ROI & Performance FOLO
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Simulez vos Gains Financiers & Opérationnels
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base">
            Quantifiez le retour sur investissement de la formation, de la rétention des cadres et de l'intelligence artificielle pour votre organisation.
          </p>
        </div>

        {/* Calculator Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'roi_formation', label: 'ROI Formation', icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
            { id: 'cost_turnover', label: 'Coût Turnover', icon: <Users className="w-4 h-4 text-rose-400" /> },
            { id: 'cost_bad_management', label: 'Mauvais Management', icon: <DollarSign className="w-4 h-4 text-amber-400" /> },
            { id: 'lost_meeting_time', label: 'Temps Réunions', icon: <Clock className="w-4 h-4 text-blue-400" /> },
            { id: 'ia_gain', label: 'Gains IA', icon: <Bot className="w-4 h-4 text-purple-400" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCalculator(item.id as CalculatorType)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                activeCalculator === item.id
                  ? 'bg-amber-400 text-black border-amber-400 shadow-lg'
                  : 'bg-[#14151a] text-white/80 border-white/10 hover:border-white/30'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Active Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-[#14151a] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold font-display text-white border-b border-white/10 pb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" /> Paramètres de Simulation
            </h3>

            {activeCalculator === 'roi_formation' && (
              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Nombre de collaborateurs formés</span>
                    <span className="text-amber-400 font-bold">{numEmployees} personnes</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    value={numEmployees}
                    onChange={(e) => setNumEmployees(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Salaire mensuel moyen (XOF)</span>
                    <span className="text-amber-400 font-bold">{avgSalaryXOF.toLocaleString()} FCFA</span>
                  </div>
                  <input
                    type="range"
                    min="200000"
                    max="1500000"
                    step="50000"
                    value={avgSalaryXOF}
                    onChange={(e) => setAvgSalaryXOF(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Investissement Formation FOLO (XOF)</span>
                    <span className="text-amber-400 font-bold">{trainingCostXOF.toLocaleString()} FCFA</span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="15000000"
                    step="500000"
                    value={trainingCostXOF}
                    onChange={(e) => setTrainingCostXOF(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Gain de productivité estimé</span>
                    <span className="text-emerald-400 font-bold">+{productivityGainPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    value={productivityGainPercent}
                    onChange={(e) => setProductivityGainPercent(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeCalculator === 'cost_turnover' && (
              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Nombre de cadres ayant quitté l'entreprise par an</span>
                    <span className="text-rose-400 font-bold">{cadresDepartNumber} cadres</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={cadresDepartNumber}
                    onChange={(e) => setCadresDepartNumber(Number(e.target.value))}
                    className="w-full accent-rose-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Salaire mensuel brut moyen des cadres (XOF)</span>
                    <span className="text-amber-400 font-bold">{cadreMonthlySalaryXOF.toLocaleString()} FCFA</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="2500000"
                    step="50000"
                    value={cadreMonthlySalaryXOF}
                    onChange={(e) => setCadreMonthlySalaryXOF(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeCalculator === 'cost_bad_management' && (
              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Effectif total géré</span>
                    <span className="text-amber-400 font-bold">{totalStaff} collaborateurs</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={totalStaff}
                    onChange={(e) => setTotalStaff(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Note actuelle du management (sur 10)</span>
                    <span className="text-amber-400 font-bold">{managementQualityScore} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    value={managementQualityScore}
                    onChange={(e) => setManagementQualityScore(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeCalculator === 'lost_meeting_time' && (
              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Heures de réunion par manager / semaine</span>
                    <span className="text-blue-400 font-bold">{weeklyMeetingHours} h/semaine</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="25"
                    value={weeklyMeetingHours}
                    onChange={(e) => setWeeklyMeetingHours(Number(e.target.value))}
                    className="w-full accent-blue-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Nombre de managers concernés</span>
                    <span className="text-amber-400 font-bold">{managersCount} managers</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    value={managersCount}
                    onChange={(e) => setManagersCount(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeCalculator === 'ia_gain' && (
              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Taille de l'équipe utilisatrice</span>
                    <span className="text-purple-400 font-bold">{teamSizeIA} personnes</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="50"
                    value={teamSizeIA}
                    onChange={(e) => setTeamSizeIA(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-2">
                    <span className="text-white/80">Heures gagnées par personne / semaine</span>
                    <span className="text-emerald-400 font-bold">{hoursSavedPerWeek} h/semaine</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    value={hoursSavedPerWeek}
                    onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300 leading-relaxed">
              💡 Les calculs FOLO sont basés sur les barèmes salariaux réels observés en Afrique de l'Ouest (Burkina Faso, Côte d'Ivoire, Sénégal) et certifiés par notre pôle de conseil.
            </div>
          </div>

          {/* Outputs & Recharts Visualisation Panel */}
          <div className="lg:col-span-7 bg-[#14151a] border border-amber-400/30 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Résultats de la Simulation</span>
                  <h3 className="text-xl font-bold font-display text-white mt-0.5">{result.title}</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  Simulateur V2
                </span>
              </div>

              {/* Primary KPI Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-5 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/5 border border-amber-400/40">
                  <span className="text-xs text-amber-300 font-medium block uppercase tracking-wider">{result.primaryUnit}</span>
                  <div className="stat-number text-3xl sm:text-4xl text-amber-400 mt-1">{result.primaryValue}</div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white/60 font-medium block uppercase tracking-wider">{result.secondaryLabel}</span>
                  <div className="text-2xl font-bold font-display text-emerald-400 mt-2">{result.secondaryValue}</div>
                </div>
              </div>

              {/* Recharts Bar Chart */}
              <div className="my-6 bg-black/40 p-4 rounded-xl border border-white/10 h-56">
                <p className="text-[11px] text-white/50 mb-2 font-mono">Comparatif d'Impact (Millions FCFA)</p>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={result.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#888" fontSize={11} />
                    <YAxis stroke="#888" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="actuel" fill="#ef4444" name="Situation Sans FOLO" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="optimise" fill="#10b981" name="Optimisé avec FOLO" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Insights */}
              <div className="space-y-2 mb-6">
                {result.insights.map((insight, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/5 text-xs text-white/80 border border-white/10 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-white/60 font-medium">{result.recommendedAction}</span>
              <button
                onClick={onOpenRDVModal}
                className="btn-primary text-xs py-3 px-6 rounded-xl font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <span>Concrétiser ce ROI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
