import React, { useState } from 'react';
import { ModuleView } from '../types';
import { 
  Sparkles, 
  BarChart3, 
  Calculator, 
  Bot, 
  Users, 
  BookOpen, 
  Phone, 
  MapPin, 
  ChevronRight,
  Menu,
  X,
  Linkedin,
  MessageCircle,
  Briefcase
} from 'lucide-react';

interface HeaderProps {
  currentView: ModuleView;
  setCurrentView: (view: ModuleView) => void;
  onOpenRDVModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onOpenRDVModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ModuleView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'site', label: 'Accueil', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'diagnostics', label: 'Diagnostics IA', icon: <Sparkles className="w-4 h-4 text-amber-400" />, badge: '8 ' },
    { id: 'calculators', label: 'Calculateurs ROI', icon: <Calculator className="w-4 h-4 text-emerald-400" /> },
    { id: 'assistant', label: 'Assistant IA', icon: <Bot className="w-4 h-4 text-blue-400" />, badge: 'Live' },
    { id: 'crm', label: 'CRM & Lead Factory', icon: <Users className="w-4 h-4 text-purple-400" /> },
    { id: 'dashboard', label: 'Tableau de Bord', icon: <BarChart3 className="w-4 h-4 text-indigo-400" /> },
    { id: 'resources', label: 'Guides & Blog', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: ModuleView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10">
      {/* Top Banner HQ Bobo-Dioulasso & Contact */}
      <div className="bg-[#14151a] border-b border-white/5 py-1.5 px-4 text-xs text-white/70">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 font-medium">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <MapPin className="w-3.5 h-3.5" /> Siège social : Bobo-Dioulasso, Burkina Faso
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-white/60">Interventions à Ouagadougou & sous-région UEMOA</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="https://wa.me/22604581198?text=Bonjour%20Folo%2C%20je%20souhaite%20un%20echange%20sur%20vos%20offres%20de%20coaching." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-emerald-400 font-semibold hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp: +226 04 58 11 98
            </a>
            <a 
              href="mailto:infofolo.bf@gmail.com" 
              className="hidden lg:inline hover:text-amber-400 transition-colors"
            >
              infofolo.bf@gmail.com
            </a>
            <a 
              href="https://www.linkedin.com/company/folo-coaching-et-formation/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-blue-400 hover:underline"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('site')} 
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-black font-display font-extrabold text-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            F
          </div>
          <div>
            <div className="font-display font-bold text-lg text-white tracking-wider flex items-center gap-1.5 leading-none">
              FOLO <span className="text-amber-400 text-xs px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">V2</span>
            </div>
            <p className="text-[10px] text-white/50 tracking-wider font-mono mt-0.5 uppercase">Platform & Leadership Hub</p>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-black/20 text-black' : 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('diagnostics')}
            className="text-xs font-semibold py-2.5 px-4 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Diagnostic Gratuit
          </button>
          <button
            onClick={onOpenRDVModal}
            className="btn-primary text-xs py-2.5 px-5 rounded-lg font-bold flex items-center gap-2"
          >
            <span>RDV Stratégique</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-white/80 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#14151a] border-b border-white/10 p-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between p-3 rounded-lg text-sm font-semibold ${
                  currentView === item.id ? 'bg-amber-400 text-black' : 'text-white/80 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 rounded bg-black/20 font-bold">{item.badge}</span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-1 gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); handleNavClick('diagnostics'); }}
              className="w-full py-3 bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Faire un diagnostic gratuit
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRDVModal(); }}
              className="w-full py-3 bg-amber-400 text-black font-bold text-xs rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Prendre un RDV Stratégique
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
