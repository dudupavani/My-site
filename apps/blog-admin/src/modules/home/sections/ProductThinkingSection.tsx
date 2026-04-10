export function ProductThinkingSection() {
  return (
    <section
      className="bg-blue-700 text-white"
      dangerouslySetInnerHTML={{
        __html: `
    <div class="max-w-6xl mx-auto text-left md:text-center max-w-5xl py-16 sm:py-20 sm:pb-16 px-6">
      <p
        class="text-sm sm:text-base md:text-lg text-zinc-900 uppercase tracking-[0.2em]  md:tracking-[0.24em] font-bold mb-6 sm:mb-10">
        Como eu penso produto
      </p>
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold !leading-relaxed mb-6 mx-auto">
        Produto, para mim, não começa por "o que vamos construir".<br class="hidden md:block" />
        Começa no porquê. Só depois avança para decisões de execução.
      </h2>
      <p class="text-blue-200 text-xl mx-auto font-regular !leading-[1.7]">
        Antes de discutir soluções e funcionalidades, busco o que realmente
        sustenta o produto.
      </p>
    </div>


    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

      <div
        class="flex flex-row sm:flex-col gap-6 sm:gap-8 md:gap-12 px-6 py-8 md:px-12 md:py-12 border border-blue-700 bg-blue-800">
        <i data-lucide="telescope" class="min-w-10 min-h-10 md:w-12 md:h-12 text-blue-600"></i>
        <p class="text-base sm:text-lg md:text-xl !leading-relaxed">Clareza sobre onde a empresa quer chegar</p>
      </div>
      <div
        class="flex flex-row sm:flex-col gap-6 sm:gap-8 md:gap-12 px-6 py-8 md:px-12 md:py-12 border border-blue-700 bg-blue-800">
        <i data-lucide="circle-dollar-sign" class="min-w-10 min-h-10 md:w-12 md:h-12 text-blue-600"></i>
        <p class="text-base sm:text-lg md:text-xl !leading-relaxed">
          Compreensão de como o produto gera valor e receita
        </p>
      </div>
      <div
        class="flex flex-row sm:flex-col gap-6 sm:gap-8 md:gap-12 px-6 py-8 md:px-12 md:py-12 border border-blue-700 bg-blue-800">
        <i data-lucide="circle-user-round" class="min-w-10 min-h-10 md:w-12 md:h-12 text-blue-600"></i>
        <p class="text-base sm:text-lg md:text-xl !leading-relaxed">
          Entendimento profundo de quem é o cliente real, sem viés ou achismos
        </p>
      </div>
      <div
        class="flex flex-row sm:flex-col gap-6 sm:gap-8 md:gap-12 px-6 py-8 md:px-12 md:py-12 border border-blue-700 bg-blue-800">
        <i data-lucide="history" class="min-w-10 min-h-10 md:w-12 md:h-12 text-blue-600"></i>
        <p class="text-base sm:text-lg md:text-xl !leading-relaxed">
          Decisões guiadas por evidências, não por opinião
        </p>
      </div>
    </div>
`,
      }}
    />
  );
}
