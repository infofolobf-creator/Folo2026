import React, { useState } from 'react';
import { ModuleView, DiagnosticResult } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChallengesSection } from './components/ChallengesSection';
import { SolutionsSection } from './components/SolutionsSection';
import { MethodSection } from './components/MethodSection';
import { WhyFoloSection } from './components/WhyFoloSection';
import { OffersSection } from './components/OffersSection';
import { CommitmentsSection } from './components/CommitmentsSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { DiagnosticsModule } from './components/DiagnosticsModule';
import { CalculatorsModule } from './components/CalculatorsModule';
import { AssistantIAModule } from './components/AssistantIAModule';
import { CRMModule } from './components/CRMModule';
import { DashboardModule } from './components/DashboardModule';
import { ResourcesModule } from './components/ResourcesModule';
import { Footer } from './components/Footer';
import { RDVModal } from './components/RDVModal';
import { PDFReportModal } from './components/PDFReportModal';

export function App() {
  const [currentView, setCurrentView] = useState<ModuleView>('site');
  
  // Modal states
  const [isRDVModalOpen, setIsRDVModalOpen] = useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [pdfResult, setPdfResult] = useState<DiagnosticResult | null>(null);
  const [pdfLeadData, setPdfLeadData] = useState<any>({});

  const handleOpenPDFModal = (result: DiagnosticResult, leadData: any) => {
    setPdfResult(result);
    setPdfLeadData(leadData);
    setIsPDFModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-body selection:bg-amber-400 selection:text-black">
      {/* Top Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenRDVModal={() => setIsRDVModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'site' && (
          <>
            <Hero
              setCurrentView={setCurrentView}
              onOpenRDVModal={() => setIsRDVModalOpen(true)}
            />
            <ChallengesSection
              onOpenRDVModal={() => setIsRDVModalOpen(true)}
            />
            <SolutionsSection
              setCurrentView={setCurrentView}
              onOpenRDVModal={() => setIsRDVModalOpen(true)}
            />
            <MethodSection
              onOpenRDVModal={() => setIsRDVModalOpen(true)}
            />
            <WhyFoloSection
              onOpenRDVModal={() => setIsRDVModalOpen(true)}
            />
            <OffersSection
              setCurrentView={setCurrentView}
              onOpenRDVModal={() => setIsRDVModalOpen(true)}
            />
            <CommitmentsSection />
            <FAQSection />
            <FinalCTASection
              onOpenRDVModal={() => setIsRDVModalOpen(true)}
            />
          </>
        )}

        {currentView === 'diagnostics' && (
          <DiagnosticsModule
            onOpenPDFModal={handleOpenPDFModal}
            onOpenRDVModal={() => setIsRDVModalOpen(true)}
          />
        )}

        {currentView === 'calculators' && (
          <CalculatorsModule
            onOpenRDVModal={() => setIsRDVModalOpen(true)}
          />
        )}

        {currentView === 'assistant' && (
          <AssistantIAModule
            onOpenRDVModal={() => setIsRDVModalOpen(true)}
            onSelectDiagnostic={(cat) => {
              setCurrentView('diagnostics');
            }}
          />
        )}

        {currentView === 'crm' && (
          <CRMModule />
        )}

        {currentView === 'dashboard' && (
          <DashboardModule />
        )}

        {currentView === 'resources' && (
          <ResourcesModule />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenRDVModal={() => setIsRDVModalOpen(true)}
      />

      {/* Modals */}
      <RDVModal
        isOpen={isRDVModalOpen}
        onClose={() => setIsRDVModalOpen(false)}
      />

      <PDFReportModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        result={pdfResult}
        leadData={pdfLeadData}
      />
    </div>
  );
}

export default App;
