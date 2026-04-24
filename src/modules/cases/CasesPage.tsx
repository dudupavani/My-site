import { ContactFooter } from "@/src/modules/home/sections/ContactFooter";
import { Badge } from "@/src/shared/ui";

// ---- Shared primitives ----

function Flare({ bottom }: { bottom?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div
        style={{
          position: "absolute",
          width: "80vw",
          height: "80vw",
          maxWidth: 900,
          maxHeight: 900,
          ...(bottom ? { bottom: "-40%", top: "auto" } : { top: "-30%" }),
          left: "50%",
          transform: "translateX(-50%)",
          background: bottom
            ? "radial-gradient(circle at 50% 50%, rgba(104,85,60,0.18), transparent 55%)"
            : "radial-gradient(circle at 50% 50%, rgba(153,134,99,0.14), transparent 55%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

function MegaNum({ num }: { num: string }) {
  return (
    <p
      aria-hidden="true"
      className="select-none font-thin -tracking-[0.08em] leading-[0.8] text-[180px] sm:text-[240px] md:text-[280px] lg:text-[300px] -mt-8"
      style={{
        background:
          "linear-gradient(180deg, rgba(153,134,99,0.35) 0%, rgba(153,134,99,0.02) 85%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {num}
    </p>
  );
}

function TagPills({
  tags,
}: {
  tags: { label: string; primary?: boolean }[];
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) =>
        tag.primary ? (
          <Badge
            key={tag.label}
            size="md"
            variant="gold-dark"
          >
            {tag.label}
          </Badge>
        ) : (
          <Badge
            key={tag.label}
            size="md"
            variant="gray-outline"
          >
            {tag.label}
          </Badge>
        )
      )}
    </div>
  );
}

function CaseTitle({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <h2 className="font-light -tracking-[0.025em] leading-[1.05]">
      <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
        {line1}
      </span>
      <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-zinc-500 mt-1">
        {line2}
      </span>
    </h2>
  );
}

function PhaseLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="text-lg font-semibold tracking-tight text-gold-500"
      >
        {label}
      </span>
      {sub && <span className="text-xs text-zinc-500">{sub}</span>}
    </div>
  );
}


function SectionDivider() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pb-0">
      <div className="flex items-center gap-6">
        <span className="block flex-1 h-px bg-linear-to-r from-transparent via-zinc-500 to-transparent" />
        <span className="block flex-1 h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent" />
      </div>
    </div>
  );
}

// ---- Page ----

