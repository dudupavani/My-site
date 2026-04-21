import { ContactFooter } from "./sections/ContactFooter";
import { ContentCasesSection } from "./sections/ContentCasesSection";
import { DecisionSection } from "./sections/DecisionSection";
import { FormationSection } from "./sections/FormationSection";
import { HeroSection } from "./sections/HeroSection";
import { ProductThinkingSection } from "./sections/ProductThinkingSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductThinkingSection />
      <DecisionSection />
      <ContentCasesSection />
      <FormationSection />
      <ContactFooter />
    </>
  );
}
