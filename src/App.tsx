import React, { useState } from 'react';
import { ModuleView, DiagnosticResult } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DiagnosticsModule } from './components/DiagnosticsModule';
import { CalculatorsModule } from './components/CalculatorsModule';
import { AssistantIAModule } from './components/AssistantIAModule';
import { CRMModule } from './components/CRMModule';
import { DashboardModule } from './components/DashboardModule';
import { ResourcesModule } from './components/ResourcesModule';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
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
            <ServicesSection
              setCurrentView={setCurrentView}
              onOpenRDVModal={() => setIsRDVModalOpen(true)}
            />
            <AboutSection
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
