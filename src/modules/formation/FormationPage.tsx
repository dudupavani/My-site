import Image from "next/image";

import { AcademicSection } from "./sections/AcademicSection";
import { TechnicalSection } from "./sections/TechnicalSection";

export function FormationPage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      <div className="mx-auto max-w-400">
        <section className="px-6 pt-28 pb-6 sm:px-8 sm:pt-32 lg:px-15 lg:pt-40">
          <div className="overflow-hidden h-40 sm:h-80 lg:h-100 rounded-xl">
            <Image
              src="/images/formacao/hero.png"
              alt=""
              width={1246}
              height={220}
              priority
              sizes="(min-width: 1024px) 1246px, calc(100vw - 48px)"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <div className="flex flex-col gap-8 md:gap-16 px-6 pt-14 pb-24 sm:px-8 sm:pt-16 lg:px-16 lg:pt-20 lg:pb-20">
          <AcademicSection />
          <TechnicalSection />
        </div>
      </div>
    </main>
  );
}
