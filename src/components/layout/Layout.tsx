import React from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import GlobalSpotlight from '../common/GlobalSpotlight';
import FloatingScrollProgress from '../common/FloatingScrollProgress';
import FullScreenIntroLoader from '../common/FullScreenIntroLoader';
import { useQuote } from '../../context/QuoteContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { openQuote } = useQuote();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-slate-800 selection:bg-brand-500 selection:text-white relative">
      <FullScreenIntroLoader />
      <GlobalSpotlight />
      <FloatingScrollProgress />
      <ScrollToTop />
      <TopBar onOpenQuote={() => openQuote()} />
      <Navbar onOpenQuote={() => openQuote()} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

