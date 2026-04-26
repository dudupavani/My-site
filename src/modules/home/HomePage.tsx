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
    </>
  );
}
