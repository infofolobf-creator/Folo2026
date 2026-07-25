import React from 'react';
import { DiagnosticResult } from '../types';
import { Printer, Download, Sparkles, CheckCircle2, MapPin } from 'lucide-react';

interface PDFReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DiagnosticResult | null;
  leadData: { fullName?: string; company?: string; email?: string; phone?: string };
}

export const PDFReportModal: React.FC<PDFReportModalProps> = ({ isOpen, onClose, result, leadData }) => {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#14151a] border border-amber-400/40 rounded-2xl max-w-3xl w-full p-6 sm:p-10 space-y-6 relative shadow-2xl my-8 text-white animate-in zoom-in-95 duration-200">
        
        {/* Modal Controls */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Aperçu du Rapport Stratégique FOLO
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="btn-primary text-xs py-2 px-4 rounded-lg font-bold flex items-center gap-2"
            >
              <Printer className="w-4 h-4 fill-black" />
              <span>Imprimer / Sauvegarder PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white p-1 text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PRINTABLE EXECUTIVE DOCUMENT CONTAINER */}
        <div className="bg-white text-black p-8 sm:p-12 rounded-xl space-y-8 font-body print:p-0 print:shadow-none shadow-2xl border border-gray-200">
          
          {/* Header Document */}
          <div className="flex items-center justify-between border-b-2 border-amber-500 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-black text-amber-400 font-extrabold text-2xl flex items-center justify-center">
                  F
                </div>
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-black tracking-tight">FOLO EXECUTIVE HUB</h1>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Executive Coaching & Leadership</p>
                </div>
              </div>
            </div>

            <div className="text-right text-xs text-gray-600">
              <p className="font-bold text-black">Siège social : Bobo-Dioulasso, Burkina Faso</p>
              <p>WhatsApp : +226 04 58 11 98</p>
              <p>Email : infofolo.bf@gmail.com</p>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">Réf: {result.id}</p>
            </div>
          </div>

          {/* Prospect & Subject */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-wrap justify-between gap-4 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Bénéficiaire de l'Évaluation</span>
              <p className="text-base font-bold text-black mt-0.5">{leadData.fullName || 'Dirigeant Partner'}</p>
              <p className="text-gray-600 font-medium">{leadData.company || 'Organisation Partenaire'}</p>
              <p className="text-gray-500">{leadData.email || 'Email non spécifié'} • {leadData.phone || ''}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Diagnostic Réalisé</span>
              <p className="text-sm font-bold text-black mt-0.5">{result.category.toUpperCase()}</p>
              <p className="text-xs font-bold text-amber-600 mt-1">Score : {result.scoreTotal} / 100 ({result.level})</p>
              <p className="text-[10px] text-gray-400 mt-1">Date : {result.createdAt}</p>
            </div>
          </div>

          {/* Score & Dimensions */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider border-b border-gray-200 pb-2">
              1. Bilan & Cartographie des Dimensions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {result.dimensions.map((dim, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded border border-gray-200 text-xs">
                  <div className="flex justify-between font-bold text-gray-800 mb-1">
                    <span>{dim.name}</span>
                    <span className="text-amber-600">{dim.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${dim.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risks & Recomms */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider border-b border-gray-200 pb-2">
              2. Recommandations FOLO Executive Coaching
            </h3>
            <div className="space-y-2 text-xs text-gray-700 leading-relaxed">
              {result.recommendations.map((rec, i) => (
                <p key={i} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded border border-amber-200">
                  <span className="font-bold text-amber-700">{i + 1}.</span> {rec}
                </p>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="p-4 bg-gray-900 text-white rounded-lg text-xs space-y-2">
            <h4 className="font-bold text-amber-400 uppercase text-[11px] tracking-wider">Parcours FOLO Préconisés :</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {result.suggestedPrograms.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Footer Signature */}
          <div className="pt-6 border-t border-gray-200 flex justify-between items-end text-[10px] text-gray-500">
            <div>
              <p className="font-bold text-black">FOLO Cabinet & Hub • Coaching & Formation des Dirigeants</p>
              <p>Bobo-Dioulasso • Ouagadougou • UEMOA</p>
            </div>
            <div className="text-right">
              <p className="italic">Document officiel certifié par FOLO AI Lab</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
