import { ContactFooter } from "./sections/ContactFooter";
import { ContentCasesSection } from "./sections/ContentCasesSection";
import { DecisionSection } from "./sections/DecisionSection";
import { HeroSection } from "./sections/HeroSection";
import { ProductThinkingSection } from "./sections/ProductThinkingSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductThinkingSection />
      <DecisionSection />
      <ContentCasesSection />
      <ContactFooter />
      <div className="fixed z-20 w-full h-24 bottom-0 left-0 progressive-blur"></div>
    </>
  );
}
