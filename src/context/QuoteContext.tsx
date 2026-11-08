import React, { createContext, useContext, useState } from 'react';
import QuoteModal from '../components/common/QuoteModal';

interface QuoteContextValue {
  /** Open the global quote/enquiry modal, optionally pre-filling a service name. */
  openQuote: (serviceTitle?: string) => void;
  /** Close the global quote modal. */
  closeQuote: () => void;
}

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);

/**
 * Provides a single, app-wide quote modal that any component can open via
 * useQuote(). This replaces prop-threading (which broke across the <Routes>
 * boundary, leaving page-level "Request a Quote" buttons dead).
 */
export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<string | undefined>(undefined);

  const openQuote = (serviceTitle?: string) => {
    setService(serviceTitle);
    setIsOpen(true);
  };

  const closeQuote = () => setIsOpen(false);

  return (
    <QuoteContext.Provider value={{ openQuote, closeQuote }}>
      {children}
      <QuoteModal isOpen={isOpen} onClose={closeQuote} initialService={service} />
    </QuoteContext.Provider>
  );
}

/**
 * Access the quote modal controls. Falls back to a safe no-op if used outside
 * the provider, so a button click can never throw.
 */
export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    return { openQuote: () => {}, closeQuote: () => {} };
  }
  return ctx;
}
