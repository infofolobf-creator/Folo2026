import React, { useState } from 'react';
import { Phone, Calendar, Clock, MapPin, Send, CheckCircle2, User, Building, Mail, MessageCircle } from 'lucide-react';

interface RDVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RDVModal: React.FC<RDVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+226 ');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Directeur Général');
  const [preferredLocation, setPreferredLocation] = useState('bobo');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00');
  const [topic, setTopic] = useState('Accompagnement CODIR / Leadership');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    try {
      const city = preferredLocation === 'bobo' ? 'Bobo-Dioulasso' : preferredLocation === 'ouaga' ? 'Ouagadougou' : 'Visioconférence';
      
      // Sync with FOLO Core Leads
      const leadRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          company,
          role,
          country: 'Burkina Faso',
          source: 'FOLO Executive Hub (Modal RDV)',
          interest: topic
        })
      });
      const leadData = await leadRes.json();

      // Sync with FOLO Core Appointments
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: leadData?.leadId || 'lead_exec_rdv',
          fullName,
          email,
          company,
          date: preferredDate || new Date().toISOString().split('T')[0],
          timeSlot: preferredTime || '10:00 GMT',
          topic,
          advisorNote: `Format: ${city}`
        })
      });

      setIsSuccess(true);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement du RDV FOLO Core:", err);
      setIsSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#14151a] border border-amber-400/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Entretien Stratégique Offert (30 Min)
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-1">
              Planifier un Échange avec un Expert FOLO
            </h3>
            <p className="text-xs text-white/60 mt-0.5">Siège social : Bobo-Dioulasso, Burkina Faso</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white p-1 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Aminata Ouédraogo"
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
                  placeholder="aminata@organisation.bf"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">Entreprise / Institution</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="SN CITEC, Coris Bank..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">Lieu / Format Souhaité</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPreferredLocation('bobo')}
                  className={`p-2.5 rounded-lg border text-[11px] font-bold text-center transition-all ${
                    preferredLocation === 'bobo' ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'bg-white/5 border-white/10 text-white/70'
                  }`}
                >
                  📍 Bobo-Dioulasso
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredLocation('ouaga')}
                  className={`p-2.5 rounded-lg border text-[11px] font-bold text-center transition-all ${
                    preferredLocation === 'ouaga' ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'bg-white/5 border-white/10 text-white/70'
                  }`}
                >
                  🏢 Ouagadougou
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredLocation('visio')}
                  className={`p-2.5 rounded-lg border text-[11px] font-bold text-center transition-all ${
                    preferredLocation === 'visio' ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'bg-white/5 border-white/10 text-white/70'
                  }`}
                >
                  💻 Visioconférence
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">Date Souhaitée</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#1a1b22] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/70 mb-1">Créneau Horaire</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-[#1a1b22] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                >
                  <option value="09:00">09h00 GMT</option>
                  <option value="10:30">10h30 GMT</option>
                  <option value="14:30">14h30 GMT</option>
                  <option value="16:00">16h00 GMT</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-white/70 mb-1">Sujet Principal de l'Échange</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#1a1b22] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
              >
                <option value="Accompagnement CODIR / Leadership">Accompagnement CODIR / Executive Leadership</option>
                <option value="Formation Management & Rétention">Formation Management & Rétention des Talents</option>
                <option value="Intégration de l'Intelligence Artificielle">Intégration de l'IA Générative dans les processus</option>
                <option value="Diagnostic & Audit Organisationnel">Audit & Diagnostic d'Organisation</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full btn-primary text-xs py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 mt-4"
            >
              <Send className="w-4 h-4 fill-black" />
              <span>Confirmer & Réserver Mon RDV Stratégique</span>
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-xl font-bold text-white font-display">Demande de RDV Enregistrée !</h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Merci {fullName}. Un consultant de notre équipe FOLO (Bobo-Dioulasso) vous contactera sur <strong className="text-emerald-400">{phone}</strong> pour confirmer le créneau.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <a
                href="https://wa.me/22604581198?text=Bonjour%20Folo%2C%20je%20viens%20de%20demander%20un%20RDV%20sur%20votre%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Message Direct WhatsApp (+226 04 58 11 98)
              </a>
              <button
                onClick={onClose}
                className="btn-primary text-xs py-2 px-5 rounded-lg font-bold"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
