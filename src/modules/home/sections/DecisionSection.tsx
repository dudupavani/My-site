export function DecisionSection() {
  const decisions = [
    "Fundei e liderei duas empresas, uma de software e sites e outra de propaganda, branding e design, conectando visão de negócio, relacionamento com clientes, gestão de equipe e entregas de alto nível.",
    "Liderei produto em uma startup EdTech alemã, estruturando a visão com os founders, a estratégia de execução com a liderança de engenharia e o treinamento dos designers para otimizar o fluxo de entregas.",
    "Hoje, na Yungas Tecnologia, faço parte do comitê de produto com os founders e conduzo a concepção e os direcionamentos estratégicos de execução.",
    "Meu trabalho impacta operações de grande porte, com marcas como Burger King, Subway, Bob's, CNA Idiomas, Omie, entre outras.",
    "Minha experiência foi construída entre empreendedorismo, liderança criativa e direção de produto, em empresas com desafios reais de operação e crescimento.",
  ];

  return (
    <section className="relative overflow-hidden bg-[#030305] px-6 sm:px-10 pt-70 sm:pt-60">
      <div className="absolute z-0 w-[110%] sm:w-full opacity-60 left-2/4 -translate-x-7/12 2xl:-translate-x-5/12 top-0 bottom-auto sm:top-auto sm:bottom-0">
        <img
          src="/images/bg-front-02.webp"
          alt=""
          className="block object-cover object-top sm:object-bottom"
        />
      </div>

      <div className="absolute inset-0 z-0 bg-zinc-900/30" />
      <div className="pointer-events-none absolute -bottom-20 left-1/2 z-2 h-120 w-200 max-w-[90vw] -translate-x-1/2 rounded-full bg-gold-500 opacity-10 blur-3xl mix-blend-screen" />
      

      <div className="relative z-10 mx-auto grid w-full max-w-5xl 2xl:max-w-7xl lg:grid-cols-[443px_minmax(0,1fr)] 2xl:grid-cols-[580px_minmax(0,1fr)] lg:items-end gap-8 sm:gap-12 lg:gap-20 2xl:gap-40 pb-20">
        <div className="flex min-w-0 flex-col items-start overflow-hidden rounded-2xl border-0 sm:border border-gold-800/30 bg-[linear-gradient(119deg,rgba(9,9,11,0.62)_4%,rgba(9,9,11,0.08)_93%)] backdrop-blur-md px-6 py-8 sm:px-10 sm:py-10 gap-4 lg:gap-16">
          <h2 className="w-full font-extralight leading-[1.2] tracking-[-1.4px] text-white text-4xl md:text-5xl">
            Experiência e responsabilidade
          </h2>
          <p className="w-full leading-[1.4] text-gold-600 text-lg lg:leading-[1.4]">
            Ao longo de mais de 20 anos atuei em múltiplos contextos
          </p>
        </div>

        <div className="flex min-w-0 flex-col justify-end overflow-hidden text-white gap-8">
          {decisions.map((decision, index) => (
            <p
              key={decision}
              className="flex w-full items-start gap-3 font-light text-zinc-200 text-sm sm:text-base 2xl:text-lg leading-[1.7]"
            >
              <span className="shrink-0 leading-[1.7] text-gold-700 font-mono text-base 2xl:text-lg">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{decision}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