export function CasesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header — mantido da aplicação */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pt-28 sm:pt-36 lg:pt-44 pb-8">
        <h1 className="-tracking-[0.02em] text-3xl leading-[1.3] text-white md:text-4xl lg:text-5xl">
          Cases
        </h1>
        <p className="mb-4 text-2xl -tracking-[0.02em] text-zinc-500">
          Projetos e resultados reais
        </p>
      </div>

      {/* ======== CASE 01 ======== */}
      <section id="case-01" className="relative overflow-hidden">
        <Flare bottom />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 py-24 sm:py-36 lg:py-32">
          {/* Header row: numeral esquerda, meta direita */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 sm:mb-24">
            <div className="md:col-span-3">
              <MegaNum num="01" />
            </div>
            <div className="md:col-span-9 flex flex-col justify-end pb-4">
              <TagPills
                tags={[
                  { label: "Retenção", primary: true },
                  { label: "Yungas Tecnologia" },
                  { label: "Product Lead" },
                ]}
              />
              <CaseTitle
                line1="Evolução de módulo"
                line2="crítico para evitar churn."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            <div className="lg:col-span-5 bg-linear-to-br from-zinc-700/40 via-zinc-900/50 to-zinc-900/80 border border-zinc-800 rounded-2xl md:rounded-3xl px-6 py-8 sm:p-10 md:p-12">
              <PhaseLabel label="Contexto" sub="01 / 03" />
              <p className="font-regular sm:font-light text-sm sm:text-lg leading-[1.7] text-zinc-300">
                Na Yungas, o módulo de checklist era mais simples do que o nível
                de exigência dos clientes que já utilizavam a plataforma. Havia
                um descompasso claro entre a complexidade da operação dessas
                redes e a maturidade do produto entregue.
              </p>
            </div>

            <div className="lg:col-span-7 bg-linear-to-br from-zinc-700/40 via-zinc-900/50 to-zinc-900/80 border border-zinc-800 rounded-2xl md:rounded-3xl px-6 py-8 sm:p-10 md:p-12">
              <PhaseLabel label="Desafio" sub="02 / 03" />
              <p className="font-regular sm:font-light text-sm sm:text-lg leading-[1.7] text-zinc-300">
                O risco era continuar operando com um módulo abaixo do esperado
                para grandes contas, gerando insatisfação e aumentando a chance
                de churn.
              </p>
            </div>

            <div className="lg:col-span-12 bg-linear-to-br from-zinc-700/40 via-zinc-900/50 to-zinc-900/80 border border-zinc-800 rounded-2xl md:rounded-3xl px-6 py-8 sm:p-10 md:p-14">
              <PhaseLabel label="Atuação" sub="03 / 03" />
              <p className="font-regular sm:font-light text-sm sm:text-lg leading-[1.7] text-zinc-300 max-w-4xl">
                Conduzi pesquisa de mercado, entrevistas com clientes e analisei
                as lacunas do produto em relação ao que o mercado já tratava
                como padrão. A partir disso, estruturei um plano de evolução.
                Como a visão completa não foi aprovada de uma só vez, transformei
                a estratégia em entregas menores, onde cada avanço pavimentava o
                próximo.
              </p>
            </div>
          </div>

          <div className="relative mt-8 sm:mt-10 p-10 sm:p-14 md:p-20 border border-gold-800 bg-linear-to-br from-zinc-700/60 via-zinc-950/80 to-zinc-900/30 backdrop-blur-sm rounded-2xl">
            <span className="block text-4xl font-light tracking-tight text-gold-500 mb-8">Resultado</span>
            <blockquote className="font-light text-xl sm:text-2xl leading-[1.6] text-white/90 max-w-5xl">
              Ao longo de poucos meses, o módulo evoluiu de forma consistente até
              atingir um novo patamar. O produto ficou{" "}
              <span className="text-gold-400 font-semibold">
                cerca de um ano sem solicitações de melhorias relevantes
              </span>{" "}
              nessa frente, reduzindo um risco que eu já identificava como
              importante para a retenção.
            </blockquote>
            <div className="mt-12 pt-8 border-t border-zinc-800/60 grid grid-cols-3 gap-4 sm:gap-8">
              <div>
                <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">~12<span className="text-gold-500">mo</span></p>
                <p className="text-sm text-zinc-400 mt-2">sem reclamações</p>
              </div>
              <div>
                <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">↓<span className="text-gold-500"> churn</span></p>
                <p className="text-sm text-zinc-400 mt-2">risco reduzido</p>
              </div>
              <div>
                <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">+<span className="text-gold-500">nível</span></p>
                <p className="text-sm text-zinc-400 mt-2">novo patamar de produto</p>
              </div>
            </div>
          </div>
        </div>

        <SectionDivider />
      </section>

      {/* ======== CASE 02 ======== */}
      <section id="case-02" className="relative overflow-hidden">
        <Flare />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 py-24 sm:py-36 lg:py-48">
          {/* Header row: meta esquerda, numeral direita (invertido) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 sm:mb-24">
            <div className="md:col-span-8 flex flex-col justify-end pb-4 md:text-right md:items-end">
              <TagPills
                tags={[
                  { label: "Receita", primary: true },
                  { label: "Yungas Tecnologia" },
                  { label: "End-to-end" },
                ]}
              />
              <CaseTitle
                line1="Criação do módulo"
                line2="que destravou vendas."
              />
            </div>
            <div className="md:col-span-4">
              <MegaNum num="02" />
            </div>
          </div>

          {/* Asymmetric story grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            <div className="lg:col-span-6 bg-linear-to-br from-zinc-700/40 via-zinc-900/50 to-zinc-900/80 border border-zinc-800 rounded-2xl md:rounded-3xl px-6 py-8 sm:p-10 md:p-12">
              <PhaseLabel label="Contexto" />
              <p className="font-regular sm:font-light text-sm sm:text-lg leading-[1.7] text-zinc-300">
                Na relação com o time comercial da Yungas, percebi que a
                ausência de um módulo de edição de artes impactava diretamente a
                capacidade de fechar novas vendas.
              </p>
            </div>

            <div className="lg:col-span-6 bg-linear-to-br from-zinc-700/40 via-zinc-900/50 to-zinc-900/80 border border-zinc-800 rounded-2xl md:rounded-3xl px-6 py-8 sm:p-10 md:p-12">
              <PhaseLabel label="Desafio" />
              <p className="font-regular sm:font-light text-sm sm:text-lg leading-[1.7] text-zinc-300">
                A empresa perdia competitividade em situações onde o cliente
                precisava de uma solução que permitisse adaptar materiais com
                flexibilidade, mantendo consistência visual e operacional.
              </p>
            </div>

            <div className="lg:col-span-12 bg-linear-to-br from-zinc-700/40 via-zinc-900/50 to-zinc-900/80 border border-zinc-800 rounded-2xl md:rounded-3xl px-6 py-8 sm:p-10 md:p-14">
              <PhaseLabel label="Atuação ponta a ponta" />
              <p className="font-regular sm:font-light text-sm sm:text-lg leading-[1.7] text-zinc-300 max-w-4xl">
                Assumi o projeto de ponta a ponta. Fiz pesquisa de mercado,
                entrevistas com clientes, definição da solução, concepção do
                produto, criação das telas, especificação para desenvolvimento,
                estruturação da sprint, acompanhamento das entregas e apoio no
                lançamento. Também atuei na comunicação com clientes e no
                suporte à adoção junto ao time de CS.
              </p>
              
              {/* Pipeline chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-10">
                {["Pesquisa", "Solução", "Concepção", "Delivery", "Lançamento"].map(
                  (step, i) => (
                    <div key={step} className="bg-zinc-800 rounded-xl p-4">
                      <span className="text-sm tracking-[0.2em] text-zinc-500">
                        0{i + 1}
                      </span>
                      <p className="text-base text-zinc-200 mt-1">{step}</p>
                    </div>
                  )
                )}
              </div>

            </div>
          </div>

          <div className="relative mt-8 sm:mt-10 p-10 sm:p-14 md:p-20 border border-gold-800 bg-linear-to-br from-zinc-700/60 via-zinc-950/80 to-zinc-900/30 backdrop-blur-sm rounded-2xl">
            <span className="block text-4xl font-light tracking-tight text-gold-500 mb-8">Resultado</span>
            <blockquote className="font-light text-xl sm:text-2xl leading-[1.6] text-white/90 max-w-5xl">
              O módulo teve{" "}
              <span className="text-gold-500">adoção rápida</span>, poucos
              problemas na entrada em operação e boa recepção por parte dos
              clientes. Além de atender uma demanda real do mercado, o produto
              ajudou a reduzir uma{" "}
              <span className="text-gold-500">barreira comercial importante</span>.
            </blockquote>
            <div className="mt-12 pt-8 border-t border-zinc-800/60 grid grid-cols-3 gap-4 sm:gap-8">
              <div>
                <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">↑<span className="text-gold-500"> vendas</span></p>
                <p className="text-sm text-zinc-400 mt-2">barreira removida</p>
              </div>
              <div>
                <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">rápida<span className="text-gold-500">.</span></p>
                <p className="text-sm text-zinc-400 mt-2">adoção pelos clientes</p>
              </div>
              <div>
                <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">e2e<span className="text-gold-500">.</span></p>
                <p className="text-sm text-zinc-400 mt-2">pesquisa → lançamento</p>
              </div>
            </div>
          </div>
        </div>

        <SectionDivider />
      </section>

      {/* ======== CASE 03 ======== */}
      <section id="case-03" className="relative overflow-hidden">
        <Flare bottom />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 py-24 sm:py-36 lg:py-48">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 sm:mb-24">
            <div className="md:col-span-4">
              <MegaNum num="03" />
            </div>
            <div className="md:col-span-8 flex flex-col justify-end pb-4">
              <TagPills
                tags={[
                  { label: "Operação", primary: true },
                  { label: "EdTech · Alemanha" },
                  { label: "Turnaround" },
                ]}
              />
              <CaseTitle
                line1="Estruturação de processos para destravar"
                line2="operação em EdTech Alemã."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mb-10">
            <div className="lg:col-span-6 bg-linear-to-br from-zinc-700/40 via-zinc-900/50 to-zinc-900/80 border border-zinc-800 rounded-2xl md:rounded-3xl px-6 py-8 sm:p-10 md:p-12">
              <PhaseLabel label="Contexto" sub="01 / 03" />
              <p className="font-regular sm:font-light text-sm sm:text-lg leading-[1.7] text-zinc-300">
                Fui chamado para atuar em uma EdTech da Alemanha que enfrentava
                desorganização entre founders, designers e desenvolvedores.
                Havia retrabalho, prioridades instáveis e dificuldade para
                transformar visão em entregas consistentes.
              </p>
            </div>

            <div className="lg:col-span-6 bg-linear-to-br from-zinc-700/40 via-zinc-900/50 to-zinc-900/80 border border-zinc-800 rounded-2xl md:rounded-3xl px-6 py-8 sm:p-10 md:p-12">
              <PhaseLabel label="Desafio" sub="02 / 03" />
              <p className="font-regular sm:font-light text-sm sm:text-lg leading-[1.7] text-zinc-300">
                O time produzia sem direção clara, o material chegava
                desorganizado para desenvolvimento e a operação do produto não
                conseguia sustentar ritmo nem coerência.
              </p>
            </div>

            <div className="lg:col-span-12 bg-linear-to-br from-zinc-700/40 via-zinc-900/50 to-zinc-900/80 border border-zinc-800 rounded-2xl md:rounded-3xl px-6 py-8 sm:p-10 md:p-14">
              <PhaseLabel label="Atuação" sub="03 / 03" />
              <p className="font-regular sm:font-light text-sm sm:text-lg leading-[1.7] text-zinc-300 max-w-4xl">
                Comecei ouvindo fundadores, designers e programadores para
                entender o cenário completo. A partir disso, organizei a visão
                do produto, defini a estratégia para chegar até ela e criei um
                plano tático. Também passei a direcionar melhor o trabalho de
                design e a organizar a sprint por objetivos conectados, e não
                por tarefas isoladas.
              </p>
            </div>
          </div>

          <div className="relative mt-8 sm:mt-10 p-10 sm:p-14 md:p-20 border border-gold-800 bg-linear-to-br from-zinc-700/60 via-zinc-950/80 to-zinc-900/30 backdrop-blur-sm rounded-2xl">
            <span className="block text-4xl font-light tracking-tight text-gold-500 mb-8">Resultado</span>
            <blockquote className="font-light text-xl sm:text-2xl leading-[1.6] text-white/90 max-w-5xl">
              Em poucos meses, a operação começou a ganhar consistência. {" "}
              <span className="text-gold-500 font-semibold">Em nove meses, o time entregou três plataformas e colocou seis clientes em andamento</span>{" "}
              em um contexto que antes era marcado por desorganização e baixa
              capacidade de avanço.
            </blockquote>
            <div className="mt-12 pt-8 border-t border-zinc-800/60 grid grid-cols-3 gap-4 sm:gap-8">
              <div>
                <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">9<span className="text-gold-500">mo</span></p>
                <p className="text-sm text-zinc-400 mt-2">para reorganizar</p>
              </div>
              <div>
                <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">3<span className="text-gold-500">×</span></p>
                <p className="text-sm text-zinc-400 mt-2">plataformas entregues</p>
              </div>
              <div>
                <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">6<span className="text-gold-500">+</span></p>
                <p className="text-sm text-zinc-400 mt-2">clientes em operação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== CTA FINAL ======== */}
      <section className="relative overflow-hidden border-t border-zinc-900">
        <Flare />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 py-24 sm:pt-16 sm:pb-32 text-center">
          <h3 className="font-thin -tracking-[0.03em] text-4xl sm:text-4xl md:text-5xl text-white leading-[1.05] max-w-4xl mx-auto">
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
