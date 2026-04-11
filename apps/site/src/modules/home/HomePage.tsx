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
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-W2H798B"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>

      <HeroSection />
      <ProductThinkingSection />
      <DecisionSection />
      <ExperienceSection />
      <TodaySection />
      <BaseSection />
      <FormationSection />
      <ContactFooter />

      <Script id="lucide-init" strategy="afterInteractive">
        {`window.lucide?.createIcons();`}
      </Script>
    </>
  );
}
