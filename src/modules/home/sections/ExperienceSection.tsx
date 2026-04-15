import { Check } from "lucide-react";

export function ExperienceSection() {
  return (
    <section className="relative bg-zinc-900 text-white py-20 sm:py-24 md:py-32 px-4 sm:px-12 md:px-20 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <img src="/images/bg-arch.webp" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative flex flex-col gap-12 xl:gap-18 items-center z-10">
        <div className="space-y-4 max-w-4xl text-left sm:text-center px-4 sm:px-0">
          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[1.3]">
            Experiência e responsabilidade real
          </h2>
          <p className="text-zinc-300 text-lg sm:text-xl md:text-2xl leading-[1.6] font-regular lg:font-extralight">
            Minha trajetória foi construída em contextos onde produto precisava sair da abstração e avançar no mundo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col items-start gap-2 md:gap-4 border border-zinc-700/60 p-6 sm:p-8 md:pt-8 md:pb-12 bg-zinc-900/70">
            <span className="text-blue-500 mt-1">
              <Check className="w-6 h-6 md:w-8 md:h-8" />
            </span>
            <p className="text-base md:text-lg leading-[1.8] text-zinc-300 font-light">
              Fundador de duas empresas, uma de software e sites e outra de propaganda, branding e design, com atuação direta em negócio, cliente e entrega.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:gap-4 border border-zinc-700/60 p-6 sm:p-8 md:pt-8 md:pb-12 bg-zinc-900/70">
            <span className="text-blue-500 mt-1">
              <Check className="w-6 h-6 md:w-8 md:h-8" />
            </span>
            <p className="text-base md:text-lg leading-[1.8] text-zinc-300 font-light">
              Liderança de produto em startup alemã de EdTech, estruturando visão, roadmap, prioridades e execução.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:gap-4 border border-zinc-700/60 p-6 sm:p-8 md:pt-8 md:pb-12 bg-zinc-900/70">
            <span className="text-blue-500 mt-1">
              <Check className="w-6 h-6 md:w-8 md:h-8" />
            </span>
            <p className="text-base md:text-lg leading-[1.8] text-zinc-300 font-light">
              Atuação direta em comitês de produto na Yungas, ao lado de founders e C levels, influenciando decisões estratégicas.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:gap-4 border border-zinc-700/60 p-6 sm:p-8 md:pt-8 md:pb-12 bg-zinc-900/70">
            <span className="text-blue-500 mt-1">
              <Check className="w-6 h-6 md:w-8 md:h-8" />
            </span>
            <p className="text-base md:text-lg leading-[1.8] text-zinc-300 font-light">
              Concepção de soluções digitais para operações de grande porte, com marcas como Burger King, Subway, Bob’s, CNA e Omie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
