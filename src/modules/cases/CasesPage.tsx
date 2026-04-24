import type { CSSProperties, ReactNode } from "react";
import { ContactFooter } from "@/src/modules/home/sections/ContactFooter";

const BRONZE = "#998663";

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
      className="select-none font-thin -tracking-[0.08em] leading-[0.8] text-[180px] sm:text-[240px] md:text-[280px] lg:text-[340px] -mt-8"
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
          <span
            key={tag.label}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase rounded-full border"
            style={{ color: BRONZE, borderColor: "rgba(153,134,99,0.3)" }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: BRONZE }}
            />
            {tag.label}
          </span>
        ) : (
          <span
            key={tag.label}
            className="inline-flex items-center px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase text-zinc-500 border border-zinc-800 rounded-full"
          >
            {tag.label}
          </span>
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
    <div className="flex items-center gap-3 mb-8">
      <span
        className="text-[11px] tracking-[0.32em] uppercase font-medium"
        style={{ color: BRONZE }}
      >
        {label}
      </span>
      {sub && <span className="text-[10px] text-zinc-700">{sub}</span>}
    </div>
  );
}

function ResultadoBlock({
  children,
  metrics,
}: {
  children: ReactNode;
  metrics: { value: string; accent: string; label: string }[];
}) {
  const tickStyle = (
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
  ): CSSProperties => ({
    position: "absolute",
    width: 14,
    height: 14,
    top: top ?? "auto",
    bottom: bottom ?? "auto",
    left: left ?? "auto",
    right: right ?? "auto",
    borderTop: top !== undefined ? "1px solid rgba(153,134,99,0.4)" : undefined,
    borderBottom: bottom !== undefined ? "1px solid rgba(153,134,99,0.4)" : undefined,
    borderLeft: left !== undefined ? "1px solid rgba(153,134,99,0.4)" : undefined,
    borderRight: right !== undefined ? "1px solid rgba(153,134,99,0.4)" : undefined,
  });

  return (
    <div
      className="relative mt-8 sm:mt-10 p-10 sm:p-14 md:p-20 bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-zinc-900/30 backdrop-blur-sm"
      style={{
        borderRadius: 28,
        border: "1px solid rgba(153,134,99,0.3)",
      }}
    >
      <span aria-hidden="true" style={tickStyle(-1, undefined, -1, undefined)} />
      <span aria-hidden="true" style={tickStyle(-1, undefined, undefined, -1)} />
      <span aria-hidden="true" style={tickStyle(undefined, -1, -1, undefined)} />
      <span aria-hidden="true" style={tickStyle(undefined, -1, undefined, -1)} />

      <div className="flex items-center gap-3 mb-8">
        <span className="w-12 h-px" style={{ background: BRONZE }} />
        <span
          className="text-[11px] tracking-[0.35em] uppercase font-medium"
          style={{ color: BRONZE }}
        >
          Resultado
        </span>
      </div>

      <blockquote className="font-light text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-[1.35] -tracking-[0.02em] text-white/95 max-w-5xl">
        {children}
      </blockquote>

      <div className="mt-12 pt-8 border-t border-zinc-800/60 grid grid-cols-3 gap-4 sm:gap-8">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="font-thin text-4xl sm:text-5xl md:text-6xl -tracking-[0.03em] text-white">
              {m.value}
              <span style={{ color: BRONZE }}>{m.accent}</span>
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 mt-2">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pb-0">
      <div className="flex items-center gap-6">
        <span className="block flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <span className="block flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
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
            <div className="md:col-span-5">
              <MegaNum num="01" />
            </div>
            <div className="md:col-span-7 flex flex-col justify-end pb-4">
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

          {/* Story grid — cards separados por gap-px */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-900/60 border border-zinc-900 rounded-3xl overflow-hidden">
            {[
              {
                label: "Contexto",
                step: "01 / 03",
                text: "Na Yungas, o módulo de checklist era mais simples do que o nível de exigência dos clientes que já utilizavam a plataforma. Havia um descompasso claro entre a complexidade da operação dessas redes e a maturidade do produto entregue.",
              },
              {
                label: "Desafio",
                step: "02 / 03",
                text: "O risco era continuar operando com um módulo abaixo do esperado para grandes contas, gerando insatisfação e aumentando a chance de churn.",
              },
              {
                label: "Atuação",
                step: "03 / 03",
                text: "Conduzi pesquisa de mercado, entrevistas com clientes e analisei as lacunas do produto em relação ao que o mercado já tratava como padrão. A partir disso, estruturei um plano de evolução. Como a visão completa não foi aprovada de uma só vez, transformei a estratégia em entregas menores, onde cada avanço pavimentava o próximo.",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-zinc-950 p-8 sm:p-10 md:p-12 lg:col-span-4"
              >
                <PhaseLabel label={card.label} sub={card.step} />
                <p className="font-light text-base sm:text-lg leading-[1.7] -tracking-[0.01em] text-zinc-300">
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <ResultadoBlock
            metrics={[
              { value: "~12", accent: "mo", label: "sem reclamações" },
              { value: "↓", accent: " churn", label: "risco reduzido" },
              { value: "+", accent: "nível", label: "novo patamar de produto" },
            ]}
          >
            Ao longo de poucos meses, o módulo evoluiu de forma consistente até
            atingir um novo patamar. O produto ficou{" "}
            <span style={{ color: BRONZE }}>
              cerca de um ano sem reclamações relevantes
            </span>{" "}
            e sem pedidos de novas funcionalidades nessa frente, reduzindo um
            risco que eu já identificava como importante para a retenção.
          </ResultadoBlock>
        </div>

        <SectionDivider />
      </section>

      {/* ======== CASE 02 ======== */}
      <section id="case-02" className="relative overflow-hidden">
        <Flare />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 py-24 sm:py-36 lg:py-48">
          {/* Header row: meta esquerda, numeral direita (invertido) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 sm:mb-24">
            <div className="md:col-span-7 md:order-2 flex flex-col justify-end pb-4 md:text-right md:items-end">
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
            <div className="md:col-span-5 md:order-1">
              <MegaNum num="02" />
            </div>
          </div>

          {/* Asymmetric story grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-900 rounded-3xl p-8 sm:p-10 md:p-12">
              <PhaseLabel label="Contexto" />
              <p className="font-light text-base sm:text-lg leading-[1.7] -tracking-[0.01em] text-zinc-300">
                Na relação com o time comercial da Yungas, percebi que a
                ausência de um módulo de edição de artes impactava diretamente a
                capacidade de fechar novas vendas.
              </p>
            </div>

            <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-900 rounded-3xl p-8 sm:p-10 md:p-12">
              <PhaseLabel label="Desafio" />
              <p className="font-light text-base sm:text-lg leading-[1.7] -tracking-[0.01em] text-zinc-300">
                A empresa perdia competitividade em situações onde o cliente
                precisava de uma solução que permitisse adaptar materiais com
                flexibilidade, mantendo consistência visual e operacional.
              </p>
            </div>

            <div className="lg:col-span-12 bg-zinc-900/40 border border-zinc-900 rounded-3xl p-8 sm:p-10 md:p-14">
              <PhaseLabel label="Atuação — ponta a ponta" />
              {/* Pipeline chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
                {["Pesquisa", "Solução", "Concepção", "Sprint", "Lançamento"].map(
                  (step, i) => (
                    <div key={step} className="border border-zinc-800 rounded-xl p-4">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600">
                        0{i + 1}
                      </span>
                      <p className="text-sm text-zinc-200 mt-1">{step}</p>
                    </div>
                  )
                )}
              </div>
              <p className="font-light text-base sm:text-lg leading-[1.7] -tracking-[0.01em] text-zinc-300 max-w-4xl">
                Assumi o projeto de ponta a ponta. Fiz pesquisa de mercado,
                entrevistas com clientes, definição da solução, concepção do
                produto, criação das telas, especificação para desenvolvimento,
                estruturação da sprint, acompanhamento das entregas e apoio no
                lançamento. Também atuei na comunicação com clientes e no
                suporte à adoção junto ao time de CS.
              </p>
            </div>
          </div>

          <ResultadoBlock
            metrics={[
              { value: "↑", accent: " vendas", label: "barreira removida" },
              { value: "rápida", accent: ".", label: "adoção pelos clientes" },
              { value: "e2e", accent: ".", label: "pesquisa → lançamento" },
            ]}
          >
            O módulo teve{" "}
            <span style={{ color: BRONZE }}>adoção rápida</span>, poucos
            problemas na entrada em operação e boa recepção por parte dos
            clientes. Além de atender uma demanda real do mercado, o produto
            ajudou a reduzir uma{" "}
            <span style={{ color: BRONZE }}>barreira comercial importante</span>
            .
          </ResultadoBlock>
        </div>

        <SectionDivider />
      </section>

      {/* ======== CASE 03 ======== */}
      <section id="case-03" className="relative overflow-hidden">
        <Flare bottom />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 py-24 sm:py-36 lg:py-48">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 sm:mb-24">
            <div className="md:col-span-5">
              <MegaNum num="03" />
            </div>
            <div className="md:col-span-7 flex flex-col justify-end pb-4">
              <TagPills
                tags={[
                  { label: "Operação", primary: true },
                  { label: "EdTech · Alemanha" },
                  { label: "Turnaround" },
                ]}
              />
              <CaseTitle
                line1="Estruturação de produto"
                line2="e operação em empresa alemã."
              />
            </div>
          </div>

          {/* Vertical timeline */}
          <div className="relative border-l border-zinc-800 pl-8 sm:pl-12 space-y-12 sm:space-y-16 mb-10">
            {[
              {
                label: "Contexto",
                sub: "cenário inicial",
                text: "Fui chamado para atuar em uma EdTech da Alemanha que enfrentava desorganização entre founders, designers e desenvolvedores. Havia retrabalho, prioridades instáveis e dificuldade para transformar visão em entregas consistentes.",
              },
              {
                label: "Desafio",
                sub: "o que estava em jogo",
                text: "O time produzia sem direção clara, o material chegava desorganizado para desenvolvimento e a operação do produto não conseguia sustentar ritmo nem coerência.",
              },
              {
                label: "Atuação",
                sub: "como destravamos",
                text: "Comecei ouvindo fundadores, designers e programadores para entender o cenário completo. A partir disso, organizei a visão do produto, defini a estratégia para chegar até ela e criei um plano tático. Também passei a direcionar melhor o trabalho de design e a organizar a sprint por objetivos conectados, e não por tarefas isoladas.",
              },
            ].map((item) => (
              <div key={item.label} className="relative">
                <span
                  className="absolute -left-[37px] sm:-left-[49px] top-2 w-3 h-3 rounded-full"
                  style={{ background: BRONZE }}
                />
                <PhaseLabel label={item.label} sub={item.sub} />
                <p className="font-light text-base sm:text-lg md:text-xl leading-[1.7] -tracking-[0.01em] text-zinc-300 max-w-3xl">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <ResultadoBlock
            metrics={[
              { value: "9", accent: "mo", label: "para reorganizar" },
              { value: "3", accent: "×", label: "plataformas entregues" },
              { value: "6", accent: "+", label: "clientes em operação" },
            ]}
          >
            Em poucos meses, a operação começou a ganhar consistência. Em{" "}
            <span style={{ color: BRONZE }}>nove meses</span>, o time entregou{" "}
            <span style={{ color: BRONZE }}>três plataformas</span> e colocou{" "}
            <span style={{ color: BRONZE }}>seis clientes em andamento</span>,
            em um contexto que antes era marcado por desorganização e baixa
            capacidade de avanço.
          </ResultadoBlock>
        </div>
      </section>

      {/* ======== CTA FINAL ======== */}
      <section className="relative overflow-hidden border-t border-zinc-900">
        <Flare />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 py-24 sm:py-32 lg:py-40 text-center">
          <p
            className="text-[11px] tracking-[0.35em] uppercase mb-8"
            style={{ color: BRONZE }}
          >
            Fim dos casos selecionados
          </p>
          <h3 className="font-thin -tracking-[0.03em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] max-w-4xl mx-auto">
            Todo case começa antes
            <br />
            <span className="text-zinc-500">da primeira solução.</span>
          </h3>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
