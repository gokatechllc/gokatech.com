import HeroSection from '../components/home/HeroSection';
import ClientMarquee from '../components/home/ClientMarquee';
import ServicesGrid from '../components/home/ServicesGrid';
import AwardSpotlight from '../components/home/AwardSpotlight';
import WorkProcess from '../components/home/WorkProcess';
import Testimonials from '../components/home/Testimonials';
import CtaBanner from '../components/home/CtaBanner';

interface HomePageProps {
  onOpenQuote?: (serviceTitle?: string) => void;
}

export default function HomePage({ onOpenQuote }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      <HeroSection onOpenQuote={() => onOpenQuote && onOpenQuote()} />
      <ClientMarquee />
      <ServicesGrid onOpenQuote={onOpenQuote} />
      <AwardSpotlight />
      <WorkProcess />
      <Testimonials />
      <CtaBanner onOpenQuote={() => onOpenQuote && onOpenQuote()} />
    </div>
  );
}

