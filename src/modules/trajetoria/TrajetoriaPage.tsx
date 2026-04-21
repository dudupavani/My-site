import { ContactFooter } from "@/src/modules/home/sections/ContactFooter";

const entries = [
  {
    id: "01",
    title: "Início",
    body: "Comecei a trabalhar aos 14 anos, ajudando minha família em uma gráfica. Foi ali que tive meu primeiro contato com responsabilidade, prazo, entrega e trabalho real.",
  },
  {
    id: "02",
    title: "Formação e entrada no digital",
    body: "Durante a graduação em Desenho Industrial, comecei a migrar para o universo digital e tive meus primeiros trabalhos com criação de sites. Depois, aprofundei essa base com uma pós-graduação em Design de Hipermídia.",
  },
  {
    id: "03",
    title: "Projetos web de maior porte",
    body: "Em Curitiba, entrei no mercado profissional de aplicações web na GoToAndPlay, atuando em projetos para marcas como Mercedes, BMW, grandes shoppings e O Boticário. Foi meu primeiro contato com entregas digitais de maior escala e exigência.",
  },
  {
    id: "04",
    title: "Empreendedorismo em software",
    body: "Na sequência, fundei a MG Interativa, empresa de software e sites. Assumi projetos como os sites da prefeitura de Chapecó e trabalhos para a Unochapecó. Nesse período, também desenvolvi experiências com realidade aumentada em um momento ainda muito inicial dessa tecnologia no mercado.",
  },
  {
    id: "05",
    title: "Construção de negócio e liderança",
    body: "Depois, fui para Florianópolis para cofundar a agência Lump, onde atuei por sete anos como sócio e diretor criativo. Essa fase ampliou minha experiência em cliente, posicionamento, operação, gestão de equipe e direção de projetos.",
  },
  {
    id: "06",
    title: "Transição para produto em tecnologia",
    body: "Mais tarde, fiz a migração definitiva para o setor de tecnologia. Entrei na Yungas pela porta de UX e UI, mas ampliei minha atuação até assumir papel relevante na concepção de produto, na definição de caminhos e na participação das discussões estratégicas com o board.",
  },
  {
    id: "07",
    title: "Impacto da minha atuação em grandes marcas",
    body: "Na Yungas, atuei na evolução de soluções voltadas a grandes redes e operações de alta complexidade. Meu trabalho contribuiu diretamente para produtos utilizados por empresas como Subway, Burger King, CNA Idiomas, Grupo O Boticário, Casa do Pão de Queijo e OdontoCompany, entre outras.",
  },
  {
    id: "08",
    title: "Estruturação de produto em empresa internacional",
    body: "Também fui chamado para atuar em uma EdTech da Alemanha em um cenário de desorganização de produto e operação. Entrei para organizar visão, estratégia, prioridades e execução. Em nove meses, o time entregou três plataformas e colocou clientes em operação. Depois, fui convidado novamente para atuar em um novo contexto mais complexo.",
  },
  {
    id: "09",
    title: "Multiagentes com IA",
    body: "Há algum tempo, venho desenvolvendo projetos próprios com automação, agentes e multiagentes de IA aplicados à curadoria de conteúdo, ao atendimento via WhatsApp, à criação automatizada de artigos e também a fluxos de apoio comercial. Entre esses projetos, criei um agente para agilizar o trabalho do setor de pré-vendas, retomando leads antigos a partir da análise do histórico de interações e da geração de resumos estratégicos para orientar a atuação do profissional.",
    current: true,
  },
];

export function TrajetoriaPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pt-28 sm:pt-36 lg:pt-44 pb-16 md:pb-16">
        <h1 className="-tracking-[0.02em] text-3xl font-medium text-center leading-[1.3] text-zinc-600 md:text-4xl 2xl:text-5xl">
          Trajetória
        </h1>
      </div>

      {/* Timeline */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pb-24">
        {/* Vertical line: left on mobile, centered on desktop */}
        <div className="absolute top-0 bottom-0 left-7.5 w-px bg-zinc-800 sm:left-9 md:left-1/2" />

        <ol>
          {entries.map((entry, index) => {
            const isLeft = index % 2 === 0;
            return (
              <li
                key={entry.id}
                className={[
                  "relative pb-12 md:pb-20",
                  "pl-14 sm:pl-16 md:pl-0",
                  isLeft
                    ? "md:pr-[calc(50%+3rem)] md:text-right"
                    : "md:pl-[calc(50%+3rem)]",
                ].join(" ")}
              >
                {/* Dot */}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute z-10 block rounded-full",
                    "h-3.5 w-3.5",
                    "left-0 top-12.5 sm:left-0",
                    "md:left-1/2 md:top-19 md:-translate-x-1/2",
                    entry.current ? "bg-white animate-pulse" : "bg-[#998663]",
                    "shadow-[0_0_0_5px_#1c1917]",
                  ].join(" ")}
                />

                {/* Decorative number */}
                <p
                  aria-hidden="true"
                  className="select-none font-extralight leading-none text-[#998663]/12 text-[72px] md:text-[96px] -mb-5 md:-mb-7"
                >
                  {entry.id}
                </p>

                {/* Title */}
                <h2 className="mb-3 text-xl font-medium leading-snug text-white md:text-2xl">
                  {entry.title}
                  {entry.current && (
                    <span className="ml-2 align-middle inline-block text-xs font-medium uppercase tracking-widest text-zinc-500 md:block md:mt-1 md:ml-0">
                      agora
                    </span>
                  )}
                </h2>

                {/* Body */}
                <p className="text-base md:text-lg leading-[1.8] text-zinc-400">
                  {entry.body}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      <ContactFooter />
    </div>
  );
}
