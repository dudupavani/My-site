import type { ReactNode } from "react";
import { ContactFooter } from "@/src/modules/home/sections/ContactFooter";
import { Badge } from "@/src/shared/ui";

// ---- Sub-components ----

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
            ? "radial-gradient(circle at 50% 50%, rgba(104,85,60,0.16), transparent 55%)"
            : "radial-gradient(circle at 50% 50%, rgba(153,134,99,0.12), transparent 55%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

function NodeDot({ current }: { current?: boolean }) {
  if (current) {
    return (
      <span className="relative flex w-3 h-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-gold-500 ring-4 ring-zinc-950" />
      </span>
    );
  }
  return (
    <span className="block w-3 h-3 rounded-full bg-gold-500 ring-4 ring-zinc-950" />
  );
}

function MegaNum({ num }: { num: string }) {
  return (
    <p
      aria-hidden="true"
      className="select-none font-thin -tracking-[0.08em] leading-[0.8] text-[80px] sm:text-[120px] md:text-[140px] lg:text-[180px] -mb-3 md:-mb-5"
      style={{
        background:
          "linear-gradient(180deg, rgba(153,134,99,0.4) 0%, rgba(153,134,99,0.02) 85%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {num}
    </p>
  );
}

function TimelineEntry({
  id,
  index,
  dateLabel,
  chip,
  tone = "default",
  children,
}: {
  id: string;
  index: number;
  dateLabel: string;
  chip?: string;
  tone?: "default" | "gold" | "current";
  children: ReactNode;
}) {
  const isOdd = index % 2 === 0;
  const isCurrent = tone === "current";

  return (
    <li className="relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-16 lg:gap-24 pb-20 sm:pb-28 md:pb-32">
      <span className="absolute left-5.5 top-2 md:left-1/2 md:-translate-x-1/2 md:top-3 z-10">
        <NodeDot current={isCurrent} />
      </span>

      <div
        className={[
          isOdd ? "md:text-right md:pr-4 md:order-1" : "md:pl-4 md:order-2",
        ].join(" ")}
      >
        <MegaNum num={id} />
        <p
          className={[
            "text-[10px] tracking-[0.28em] uppercase",
            isCurrent ? "text-gold-500" : "text-zinc-600",
          ].join(" ")}
        >
          {dateLabel}
        </p>
      </div>

      <div className={["mt-4 md:mt-0", isOdd ? "md:order-2" : "md:order-1"].join(" ")}>
        <div
          className={[
            "relative rounded-2xl backdrop-blur-sm p-6 sm:p-8 md:p-10",
            isCurrent
              ? "border border-gold-700/40 bg-linear-to-br from-gold-500/6 via-zinc-950/60 to-zinc-900/40"
              : tone === "gold"
                ? "border border-gold-300/25 bg-linear-to-br from-zinc-900/70 to-zinc-950/60"
                : "border border-zinc-900 bg-zinc-950/60",
          ].join(" ")}
        >
          {chip && (
            <div className="flex items-center gap-2 mb-5">
              {isCurrent && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
                </span>
              )}
              <Badge size="sm" variant={tone === "gold" ? "gold-outline" : "gray-outline"}>
                {chip}
              </Badge>
            </div>
          )}

          {children}
        </div>
      </div>
    </li>
  );
}

// ---- Page ----

export function TrajetoriaPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header — mantido da aplicação */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pt-28 sm:pt-36 lg:pt-44 pb-16 md:pb-16">
        <h1 className="-tracking-[0.02em] text-3xl font-medium text-center leading-[1.3] text-zinc-600 md:text-4xl 2xl:text-5xl">
          Trajetória
        </h1>
      </div>

      {/* Timeline */}
      <main className="relative overflow-hidden">
        <Flare bottom />

        <section className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pb-20 sm:pb-24 lg:pb-32">
          <div className="relative">
            {/* Spine — mobile: left; desktop: center */}
            <div
              className="absolute top-0 bottom-0 left-7 md:left-1/2 w-px -translate-x-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(153,134,99,0.45) 8%, rgba(39,39,42,0.8) 92%, transparent 100%)",
              }}
            />

            <ol className="relative">
              <TimelineEntry id="01" index={0} dateLabel="1997 — 2001" chip="Início">
                <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Responsabilidade aos 14.
                </h2>
                <p className="font-light text-[15px] sm:text-base leading-[1.75] text-zinc-400">
                  Comecei a trabalhar aos 14 anos, ajudando minha família em uma gráfica. Foi ali
                  que tive meu primeiro contato com responsabilidade, prazo, entrega e trabalho
                  real.
                </p>
              </TimelineEntry>

              <TimelineEntry id="02" index={1} dateLabel="2002 — 2007" chip="Formação">
                <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Formação e entrada no digital.
                </h2>
                <p className="font-light text-[15px] sm:text-base leading-[1.75] text-zinc-400">
                  Durante a graduação em Desenho Industrial, comecei a migrar para o universo
                  digital e tive meus primeiros trabalhos com criação de sites. Depois, aprofundei
                  essa base com uma pós-graduação em Design de Hipermídia.
                </p>
              </TimelineEntry>

              <TimelineEntry id="03" index={2} dateLabel="2007 — 2010" chip="Web · Curitiba">
                <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Projetos web de maior porte.
                </h2>
                <p className="mb-6 font-light text-[15px] sm:text-base leading-[1.75] text-zinc-400">
                  Em Curitiba, entrei no mercado profissional de aplicações web na GoToAndPlay,
                  atuando em projetos para marcas como Mercedes, BMW, grandes shoppings e O
                  Boticário. Foi meu primeiro contato com entregas digitais de maior escala e
                  exigência.
                </p>
                <div className="flex flex-wrap gap-2 pt-5 border-t border-zinc-900">
                  <Badge size="sm" variant="gray-outline">
                    Mercedes
                  </Badge>
                  <Badge size="sm" variant="gray-outline">
                    BMW
                  </Badge>
                  <Badge size="sm" variant="gray-outline">
                    O Boticário
                  </Badge>
                </div>
              </TimelineEntry>

              <TimelineEntry
                id="04"
                index={3}
                dateLabel="2010 — 2013"
                chip="MG Interativa · Founder"
              >
                <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Empreendedorismo em software.
                </h2>
                <p className="font-light text-[15px] sm:text-base leading-[1.75] text-zinc-400">
                  Na sequência, fundei a MG Interativa, empresa de software e sites. Assumi
                  projetos como os sites da prefeitura de Chapecó e trabalhos para a Unochapecó.
                  Nesse período, também desenvolvi experiências com realidade aumentada em um
                  momento ainda muito inicial dessa tecnologia no mercado.
                </p>
              </TimelineEntry>

              <TimelineEntry
                id="05"
                index={4}
                dateLabel="2013 — 2020"
                chip="Lump · Cofounder · 7 anos"
              >
                <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Construção de negócio
                  <br />e liderança.
                </h2>
                <p className="font-light text-[15px] sm:text-base leading-[1.75] text-zinc-400">
                  Depois, fui para Florianópolis para cofundar a agência Lump, onde atuei por sete
                  anos como sócio e diretor criativo. Essa fase ampliou minha experiência em
                  cliente, posicionamento, operação, gestão de equipe e direção de projetos.
                </p>
              </TimelineEntry>

              <TimelineEntry
                id="06"
                index={5}
                dateLabel="2020 — hoje"
                chip="Yungas · UX → Produto"
              >
                <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Transição para produto
                  <br />em tecnologia.
                </h2>
                <p className="font-light text-[15px] sm:text-base leading-[1.75] text-zinc-400">
                  Mais tarde, fiz a migração definitiva para o setor de tecnologia. Entrei na
                  Yungas pela porta de UX e UI, mas ampliei minha atuação até assumir papel
                  relevante na concepção de produto, na definição de caminhos e na participação das
                  discussões estratégicas com o board.
                </p>
              </TimelineEntry>

              <TimelineEntry
                id="07"
                index={6}
                dateLabel="Grandes marcas"
                chip="Impacto em escala"
                tone="gold"
              >
                <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Produto em grandes marcas.
                </h2>
                <p className="mb-6 font-light text-[15px] sm:text-base leading-[1.75] text-zinc-400">
                  Na Yungas, atuei na evolução de soluções voltadas a grandes redes e operações de
                  alta complexidade. Meu trabalho contribuiu diretamente para produtos utilizados
                  por grandes empresas.
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-6 border-t border-zinc-800/80">
                  <span className="text-[11px] tracking-[0.12em] text-zinc-300">Subway</span>
                  <span className="text-[11px] tracking-[0.12em] text-zinc-300">Burger King</span>
                  <span className="text-[11px] tracking-[0.12em] text-zinc-300">CNA Idiomas</span>
                  <span className="text-[11px] tracking-[0.12em] text-zinc-300">
                    Grupo O Boticário
                  </span>
                  <span className="text-[11px] tracking-[0.12em] text-zinc-300">
                    Casa do Pão de Queijo
                  </span>
                  <span className="text-[11px] tracking-[0.12em] text-zinc-300">
                    OdontoCompany
                  </span>
                </div>
              </TimelineEntry>

              <TimelineEntry id="08" index={7} dateLabel="EdTech Alemã" chip="EdTech Alemã">
                <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Estruturação de processos em startup
                </h2>
                <p className="mb-6 font-light text-[15px] sm:text-base leading-[1.75] text-zinc-400">
                  Também fui chamado para atuar em uma EdTech da Alemanha em um cenário de
                  desorganização de produto e operação. Entrei para organizar visão, estratégia,
                  prioridades e execução. Em nove meses, o time entregou três plataformas e colocou
                  clientes em operação. Depois, fui convidado novamente para atuar em um novo
                  contexto mais complexo.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
                  <div>
                    <p className="font-thin text-2xl sm:text-3xl -tracking-[0.03em] text-white">
                      9<span className="text-gold-500">mo</span>
                    </p>
                    <p className="text-[9px] tracking-[0.28em] uppercase text-zinc-500 mt-1">
                      para reorganizar
                    </p>
                  </div>
                  <div>
                    <p className="font-thin text-2xl sm:text-3xl -tracking-[0.03em] text-white">
                      3<span className="text-gold-500">×</span>
                    </p>
                    <p className="text-[9px] tracking-[0.28em] uppercase text-zinc-500 mt-1">
                      plataformas
                    </p>
                  </div>
                  <div>
                    <p className="font-thin text-2xl sm:text-3xl -tracking-[0.03em] text-white">
                      2<span className="text-gold-500">×</span>
                    </p>
                    <p className="text-[9px] tracking-[0.28em] uppercase text-zinc-500 mt-1">
                      convites
                    </p>
                  </div>
                </div>
              </TimelineEntry>

              <TimelineEntry id="09" index={8} dateLabel="Agora" tone="current">
                <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Multiagentes com IA.
                </h2>
                <p className="mb-6 font-light text-[15px] sm:text-base leading-[1.75] text-zinc-300">
                  Há algum tempo, venho desenvolvendo projetos próprios com automação, agentes e
                  multiagentes de IA aplicados à curadoria de conteúdo, ao atendimento via
                  WhatsApp, à criação automatizada de artigos e também a fluxos de apoio comercial.
                  Entre esses projetos, criei um agente para agilizar o trabalho do setor de
                  pré-vendas, retomando leads antigos a partir da análise do histórico de
                  interações e da geração de resumos estratégicos para orientar a atuação do
                  profissional.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-gold-500/15">
                  <Badge size="sm" variant="gray-outline">
                    Curadoria
                  </Badge>
                  <Badge size="sm" variant="gray-outline">
                    WhatsApp
                  </Badge>
                  <Badge size="sm" variant="gray-outline">
                    Conteúdo
                  </Badge>
                  <Badge size="sm" variant="gray-outline">
                    Pré-vendas
                  </Badge>
                </div>
              </TimelineEntry>
            </ol>
          </div>

        </section>
      </main>

      <ContactFooter />
    </div>
  );
}
