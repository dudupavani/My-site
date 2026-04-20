import { ContactFooter } from "@/src/modules/home/sections/ContactFooter";

const entries = [
  {
    id: 1,
    period: "[período]",
    role: "[cargo]",
    company: "[empresa]",
    description: "[descrição do cargo e responsabilidades — inserir texto final]",
  },
  {
    id: 2,
    period: "[período]",
    role: "[cargo]",
    company: "[empresa]",
    description: "[descrição do cargo e responsabilidades — inserir texto final]",
  },
  {
    id: 3,
    period: "[período]",
    role: "[cargo]",
    company: "[empresa]",
    description: "[descrição do cargo e responsabilidades — inserir texto final]",
  },
  {
    id: 4,
    period: "[período]",
    role: "[cargo]",
    company: "[empresa]",
    description: "[descrição do cargo e responsabilidades — inserir texto final]",
  },
  {
    id: 5,
    period: "[período]",
    role: "[cargo]",
    company: "[empresa]",
    description: "[descrição do cargo e responsabilidades — inserir texto final]",
  },
];

export function HistoricoPage() {
  return (
    <div className="min-h-screen bg-stone-900 text-white">
      <main className="mx-auto max-w-4xl px-6 sm:px-8 pt-28 sm:pt-36 lg:pt-44 pb-24">
        <div className="mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.6em] text-stone-500 mb-4">
            Histórico
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold -tracking-[0.02em] leading-[1.3] text-white mb-6">
            Histórico Profissional
          </h1>
          <p className="text-lg text-stone-400 leading-[1.7]">
            [descrição introdutória — inserir texto final]
          </p>
        </div>

        <ol className="relative border-l border-stone-700 ml-2">
          {entries.map((entry) => (
            <li key={entry.id} className="mb-12 pl-8">
              <span className="absolute -left-[9px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-stone-600 ring-4 ring-stone-900" />
              <time className="block mb-1 text-sm text-stone-500 font-medium">
                {entry.period}
              </time>
              <h2 className="text-xl font-semibold text-white mb-1">
                {entry.role}
              </h2>
              <p className="text-sm text-stone-500 mb-3">{entry.company}</p>
              <p className="text-base text-stone-400 leading-[1.8]">
                {entry.description}
              </p>
            </li>
          ))}
        </ol>
      </main>
      <ContactFooter />
    </div>
  );
}
