export function TodaySection() {
  return (
    <section className="flex flex-col md:flex-row min-h-112.5 bg-neutral-200">
      <div className="flex-1 gap-8 max-w-6xl mx-auto text-white px-6 py-16 sm:p-12 md:py-24 md:px-16 lg:px-20 lg:py-32 flex flex-col justify-center">
        <div className="flex flex-col max-w-4xl items-start gap-8">
          <h2 className="text-sm sm:text-base text-stone-500 uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold">
            O que faço hoje
          </h2>
          <div className="space-y-4">
            <p className="text-xl xl:text-2xl leading-normal font-semibold text-neutral-900">
              Hoje atuo de forma estratégica na concepção e evolução de sofware
              em modelo SaaS, conectando produto, design, tecnologia e negócio.
              Participo da definição de objetivos, roadmap, priorização e
              lançamento de iniciativas.
            </p>
            <p className="flex-1 text-neutral-700 leading-[1.8] text-base sm:text-lg">
              Além da atuação em produto, lidero frentes de inteligência
              artificial aplicada dentro da operação, ajudando equipes a
              utilizar agentes de código, estruturar contexto, acelerar entregas
              e gerar ganhos concretos de eficiência e qualidade para a empresa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
