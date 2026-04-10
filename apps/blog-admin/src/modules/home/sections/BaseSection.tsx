export function BaseSection() {
  return (
    <section
      className="bg-white pt-16 pb-24 md:py-24 px-6 md:px-24"
      dangerouslySetInnerHTML={{
        __html: `
    <div class="flex flex-col max-w-7xl mx-auto">
      <div class=" mb-10 md:mb-16 max-w-4xl">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-2 -tracking-[0.02em] !leading-[1.4]">
          Base que sustenta minha atuação
        </h2>
        <p class="text-base md:text-xl leading-relaxed text-zinc-600 text-regular md:text-light !leading-[1.7]">
          Minha trajetória começou no design, com foco em aplicações digitais,
          ainda antes da consolidação dos produtos digitais como conhecemos
          hoje.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl">
        <div
          class="space-y-6 md:space-y-10 text-sm sm:text-base !leading-[1.8] text-zinc-900 text-regular md:text-light">
          <div class="flex items-start gap-2 sm:gap-4">
            <span class="text-blue-600 mt-1">
              <i data-lucide="chevron-right" class="w-6 h-6"></i>
            </span>
            <p>
              Sou formado em Desenho Industrial - Programação Visual e possuo
              pós-graduação em Design de Hipermídia, uma das primeiras
              formações voltadas ao design interativo, software e experiências
              digitais no Brasil.
            </p>
          </div>
          <div class="flex items-start gap-2 sm:gap-4">
            <span class="text-blue-600 mt-1">
              <i data-lucide="chevron-right" class="w-6 h-6"></i>
            </span>
            <p>
              Fui Co-fundador e diretor de criação de uma agência de
              publicidade, onde desenvolvi forte vivência em negócio,
              relacionamento com clientes e entendimento profundo de dores
              reais.
            </p>
          </div>
          <div class="flex items-start gap-2 sm:gap-4">
            <span class="text-blue-600 mt-1">
              <i data-lucide="chevron-right" class="w-6 h-6"></i>
            </span>
            <p>
              Com o tempo, minha atuação naturalmente evoluiu para o universo
              de produtos digitais e software. Passei por funções de UX
              Designer, Product Designer e Product Manager, unindo formação,
              estudo e prática.
            </p>
          </div>
        </div>

        <div
          class="relative flex items-center justify-center min-h-[400px] rounded-md overflow-hidden p-4 sm:p-8 md:p-12">
          <div class="absolute inset-0">
            <img src="images/office.webp" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="absolute inset-0 bg-black/20"></div>
          <h3
            class="relative z-10 text-xl md:text-2xl font-regular md:font-light lg:font-extralight text-white !leading-[1.5] lg:text-right">
            Hoje, essa trajetória se reflete em uma visão ampla, que integra estratégia, negócio, design, tecnologia e
            inteligência artificial aplicada ao contexto real da empresa.
          </h3>
        </div>
      </div>
    </div>
`,
      }}
    />
  );
}
