export function ExperienceSection() {
  return (
    <section
      className="relative bg-zinc-900 text-white py-20 sm:py-24 md:py-32 px-4 sm:px-12 md:px-20 lg:px-24 overflow-hidden"
      dangerouslySetInnerHTML={{
        __html: `
    <div class="absolute inset-0 z-0 opacity-10">
      <img src="/images/bg-arch.webp" alt="" class="w-full h-full object-cover" />
    </div>

    <div class="relative flex flex-col gap-12 xl:gap-20 items-center z-10">
      <div class="space-y-4 max-w-4xl text-left sm:text-center px-4 sm:px-0">
        <h2 class="text-4xl lg:text-5xl font-bold leading-tight !leading-[1.3]">
          Experiência e responsabilidade real
        </h2>
        <p class="text-zinc-300 text-lg sm:text-xl md:text-2xl !leading-[1.8] font-regular lg:font-extralight">
          Ao longo da minha trajetória, atuei em contextos onde decisões de
          produto precisavam ser tomadas com clareza, responsabilidade e visão
          de longo prazo.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <div
          class="flex flex-col items-start gap-2 md:gap-4 border border-zinc-700/60 p-6 sm:p-8 md:pt-8 md:pb-12 bg-zinc-800/40">
          <span class="text-blue-500 mt-1">
            <i data-lucide="check" class="w-6 h-6 md:w-8 md:h-8"></i>
          </span>
          <p class="text-base md:text-lg !leading-[2] text-zinc-300 font-light">
            Experiência empreendedora como fundador e sócio, assumindo decisões estratégicas, liderança de área e
            responsabilidade direta por resultados.
          </p>
        </div>
        <div
          class="flex flex-col items-start gap-2 md:gap-4 border border-zinc-700/60 p-6 sm:p-8 md:pt-8 md:pb-12 bg-zinc-800/40">
          <span class="text-blue-500 mt-1">
            <i data-lucide="check" class="w-6 h-6 md:w-8 md:h-8"></i>
          </span>
          <p class="text-base md:text-lg !leading-[2] text-zinc-300 font-light">
            Fui líder de produto em uma startup alemã de EdTech, assumindo a visão de produto e estruturando da
            estratégia a execução.
          </p>
        </div>
        <div
          class="flex flex-col items-start gap-2 md:gap-4 border border-zinc-700/60 p-6 sm:p-8 md:pt-8 md:pb-12 bg-zinc-800/40">
          <span class="text-blue-500 mt-1">
            <i data-lucide="check" class="w-6 h-6 md:w-8 md:h-8"></i>
          </span>
          <p class="text-base md:text-lg !leading-[2] text-zinc-300 font-light">
            Atuação direta em comitês de produto com fundadores e C-levels, influenciando decisões estratégicas,
            prioridades e direcionamento do produto.
          </p>
        </div>

        <div
          class="flex flex-col items-start gap-2 md:gap-4 border border-zinc-700/60 p-6 sm:p-8 md:pt-8 md:pb-12 bg-zinc-800/40">
          <span class="text-blue-500 mt-1">
            <i data-lucide="check" class="w-6 h-6 md:w-8 md:h-8"></i>
          </span>
          <p class="text-base md:text-lg !leading-[2] text-zinc-300 font-light">
            Concepção de produtos digitais que impactam empresas como Burger King, CNA Idiomas,
            Subway, Bob’s, Omie, entre outras.
          </p>
        </div>
      </div>
    </div>
`,
      }}
    />
  );
}
