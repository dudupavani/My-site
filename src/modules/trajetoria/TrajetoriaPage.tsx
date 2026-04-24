import type { ReactNode } from "react";
import Link from "next/link";
import { ContactFooter } from "@/src/modules/home/sections/ContactFooter";

// ---- Types ----

type EntryTone = "default" | "gold" | "current";

type Entry = {
  id: string;
  period: string;
  chip?: string;
  title: ReactNode;
  body: string;
  tone?: EntryTone;
  extra?: ReactNode;
};

// ---- Data ----

const entries: Entry[] = [
  {
    id: "01",
    period: "1997 — 2001",
    chip: "Início",
    title: "Responsabilidade aos 14.",
    body: "Comecei a trabalhar aos 14 anos, ajudando minha família em uma gráfica. Foi ali que tive meu primeiro contato com responsabilidade, prazo, entrega e trabalho real.",
  },
  {
    id: "02",
    period: "2002 — 2007",
    chip: "Formação",
    title: "Formação e entrada no digital.",
    body: "Durante a graduação em Desenho Industrial, comecei a migrar para o universo digital e tive meus primeiros trabalhos com criação de sites. Depois, aprofundei essa base com uma pós-graduação em Design de Hipermídia.",
  },
  {
    id: "03",
    period: "2007 — 2010",
    chip: "Web · Curitiba",
    title: "Projetos web de maior porte.",
    body: "Em Curitiba, entrei no mercado profissional de aplicações web na GoToAndPlay, atuando em projetos para marcas como Mercedes, BMW, grandes shoppings e O Boticário. Foi meu primeiro contato com entregas digitais de maior escala e exigência.",
    extra: <ChipList items={["Mercedes", "BMW", "O Boticário"]} />,
  },
  {
    id: "04",
    period: "2010 — 2013",
    chip: "MG Interativa · Founder",
    title: "Empreendedorismo em software.",
    body: "Na sequência, fundei a MG Interativa, empresa de software e sites. Assumi projetos como os sites da prefeitura de Chapecó e trabalhos para a Unochapecó. Nesse período, também desenvolvi experiências com realidade aumentada em um momento ainda muito inicial dessa tecnologia no mercado.",
  },
  {
    id: "05",
    period: "2013 — 2020",
    chip: "Lump · Cofounder · 7 anos",
    title: (
      <>
        Construção de negócio
        <br />e liderança.
      </>
    ),
    body: "Depois, fui para Florianópolis para cofundar a agência Lump, onde atuei por sete anos como sócio e diretor criativo. Essa fase ampliou minha experiência em cliente, posicionamento, operação, gestão de equipe e direção de projetos.",
  },
  {
    id: "06",
    period: "2020 — hoje",
    chip: "Yungas · UX → Produto",
    title: (
      <>
        Transição para produto
        <br />em tecnologia.
      </>
    ),
    body: "Mais tarde, fiz a migração definitiva para o setor de tecnologia. Entrei na Yungas pela porta de UX e UI, mas ampliei minha atuação até assumir papel relevante na concepção de produto, na definição de caminhos e na participação das discussões estratégicas com o board.",
  },
  {
    id: "07",
    period: "Grandes marcas",
    chip: "Impacto em escala",
    tone: "gold",
    title: "Produto em grandes marcas.",
    body: "Na Yungas, atuei na evolução de soluções voltadas a grandes redes e operações de alta complexidade. Meu trabalho contribuiu diretamente para produtos utilizados por grandes empresas.",
    extra: (
      <BrandGrid
        items={[
          "Subway",
          "Burger King",
          "CNA Idiomas",
          "Grupo O Boticário",
          "Casa do Pão de Queijo",
          "OdontoCompany",
        ]}
      />
    ),
  },
  {
    id: "08",
    period: "EdTech · DE",
    chip: "Turnaround internacional",
    title: (
      <>
        Estruturação em
        <br />empresa internacional.
      </>
    ),
    body: "Também fui chamado para atuar em uma EdTech da Alemanha em um cenário de desorganização de produto e operação. Entrei para organizar visão, estratégia, prioridades e execução. Em nove meses, o time entregou três plataformas e colocou clientes em operação. Depois, fui convidado novamente para atuar em um novo contexto mais complexo.",
    extra: (
      <MetricGrid
        metrics={[
          { value: "9", accent: "mo", label: "para reorganizar" },
          { value: "3", accent: "×", label: "plataformas" },
          { value: "2", accent: "×", label: "convites" },
        ]}
      />
    ),
  },
  {
    id: "09",
    period: "Agora",
    title: "Multiagentes com IA.",
    body: "Há algum tempo, venho desenvolvendo projetos próprios com automação, agentes e multiagentes de IA aplicados à curadoria de conteúdo, ao atendimento via WhatsApp, à criação automatizada de artigos e também a fluxos de apoio comercial. Entre esses projetos, criei um agente para agilizar o trabalho do setor de pré-vendas, retomando leads antigos a partir da análise do histórico de interações e da geração de resumos estratégicos para orientar a atuação do profissional.",
    tone: "current",
    extra: (
      <ChipList
        items={["Curadoria", "WhatsApp", "Conteúdo", "Pré-vendas"]}
        variant="current"
      />
    ),
  },
];

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

