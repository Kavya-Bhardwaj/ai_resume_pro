'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/shared/Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import DemoSection from './DemoSection';
import PricingSection from './PricingSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import Footer from '@/components/shared/Footer';

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
