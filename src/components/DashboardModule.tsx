import React, { useState, useEffect } from 'react';
import { KPIStats } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  Globe, 
  Linkedin, 
  Search, 
  MessageCircle,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';

export const DashboardModule: React.FC = () => {
  const [stats, setStats] = useState<KPIStats>({
    totalVisitors: 4280,
    totalDiagnosticsCompleted: 612,
    totalLeadsQualified: 148,
    conversionRate: 14.3,
    appointmentsScheduled: 39,
    pipelineValueXOF: 185000000
  });

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.totalVisitors) setStats(data);
      })
      .catch(err => console.error(err));
  }, []);

  const trafficData = [
    { name: 'LinkedIn Campaign Folo', value: 45, color: '#3b82f6' },
    { name: 'SEO & Google Search', value: 30, color: '#10b981' },
    { name: 'Recommandations Pairs', value: 15, color: '#d4af37' },
    { name: 'WhatsApp & Direct', value: 10, color: '#a855f7' }
  ];

  const monthlyDiagnostics = [
    { month: 'Mars', diagnostics: 85, leads: 20, rdv: 5 },
    { month: 'Avril', diagnostics: 110, leads: 28, rdv: 8 },
    { month: 'Mai', diagnostics: 145, leads: 35, rdv: 10 },
    { month: 'Juin', diagnostics: 180, leads: 42, rdv: 12 },
    { month: 'Juillet', diagnostics: 212, leads: 50, rdv: 15 }
  ];

  return (
    <section className="py-12 lg:py-20 bg-[#0A0A0A] text-white">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        {/* Module Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-3 text-xs font-semibold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" /> Tableau de Bord FOLO Platform V2
            </div>
            <h2 className="heading-lg text-2xl sm:text-4xl font-bold font-display">
              Analytique & Performance de la Plateforme
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Vue en temps réel des diagnostics, taux de conversion, acquisition LinkedIn & pipeline d'opportunités.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10 text-xs font-mono text-amber-400">
            <span>📍 Siège: Bobo-Dioulasso</span>
            <span>•</span>
            <span>Burkina Faso & UEMOA</span>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[#14151a] border border-white/10 space-y-2">
            <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold block">Visiteurs Totaux</span>
            <div className="stat-number text-2xl sm:text-3xl text-white">{stats.totalVisitors.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">+24% vs mois dernier</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#14151a] border border-amber-400/30 space-y-2">
            <span className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold block">Diagnostics IA</span>
            <div className="stat-number text-2xl sm:text-3xl text-amber-400">{stats.totalDiagnosticsCompleted}</div>
            <span className="text-[10px] text-amber-300 font-bold">8 modules actifs</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#14151a] border border-blue-500/30 space-y-2">
            <span className="text-[10px] text-blue-400 uppercase tracking-wider font-semibold block">Prospects Qualifiés</span>
            <div className="stat-number text-2xl sm:text-3xl text-blue-400">{stats.totalLeadsQualified}</div>
            <span className="text-[10px] text-blue-300 font-bold">Score moyen 82/100</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#14151a] border border-emerald-500/30 space-y-2">
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold block">Taux de Conversion</span>
            <div className="stat-number text-2xl sm:text-3xl text-emerald-400">{stats.conversionRate}%</div>
            <span className="text-[10px] text-emerald-300 font-bold">Visiteurs ➔ Prospects</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#14151a] border border-purple-500/30 space-y-2">
            <span className="text-[10px] text-purple-400 uppercase tracking-wider font-semibold block">RDV Planifiés</span>
            <div className="stat-number text-2xl sm:text-3xl text-purple-400">{stats.appointmentsScheduled}</div>
            <span className="text-[10px] text-purple-300 font-bold">Bobo, Ouaga & Visio</span>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/50 space-y-2">
            <span className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold block">Valeur Pipeline</span>
            <div className="stat-number text-2xl sm:text-3xl text-amber-400">{(stats.pipelineValueXOF / 1000000).toFixed(0)} M</div>
            <span className="text-[10px] text-amber-200 font-bold">Francs CFA (XOF)</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Diagnostic & Lead Acquisition Growth Chart */}
          <div className="lg:col-span-8 bg-[#14151a] border border-white/10 p-6 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Croissance des Diagnostics & Qualification (2026)</h3>
                <p className="text-xs text-white/50">Volume mensuel de diagnostics complétés et RDV générés</p>
              </div>
              <span className="text-xs text-amber-400 font-mono">Vue Synchro Live</span>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyDiagnostics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="diagnostics" stroke="#d4af37" strokeWidth={3} name="Diagnostics Réalisés" />
                  <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} name="Leads Qualifiés" />
                  <Line type="monotone" dataKey="rdv" stroke="#10b981" strokeWidth={2} name="RDV Planifiés" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Traffic Sources Breakdown */}
          <div className="lg:col-span-4 bg-[#14151a] border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="border-b border-white/10 pb-4 mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sources d'Acquisition</h3>
                <p className="text-xs text-white/50">Mix canaux marketing & campagne LinkedIn Folo</p>
              </div>

              <div className="h-48 my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={trafficData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              {trafficData.map((t, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }}></span>
                    {t.name}
                  </span>
                  <span className="font-bold text-white">{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO & Campaign Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#14151a] p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Linkedin className="w-4 h-4" /> Campagne LinkedIn Folo
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Actif</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Ciblage des Dirigeants Généraux, DRH et membres CODIR au Burkina Faso, Côte d'Ivoire & Sénégal.
            </p>
            <div className="pt-3 border-t border-white/10 flex justify-between text-xs">
              <span className="text-white/50">Impressions</span>
              <span className="font-bold text-amber-400">48,200</span>
            </div>
          </div>

          <div className="bg-[#14151a] p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Search className="w-4 h-4" /> Performance SEO Afrique
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Top 3 Google</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Mots-clés positionnés : "Coaching Dirigeant Bobo-Dioulasso", "Formation CODIR Burkina Faso", "Diagnostic IA RH".
            </p>
            <div className="pt-3 border-t border-white/10 flex justify-between text-xs">
              <span className="text-white/50">Mots-clés N°1</span>
              <span className="font-bold text-emerald-400">18 expressions</span>
            </div>
          </div>

          <div className="bg-[#14151a] p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> Conversion WhatsApp
              </span>
              <span className="text-[10px] text-purple-300 font-mono">Réponse &lt; 10 min</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Lien direct WhatsApp Business pour la prise de contact rapide par les dirigeants régionaux.
            </p>
            <div className="pt-3 border-t border-white/10 flex justify-between text-xs">
              <span className="text-white/50">Taux de Réponse</span>
              <span className="font-bold text-purple-400">98.5%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
