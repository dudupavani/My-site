export function DecisionSection() {
  return (
    <section className="relative overflow-hidden bg-[#030305] text-white px-2 pt-80 pb-20 md:py-24 lg:py-36 ">
      <div className="absolute inset-0 mx-auto z-0 w-full sm:w-[70%] opacity-60">
        <img
          src="/images/bg-front-02.webp"
          alt=""
          className="w-full h-full object-contain md:object-cover object-top sm:object-center"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-zinc-950/80" /> */}
      </div>

      <div className="relative z-10 max-w-400 mx-auto grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-7 gap-12 md:gap-20 lg:gap-32 2xl:gap-40 rounded-2xl px-6 py-12 sm:p-10 md:p-16 lg:p-20 xl:p-24 border border-gold-800 items-stretch backdrop-blur-sm bg-zinc-900/20">
        <div className="flex flex-col justify-between gap-4 sm:gap-8 col-span-1 2xl:col-span-3">
          <h2 className="text-4xl xl:text-5xl 2xl:text-7xl font-extralight leading-[1.2] tracking-tight">
            Experiência e responsabilidade real
          </h2>
          <p className="mt-auto text-gold-600 text-lg leading-relaxed">
            Ao longo de mais de 20 anos atuei em múltiplos contextos
          </p>
        </div>

        <div className="flex flex-col gap-8 text-zinc-300 text-sm lg:text-base leading-relaxed col-span-2 2xl:col-span-4">
          <p>
            Fundei duas empresas: uma de software e sites e outra de propaganda,
            branding e design, com atuação direta em negócio, gestão de equipe,
            relacionamento com clientes e entregas.
          </p>
          <p>
            Liderei produto em uma startup Alemã de EdTech, estruturando a visão
            com os founders e a estratégia de execução com a liderança de engenharia.
          </p>
          <p>
            Hoje, na Yungas Tecnologia, faço parte do comitê de produto com os
            founders e conduzo a concepção e os direcionamentos estratégicos de
            execução.
          </p>
          <p>
            Meu trabalho impacta operações de grande porte, com marcas como
            Burger King, Subway, Bob&apos;s, CNA Idiomas, Omar, entre outras.
          </p>
          <p>
            Minha experiência foi construída entre empreendedorismo, liderança
            criativa e direção de produto, em empresas de software com desafios
            reais de operação e crescimento.
          </p>
        </div>
      </div>
    </section>
  );
}
