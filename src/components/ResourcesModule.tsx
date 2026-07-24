import React, { useState } from 'react';
import { Resource } from '../types';
import { MOCK_RESOURCES } from '../data/platformData';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Search, 
  Tag, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Send
} from 'lucide-react';

export const ResourcesModule: React.FC = () => {
  const [resources] = useState<Resource[]>(MOCK_RESOURCES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadModalResource, setDownloadModalResource] = useState<Resource | null>(null);

  // Form for downloading whitepapers
  const [downloadName, setDownloadName] = useState('');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadCompany, setDownloadCompany] = useState('');
  const [isDownloaded, setIsDownloaded] = useState(false);

  const filteredResources = resources.filter(res => {
    return selectedCategory === 'all' || res.category === selectedCategory;
  });

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadName || !downloadEmail) return;

    try {
      await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: downloadName,
          email: downloadEmail,
          company: downloadCompany,
          notes: `Téléchargement Ressource: ${downloadModalResource?.title}`
        })
      });
      setIsDownloaded(true);
    } catch (err) {
      console.error(err);
      setIsDownloaded(true);
    }
  };

  return (
    <section className="py-12 lg:py-20 bg-[#0A0A0A] text-white">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-8">
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-4 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Centre de Ressources & Blog SEO FOLO
          </div>
          <h2 className="heading-lg text-3xl sm:text-5xl font-bold font-display">
            Guides, Livres Blancs & Outils d'Excellence
          </h2>
          <p className="mt-4 text-white/70 text-sm sm:text-base">
            Publications stratégiques dédiées aux Dirigeants, Directeurs Généraux et DRH d'Afrique Francophone.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Toutes les publications' },
            { id: 'leadership', label: 'Leadership & CODIR' },
            { id: 'management', label: 'Management' },
            { id: 'rh', label: 'Ressources Humaines & Rétention' },
            { id: 'ia', label: 'Intelligence Artificielle & Digital' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-black border-amber-400 shadow-lg'
                  : 'bg-[#14151a] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-[#14151a] border border-white/10 hover:border-amber-400/40 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    res.type === 'whitepaper' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    res.type === 'checklist' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {res.type === 'whitepaper' ? 'Livre Blanc PDF' : res.type === 'checklist' ? 'Checklist Pratique' : 'Article Stratégique'}
                  </span>
                  <span className="text-[11px] text-white/40 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {res.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                  {res.summary}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {res.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                <span className="text-[10px] text-white/40">Publié le {res.publishDate}</span>
                <button
                  onClick={() => {
                    setDownloadModalResource(res);
                    setIsDownloaded(false);
                  }}
                  className="btn-primary text-xs py-2 px-4 rounded-lg font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 fill-black" />
                  <span>Accéder / PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Magnet Download Modal */}
        {downloadModalResource && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#14151a] border border-amber-400/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Téléchargement Gratuit</span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">{downloadModalResource.title}</h3>
                </div>
                <button
                  onClick={() => setDownloadModalResource(null)}
                  className="text-white/50 hover:text-white p-1 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {!isDownloaded ? (
                <form onSubmit={handleDownloadSubmit} className="space-y-4 text-xs">
                  <p className="text-white/70">
                    Veuillez renseigner vos coordonnées pour recevoir directement le livre blanc dans votre boîte mail et accéder au téléchargement.
                  </p>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 mb-1">Nom Complet *</label>
                    <input
                      type="text"
                      required
                      value={downloadName}
                      onChange={(e) => setDownloadName(e.target.value)}
                      placeholder="Moussa Sawadogo"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 mb-1">Email Professionnel *</label>
                    <input
                      type="email"
                      required
                      value={downloadEmail}
                      onChange={(e) => setDownloadEmail(e.target.value)}
                      placeholder="moussa@entreprise.bf"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 mb-1">Entreprise / Organisation</label>
                    <input
                      type="text"
                      value={downloadCompany}
                      onChange={(e) => setDownloadCompany(e.target.value)}
                      placeholder="SN CITEC, Coris Bank..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-xs py-3 rounded-lg font-bold flex items-center justify-center gap-2 mt-2"
                  >
                    <Download className="w-4 h-4 fill-black" />
                    <span>Télécharger la ressource PDF</span>
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Téléchargement Prêt !</h4>
                  <p className="text-xs text-white/70">
                    Merci {downloadName}. La ressource <strong className="text-amber-400">{downloadModalResource.title}</strong> a été enregistrée.
                  </p>
                  <button
                    onClick={() => setDownloadModalResource(null)}
                    className="btn-primary text-xs py-2.5 px-6 rounded-lg font-bold"
                  >
                    Fermer & Continuer la navigation
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
