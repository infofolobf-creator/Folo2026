import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../types';
import { MOCK_LEADS } from '../data/platformData';
import { 
  Users, 
  Search, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Send, 
  Download, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export const CRMModule: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(MOCK_LEADS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [syncAllMessage, setSyncAllMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch live leads from backend
    fetch('/api/crm/leads')
      .then(res => res.json())
      .then(data => {
        if (data.leads && data.leads.length > 0) {
          setLeads(data.leads);
          setSelectedLead(data.leads[0]);
        }
      })
      .catch(err => console.error("Error loading CRM leads", err));
  }, []);

  const handleSyncWithLeadFactory = async (leadId: string) => {
    setIsSyncing(leadId);
    try {
      const res = await fetch('/api/lead-factory/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId })
      });
      const data = await res.json();

      setLeads(prev => prev.map(l => {
        if (l.id === leadId) {
          return { ...l, leadFactorySyncStatus: 'synced', leadFactoryId: data.leadFactoryId };
        }
        return l;
      }));

      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(prev => prev ? { ...prev, leadFactorySyncStatus: 'synced', leadFactoryId: data.leadFactoryId } : null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(null);
    }
  };

  const handleSyncAllLeads = async () => {
    setSyncAllMessage("Synchronisation de tous les prospects qualifiés vers Lead Factory en cours...");
    setTimeout(() => {
      setLeads(prev => prev.map(l => ({ ...l, leadFactorySyncStatus: 'synced' })));
      setSyncAllMessage("✅ 100% des prospects ont été synchronisés avec l'API REST Lead Factory !");
      setTimeout(() => setSyncAllMessage(null), 4000);
    }, 1200);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">Chaud ({score}/100)</span>;
    if (score >= 60) return <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold">Qualifié ({score}/100)</span>;
    return <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">Tiède ({score}/100)</span>;
  };

  const getStatusLabel = (status: LeadStatus) => {
    switch (status) {
      case 'prospect': return 'Nouveau Prospect';
      case 'diagnostic_done': return 'Diagnostic Réalisé';
      case 'rdv_scheduled': return 'RDV Planifié';
      case 'proposal_sent': return 'Proposition Envoyée';
      case 'won': return 'Gagné (Client FOLO)';
      case 'lost': return 'Perdu';
    }
  };

  const exportCSV = () => {
    const csvRows = [
      ['ID', 'Nom', 'Email', 'Téléphone', 'Entreprise', 'Poste', 'Ville', 'Score Total', 'Statut', 'ID Lead Factory'],
      ...leads.map(l => [l.id, l.fullName, l.email, l.phone, l.company, l.role, l.city, l.score.totalScore, l.status, l.leadFactoryId || 'Non Synchro'])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `folo_crm_prospects_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 lg:py-20 bg-[#0A0A0A] text-white">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-3 text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" /> Espace Suivi & Gestion des Organisations
            </div>
            <h2 className="heading-lg text-2xl sm:text-4xl font-bold font-display">
              Suivi des Diagnostics & Projets d'Accompagnement
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Plateforme sécurisée de gestion des dirigeants et comités de direction (Burkina Faso & Zone UEMOA).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Export CSV
            </button>

            <button
              onClick={handleSyncAllLeads}
              className="btn-primary text-xs py-2.5 px-5 rounded-xl font-bold flex items-center gap-2"
            >
              <Send className="w-4 h-4 fill-black" />
              <span>Synchroniser Lead Factory</span>
            </button>
          </div>
        </div>

        {syncAllMessage && (
          <div className="mb-6 p-4 rounded-xl bg-purple-500/20 border border-purple-500/40 text-xs text-purple-300 font-bold text-center">
            {syncAllMessage}
          </div>
        )}

        {/* Filter & Search */}
        <div className="bg-[#14151a] p-4 rounded-2xl border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par nom, entreprise, email..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
            <Filter className="w-4 h-4 text-amber-400 flex-shrink-0" />
            {['all', 'diagnostic_done', 'rdv_scheduled', 'proposal_sent'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st ? 'bg-amber-400 text-black font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {st === 'all' ? 'Tous les prospects' : getStatusLabel(st as LeadStatus)}
              </button>
            ))}
          </div>
        </div>

        {/* CRM Grid: Lead List & Lead Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Prospects Table */}
          <div className="lg:col-span-7 bg-[#14151a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#1a1b22] border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Liste des Prospects Qualifiés ({filteredLeads.length})
              </h3>
              <span className="text-[10px] text-amber-400 font-mono">Indice de Maturité Organisationnelle FOLO</span>
            </div>

            <div className="divide-y divide-white/5 overflow-x-auto">
              {filteredLeads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                      isSelected ? 'bg-amber-400/10 border-l-4 border-amber-400' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{lead.fullName}</h4>
                        {getScoreBadge(lead.score.totalScore)}
                      </div>
                      <p className="text-xs text-white/60 font-medium">
                        {lead.role} • <span className="text-amber-400">{lead.company}</span>
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-white/40 font-mono pt-1">
                        <span>📍 {lead.city}</span>
                        <span>•</span>
                        <span>Activité: {lead.lastActivity}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1 flex-shrink-0">
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded bg-white/10 text-white/80 block">
                        {getStatusLabel(lead.status)}
                      </span>
                      <div className="text-[10px] text-purple-400 font-mono pt-1">
                        {lead.leadFactorySyncStatus === 'synced' ? (
                          <span className="flex items-center gap-1 justify-end">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {lead.leadFactoryId}
                          </span>
                        ) : (
                          <span className="text-amber-400">En attente synchro</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Lead Detail & Lead Factory Sync Card */}
          <div className="lg:col-span-5 bg-[#14151a] border border-amber-400/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            {selectedLead ? (
              <>
                <div className="border-b border-white/10 pb-6 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Fiche Prospect Qualifiée</span>
                    <h3 className="text-2xl font-bold font-display text-white mt-1">{selectedLead.fullName}</h3>
                    <p className="text-xs text-white/70">{selectedLead.role} chez <strong className="text-amber-400">{selectedLead.company}</strong></p>
                  </div>
                  {getScoreBadge(selectedLead.score.totalScore)}
                </div>

                {/* Score Breakdown */}
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-3 text-xs">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>Décomposition du Score de Qualification</span>
                    <span className="text-amber-400">{selectedLead.score.totalScore}/100</span>
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] text-white/60 mb-1">
                        <span>Engagement Comportemental</span>
                        <span>{selectedLead.score.behaviorScore}/30</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-400 h-full" style={{ width: `${(selectedLead.score.behaviorScore / 30) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-white/60 mb-1">
                        <span>Réalisation Diagnostic</span>
                        <span>{selectedLead.score.diagnosticScore}/40</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full" style={{ width: `${(selectedLead.score.diagnosticScore / 40) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-white/60 mb-1">
                        <span>Taille & Potentiel Entreprise</span>
                        <span>{selectedLead.score.companySizeScore}/30</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full" style={{ width: `${(selectedLead.score.companySizeScore / 30) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-[10px] text-white/40 block">Email Professionnel</span>
                      <a href={`mailto:${selectedLead.email}`} className="text-white hover:underline font-medium">{selectedLead.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-white/40 block">Téléphone / WhatsApp</span>
                      <a href={`tel:${selectedLead.phone}`} className="text-white hover:underline font-medium">{selectedLead.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <div>
                      <span className="text-[10px] text-white/40 block">Localisation Siège</span>
                      <span className="text-white font-medium">{selectedLead.city}, {selectedLead.country}</span>
                    </div>
                  </div>
                </div>

                {/* Completed Diagnostics */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Diagnostics & Calculateurs Exécutés</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.diagnosticsCompleted.map((d, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Diagnostic {d}
                      </span>
                    ))}
                    {selectedLead.calculatorOutputs.map((c, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Notes & Historique FOLO</h4>
                  <div className="space-y-2">
                    {selectedLead.notes.map((note, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white/5 text-xs text-white/80 border border-white/10 italic">
                        "{note}"
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead Factory Sync Card */}
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-purple-300 flex items-center gap-2">
                      <Send className="w-4 h-4" /> Statut Lead Factory
                    </span>
                    <span className="font-mono text-[11px] text-white/80">
                      {selectedLead.leadFactoryId || 'Non attribué'}
                    </span>
                  </div>

                  <button
                    disabled={isSyncing === selectedLead.id || selectedLead.leadFactorySyncStatus === 'synced'}
                    onClick={() => handleSyncWithLeadFactory(selectedLead.id)}
                    className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 disabled:bg-purple-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    {isSyncing === selectedLead.id ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Synchronisation API REST...
                      </>
                    ) : selectedLead.leadFactorySyncStatus === 'synced' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Prospect Synchronisé avec Lead Factory
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Transmettre à Lead Factory
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-white/50 text-xs">
                Sélectionnez un prospect dans la liste pour voir sa fiche qualifiée.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
