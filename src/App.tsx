import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Landmark,
  Factory,
  HeartPulse,
  Cpu,
  Plane,
  ShoppingBag,
  Zap,
  Brain,
  Target,
  Users,
  ShieldCheck,
  Globe,
  Sparkles,
  Scan,
  Route,
  Video,
  TrendingUp,
  CheckCircle,
  Star,
  User,
  Check,
  ChevronDown,
  Linkedin,
  Twitter,
  Instagram,
  Phone,
  MessageCircle,
  MapPin,
  Palette,
  Copy,
  ExternalLink,
  X,
  CreditCard,
  Sliders,
  Mail,
  Award
} from 'lucide-react';

import heroImg from './assets/images/hero_burkina_leader_1784810365513.jpg';
import leadershipImg from './assets/images/leadership_burkina_1784810381597.jpg';
import teamImg from './assets/images/team_burkina_coaching_1784810394187.jpg';

interface CounterProps {
  count: number;
  suffix: string;
  suffixSize?: string;
}

function Counter({ count, suffix, suffixSize }: CounterProps) {
  const [current, setCurrent] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const duration = 2000;
      const start = performance.now();

      const update = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const val = eased * count;
        
        setCurrent(val);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setCurrent(count);
        }
      };

      requestAnimationFrame(update);
    };

    if (!window.IntersectionObserver) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.current) {
          startAnimation();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(el);

    const fallbackTimer = setTimeout(() => {
      startAnimation();
    }, 2000);

    return () => {
      if (el) observer.unobserve(el);
      clearTimeout(fallbackTimer);
    };
  }, [count]);

  const isDecimal = count % 1 !== 0;
  const formatted = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString('fr-FR');

  return (
    <div ref={elementRef} className="inline-block">
      <span className="stat-number">{formatted}</span>
      <span className="stat-number" style={{ fontSize: suffixSize || 'clamp(2.5rem, 5vw, 4rem)' }}>{suffix}</span>
    </div>
  );
}

