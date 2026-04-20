import { ContactFooter } from "@/src/modules/home/sections/ContactFooter";

const entries = [
  {
    id: "01",
    title: "[título do case]",
    body: "[descrição do case — inserir texto final]",
  },
  {
    id: "02",
    title: "[título do case]",
    body: "[descrição do case — inserir texto final]",
  },
  {
    id: "03",
    title: "[título do case]",
    body: "[descrição do case — inserir texto final]",
  },
  {
    id: "04",
    title: "[título do case]",
    body: "[descrição do case — inserir texto final]",
  },
  {
    id: "05",
    title: "[título do case]",
    body: "[descrição do case — inserir texto final]",
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

      {/* Timeline */}
      <section className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 pb-24">
        {/* Vertical line: left on mobile, centered on desktop */}
        <div className="absolute top-0 bottom-0 left-[30px] w-px bg-stone-800 sm:left-[36px] md:left-1/2" />

        <ol>
          {entries.map((entry, index) => {
            const isLeft = index % 2 === 0;
            return (
              <li
                key={entry.id}
                className={[
                  "relative pb-16 md:pb-24",
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
                    "h-[14px] w-[14px]",
                    "left-[23px] top-[50px] sm:left-[29px]",
                    "md:left-1/2 md:top-[56px] md:-translate-x-1/2",
                    "bg-[#998663]",
                    "shadow-[0_0_0_5px_#1c1917]",
                  ].join(" ")}
                />

                {/* Decorative number */}
                <p
                  aria-hidden="true"
                  className="select-none font-extralight leading-none text-[#998663]/[0.12] text-[72px] md:text-[96px] -mb-5 md:-mb-7"
                >
                  {entry.id}
                </p>

                {/* Title */}
                <h2 className="mb-3 text-xl font-semibold leading-snug text-white md:text-2xl">
                  {entry.title}
                </h2>

                {/* Body */}
                <p className="text-base leading-[1.8] text-stone-400">
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
