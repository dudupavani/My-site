export function TodaySection() {
  return (
    <section className="flex flex-col md:flex-row min-h-112.5 bg-blue-700">
      <div className="flex-1 gap-8 lg:gap-12 xl:gap-20 max-w-450 mx-auto text-white px-6 py-16 sm:p-12 md:py-24 md:px-16 lg:px-20 lg:py-32 flex flex-col justify-center">
        <div className="flex flex-col max-w-3xl items-start gap-8">
          <p className="text-sm sm:text-base md:text-lg text-blue-950 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">
            O que faço hoje
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl leading-[1.6]! font-semibold">
            Estratégia, execução e inteligência artificial aplicadas à
            construção de produtos digitais com impacto real no negócio.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row text-sm sm:text-base lg:text-lg leading-[1.9]! text-blue-200">
          <p className="flex-1 p-6 sm:p-8 lg:p-12 bg-gray-900/10 border border-blue-700">
            Hoje atuo de forma estratégica na construção e evolução de produtos
            digitais, conectando produto, design, tecnologia e negócio.
            Participo da definição de objetivos, roadmap, priorização e
            lançamento de iniciativas, sempre com foco em clareza, execução e
            resultado.
          </p>
          <p className="flex-1 p-6 sm:p-8 lg:p-12 bg-gray-900/20 border border-blue-700">
            Além da atuação em produto, lidero frentes de inteligência
            artificial aplicada dentro da operação, ajudando equipes a utilizar
            agentes de código, estruturar contexto, acelerar entregas e gerar
            ganhos concretos de eficiência e qualidade para a empresa.
          </p>
          <p className="flex-1 p-6 sm:p-8 lg:p-12 bg-gray-900/30 border border-blue-700">
            Essa atuação integra design, gestão de produto, inteligência
            artificial e inovação aplicada, conectando diferentes áreas para
            transformar oportunidades em direção prática e impacto real no
            negócio.
          </p>
        </div>
      </div>
    </section>
  );
}
