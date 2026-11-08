import HeroSection from '../components/home/HeroSection';
import ClientMarquee from '../components/home/ClientMarquee';
import ServicesGrid from '../components/home/ServicesGrid';
import AwardSpotlight from '../components/home/AwardSpotlight';
import WorkProcess from '../components/home/WorkProcess';
import Testimonials from '../components/home/Testimonials';
import CtaBanner from '../components/home/CtaBanner';

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <ClientMarquee />
      <ServicesGrid />
      <AwardSpotlight />
      <WorkProcess />
      <Testimonials />
      <CtaBanner />
    </div>
  );
}

