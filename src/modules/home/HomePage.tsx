import Script from "next/script";

import { BaseSection } from "./sections/BaseSection";
import { ContactFooter } from "./sections/ContactFooter";
import { DecisionSection } from "./sections/DecisionSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { FormationSection } from "./sections/FormationSection";
import { HeroSection } from "./sections/HeroSection";
import { ProductThinkingSection } from "./sections/ProductThinkingSection";
import { TodaySection } from "./sections/TodaySection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductThinkingSection />
      <DecisionSection />
      <ExperienceSection />
      <TodaySection />
      <BaseSection />
      <FormationSection />
      <ContactFooter />

      {/* Inicializa os ícones data-lucide usados nas seções da home */}
      <Script id="lucide-init" strategy="afterInteractive">
        {`window.lucide?.createIcons();`}
      </Script>
    </>
  );
}
