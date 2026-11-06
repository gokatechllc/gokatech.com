import React, { useState } from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import QuoteModal from '../common/QuoteModal';
import GlobalSpotlight from '../common/GlobalSpotlight';
import FloatingScrollProgress from '../common/FloatingScrollProgress';
import FullScreenIntroLoader from '../common/FullScreenIntroLoader';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);

  const handleOpenQuote = (serviceTitle?: string) => {
    setSelectedServiceForQuote(serviceTitle);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060D1A] text-slate-100 selection:bg-brand-500 selection:text-white relative">
      <FullScreenIntroLoader />
      <GlobalSpotlight />
      <FloatingScrollProgress />
      <ScrollToTop />
      <TopBar onOpenQuote={() => handleOpenQuote()} />
      <Navbar onOpenQuote={() => handleOpenQuote()} />
      
      <main className="flex-1">
        {React.cloneElement(children as React.ReactElement, { onOpenQuote: handleOpenQuote })}
      </main>

      <Footer />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedServiceForQuote}
      />
    </div>
  );
}