function PeriodChip({
  children,
  gold,
}: {
  children: ReactNode;
  gold?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
        "text-[10px] tracking-[0.22em] uppercase",
        gold
          ? "border border-gold-500/40 text-gold-500"
          : "border border-zinc-900 text-zinc-400",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function ChipList({
  items,
  variant = "default",
}: {
  items: string[];
  variant?: "default" | "current";
}) {
  return (
    <div
      className={[
        variant === "current"
          ? "grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-gold-500/15"
          : "flex flex-wrap gap-2 pt-5 border-t border-zinc-900",
      ].join(" ")}
    >
      {items.map((item) => (
        <PeriodChip key={item}>{item}</PeriodChip>
      ))}
    </div>
  );
}

function BrandGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-6 border-t border-zinc-800/80">
      {items.map((item) => (
        <span
          key={item}
          className="text-[11px] tracking-[0.12em] text-zinc-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function MetricGrid({
  metrics,
}: {
  metrics: { value: string; accent: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <p className="font-thin text-2xl sm:text-3xl -tracking-[0.03em] text-white">
            {metric.value}
            <span className="text-gold-500">{metric.accent}</span>
          </p>
          <p className="text-[9px] tracking-[0.28em] uppercase text-zinc-500 mt-1">
            {metric.label}
          </p>
        </div>
      ))}
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

        <section className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pb-32 sm:pb-40 lg:pb-48">
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
              {entries.map((entry, index) => {
                const isOdd = index % 2 === 0; // 0,2,4,6,8 → numeral left, card right
                const tone = entry.tone ?? "default";
                const isCurrent = tone === "current";

                return (
                  <li
                    key={entry.id}
                    className="relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-16 lg:gap-24 pb-20 sm:pb-28 md:pb-32"
                  >
                    {/* Node dot */}
                    <span className="absolute left-5.5 top-2 md:left-1/2 md:-translate-x-1/2 md:top-3 z-10">
                      <NodeDot current={isCurrent} />
                    </span>

                    {/* Numeral + period */}
                    <div
                      className={[
                        isOdd
                          ? "md:text-right md:pr-4 md:order-1"
                          : "md:pl-4 md:order-2",
                      ].join(" ")}
                    >
                      <MegaNum num={entry.id} />
                      <p
                        className={[
                          "text-[10px] tracking-[0.28em] uppercase",
                          isCurrent ? "text-gold-500" : "text-zinc-600",
                        ].join(" ")}
                      >
                        {entry.period}
                      </p>
                    </div>

                    {/* Entry card */}
                    <div
                      className={[
                        "mt-4 md:mt-0",
                        isOdd ? "md:order-2" : "md:order-1",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "relative rounded-2xl backdrop-blur-sm p-6 sm:p-8 md:p-10",
                          isCurrent
                            ? "border border-gold-500/50 bg-linear-to-br from-gold-500/6 via-zinc-950/60 to-zinc-900/40 shadow-[0_0_60px_-20px_rgba(153,134,99,0.25)]"
                            : tone === "gold"
                              ? "border border-gold-300/25 bg-linear-to-br from-zinc-900/70 to-zinc-950/60"
                              : "border border-zinc-900 bg-zinc-950/60",
                        ].join(" ")}
                      >
                        {/* Chip */}
                        {entry.chip && (
                          <div className="flex items-center gap-2 mb-5">
                            {isCurrent && (
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
                              </span>
                            )}
                            <PeriodChip gold={tone === "gold"}>
                              {entry.chip}
                            </PeriodChip>
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="font-light text-2xl sm:text-3xl md:text-4xl -tracking-[0.02em] leading-[1.15] text-white mb-5">
                          {entry.title}
                        </h2>

                        {/* Body */}
                        <p
                          className={[
                            "font-light text-[15px] sm:text-base leading-[1.75]",
                            entry.extra ? "mb-6" : "",
                            isCurrent ? "text-zinc-300" : "text-zinc-400",
                          ].join(" ")}
                        >
                          {entry.body}
                        </p>

                        {entry.extra}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* End CTA */}
          <div className="mt-24 sm:mt-32 text-center">
            <p className="text-[11px] tracking-[0.28em] text-gold-500 uppercase mb-6">
              Próximo capítulo
            </p>
            <h3 className="font-thin -tracking-[0.03em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl mx-auto">
              A próxima linha
              <br />
              <span className="text-zinc-500">ainda está sendo escrita.</span>
            </h3>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/cases"
                className="text-sm tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors border-b border-zinc-600 pb-1"
              >
                Ver cases
              </Link>
              <span className="text-zinc-700">·</span>
              <Link
                href="/blog"
                className="text-sm tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors border-b border-zinc-600 pb-1"
              >
                Ler conteúdos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ContactFooter />
    </div>
  );
}
