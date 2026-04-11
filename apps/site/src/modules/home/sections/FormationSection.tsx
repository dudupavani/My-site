export function FormationSection() {
  return (
    <section
      className="bg-zinc-900 text-white"
      dangerouslySetInnerHTML={{
        __html: `
    <div class="flex flex-col items-stretch">
      <div class="flex justify-start md:justify-center items-center px-6 py-12">
        <h2 class="text-sm sm:text-base md:text-lg font-bold uppercase !tracking-[0.6em] text-gray-500">Formação</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-1">
        <div class="px-6 py-6 md:py-10 md:px-10 border border-zinc-800/60 flex flex-col gap-4 justify-between">
          <h3 class="text-base sm:text-lg font-medium mb-2 text-zinc-300">
            Bacharel em Desenho Industrial - Programação Visual
          </h3>
          <div class="opacity-40">
            <img src="images/logos-form/univ%20positivo%20white.webp" alt="Universidade Positivo"
              class="max-w-[110px] max-h-[24px] sm:max-w-[120px] sm:max-h-[50px] object-contain" />
          </div>
        </div>
        <div class="px-6 py-6 md:py-10 md:px-10 border border-zinc-800/60 flex flex-col gap-4 justify-between">
          <h3 class="text-base sm:text-lg font-medium mb-2 text-zinc-300">
            Pós-graduação em Design de Hipermídia
          </h3>
          <div class="opacity-40">
            <img src="images/logos-form/anhembi%20white.webp" alt="Anhembi Morumbi"
              class="max-w-[110px] max-h-[24px] sm:max-w-[130px] sm:max-h-[50px] object-contain" />
          </div>
        </div>
        <div class="px-6 py-6 md:py-10 md:px-10 border border-zinc-800/60 flex flex-col gap-4 justify-between">
          <h3 class="text-base sm:text-lg font-medium mb-2 text-zinc-300">
            Digital Product Leadership - Product Manager
          </h3>
          <div class="opacity-40">
            <img src="images/logos-form/tera%20white.webp" alt="Tera"
              class="max-w-[120px] max-h-[20px] sm:max-w-[120px] sm:max-h-[26px] object-contain" />
          </div>
        </div>
        <div class="px-6 py-6 md:py-10 md:px-10 border border-zinc-800/60 flex flex-col gap-4 justify-between">
          <h3 class="text-base sm:text-lg font-medium mb-2 text-zinc-300">
            Marketing Digital - Nanodegree
          </h3>
          <div class="opacity-40">
            <img src="images/logos-form/udacity%20white.webp" alt="Udacity"
              class="max-w-[100px] max-h-[24px] sm:max-h-[50px] object-contain" />
          </div>
        </div>
        <div class="px-6 py-6 md:py-10 md:px-10 border border-zinc-800/60 flex flex-col gap-4 justify-between">
          <h3 class="text-base sm:text-lg font-medium mb-2 text-zinc-300">
            Estratégias Digitais de Marketing
          </h3>
          <div class="opacity-40">
            <img src="images/logos-form/espm%20vazada%20white.webp" alt="ESPM"
              class="max-w-[100px] max-h-[18px] sm:max-w-[120px] sm:max-h-[24px] object-contain" />
          </div>
        </div>
        <div class="px-6 py-6 md:py-10 md:px-10 border border-zinc-800/60 flex flex-col gap-4 justify-between">
          <h3 class="text-base sm:text-lg font-medium mb-2 text-zinc-300">
            Atendimento em Agências de Comunicação
          </h3>
          <div class="opacity-40">
            <img src="images/logos-form/espm%20vazada%20white.webp" alt="ESPM"
              class="max-w-[100px] max-h-[18px] sm:max-w-[120px] sm:max-h-[24px] object-contain" />
          </div>
        </div>
      </div>
    </div>
`,
      }}
    />
  );
}
