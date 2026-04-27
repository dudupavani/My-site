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

function NodeDot() {
  return <span className="block w-3 h-3 rounded-full bg-gold-700 ring-4 ring-zinc-950" />;
}

function MegaNum({ num }: { num: string }) {
  return (
    <p
      aria-hidden="true"
      className="select-none font-extralight -tracking-[0.08em] leading-[0.8] text-5xl sm:text-6xl md:text-[80px] lg:text-[100px] -mb-3 md:-mb-5"
      style={{
        background: "linear-gradient(180deg, rgba(153,134,99,0.4) 0%, rgba(153,134,99,0.02) 85%)",
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
  children,
}: {
  id: string;
  index: number;
  dateLabel: string;
  chip?: string;
  children: ReactNode;
}) {
  const isOdd = index % 2 === 0;

  return (
    <li className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16 lg:gap-24 pb-16 sm:pb-20 md:pb-24">
      <span className="absolute left-5.5 top-2 md:left-1/2 md:-translate-x-1/2 md:top-3 z-10">
        <NodeDot />
      </span>

      <div
        className={[isOdd ? "md:text-right md:pr-4 md:order-1" : "md:pl-4 md:order-2"].join(" ")}
      >
        <MegaNum num={id} />
        <p className="text-sm font-mono tracking-[0.28em] uppercase text-zinc-600">{dateLabel}</p>
      </div>

      <div className={["mt-4 md:mt-0", isOdd ? "md:order-2" : "md:order-1"].join(" ")}>
        <div className="relative rounded-2xl border border-zinc-900 bg-zinc-900/60 p-6 backdrop-blur-sm sm:p-8 md:p-10">
          {chip && (
            <div className="flex items-center gap-2 mb-5">
              <Badge size="sm" variant="gray-outline">
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
    <div className="min-h-screen bg-zinc-950 text-white pt-40 md:pt-50 2xl:pt-60">
      {/* Timeline */}
      <main className="relative overflow-hidden">
        <Flare bottom />

        <section className="relative z-10 mx-auto max-w-7xl pl-0 pr-6 sm:px-8 lg:px-16 pb-20 sm:pb-24 lg:pb-32">
          <div className="relative">
            {/* Spine — mobile: left; desktop: center */}
            <div className="absolute top-0 bottom-0 left-7 md:left-1/2 w-px -translate-x-px bg-zinc-800" />

            <ol className="relative">
              <TimelineEntry id="01" index={0} dateLabel="1996 — 1999" chip="Início">
                <h2 className="font-light text-xl sm:text-2xl md:text-3xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Responsabilidade aos 14
                </h2>
                <p className="font-light text-base leading-[1.75] text-zinc-400">
                  Comecei a trabalhar aos 14 anos, ajudando minha família em uma gráfica. Foi ali
                  que tive meu primeiro contato com responsabilidade, prazo, entrega e trabalho
                  real.
                </p>
              </TimelineEntry>

              <TimelineEntry id="02" index={1} dateLabel="2000 — 2006" chip="Formação">
                <h2 className="font-light text-xl sm:text-2xl md:text-3xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Formação e entrada no digital
                </h2>
                <p className="font-light text-base leading-[1.75] text-zinc-400">
                  Durante a graduação em Desenho Industrial, comecei a migrar para o universo
                  digital e tive meus primeiros trabalhos com criação de sites. Depois, aprofundei
                  essa base com uma pós-graduação em Design de Hipermídia.
                </p>
              </TimelineEntry>

              <TimelineEntry id="03" index={2} dateLabel="2007" chip="UI/UX Design">
                <h2 className="font-light text-xl sm:text-2xl md:text-3xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Projetos web de maior porte
                </h2>
                <p className="font-light text-base leading-[1.75] text-zinc-400">
                  Em Curitiba, entrei no mercado profissional de aplicações web na GoToAndPlay,
                  atuando em projetos para marcas como Mercedes, BMW, grandes shoppings e O
                  Boticário. Foi meu primeiro contato com entregas digitais de maior escala e
                  exigência.
                </p>
              </TimelineEntry>

              <TimelineEntry id="04" index={3} dateLabel="2008/2010" chip="Founder · MG Interativa">
                <h2 className="font-light text-xl sm:text-2xl md:text-3xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Empreendedorismo em software
                </h2>
                <p className="font-light text-base leading-[1.75] text-zinc-400">
                  Na sequência, fundei a MG Interativa, empresa de software e sites. Assumi projetos
                  como os sites da prefeitura de Chapecó e trabalhos para a Unochapecó. Nesse
                  período, também desenvolvi experiências com realidade aumentada em um momento
                  ainda muito inicial dessa tecnologia no mercado.
                </p>
              </TimelineEntry>

              <TimelineEntry
                id="05"
                index={4}
                dateLabel="2011/2018"
                chip="CoFounder · Agência Lump"
              >
                <h2 className="font-light text-xl sm:text-2xl md:text-3xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Construção de negócio e liderança
                </h2>
                <p className="font-light text-base leading-[1.75] text-zinc-400">
                  Depois, fui para Florianópolis para cofundar a agência Lump, onde atuei por sete
                  anos como sócio e diretor criativo. Essa fase ampliou minha experiência em
                  cliente, posicionamento, operação, gestão de equipe e direção de projetos.
                </p>
              </TimelineEntry>

              <TimelineEntry id="06" index={5} dateLabel="2020" chip="Produto">
                <h2 className="font-light text-xl sm:text-2xl md:text-3xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Transição para produto em tecnologia.
                </h2>
                <p className="font-light text-base leading-[1.75] text-zinc-400">
                  Mais tarde, fiz a migração definitiva para o setor de tecnologia. Entrei na Yungas
                  pela porta de UX e UI, mas ampliei minha atuação até assumir papel relevante na
                  concepção de produto, na definição de caminhos e na participação das discussões
                  estratégicas com o board.
                </p>
              </TimelineEntry>

              <TimelineEntry id="07" index={6} dateLabel="EdTech Alemã" chip="EdTech Alemã">
                <h2 className="font-light text-xl sm:text-2xl md:text-3xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Estruturação de processos em startup
                </h2>
                <p className="font-light text-base leading-[1.75] text-zinc-400">
                  Também fui chamado para atuar em uma EdTech da Alemanha em um cenário de
                  desorganização de produto e operação. Entrei para organizar visão, estratégia,
                  prioridades e execução. Em nove meses, o time entregou três plataformas e colocou
                  clientes em operação. Depois, fui convidado novamente para atuar em um novo
                  contexto mais complexo.
                </p>
              </TimelineEntry>

              <TimelineEntry
                id="08"
                index={7}
                dateLabel="Dedicação atual"
                chip="Inteligência Artificial"
              >
                <h2 className="font-light text-xl sm:text-2xl md:text-3xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                  Multiagentes com IA
                </h2>
                <p className="font-light text-base leading-[1.75] text-zinc-400">
                  Há algum tempo, venho desenvolvendo projetos próprios com automação, agentes e
                  multiagentes de IA aplicados à curadoria de conteúdo, ao atendimento via WhatsApp,
                  à criação automatizada de artigos e também a fluxos de apoio comercial. Entre
                  esses projetos, criei um agente para agilizar o trabalho do setor de pré-vendas,
                  retomando leads antigos a partir da análise do histórico de interações e da
                  geração de resumos estratégicos para orientar a atuação do profissional.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <Badge size="sm" variant="gray-dark">
                    AI Agents
                  </Badge>
                  <Badge size="sm" variant="gray-dark">
                    Agentes de atendimento
                  </Badge>
                  <Badge size="sm" variant="gray-dark">
                    Multiagente de conteúdo
                  </Badge>
                  <Badge size="sm" variant="gray-dark">
                    Agente para pré-vendas
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
