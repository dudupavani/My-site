import { ContactFooter } from "@/src/modules/home/sections/ContactFooter";

type Case = {
  id: string;
  title: string;
  contexto: string;
  desafio: string;
  atuacao: string;
  resultado: string;
};

const cases: Case[] = [
  {
    id: "01",
    title: "Evolução de módulo crítico para evitar churn",
    contexto:
      "Na Yungas, o módulo de checklist era mais simples do que o nível de exigência dos clientes que já utilizavam a plataforma. Havia um descompasso claro entre a complexidade da operação dessas redes e a maturidade do produto entregue.",
    desafio:
      "O risco era continuar operando com um módulo abaixo do esperado para grandes contas, gerando insatisfação e aumentando a chance de churn.",
    atuacao:
      "Conduzi pesquisa de mercado, entrevistas com clientes e analisei as lacunas do produto em relação ao que o mercado já tratava como padrão. A partir disso, estruturei um plano de evolução. Como a visão completa não foi aprovada de uma só vez, transformei a estratégia em entregas menores, onde cada avanço pavimentava o próximo.",
    resultado:
      "Ao longo de seis a oito meses, o módulo evoluiu de forma consistente até atingir um novo patamar. O produto ficou cerca de um ano sem reclamações relevantes e sem pedidos de novas funcionalidades nessa frente, reduzindo um risco que eu já identificava como importante para a retenção.",
  },
  {
    id: "02",
    title: "Criação de módulo que ajudou a destravar vendas",
    contexto:
      "Na relação com o time comercial da Yungas, percebi que a ausência de um módulo de edição de artes impactava diretamente a capacidade de fechar novas vendas.",
    desafio:
      "A empresa perdia competitividade em situações onde o cliente precisava de uma solução que permitisse adaptar materiais com flexibilidade, mantendo consistência visual e operacional.",
    atuacao:
      "Assumi o projeto de ponta a ponta. Fiz pesquisa de mercado, entrevistas com clientes, definição da solução, concepção do produto, criação das telas, especificação para desenvolvimento, estruturação da sprint, acompanhamento das entregas e apoio no lançamento. Também atuei na comunicação com clientes e no suporte à adoção junto ao time de CS.",
    resultado:
      "O módulo teve adoção rápida, poucos problemas na entrada em operação e boa recepção por parte dos clientes. Além de atender uma demanda real do mercado, o produto ajudou a reduzir uma barreira comercial importante.",
  },
  {
    id: "03",
    title: "Estruturação de produto e operação em empresa alemã",
    contexto:
      "Fui chamado para atuar em uma EdTech da Alemanha que enfrentava desorganização entre founders, designers e desenvolvedores. Havia retrabalho, prioridades instáveis e dificuldade para transformar visão em entregas consistentes.",
    desafio:
      "O time produzia sem direção clara, o material chegava desorganizado para desenvolvimento e a operação do produto não conseguia sustentar ritmo nem coerência.",
    atuacao:
      "Comecei ouvindo fundadores, designers e programadores para entender o cenário completo. A partir disso, organizei a visão do produto, defini a estratégia para chegar até ela e criei um plano tático. Também passei a direcionar melhor o trabalho de design e a organizar a sprint por objetivos conectados, e não por tarefas isoladas.",
    resultado:
      "Em poucos meses, a operação começou a ganhar consistência. Em nove meses, o time entregou três plataformas e colocou seis clientes em andamento, em um contexto que antes era marcado por desorganização e baixa capacidade de avanço.",
  },
];

export function CasesPage() {
  return (
    <div className="min-h-screen bg-stone-900 text-white">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pt-28 sm:pt-36 lg:pt-44 pb-16 md:pb-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.6em] text-stone-500">
          Cases
        </p>
        <h1 className="-tracking-[0.02em] text-3xl font-semibold leading-[1.3] text-white md:text-4xl lg:text-5xl">
          Projetos e resultados reais
        </h1>
      </div>

      {/* Cases */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pb-24">
        <div className="divide-y divide-stone-800">
          {cases.map((c) => (
            <article key={c.id} className="py-16 md:py-24">
              {/* Number + Title */}
              <div className="mb-10 md:mb-14">
                <p
                  aria-hidden="true"
                  className="select-none font-extralight leading-none text-[#998663]/[0.12] text-[72px] md:text-[96px] -mb-5 md:-mb-7"
                >
                  {c.id}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white leading-snug -tracking-[0.01em]">
                  {c.title}
                </h2>
              </div>

              {/* Contexto + Desafio + Atuação — 3 colunas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.5em] text-stone-500 mb-3">
                    Contexto
                  </p>
                  <p className="text-sm text-stone-400 leading-[1.8]">
                    {c.contexto}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.5em] text-stone-500 mb-3">
                    Desafio
                  </p>
                  <p className="text-sm text-stone-400 leading-[1.8]">
                    {c.desafio}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.5em] text-stone-500 mb-3">
                    Atuação
                  </p>
                  <p className="text-sm text-stone-400 leading-[1.8]">
                    {c.atuacao}
                  </p>
                </div>
              </div>

              {/* Resultado — bloco destacado */}
              <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 px-6 py-6 md:px-8 md:py-7">
                <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#998663] mb-3">
                  Resultado
                </p>
                <p className="text-base text-white/80 leading-[1.8]">
                  {c.resultado}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
