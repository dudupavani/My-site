export function DecisionSection() {
  return (
    <section
      className="bg-zinc-50"
      dangerouslySetInnerHTML={{
        __html: `
    <div class="flex flex-col md:flex-row max-w-[1440px] mx-auto">
      <div
        class="flex-1 flex-col justify-center items-start space-y-8 border-r border-zinc-300 pt-16 pb-0 px-6 sm:px-12 md:py-24 md:px-16 lg:py-32 lg:px-20">
        <h2 class="text-sm sm:text-base text-blue-600 uppercase tracking-[0.2em] md:tracking-[0.3em]
          font-extrabold">
          Como decido e priorizo
        </h2>
        <p class="text-2xl md:text-2xl lg:text-3xl !leading-relaxed text-zinc-800 font-bold">
          Boas decisões de produto não começam na solução. Começam em contexto, impacto e direção.
        </p>
      </div>

      <div
        class="flex-1 flex-col justify-center space-y-5 md:space-y-8 pt-8 pb-20 px-6 sm:pt-8 sm:pb-20 sm:px-12 md:pt-32 md:px-16 lg:pt-40 lg:px-20">
        <div class="space-y-5 font-regular !text-zinc-800 text-lg sm:text-xl !leading-relaxed">
          <div class="flex items-start gap-3 sm:gap-4">
            <span class="text-blue-600 mt-1">
              <i data-lucide="check" class="min-w-6 min-h-6 w-6 h-6"></i>
            </span>
            <p>
              Clareza sobre o objetivo estratégico
            </p>
          </div>
          <div class="flex items-start gap-3 sm:gap-4">
            <span class="text-blue-600 mt-1">
              <i data-lucide="check" class="min-w-6 min-h-6 w-6 h-6"></i>
            </span>
            <p>
              Impacto no negócio e na jornada do cliente
            </p>
          </div>
          <div class="flex items-start gap-3 sm:gap-4">
            <span class="text-blue-600 mt-1">
              <i data-lucide="check" class="min-w-6 min-h-6 w-6 h-6"></i>
            </span>
            <p>
              Relação entre impacto, esforço e prioridade
            </p>
          </div>
        </div>
      </div>
    </div>
`,
      }}
    />
  );
}
