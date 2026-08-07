import React from 'react';
import { ModuleView } from '../types';
import { MapPin, Phone, Mail, Linkedin, MessageCircle, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: ModuleView) => void;
  onOpenRDVModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenRDVModal }) => {
  return (
    <footer className="bg-[#050507] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-black font-display font-extrabold text-xl flex items-center justify-center">
                F
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white tracking-wider">FOLO EXECUTIVE HUB</span>
                <p className="text-[10px] text-amber-400 font-mono uppercase">Executive Leadership & AI Hub</p>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Plateforme intelligente d'Executive Coaching, de Formation des Dirigeants et d'Intégration de l'Intelligence Artificielle. Basée à Bobo-Dioulasso, au service des organisations d'Afrique Francophone.
            </p>

            {/* Direct WhatsApp Callout as explicitly requested */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp Officiel FOLO
              </p>
              <p className="text-xs text-white/80">
                Envoyez un message à Folo sur WhatsApp : <strong className="text-emerald-400">+226 04 58 11 98</strong>
              </p>
              <a
                href="https://wa.me/22604581198"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:underline pt-1"
              >
                <span>Ouvrir WhatsApp (+226 04 58 11 98)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Modules */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-amber-400">Modules de la Plateforme</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => setCurrentView('diagnostics')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Diagnostics IA (8 Domaines)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('calculators')} className="hover:text-amber-400 transition-colors">
                  Calculateurs de ROI & Pertes
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('assistant')} className="hover:text-amber-400 transition-colors">
                  Assistant IA FOLO (Live Chat)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('crm')} className="hover:text-amber-400 transition-colors">
                  Espace Suivi & Organisations
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:text-amber-400 transition-colors">
                  Tableau de Bord & KPIs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('resources')} className="hover:text-amber-400 transition-colors">
                  Blog & Livres Blancs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('lepont')} className="hover:text-amber-400 transition-colors text-amber-300 font-semibold">
                  📖 Livre « Le Pont » (Diaspora)
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contact Info */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-amber-400">Siège Social & Contact</h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Siège social :</strong> Bobo-Dioulasso, Burkina Faso
                  <p className="text-[11px] text-white/50">Zone d'intervention : Ouagadougou, Côte d'Ivoire, Sénégal & UEMOA</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Téléphone & WhatsApp : <strong className="text-white">+226 04 58 11 98</strong></span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Email : <a href="mailto:infofolo.bf@gmail.com" className="text-white hover:underline">infofolo.bf@gmail.com</a></span>
              </div>

              <div className="flex items-center gap-2.5">
                <Linkedin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a 
                  href="https://www.linkedin.com/company/folo-coaching-et-formation/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:underline font-semibold"
                >
                  Page LinkedIn Officielle : Folo Coaching et Formation
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenRDVModal}
                className="btn-primary text-xs py-2.5 px-5 rounded-lg font-bold flex items-center gap-2"
              >
                <span>Prendre un RDV Stratégique</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} FOLO - Executive Leadership & IA. Tous droits réservés. Bobo-Dioulasso, Burkina Faso.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Sécurité & Confidentialité</span>
            <span>•</span>
            <span>UEMOA Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
