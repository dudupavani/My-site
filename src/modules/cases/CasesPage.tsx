import { ContactFooter } from "@/src/modules/home/sections/ContactFooter";
import { Badge } from "@/src/shared/ui";

export function CasesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 pt-28 sm:px-8 sm:pt-36 lg:px-16 lg:pt-44">
        <h1 className="-tracking-[0.02em] text-3xl leading-[1.3] text-white md:text-4xl lg:text-5xl">
          Cases
        </h1>
        <p className="mb-4 text-2xl -tracking-[0.02em] text-zinc-500">
          Projetos e resultados reais
        </p>
      </div>

      <section id="case-01" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute bottom-[-40%] left-1/2 h-[80vw] max-h-225 w-[80vw] max-w-225 -translate-x-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(104,85,60,0.18),transparent_55%)] blur-[60px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-36 lg:px-16 lg:py-32">
          <div className="mb-10 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p
                aria-hidden="true"
                className="mt-8 select-none bg-[linear-gradient(180deg,rgba(153,134,99,0.35)_0%,rgba(153,134,99,0.02)_85%)] bg-clip-text text-[100px] font-thin leading-[0.8] -tracking-[0.08em] text-transparent sm:text-[240px] md:text-[280px] lg:text-[240px]"
              >
                01
              </p>
            </div>
            <div className="flex flex-col justify-end pb-4 md:col-span-9">
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge size="md" variant="gold-dark">
                  Retenção
                </Badge>
              </div>
              <h2 className="font-light leading-[1.05] -tracking-[0.025em]">
                <span className="block text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Evolução de módulo
                </span>
                <span className="mt-1 block text-3xl text-zinc-500 sm:text-4xl md:text-5xl lg:text-6xl">
                  crítico para evitar churn.
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1  lg:grid-cols-12">
            <div className="border border-zinc-800 px-6 py-8 sm:p-10 rounded-2xl md:rounded-3xl md:p-12 lg:col-span-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  Contexto
                </span>
              </div>
              <p className="text-base leading-[1.7] text-zinc-400 sm:text-lg">
                Na Yungas, o módulo de checklist era mais simples do que o nível
                de exigência dos clientes que já utilizavam a plataforma. Havia
                um descompasso claro entre a complexidade da operação dessas
                redes e a maturidade do produto entregue.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800  px-6 py-8 sm:p-10 md:rounded-3xl md:p-12 lg:col-span-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  Desafio
                </span>
              </div>
              <p className="text-base leading-[1.7] text-zinc-400 sm:text-lg">
                O risco era continuar operando com um módulo abaixo do esperado
                para grandes contas, gerando insatisfação e aumentando a chance
                de churn.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 px-6 py-8 sm:p-10 md:rounded-3xl md:p-12 lg:col-span-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  Atuação
                </span>
              </div>
              <p className="text-base leading-[1.7] text-zinc-400 sm:text-lg">
                Conduzi pesquisa de mercado, entrevistas com clientes e analisei
                as lacunas do produto em relação ao que o mercado já tratava
                como padrão. A partir disso, estruturei um plano de evolução.
                Como a visão completa não foi aprovada de uma só vez,
                transformei a estratégia em entregas menores, onde cada avanço
                pavimentava o próximo.
              </p>
            </div>
          </div>

          <div className="relative mt-8 rounded-2xl border border-gold-800 px-6 py-8 backdrop-blur-sm sm:mt-10 sm:p-14 md:p-20">
            <span className="mb-8 block text-2xl font-medium tracking-tight text-gold-500 sm:text-4xl">
              Resultado
            </span>
            <div className="max-w-5xl text-lg font-light leading-[1.6] text-white/90 sm:text-2xl">
              Ao longo de poucos meses, o módulo evoluiu de forma consistente
              até atingir um novo patamar. O produto ficou cerca de um ano sem
              solicitações de melhorias relevantes nessa frente, reduzindo um
              risco que eu já identificava como importante para a retenção.
            </div>
          </div>
        </div>

      </section>

      <section id="case-02" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-[-30%] h-[80vw] max-h-225 w-[80vw] max-w-225 -translate-x-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(153,134,99,0.14),transparent_55%)] blur-[60px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-36 lg:px-16 lg:py-32">
          <div className="mb-10 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12 md:gap-12">
            <div className="block md:hidden">
              <p
                aria-hidden="true"
                className="mt-8 select-none bg-[linear-gradient(180deg,rgba(153,134,99,0.35)_0%,rgba(153,134,99,0.02)_85%)] bg-clip-text text-[100px] font-thin leading-[0.8] -tracking-[0.08em] text-transparent sm:text-[240px] md:text-[280px] lg:text-[240px]">
                02
              </p>
            </div>
            <div className="flex flex-col justify-end pb-4 md:col-span-8 md:items-end md:text-right">
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge size="md" variant="gold-dark">
                  Receita
                </Badge>
                <Badge size="md" variant="gray-outline">
                  End-to-end
                </Badge>
              </div>
              <h2 className="font-light leading-[1.05] -tracking-[0.025em]">
                <span className="block text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Criação do módulo
                </span>
                <span className="mt-1 block text-3xl text-zinc-500 sm:text-4xl md:text-5xl lg:text-6xl">
                  que destravou vendas.
                </span>
              </h2>
            </div>
            <div className="hidden md:block md:col-span-4">
              <p
                aria-hidden="true"
                className="mt-8 select-none bg-[linear-gradient(180deg,rgba(153,134,99,0.35)_0%,rgba(153,134,99,0.02)_85%)] bg-clip-text text-[100px] font-thin leading-[0.8] -tracking-[0.08em] text-transparent sm:text-[240px] md:text-[280px] lg:text-[240px]"
              >
                02
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="rounded-2xl border border-zinc-800 px-6 py-8 sm:p-10 md:rounded-3xl md:p-12 lg:col-span-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  Contexto
                </span>
              </div>
              <p className="text-base leading-[1.7] text-zinc-400 sm:text-lg">
                Na relação com o time comercial da Yungas, percebi que a
                ausência de um módulo de edição de artes impactava diretamente a
                capacidade de fechar novas vendas.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 px-6 py-8 sm:p-10 md:rounded-3xl md:p-12 lg:col-span-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  Desafio
                </span>
              </div>
              <p className="text-base leading-[1.7] text-zinc-400  sm:text-lg">
                A empresa perdia competitividade em situações onde o cliente
                precisava de uma solução que permitisse adaptar materiais com
                flexibilidade, mantendo consistência visual e operacional.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 px-6 py-8 sm:p-10 md:rounded-3xl md:p-12 lg:col-span-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  Atuação ponta a ponta
                </span>
              </div>
              <p className="text-base leading-[1.7] text-zinc-400 sm:text-lg">
                Assumi o projeto de ponta a ponta. Fiz pesquisa de mercado,
                entrevistas com clientes, definição da solução, concepção do
                produto, criação das telas, especificação para desenvolvimento,
                estruturação da sprint, acompanhamento das entregas e apoio no
                lançamento. Também atuei na comunicação com clientes e no
                suporte à adoção junto ao time de CS.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                <div className="rounded-xl bg-zinc-900 p-4">
                  <span className="text-sm tracking-[0.2em] text-zinc-500">
                    01
                  </span>
                  <p className="mt-1 text-base text-zinc-200">Pesquisa</p>
                </div>
                <div className="rounded-xl bg-zinc-900 p-4">
                  <span className="text-sm tracking-[0.2em] text-zinc-500">
                    02
                  </span>
                  <p className="mt-1 text-base text-zinc-200">Solução</p>
                </div>
                <div className="rounded-xl bg-zinc-900 p-4">
                  <span className="text-sm tracking-[0.2em] text-zinc-500">
                    03
                  </span>
                  <p className="mt-1 text-base text-zinc-200">Concepção</p>
                </div>
                <div className="rounded-xl bg-zinc-900 p-4">
                  <span className="text-sm tracking-[0.2em] text-zinc-500">
                    04
                  </span>
                  <p className="mt-1 text-base text-zinc-200">Delivery</p>
                </div>
                <div className="rounded-xl bg-zinc-900 p-4">
                  <span className="text-sm tracking-[0.2em] text-zinc-500">
                    05
                  </span>
                  <p className="mt-1 text-base text-zinc-200">Lançamento</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 rounded-2xl border border-gold-800 px-6 py-8 backdrop-blur-sm sm:mt-10 sm:p-14 md:p-20">
            <span className="mb-8 block text-2xl font-medium tracking-tight text-gold-500 sm:text-4xl">
              Resultado
            </span>
            <div className="max-w-5xl text-lg font-light leading-[1.6] text-white/90 sm:text-2xl">
              O módulo teve adoção rápida, poucos problemas na entrada em
              operação e boa recepção por parte dos clientes. Além de atender
              uma demanda real do mercado, o produto ajudou a reduzir uma
              barreira comercial importante.
            </div>
          </div>
        </div>

      </section>

      <section id="case-03" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute bottom-[-40%] left-1/2 h-[80vw] max-h-225 w-[80vw] max-w-225 -translate-x-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(104,85,60,0.18),transparent_55%)] blur-[60px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-36 lg:px-16 lg:py-32">
          <div className="mb-10 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p
                aria-hidden="true"
                className="mt-8 select-none bg-[linear-gradient(180deg,rgba(153,134,99,0.35)_0%,rgba(153,134,99,0.02)_85%)] bg-clip-text text-[100px] font-thin leading-[0.8] -tracking-[0.08em] text-transparent sm:text-[240px] md:text-[280px] lg:text-[240px]"
              >
                03
              </p>
            </div>
            <div className="flex flex-col justify-end pb-4 md:col-span-8">
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge size="md" variant="gold-dark">
                  Operação
                </Badge>
              </div>
              <h2 className="font-light leading-[1.05] -tracking-[0.025em]">
                <span className="block text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Estruturação de processos para destravar
                </span>
                <span className="mt-1 block text-3xl text-zinc-500 sm:text-4xl md:text-5xl lg:text-6xl">
                  operação em EdTech Alemã.
                </span>
              </h2>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 lg:grid-cols-12">
            <div className="rounded-2xl border border-zinc-800 px-6 py-8 sm:p-10 md:rounded-3xl md:p-12 lg:col-span-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  Contexto
                </span>
              </div>
              <p className="text-base leading-[1.7] text-zinc-400 sm:text-lg">
                Fui chamado para atuar em uma EdTech da Alemanha que enfrentava
                desorganização entre founders, designers e desenvolvedores.
                Havia retrabalho, prioridades instáveis e dificuldade para
                transformar visão em entregas consistentes.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 px-6 py-8 sm:p-10 md:rounded-3xl md:p-12 lg:col-span-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  Desafio
                </span>
              </div>
              <p className="text-sm leading-[1.7] text-zinc-400 sm:text-lg">
                O time produzia sem direção clara, o material chegava
                desorganizado para desenvolvimento e a operação do produto não
                conseguia sustentar ritmo nem coerência.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 px-6 py-8 sm:p-10 md:rounded-3xl md:p-12 lg:col-span-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
                  Atuação
                </span>
              </div>
              <p className="text-base leading-[1.7] text-zinc-400 sm:text-lg">
                Comecei ouvindo fundadores, designers e programadores para
                entender o cenário completo. A partir disso, organizei a visão
                do produto, defini a estratégia para chegar até ela e criei um
                plano tático. Também passei a direcionar melhor o trabalho de
                design e a organizar a sprint por objetivos conectados, e não
                por tarefas isoladas.
              </p>
            </div>
          </div>

          <div className="relative mt-8 rounded-2xl border border-gold-800 px-6 py-8 backdrop-blur-sm sm:mt-10 sm:p-14 md:p-20">
            <span className="mb-8 block text-2xl font-medium tracking-tight text-gold-500 sm:text-4xl">
              Resultado
            </span>
            <div className="max-w-5xl text-lg font-light leading-[1.6] text-white sm:text-2xl">
              Em poucos meses, a operação começou a ganhar consistência. Em nove
              meses, o time entregou três plataformas e colocou seis clientes em
              andamento em um contexto que antes era marcado por desorganização
              e baixa capacidade de avanço.
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-[-30%] h-[80vw] max-h-225 w-[80vw] max-w-225 -translate-x-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(153,134,99,0.14),transparent_55%)] blur-[60px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center sm:px-8 sm:pt-16 sm:pb-32 lg:px-16">
          <h3 className="mx-auto max-w-4xl text-4xl font-thin leading-[1.05] text-white -tracking-[0.03em] sm:text-4xl md:text-5xl">
            Cases contam pedaços da história
            <br />
            <span className="text-zinc-500">que continuo construindo</span>
          </h3>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
