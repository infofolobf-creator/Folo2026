import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Bot, Send, Sparkles, User, Calendar, RefreshCw, MessageSquare, CheckCircle2 } from 'lucide-react';

interface AssistantIAModuleProps {
  onOpenRDVModal: () => void;
  onSelectDiagnostic: (cat: string) => void;
}

export const AssistantIAModule: React.FC<AssistantIAModuleProps> = ({ onOpenRDVModal, onSelectDiagnostic }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Bonjour et bienvenue sur FOLO Platform V2. Je suis votre Assistant IA dédié au Conseil en Management, Executive Leadership & Transformation IA (Siège à Bobo-Dioulasso, Burkina Faso).\n\nComment puis-je vous guider aujourd'hui dans la performance de votre organisation ?",
      timestamp: 'À l\'instant',
      suggestedActions: [
        { label: '🎯 Évaluer mon Comité de Direction (CODIR)', action: 'start_diagnostic', payload: 'leadership' },
        { label: '📊 Calculer le ROI de nos formations', action: 'open_calculator' },
        { label: '📅 Prendre un RDV stratégique de 30 min', action: 'schedule_rdv' }
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (promptToSend?: string) => {
    const query = promptToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!promptToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply || "Merci pour votre message. Nos consultants FOLO à Bobo-Dioulasso restent à votre écoute.",
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const fallbackMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: "Nos consultants FOLO (Bobo-Dioulasso & UEMOA) sont à votre disposition pour réaliser un audit personnalisé de vos équipes managériales. Souhaitez-vous planifier un échange stratégique ?",
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: '📅 Planifier mon RDV Stratégique', action: 'schedule_rdv' }
        ]
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: string, payload?: any) => {
    if (action === 'schedule_rdv') {
      onOpenRDVModal();
    } else if (action === 'start_diagnostic') {
      onSelectDiagnostic(payload || 'leadership');
    }
  };

  return (
    <section className="py-12 lg:py-20 bg-[#0A0A0A] text-white">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-3 text-xs font-semibold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" /> Assistant IA FOLO V2
          </div>
          <h2 className="heading-lg text-2xl sm:text-4xl font-bold font-display">
            Assistant IA de Conseil & Qualification
          </h2>
          <p className="mt-2 text-white/70 text-xs sm:text-sm">
            Posez vos questions sur la gouvernance, le management, le turnover ou la transformation IA de vos équipes.
          </p>
        </div>

        {/* Chat Window */}
        <div className="bg-[#14151a] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[650px] overflow-hidden">
          {/* Top Bar */}
          <div className="p-4 bg-[#1a1b22] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white font-display flex items-center gap-2">
                  FOLO Executive AI Assistant <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-white/50">Siège social : Bobo-Dioulasso, Burkina Faso</p>
              </div>
            </div>
            <button
              onClick={() => setMessages([messages[0]])}
              className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Réinitialiser
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-400 text-black font-medium shadow-lg'
                    : 'bg-white/5 border border-white/10 text-white/90'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`text-[9px] block mt-2 text-right ${
                    msg.sender === 'user' ? 'text-black/60' : 'text-white/40'
                  }`}>
                    {msg.timestamp}
                  </span>

                  {/* Suggested Actions if any */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                      <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Actions suggérées :</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.suggestedActions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(act.action, act.payload)}
                            className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 transition-all text-left"
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-black flex items-center justify-center flex-shrink-0 mt-1 font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-white/60 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>FOLO IA analyse votre demande...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Preset Chips */}
          <div className="px-4 py-2 bg-[#1a1b22] border-t border-white/5 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-white/40 font-mono flex-shrink-0">Exemples :</span>
            <button
              onClick={() => handleSendMessage("Comment structurer un séminaire CODIR pour 12 directeurs ?")}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 whitespace-nowrap"
            >
              "Séminaire CODIR à Bobo"
            </button>
            <button
              onClick={() => handleSendMessage("Quels sont les tarifs des parcours de formation FOLO ?")}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 whitespace-nowrap"
            >
              "Tarifs & Accompagnement"
            </button>
            <button
              onClick={() => handleSendMessage("Comment l'IA peut-elle réduire le temps de travail de mes managers ?")}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 whitespace-nowrap"
            >
              "Gains de productivité IA"
            </button>
          </div>

          {/* Input Form */}
          <div className="p-4 bg-[#171820] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Posez votre question à l'Assistant FOLO IA..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                className="btn-primary text-xs py-3 px-5 rounded-xl font-bold flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 fill-black" />
                <span className="hidden sm:inline">Envoyer</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