export type VisualStyleType = 'local-burkina' | 'realiste' | 'corporate' | 'premium' | 'international';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [visualStyle, setVisualStyle] = useState<VisualStyleType>('local-burkina');
  const [showPromptsModal, setShowPromptsModal] = useState(false);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  // Apply visual style body class
  useEffect(() => {
    document.body.className = `style-${visualStyle}`;
  }, [visualStyle]);

  // Custom cursor logic
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`;
        cursorRef.current.style.top = `${mouseY}px`;
      }
    };

    let animationFrameId: number;
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      if (followerRef.current) {
        followerRef.current.style.left = `${followerX}px`;
        followerRef.current.style.top = `${followerY}px`;
      }
      animationFrameId = requestAnimationFrame(animateFollower);
    };

    if (window.matchMedia('(pointer: fine)').matches) {
      document.addEventListener('mousemove', handleMouseMove);
      animateFollower();
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('[data-cursor-hover]')) {
        cursorRef.current?.classList.add('hover');
        followerRef.current?.classList.add('hover');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('[data-cursor-hover]')) {
        cursorRef.current?.classList.remove('hover');
        followerRef.current?.classList.remove('hover');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Scroll Reveal Logic
  useEffect(() => {
    const triggerAllReveals = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('active');
      });
    };

    if (!window.IntersectionObserver) {
      triggerAllReveals();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    const fallbackTimer = setTimeout(() => {
      triggerAllReveals();
    }, 1500);

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage('✓ Barka ! Nous vous contacterons sous 24h par téléphone ou WhatsApp.');
    setFormSubmitted(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => {
      setFormMessage('');
      setFormSubmitted(false);
    }, 5000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    try {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error("Invalid selector:", targetId, err);
    }
  };

  const styleNames: Record<VisualStyleType, { name: string; desc: string }> = {
    'local-burkina': { name: 'Local Burkina', desc: 'Identité forte burkinabè, motifs Faso Danfani, teintes chaudes sahéliennes & cadres de travail locaux.' },
    'realiste': { name: 'Réaliste', desc: 'Authenticité du quotidien des entreprises africaines, visages naturels, éclairage doux et spontané.' },
    'corporate': { name: 'Corporate', desc: 'Salles de conseil modernes, tours d’affaires à Ouaga 2000 & Plateau Abidjan, tenues épurées.' },
    'premium': { name: 'Premium Luxury', desc: 'Finitions dorées somptueuses, noirs profonds, haute direction & prestige institutionnel.' },
    'international': { name: 'International West Africa', desc: 'Ouverture régionale UEMOA/CEDEAO, synergies inter-entreprises & standards mondiaux.' }
  };

  const promptsForCurrentStyle = [
    {
      section: "Hero Banner",
      prompt: visualStyle === 'local-burkina'
        ? "Photorealistic portrait of confident West African male and female C-level executives in a sunlit modern executive office in Ouagadougou, wearing tailored modern suits with discreet Faso Danfani woven fabric trim, golden hour lighting, cinematic 8k."
        : visualStyle === 'realiste'
        ? "Authentic candid photo of West African managers smiling naturally around a glass conference table in a bright modern office in Ouagadougou, real workspace atmosphere, soft natural light."
        : visualStyle === 'corporate'
        ? "Sleek corporate board room in West Africa with glass walls overviewing a modern avenue, African executives in dark navy business attire discussing strategy, clean minimalist architectural style."
        : visualStyle === 'premium'
        ? "High-end luxury portrait of a West African CEO in a dark mahogany and gold-accented executive suite, dramatic portrait lighting, sophisticated luxury ambiance, photorealistic 8k."
        : "Dynamic modern West African leadership team in a high-tech regional headquarters, multinational West African corporate setting, ultra sharp detail."
    },
    {
      section: "Programme Leadership",
      prompt: visualStyle === 'local-burkina'
        ? "Photorealistic shot of a distinguished West African female executive conducting a leadership coaching workshop in Ouagadougou, elegant modern dress with Faso Danfani details, warm gold ambiance."
        : visualStyle === 'realiste'
        ? "Natural unposed photo of a West African coach listening attentively to an executive in a quiet comfortable meeting lounge, genuine expressions, soft warm lighting."
        : visualStyle === 'corporate'
        ? "Professional 1-on-1 executive coaching session in an executive glass-walled office in West Africa, laptop open, strategic notes on table, corporate aesthetic."
        : visualStyle === 'premium'
        ? "Cinematic executive coaching setting with dark wood paneling, warm ambient spotlights, elegant West African leader looking focused, premium atmosphere."
        : "Modern executive development session with digital interactive displays, West African professionals collaborating in a sleek innovation hub."
    },
    {
      section: "Coaching d'Équipe",
      prompt: visualStyle === 'local-burkina'
        ? "Photorealistic group of West African corporate professionals collaborating around a glass whiteboard in an innovation hub in Ouagadougou, subtle cultural accents, energetic and authentic."
        : visualStyle === 'realiste'
        ? "Real team moment in an African enterprise, diverse team members sharing ideas during a workshop, warm laughter and real connection, warm natural light."
        : visualStyle === 'corporate'
        ? "Corporate team alignment workshop in a modern West African auditorium, structured group dynamics, sleek presentation screen in background."
        : visualStyle === 'premium'
        ? "Exclusive executive retreat for West African board members, high-end meeting lodge with warm luxury lighting, intense collaboration."
        : "Regional West African management committee meeting with remote video participant, seamless hybrid collaboration, crisp professional photography."
    }
  ];

  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 3000);
  };

  const faqItems = [
    {
      question: "Quels sont les tarifs des programmes de coaching Folo au Burkina Faso ?",
      answer: "Nos accompagnements individuels démarrent à partir de 1 500 000 FCFA (XOF) pour un parcours complet de 3 mois (12 sessions + suivi). Pour les comités de direction et équipes d'entreprise, nous établissons une offre adaptée sur devis personnalisé. Un premier entretien de cadrage est toujours offert."
    },
    {
      question: "Quels modes de paiement acceptez-vous pour les entreprises et particuliers ?",
      answer: "Nous acceptons les règlements en Francs CFA (XOF) par virement bancaire d'entreprise, chèque certifié, ou via paiement mobile sécurisé (Orange Money, Moov Money) avec émission de facture légale normalisée conforme aux exigences locales."
    },
    {
      question: "Les sessions se déroulent-elles en présentiel à Ouagadougou ou en visio ?",
      answer: "Nous proposons un format hybride sur mesure : des sessions en présentiel dans vos locaux ou dans nos espaces partenaires à Ouagadougou et Bobo-Dioulasso, associées à un suivi régulier en visioconférence pour vos équipes régionales (Abidjan, Dakar, Niamey, Bamako, etc.)."
    },
    {
      question: "Comment garantissez-vous la confidentialité des échanges ?",
      answer: "La discrétion est la pierre angulaire de notre déontologie. Chaque contrat est assorti d'une clause stricte de confidentialité (NDA). Aucun nom d'entreprise ou d'exécutif n'est divulgué sans accord écrit préalable. Toutes les données sont chiffrées."
    },
    {
      question: "Comment démarrer un accompagnement pour mon entreprise ?",
      answer: "Il vous suffit de nous contacter directement par WhatsApp au +226 70 00 00 00, par téléphone au +226 25 30 00 00 ou en remplissant le formulaire ci-dessous. Un coach référent vous recontactera sous 24 heures pour planifier votre entretien offert."
    }
  ];

  return (
    <>
      <div className="noise-overlay"></div>
      <div ref={cursorRef} className="cursor" id="cursor"></div>
      <div ref={followerRef} className="cursor-follower" id="cursorFollower"></div>

      {/* ============ TOP BAR: ASSISTANT STYLE VISUELS & CONTEXTE ============ */}
      <div className="bg-[#121212] border-b border-white/10 text-xs py-2 px-4 sm:px-12 fixed top-0 left-0 w-full z-[1002] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-white/80">
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-semibold text-amber-400">Burkina Faso & Afrique de l'Ouest</span>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hidden md:inline text-white/60">Ouagadougou — Bobo-Dioulasso — UEMOA</span>
        </div>

        {/* Visual Style Selector */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="hidden lg:inline text-white/60 font-medium flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-amber-400" /> Style des visuels :
          </span>
          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-md border border-white/10">
            {(['local-burkina', 'realiste', 'corporate', 'premium', 'international'] as VisualStyleType[]).map((st) => (
              <button
                key={st}
                onClick={() => setVisualStyle(st)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                  visualStyle === st
                    ? 'bg-amber-500 text-black font-bold shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                title={styleNames[st].desc}
              >
                {st === 'local-burkina' ? '🇧🇫 Local Burkina' : st === 'realiste' ? '📷 Réaliste' : st === 'corporate' ? '🏢 Corporate' : st === 'premium' ? '✨ Premium' : '🌍 International'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowPromptsModal(true)}
            className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ml-1"
          >
            <Sparkles className="w-3 h-3 text-amber-400" /> Prompts IA AI Studio
          </button>
        </div>
      </div>

      {/* ============ NAVIGATION ============ */}
      <nav className="fixed top-[41px] left-0 w-full z-[1000] mix-blend-difference" style={{ padding: '1.5rem 3rem' }}>
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, '#')}
            className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2"
            data-cursor-hover
          >
            Folo<span style={{ color: 'var(--accent)' }}>.</span>
            <span className="text-[10px] tracking-widest font-sans font-normal uppercase px-2 py-0.5 rounded border border-white/20 bg-white/10">BF</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            <a href="#methode" onClick={(e) => handleLinkClick(e, '#methode')} className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-150" data-cursor-hover>Méthode</a>
            <a href="#programmes" onClick={(e) => handleLinkClick(e, '#programmes')} className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-150" data-cursor-hover>Programmes & Tarifs FCFA</a>
            <a href="#resultats" onClick={(e) => handleLinkClick(e, '#resultats')} className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-150" data-cursor-hover>Impact</a>
            <a href="#temoignages" onClick={(e) => handleLinkClick(e, '#temoignages')} className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-150" data-cursor-hover>Témoignages</a>
            <a href="#linkedin" onClick={(e) => handleLinkClick(e, '#linkedin')} className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400 hover:text-white transition-colors duration-150 flex items-center gap-1.5" data-cursor-hover>
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn Folo
            </a>
            <a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')} className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-150" data-cursor-hover>FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/22604581198?text=Bonjour%20Folo%2C%20je%20souhaite%20un%20echange%20sur%20vos%20offres%20de%20coaching." target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 bg-[#25D366] text-black font-semibold text-xs px-4 py-2.5 rounded-full hover:scale-105 transition-transform">
              <MessageCircle className="w-4 h-4 fill-black" /> WhatsApp
            </a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hidden lg:inline-block btn-primary text-xs py-2.5 px-6" data-cursor-hover>Devis sur mesure</a>
            <button
              id="menuBtn"
              className="lg:hidden flex flex-col gap-1.5 p-2 z-[1001]"
              onClick={() => setMenuOpen(!menuOpen)}
              data-cursor-hover
              aria-label="Menu"
            >
              <span
                className="block w-7 h-[1.5px] bg-white transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : '' }}
              ></span>
              <span
                className="block w-5 h-[1.5px] bg-white transition-all duration-300 ml-auto"
                style={{ opacity: menuOpen ? 0 : 1 }}
              ></span>
              <span
                className="block w-7 h-[1.5px] bg-white transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : '' }}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ============ MOBILE MENU ============ */}
      <div
        className={`menu-overlay fixed inset-0 z-[999] flex flex-col justify-center ${menuOpen ? 'open' : ''}`}
        style={{ background: '#050505', padding: '6rem 3rem' }}
      >
        <div className="flex flex-col gap-6">
          <a href="#methode" onClick={(e) => handleLinkClick(e, '#methode')} className="menu-link font-display text-3xl font-bold text-white/80">Méthode</a>
          <a href="#programmes" onClick={(e) => handleLinkClick(e, '#programmes')} className="menu-link font-display text-3xl font-bold text-white/80">Programmes & Tarifs FCFA</a>
          <a href="#resultats" onClick={(e) => handleLinkClick(e, '#resultats')} className="menu-link font-display text-3xl font-bold text-white/80">Impact & Résultats</a>
          <a href="#temoignages" onClick={(e) => handleLinkClick(e, '#temoignages')} className="menu-link font-display text-3xl font-bold text-white/80">Témoignages</a>
          <a href="#linkedin" onClick={(e) => handleLinkClick(e, '#linkedin')} className="menu-link font-display text-3xl font-bold text-amber-400 flex items-center gap-2">
            <Linkedin className="w-7 h-7" /> LinkedIn Folo
          </a>
          <a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')} className="menu-link font-display text-3xl font-bold text-white/80">FAQ</a>
          <div className="mt-8 flex flex-col gap-4">
            <a href="https://wa.me/22604581198?text=Bonjour%20Folo%2C%20je%20souhaite%20un%20echange%20sur%20vos%20offres%20de%20coaching." target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-black font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5 fill-black" /> Envoyez un message à Folo sur WhatsApp (+226 04 58 11 98)
            </a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="btn-primary text-center inline-block">Demander un devis adapté</a>
          </div>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex flex-col justify-end pt-32" style={{ paddingBottom: '4rem', paddingLeft: '4rem', paddingRight: '4rem' }}>
        {/* Background Image / Video depending on visual style */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={heroImg}
            alt="Dirigeants Folo au Burkina Faso"
            className="w-full h-full object-cover opacity-35 filter contrast-110 grayscale-[20%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/30"></div>
          <div className="absolute inset-0 danfani-pattern opacity-30 pointer-events-none"></div>
        </div>

        <div className="relative z-[2] max-w-[1600px] mx-auto w-full">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-6 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Cabinet référent au Burkina Faso & Afrique de l'Ouest
            </div>
          </div>

          <h1 className="display-xl filled reveal reveal-delay-1 mb-6" style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', lineHeight: 1.05 }}>
            Révélez le leadership<br />de vos équipes
          </h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8 reveal reveal-delay-2 mb-10">
            <p className="text-lg max-w-2xl text-white/80" style={{ lineHeight: 1.8 }}>
              Folo accompagne les dirigeants, comités de direction et managers au <strong>Burkina Faso</strong> et en <strong>Afrique de l'Ouest</strong> pour propulser leur performance collective grâce aux sciences du comportement et au coaching de haute direction.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://wa.me/22604581198?text=Bonjour%20Folo%2C%20je%20souhaite%20planifier%20un%20echange%20de%20cadrage." target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold px-6 py-4 rounded-md flex items-center gap-2 transition-transform hover:scale-105" data-cursor-hover>
                <MessageCircle className="w-5 h-5 fill-black" /> WhatsApp (+226 04 58 11 98)
              </a>
              <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="btn-outline whitespace-nowrap" data-cursor-hover>
                Demander un devis
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs text-white/60 reveal reveal-delay-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-slow"></span>
              <span>📍 Siège à <strong>Bobo-Dioulasso</strong> — Interventions <strong>Ouagadougou</strong> & UEMOA</span>
            </div>
            <div>
              <span className="text-amber-400 font-semibold">🎯 Offre LinkedIn :</span> Diagnostic Leadership 30 min offert
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Facturation en Francs CFA (XOF)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Conformité & confidentialité garanties</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR (ANONYMISÉ LOCAL) ============ */}
      <section className="py-14 border-t border-b bg-[#111111]" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1600px] mx-auto px-4 lg:px-16">
          <p className="label-text text-center mb-8 reveal">Inspiré par l'excellence des acteurs économiques majeurs de la région</p>
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 reveal reveal-delay-1">
            <div className="trust-badge">
              <Building2 className="w-[18px] h-[18px] text-amber-400" />
              <span className="text-sm font-medium text-white/80">Groupe Minier (Ouagadougou)</span>
            </div>
            <div className="trust-badge">
              <Landmark className="w-[18px] h-[18px] text-amber-400" />
              <span className="text-sm font-medium text-white/80">Banque Régionale UEMOA</span>
            </div>
            <div className="trust-badge">
              <Zap className="w-[18px] h-[18px] text-amber-400" />
              <span className="text-sm font-medium text-white/80">Opérateur Télécom Majeur</span>
            </div>
            <div className="trust-badge">
              <Factory className="w-[18px] h-[18px] text-amber-400" />
              <span className="text-sm font-medium text-white/80">Leader Agro-Industriel (Bobo)</span>
            </div>
            <div className="trust-badge">
              <Cpu className="w-[18px] h-[18px] text-amber-400" />
              <span className="text-sm font-medium text-white/80">Scale-up FinTech Ouest-Africaine</span>
            </div>
            <div className="trust-badge">
              <Globe className="w-[18px] h-[18px] text-amber-400" />
              <span className="text-sm font-medium text-white/80">Institution Publique & RSE</span>
            </div>
          </div>
          <p className="text-center mt-6 text-xs text-white/40 reveal reveal-delay-2">
            Engagés pour la stricte confidentialité des dirigeants et des conseils d'administration partenaires.
          </p>
        </div>
      </section>

      {/* ============ VALUE PROPOSITION ============ */}
      <section className="py-24 lg:py-32" style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">
            <div className="lg:col-span-5 reveal">
              <p className="label-text mb-4">Notre proposition de valeur</p>
              <h2 className="heading-lg">
                Un coaching ancré dans les réalités du <span style={{ color: 'var(--accent)' }}>Burkina Faso</span>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end reveal reveal-delay-1">
              <p className="text-lg text-white/70" style={{ lineHeight: 1.8 }}>
                Nous combinons l'exigence des méthodes internationales de leadership avec une compréhension fine des codes culturels, managériaux et économiques propres au paysage des affaires en Afrique de l'Ouest.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="feature-card rounded-lg p-8 reveal" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <div className="card-icon mb-6">
                <Brain className="w-[32px] h-[32px] text-amber-400" />
              </div>
              <h3 className="heading-md mb-3">Sciences du comportement</h3>
              <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                Des méthodes psychométriques validées adaptées à la gouvernance et au management des organisations en Afrique de l'Ouest.
              </p>
            </div>
            <div className="feature-card rounded-lg p-8 reveal reveal-delay-1" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <div className="card-icon mb-6">
                <Target className="w-[32px] h-[32px] text-amber-400" />
              </div>
              <h3 className="heading-md mb-3">Indicateurs d'impact</h3>
              <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                Chaque objectif est mesuré en termes d'amélioration du climat social, de réduction du turn-over et de rentabilité opérationnelle.
              </p>
            </div>
            <div className="feature-card rounded-lg p-8 reveal reveal-delay-2" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <div className="card-icon mb-6">
                <Users className="w-[32px] h-[32px] text-amber-400" />
              </div>
              <h3 className="heading-md mb-3">Intelligence collective</h3>
              <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                Aligner la vision stratégique du Conseil d'Administration avec la cohésion des comités de direction sur le terrain.
              </p>
            </div>
            <div className="feature-card rounded-lg p-8 reveal" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <div className="card-icon mb-6">
                <CreditCard className="w-[32px] h-[32px] text-amber-400" />
              </div>
              <h3 className="heading-md mb-3">Tarification FCFA transparente</h3>
              <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                Tous nos tarifs sont clairs, libellés en Francs CFA (XOF), avec devis personnalisé et factures conformes locales.
              </p>
            </div>
            <div className="feature-card rounded-lg p-8 reveal reveal-delay-1" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <div className="card-icon mb-6">
                <Phone className="w-[32px] h-[32px] text-amber-400" />
              </div>
              <h3 className="heading-md mb-3">Réactivité locale</h3>
              <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                Équipe basée à Ouagadougou, joignable directement par téléphone et WhatsApp pour un accompagnement fluide au quotidien.
              </p>
            </div>
            <div className="feature-card rounded-lg p-8 reveal reveal-delay-2" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <div className="card-icon mb-6">
                <Award className="w-[32px] h-[32px] text-amber-400" />
              </div>
              <h3 className="heading-md mb-3">Coachs certifiés ICF & EMCC</h3>
              <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                Un réseau de coachs séniors africains expérimentés dans l'accompagnement de grands groupes et d'institutions publiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section id="resultats" className="py-24 lg:py-32 border-t border-b bg-[#111111]" style={{ borderColor: 'var(--border)', paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="label-text mb-4">Mesure de la performance</p>
            <h2 className="heading-lg">L'impact Folo en chiffres</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center reveal">
              <Counter count={92} suffix="%" />
              <p className="mt-3 text-sm text-white/60">de satisfaction parmi les dirigeants accompagnés en Afrique de l'Ouest</p>
            </div>
            <div className="text-center reveal reveal-delay-1">
              <Counter count={150} suffix="+" />
              <p className="mt-3 text-sm text-white/60">comités de direction & managers formés au Burkina Faso</p>
            </div>
            <div className="text-center reveal reveal-delay-2">
              <Counter count={3.8} suffix="x" />
              <p className="mt-3 text-sm text-white/60">retour sur investissement estimé sur le climat organisationnel</p>
            </div>
            <div className="text-center reveal reveal-delay-3">
              <Counter count={100} suffix="%" />
              <p className="mt-3 text-sm text-white/60">facturation locale en Francs CFA (XOF) & respect strict du NDA</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ METHODE ============ */}
      <section id="methode" className="py-24 lg:py-32" style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20 reveal">
            <p className="label-text mb-4">Notre démarche</p>
            <h2 className="heading-lg">Un parcours en 4 étapes structurées</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-white/70">
              Du premier cadrage stratégique à l'ancrage des habitudes managériales durablement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative feature-card rounded-lg p-10 reveal" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <span className="step-number">01</span>
              <div className="relative z-[1]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <Scan className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="heading-md mb-3">Cadrage & Diagnostic 360°</h3>
                <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                  Entretien initial offert et analyse psychométrique certifiée pour identifier vos leviers stratégiques et aligner les attentes du Conseil d'Administration.
                </p>
              </div>
            </div>
            <div className="relative feature-card rounded-lg p-10 reveal reveal-delay-1" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <span className="step-number">02</span>
              <div className="relative z-[1]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <Route className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="heading-md mb-3">Feuille de route sur mesure</h3>
                <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                  Co-construction d'un programme personnalisé ajusté à vos impératifs d'entreprise, au calendrier opérationnel et aux priorités d'équipe.
                </p>
              </div>
            </div>
            <div className="relative feature-card rounded-lg p-10 reveal reveal-delay-2" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <span className="step-number">03</span>
              <div className="relative z-[1]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <Video className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="heading-md mb-3">Sessions de coaching & Workshops</h3>
                <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                  Combinaison de séances individuelles et d'ateliers d'équipe dynamiques, sur site à Ouagadougou/Bobo ou en visioconférence sécurisée.
                </p>
              </div>
            </div>
            <div className="relative feature-card rounded-lg p-10 reveal reveal-delay-3" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <span className="step-number">04</span>
              <div className="relative z-[1]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="heading-md mb-3">Bilan & Capitalisation</h3>
                <p className="text-white/70" style={{ lineHeight: 1.7 }}>
                  Mesure des écarts de progression, feedback 360° post-programme et plan d'action d'autonomie pour préserver l'impact dans le temps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROGRAMMES & TARIFS FCFA ============ */}
      <section id="programmes" className="py-24 lg:py-32 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1600px] mx-auto" style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
          <div className="text-center mb-20 reveal">
            <p className="label-text mb-4">Formules & Investissement</p>
            <h2 className="heading-lg">Programmes adaptés à vos enjeux en Afrique de l'Ouest</h2>
            <p className="mt-4 text-sm text-amber-400/90 bg-amber-500/10 inline-block px-4 py-2 rounded-full border border-amber-500/30">
              💳 Tarifs exprimés en Francs CFA (XOF) — Éligibles aux budgets de formation & développement du capital humain
            </p>
          </div>

          {/* Programme 1: Leadership Executive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
            <div className="lg:col-span-5 reveal">
              <p className="label-text mb-2">Dirigeants & C-Level</p>
              <h3 className="heading-lg mb-4">Programme Executive Leadership</h3>
              <p className="text-white/70 mb-6" style={{ lineHeight: 1.8 }}>
                Conçu pour les Directeurs Généraux, membres du Comité de Direction et hauts cadres pour affirmer leur posture de décisionnaire et inspirer la transformation.
              </p>
              <div className="bg-white/5 border border-amber-500/30 rounded-lg p-5 mb-6">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-1">Tarif indicatif</div>
                <div className="text-3xl font-bold font-display text-amber-400">1 500 000 FCFA <span className="text-xs font-normal text-white/60">/ 3 mois</span></div>
                <div className="text-xs text-white/60 mt-1">12 séances individuelles + Diagnostic 360° + Bilan</div>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-[18px] h-[18px] text-amber-400 flex-shrink-0" />
                  <span>Accompagnement individuel confidentiel sur-mesure</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-[18px] h-[18px] text-amber-400 flex-shrink-0" />
                  <span>Gestion du stress de haute direction & prise de décision complexe</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-[18px] h-[18px] text-amber-400 flex-shrink-0" />
                  <span>Sessions sur site à Ouagadougou ou à distance</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="btn-primary inline-block text-xs" data-cursor-hover>
                  Demander un devis personnalisé
                </a>
                <a href="https://wa.me/22670000000?text=Bonjour%20Folo%2C%20je%20souhaite%20des%20informations%20sur%20le%20Programme%20Executive%20Leadership." target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 text-xs">
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> Échanger sur WhatsApp
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 reveal reveal-delay-1">
              <div className="rounded-lg overflow-hidden border border-white/10 relative group">
                <img
                  src={leadershipImg}
                  alt="Coaching Executive Leadership au Burkina Faso"
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Excellence managériale</span>
                  <p className="text-sm text-white/90 mt-1">« Renforcer l'ancrage du leader face aux défis de croissance en Afrique de l'Ouest. »</p>
                </div>
              </div>
            </div>
          </div>

          <div className="gradient-line mb-24 lg:mb-32"></div>

          {/* Programme 2: Coaching d'Équipe & CODIR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
            <div className="lg:col-span-7 order-2 lg:order-1 reveal">
              <div className="rounded-lg overflow-hidden border border-white/10 relative group">
                <img
                  src={teamImg}
                  alt="Coaching d'Équipe et Codir au Burkina Faso"
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Intelligence Collective</span>
                  <p className="text-sm text-white/90 mt-1">« Décloisonner les départements et bâtir une vision commune solide. »</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 reveal reveal-delay-1">
              <p className="label-text mb-2">Comités de Direction & PME</p>
              <h3 className="heading-lg mb-4">Coaching d'Équipe & CODIR</h3>
              <p className="text-white/70 mb-6" style={{ lineHeight: 1.8 }}>
                Alignez votre comité de direction et vos équipes opérationnelles autour de priorités partagées pour décupler la vitesse d'exécution de vos projets.
              </p>
              <div className="bg-white/5 border border-amber-500/30 rounded-lg p-5 mb-6">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-1">Offre Entreprise</div>
                <div className="text-2xl font-bold font-display text-amber-400">Demandez un devis personnalisé</div>
                <div className="text-xs text-white/60 mt-1">S'adapte à la taille de l'équipe (de 5 à 50 collaborateurs)</div>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-[18px] h-[18px] text-amber-400 flex-shrink-0" />
                  <span>Workshops immersifs d'équipe & séminaires stratégiques</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-[18px] h-[18px] text-amber-400 flex-shrink-0" />
                  <span>Diagnostic des silos et amélioration de la communication interne</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-[18px] h-[18px] text-amber-400 flex-shrink-0" />
                  <span>Accompagnement spécifique au contexte des filiales et PME locales</span>
                </li>
              </ul>
              <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="btn-primary inline-block text-xs" data-cursor-hover>
                Demander une offre adaptée
              </a>
            </div>
          </div>

          <div className="gradient-line mb-24 lg:mb-32"></div>

          {/* Programme 3: Résilience & Agilité */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 reveal">
              <p className="label-text mb-2">Managers & Projets</p>
              <h3 className="heading-lg mb-4">Résilience & Agilité Organique</h3>
              <p className="text-white/70 mb-6" style={{ lineHeight: 1.8 }}>
                Développez la capacité d'adaptation de vos cadres face aux transformations économiques, aux réorganisations et aux contextes exigeants.
              </p>
              <div className="bg-white/5 border border-amber-500/30 rounded-lg p-5 mb-6">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-1">Tarif indicatif</div>
                <div className="text-3xl font-bold font-display text-amber-400">1 200 000 FCFA <span className="text-xs font-normal text-white/60">/ 2 mois</span></div>
                <div className="text-xs text-white/60 mt-1">8 sessions de coaching intensif + outils pratiques</div>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-[18px] h-[18px] text-amber-400 flex-shrink-0" />
                  <span>Gestion des priorités sous pression et prévention du burn-out</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-[18px] h-[18px] text-amber-400 flex-shrink-0" />
                  <span>Maintien de la motivation et du leadership en période d'incertitude</span>
                </li>
              </ul>
              <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="btn-outline inline-block text-xs" data-cursor-hover>
                Contacter un conseiller
              </a>
            </div>
            <div className="lg:col-span-7 reveal reveal-delay-1">
              <div className="p-8 rounded-lg border border-white/10 bg-white/5 space-y-6">
                <h4 className="heading-md text-amber-400 flex items-center gap-2">
                  <Award className="w-6 h-6" /> Garantie de valeur Folo Burkina
                </h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  Avant tout engagement budgétaire, nous réalisons un entretien préliminaire approfondi avec la direction générale ou la DRH pour valider l'adéquation exacte de la prestation à vos objectifs métiers.
                </p>
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-white/50">Service Client Direct</div>
                    <div className="text-sm font-bold text-white">+226 25 30 00 00 / +226 70 00 00 00</div>
                  </div>
                  <a href="https://wa.me/22670000000" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-400 underline hover:text-emerald-300">
                    Discuter en direct sur WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TEMOIGNAGES (ANONYMISÉS LOCAL) ============ */}
      <section id="temoignages" className="py-24 lg:py-32 border-t bg-[#111111]" style={{ borderColor: 'var(--border)', paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-6 reveal">
            <p className="label-text mb-4">Retours d'expérience</p>
            <h2 className="heading-lg">Ce que déclarent les dirigeants au Burkina Faso</h2>
          </div>
          <p className="text-center mb-16 text-sm max-w-xl mx-auto text-white/60 reveal reveal-delay-1">
            Afin de préserver la réputation stratégique et la confidentialité des institutions partenaires, les identités individuelles restent strictement anonymisées.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="testimonial-card rounded-lg p-8 reveal" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="mb-6 text-white/80" style={{ lineHeight: 1.8 }}>
                « L'accompagnement Folo a permis à notre comité de direction de dépasser les blocages de communication. En 4 mois, l'alignement stratégique sur nos sites d'exploitation au Burkina s'est traduit par une agilité inédite. »
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="avatar-anon">
                  <User className="w-[18px] h-[18px] text-amber-400 opacity-80" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Directeur Général</p>
                  <p className="text-xs text-white/50">Groupe Minier · Ouagadougou</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card rounded-lg p-8 reveal reveal-delay-1" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="mb-6 text-white/80" style={{ lineHeight: 1.8 }}>
                « En tant que DRH d'un groupe bancaire sous-régional, je cherchais un cabinet capable de saisir la complexité de nos enjeux locaux sans se contenter de théories. Folo a apporté de la méthode et du concret. »
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="avatar-anon">
                  <User className="w-[18px] h-[18px] text-amber-400 opacity-80" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Directrice des Ressources Humaines</p>
                  <p className="text-xs text-white/50">Institution Financière Régionale (UEMOA)</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card rounded-lg p-8 reveal reveal-delay-2" data-cursor-hover style={{ background: 'var(--surface)' }}>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="mb-6 text-white/80" style={{ lineHeight: 1.8 }}>
                « Passer de la posture de fondateur technique à celle de CEO exigeant d'une scale-up exige de l'aide. Mon coach Folo m'a aidé à structurer mon leadership pour aborder nos levées de fonds. »
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="avatar-anon">
                  <User className="w-[18px] h-[18px] text-amber-400 opacity-80" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Fondateur & CEO</p>
                  <p className="text-xs text-white/50">Scale-up FinTech · Ouaga 2000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION LINKEDIN FOLO ============ */}
      <section id="linkedin" className="py-24 lg:py-32 border-t bg-[#0c0d10]" style={{ borderColor: 'var(--border)', paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-4 text-xs font-semibold uppercase tracking-wider">
              <Linkedin className="w-3.5 h-3.5" /> Folo Coaching & Formation sur LinkedIn
            </div>
            <h2 className="heading-lg">Page officielle & Réflexions stratégiques Folo</h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto text-sm" style={{ lineHeight: 1.8 }}>
              Suivez en direct l'actualité de <strong>Folo — Coaching & Formation</strong> sur LinkedIn. Découvrez nos études de cas, nos conseils de leadership et nos événements à Ouagadougou et en Afrique de l'Ouest.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Carte Profil LinkedIn Officiel */}
            <div className="lg:col-span-4 bg-[#14151a] border border-blue-500/30 rounded-xl p-8 reveal shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-amber-400 to-emerald-500"></div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-display font-bold text-2xl shadow-inner flex-shrink-0">
                  Folo
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 leading-tight">
                    Folo — Coaching & Formation
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  </h3>
                  <p className="text-xs text-white/60 mt-1">Conseil en management & coaching d'entreprises</p>
                  <p className="text-[11px] text-amber-400 mt-0.5 font-medium">📍 Siège à Bobo-Dioulasso, Burkina Faso</p>
                </div>
              </div>

              <p className="text-xs text-white/80 mb-6 leading-relaxed bg-white/5 p-4 rounded-lg border border-white/5">
                « Cabinet basé à <strong>Bobo-Dioulasso</strong>. Accompagnement sur mesure des dirigeants, comités de direction et managers au Burkina Faso & en Afrique de l'Ouest. »
              </p>

              <div className="space-y-3 mb-6 text-xs text-white/70">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-white/50">Lien LinkedIn officiel</span>
                  <a href="https://www.linkedin.com/company/folo-coaching-et-formation/" target="_blank" rel="noopener noreferrer" className="font-mono text-blue-400 hover:underline">/company/folo-coaching...</a>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-white/50">Siège social</span>
                  <span className="font-medium text-amber-400">Bobo-Dioulasso, BF</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-white/50">Email professionnel</span>
                  <a href="mailto:infofolo.bf@gmail.com" className="font-medium text-amber-400 hover:underline">infofolo.bf@gmail.com</a>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-white/50">Zone d'intervention</span>
                  <span className="font-medium text-white">Bobo, Ouaga & Zone UEMOA</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://www.linkedin.com/company/folo-coaching-et-formation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                  data-cursor-hover
                >
                  <Linkedin className="w-4 h-4 fill-white" /> Rejoindre la page LinkedIn Folo <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="mailto:infofolo.bf@gmail.com"
                  className="w-full py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 font-medium text-xs flex items-center justify-center gap-2 transition-all border border-white/10"
                >
                  <Mail className="w-4 h-4 text-amber-400" /> Écrire à infofolo.bf@gmail.com
                </a>
              </div>
            </div>

            {/* Fil d'Actualité & Feed LinkedIn Sync */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-white/80 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Extraits de nos dernières publications LinkedIn
                </h3>
                <a
                  href="https://www.linkedin.com/company/folo-coaching-et-formation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium"
                >
                  Voir sur LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Post 1 */}
              <div className="bg-[#141519] border border-white/10 rounded-xl p-6 hover:border-blue-500/40 transition-colors reveal">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                      FC
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        Folo — Coaching & Formation
                        <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">Abonné</span>
                      </h4>
                      <p className="text-[11px] text-white/50">Coaching d'Excellence & Formation Continuelle à Ouagadougou</p>
                    </div>
                  </div>
                  <a href="https://www.linkedin.com/company/folo-coaching-et-formation/" target="_blank" rel="noopener noreferrer" className="p-2 text-white/40 hover:text-blue-400">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-white/80 leading-relaxed mb-4">
                  💡 <strong>Comment développer le leadership transformationnel au sein des CODIR en Afrique de l'Ouest ?</strong><br /><br />
                  Face aux mutations rapides du contexte économique régional, le rôle du leader évolue : il ne s'agit plus seulement d'administrer, mais d'inspirer et de libérer le potentiel d'innovation des équipes. Notre approche chez <strong>Folo</strong> combine coaching individuel de dirigeants et ateliers d'alignement stratégique d'équipe.
                </p>

                <div className="flex flex-wrap gap-2 mb-4 text-[11px] text-blue-400">
                  <span>#Leadership Transformationnel</span>
                  <span>#BurkinaFaso</span>
                  <span>#CoachingExecutive</span>
                  <span>#PerformanceCollective</span>
                  <span>#FoloCoaching</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                  <span>👍 92 réactions • 14 commentaires</span>
                  <a href="https://www.linkedin.com/company/folo-coaching-et-formation/" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-medium hover:underline flex items-center gap-1">
                    Lire l'article complet sur LinkedIn <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Post 2 */}
              <div className="bg-[#141519] border border-white/10 rounded-xl p-6 hover:border-blue-500/40 transition-colors reveal reveal-delay-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                      FC
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        Folo — Coaching & Formation
                        <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">Abonné</span>
                      </h4>
                      <p className="text-[11px] text-white/50">Ouagadougou, Burkina Faso</p>
                    </div>
                  </div>
                  <a href="https://www.linkedin.com/company/folo-coaching-et-formation/" target="_blank" rel="noopener noreferrer" className="p-2 text-white/40 hover:text-blue-400">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-white/80 leading-relaxed mb-4">
                  🎯 <strong>Retour d'expérience : Séminaire d'Intelligence Collective à Ouagadougou.</strong><br /><br />
                  2 jours immersifs avec un comité de direction pour co-construire une culture d'entreprise agile, ancrée dans la résilience et la bienveillance managériale. Félicitations aux participants pour la clarté de leur vision 2026 !
                </p>

                <div className="flex flex-wrap gap-2 mb-4 text-[11px] text-blue-400">
                  <span>#IntelligenceCollective</span>
                  <span>#TeamBuilding</span>
                  <span>#Ouagadougou</span>
                  <span>#UEMOA</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                  <span>👍 128 réactions • 22 partages</span>
                  <a href="https://www.linkedin.com/company/folo-coaching-et-formation/" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-medium hover:underline flex items-center gap-1">
                    Voir les photos du séminaire <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ SECTION ============ */}
      <section id="faq" className="py-24 lg:py-32 border-t" style={{ borderColor: 'var(--border)', paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="label-text mb-4">Questions fréquentes</p>
            <h2 className="heading-lg">Tout savoir sur le coaching Folo au Burkina Faso</h2>
          </div>

          <div className="space-y-4 reveal reveal-delay-1">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className={`faq-item rounded-lg border border-white/10 p-6 cursor-pointer transition-colors ${openFaqIndex === idx ? 'open bg-white/5 border-amber-500/40' : 'bg-[#141414] hover:border-white/20'}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-semibold text-white flex items-center gap-3">
                    <span className="text-xs font-mono text-amber-400">0{idx + 1}.</span> {item.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-white/60 faq-chevron flex-shrink-0" />
                </div>
                <div className="faq-answer mt-4 text-sm text-white/70 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT & CALL TO ACTION ============ */}
      <section id="contact" className="py-24 lg:py-32 border-t bg-[#0d0d0d]" style={{ borderColor: 'var(--border)', paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 reveal">
              <p className="label-text mb-4">Entrez en contact</p>
              <h2 className="heading-lg mb-6">Planifiez votre entretien de cadrage offert</h2>
              <p className="text-white/70 mb-8" style={{ lineHeight: 1.8 }}>
                Prenez 15 minutes avec notre équipe d'orientation pour évaluer vos besoins managériaux à Ouagadougou, Bobo-Dioulasso ou dans la région.
              </p>

              <div className="space-y-6 bg-white/5 p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">WhatsApp Direct (Réponse rapide)</h4>
                    <p className="text-xs text-white/60 mb-2">Envoyez un message à Folo sur WhatsApp</p>
                    <a href="https://wa.me/22604581198?text=Bonjour%20Folo%2C%20je%20souhaite%20un%20echange%20sur%20vos%20offres%20de%20coaching%20au%20Burkina%20Faso." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline">
                      +226 04 58 11 98 (Cliquer pour ouvrir WhatsApp) →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Téléphone & WhatsApp Siège</h4>
                    <a href="tel:+22604581198" className="text-xs text-white/80 hover:text-amber-400 font-semibold block">+226 04 58 11 98</a>
                    <p className="text-[11px] text-white/40">Du lundi au vendredi : 08h00 – 18h00 GMT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Email Officiel</h4>
                    <a href="mailto:infofolo.bf@gmail.com" className="text-xs text-amber-400 font-medium hover:underline block">
                      infofolo.bf@gmail.com
                    </a>
                    <p className="text-[11px] text-white/40">Réponse assurée sous 24h ouvrées</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Localisation & Siège</h4>
                    <p className="text-xs text-white/80 font-medium">📍 Bobo-Dioulasso, Burkina Faso</p>
                    <p className="text-[11px] text-white/50">Bureau de liaison & interventions : Ouagadougou & zone UEMOA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 reveal reveal-delay-1">
              <form id="contactForm" onSubmit={handleContactSubmit} className="rounded-lg p-8 lg:p-10" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <h3 className="heading-md mb-2 text-white">Demandez un devis personnalisé</h3>
                <p className="text-xs text-white/60 mb-8">Formulaire sécurisé — Réponse personnalisée transmise sous 24h ouvrées.</p>

                {formSubmitted && (
                  <div className="mb-6 p-4 rounded-md bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm font-medium">
                    {formMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-white/70">Prénom & Nom *</label>
                    <input type="text" required placeholder="Ex: Roch Sawadogo" className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300 focus:border-[#D4AF37] placeholder:text-white/20 text-white border-white/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-white/70">Email professionnel *</label>
                    <input type="email" required placeholder="nom@entreprise.bf" className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300 focus:border-[#D4AF37] placeholder:text-white/20 text-white border-white/20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-white/70">Téléphone / WhatsApp *</label>
                    <input type="tel" required placeholder="+226 04 58 11 98" className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300 focus:border-[#D4AF37] placeholder:text-white/20 text-white border-white/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-white/70">Ville principal d'implantation *</label>
                    <select defaultValue="Bobo-Dioulasso" required className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300 focus:border-[#D4AF37] text-white/80 border-white/20 cursor-pointer">
                      <option value="Bobo-Dioulasso" style={{ background: '#171717' }}>📍 Bobo-Dioulasso (Siège Folo)</option>
                      <option value="Ouagadougou" style={{ background: '#171717' }}>Ouagadougou (Burkina Faso)</option>
                      <option value="Autre Burkina Faso" style={{ background: '#171717' }}>Autre ville du Burkina Faso</option>
                      <option value="Abidjan" style={{ background: '#171717' }}>Abidjan (Côte d'Ivoire)</option>
                      <option value="Dakar" style={{ background: '#171717' }}>Dakar (Sénégal)</option>
                      <option value="Niamey" style={{ background: '#171717' }}>Niamey (Niger)</option>
                      <option value="Bamako" style={{ background: '#171717' }}>Bamako (Mali)</option>
                      <option value="Autre Afrique de l'Ouest" style={{ background: '#171717' }}>Autre (Afrique de l'Ouest)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-white/70">Programme recherché</label>
                    <select defaultValue="leadership" required className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300 focus:border-[#D4AF37] text-white/80 border-white/20 cursor-pointer">
                      <option value="leadership" style={{ background: '#171717' }}>Programme Executive Leadership (Individuel)</option>
                      <option value="equipe" style={{ background: '#171717' }}>Coaching d'Équipe & CODIR</option>
                      <option value="resilience" style={{ background: '#171717' }}>Programme Résilience & Agilité</option>
                      <option value="devis" style={{ background: '#171717' }}>Demande de devis sur-mesure pour entreprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-white/70">Origine du contact</label>
                    <select defaultValue="linkedin" className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300 focus:border-[#D4AF37] text-amber-300 font-medium border-white/20 cursor-pointer">
                      <option value="linkedin" style={{ background: '#171717' }}>💼 Campagne / Page LinkedIn Folo</option>
                      <option value="whatsapp" style={{ background: '#171717' }}>💬 Échange WhatsApp Direct</option>
                      <option value="recommandation" style={{ background: '#171717' }}>🤝 Recommandation d'un pair</option>
                      <option value="autre" style={{ background: '#171717' }}>🌐 Recherche Web / Autre</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-white/70">Message ou objectifs clés</label>
                  <textarea rows={3} placeholder="Présentez brièvement vos priorités ou le contexte de votre équipe..." className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300 focus:border-[#D4AF37] placeholder:text-white/20 text-white border-white/20"></textarea>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button type="submit" className="btn-primary w-full sm:w-auto" data-cursor-hover>
                    Envoyer ma demande
                  </button>
                  <span className="text-xs text-white/40">🔒 Facturation officielle en Francs CFA (XOF)</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-16 border-t bg-black text-xs text-white/60" style={{ borderColor: 'var(--border)', paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <a href="#" className="font-display text-2xl font-bold text-white mb-4 block">
                Folo<span className="text-amber-400">.</span>
              </a>
              <p className="text-white/60 leading-relaxed mb-4">
                Coaching de performance pour dirigeants, comités de direction et équipes d'excellence au Burkina Faso et en Afrique de l'Ouest.
              </p>
              <div className="text-xs text-amber-400 font-semibold">
                📍 Siège à Bobo-Dioulasso • Interventions Ouaga & UEMOA
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Programmes & Tarifs</h4>
              <ul className="space-y-2">
                <li><a href="#programmes" className="hover:text-amber-400 transition-colors">Executive Leadership (1 500 000 FCFA)</a></li>
                <li><a href="#programmes" className="hover:text-amber-400 transition-colors">Coaching d'Équipe & CODIR (Sur devis)</a></li>
                <li><a href="#programmes" className="hover:text-amber-400 transition-colors">Programme Résilience (1 200 000 FCFA)</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Entretien initial gratuit</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Secteurs Accompagnés</h4>
              <ul className="space-y-2">
                <li><span>Mines & Ressources Naturelles</span></li>
                <li><span>Banques & Services Financiers UEMOA</span></li>
                <li><span>Télécommunications & Tech</span></li>
                <li><span>Agro-industrie & Commerce</span></li>
                <li><span>Institutions Publiques & ONG</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Contact Direct Burkina</h4>
              <p className="mb-2"><strong>Téléphone & WhatsApp :</strong> <a href="tel:+22604581198" className="text-white hover:text-amber-400">+226 04 58 11 98</a></p>
              <p className="mb-4"><strong>Email :</strong> <a href="mailto:infofolo.bf@gmail.com" className="text-amber-400 hover:underline font-medium">infofolo.bf@gmail.com</a></p>
              <div className="flex items-center gap-3">
                <a href="https://wa.me/22604581198" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/40 transition-colors" title="Envoyez un message à Folo sur WhatsApp (+226 04 58 11 98)">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/company/folo-coaching-et-formation/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center hover:bg-blue-600/40 transition-colors" title="Page LinkedIn Officielle Folo">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="mailto:infofolo.bf@gmail.com" className="w-8 h-8 rounded-full bg-white/10 text-white/80 flex items-center justify-center hover:bg-white/20 transition-colors" title="Email Direct infofolo.bf@gmail.com">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© {new Date().getFullYear()} Folo Performance Coaching Burkina Faso. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <span>Confidentialité RGPD & Réglementation locale</span>
              <span>Devise : Franc CFA (XOF)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ FLOATING WHATSAPP BUTTON ============ */}
      <a
        href="https://wa.me/22604581198?text=Bonjour%20Folo%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20programmes%20de%20coaching%20au%20Burkina%20Faso."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float shadow-2xl"
        title="Envoyez un message à Folo sur WhatsApp (+226 04 58 11 98)"
        data-cursor-hover
      >
        <MessageCircle className="w-5 h-5 fill-black text-black" />
        <span className="hidden sm:inline">WhatsApp Folo (+226 04 58 11 98)</span>
      </a>

      {/* ============ PROMPTS GOOGLE AI STUDIO MODAL ============ */}
      {showPromptsModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <div className="bg-[#181818] border border-amber-500/40 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl text-left">
            <button
              onClick={() => setShowPromptsModal(false)}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold font-display text-white">Prompts Générateur d'Images AI Studio</h3>
            </div>

            <p className="text-xs text-white/70 mb-6 leading-relaxed">
              Voici les consignes d'invitation d'images personnalisées générées pour le style actuellement sélectionné : <strong className="text-amber-400">{styleNames[visualStyle].name}</strong>. Copiez-les dans Google AI Studio ou Imagen pour créer de nouveaux visuels parfaitement harmonisés.
            </p>

            <div className="space-y-4 mb-6">
              {promptsForCurrentStyle.map((p, i) => (
                <div key={i} className="bg-black/60 border border-white/10 rounded-lg p-4 relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{p.section}</span>
                    <button
                      onClick={() => handleCopyPrompt(p.prompt, i)}
                      className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-white bg-amber-500/20 px-2.5 py-1 rounded transition-colors"
                    >
                      {copiedPromptIndex === i ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier le prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-mono text-white/80 bg-white/5 p-3 rounded border border-white/5 leading-relaxed">
                    {p.prompt}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-white/80 flex items-center justify-between">
              <span>Astuce : Changez le style des visuels dans la barre supérieure pour générer d'autres variantes !</span>
              <button onClick={() => setShowPromptsModal(false)} className="bg-amber-500 text-black font-bold px-4 py-2 rounded text-xs">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
