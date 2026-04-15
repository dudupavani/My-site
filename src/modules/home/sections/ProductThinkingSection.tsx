import {
  CircleDollarSign,
  CircleUserRound,
  History,
  Telescope,
} from "lucide-react";

export function ProductThinkingSection() {
  return (
    <section className="bg-blue-700 text-white">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto text-left md:text-center py-20 lg:py-32 sm:pb-16 px-6">
        <p className="text-xs sm:text-base text-zinc-800 uppercase tracking-[0.17em] md:tracking-[0.3em] font-semibold mb-10">
          Como eu atuo em produto
        </p>
        <h2 className="text-xl sm:text-3xl 2xl:text-4xl font-medium md:font-semibold leading-[1.7] md:leading-[1.4]! 2xl:leading-[1.5]! mb-6 mx-auto">
          Produto não avança só com ideia boa, discovery ou backlog organizado.
Ele avança quando existe clareza sobre onde a empresa quer chegar, entendimento real do cliente, critério de prioridade e capacidade de transformar isso em execução consistente.
        </h2>
        <p className="max-w-5xl text-lg sm:text-xl md:text-2xl mx-auto text-white/60 font-light leading-[1.7]!">
          Atuo organizando contexto, conectando negócio e produto, definindo direção e estruturando o caminho para que as decisões saiam do discurso e gerem avanço real.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-row sm:flex-col gap-6 sm:gap-8 md:gap-12 px-6 py-8 md:px-12 md:py-12 border border-blue-700 bg-blue-800">
          <Telescope className="min-w-10 min-h-10 md:w-12 md:h-12 text-blue-600" />
          <p className="text-base sm:text-lg md:text-xl leading-relaxed!">
            Clareza sobre onde a empresa quer chegar
          </p>
        </div>
        <div className="flex flex-row sm:flex-col gap-6 sm:gap-8 md:gap-12 px-6 py-8 md:px-12 md:py-12 border border-blue-700 bg-blue-800">
          <CircleDollarSign className="min-w-10 min-h-10 md:w-12 md:h-12 text-blue-600" />
          <p className="text-base sm:text-lg md:text-xl leading-relaxed!">
            Compreensão de como o produto gera valor e receita
          </p>
        </div>
        <div className="flex flex-row sm:flex-col gap-6 sm:gap-8 md:gap-12 px-6 py-8 md:px-12 md:py-12 border border-blue-700 bg-blue-800">
          <CircleUserRound className="min-w-10 min-h-10 md:w-12 md:h-12 text-blue-600" />
          <p className="text-base sm:text-lg md:text-xl leading-relaxed!">
            Entendimento profundo de quem é o cliente real, sem viés ou achismos
          </p>
        </div>
        <div className="flex flex-row sm:flex-col gap-6 sm:gap-8 md:gap-12 px-6 py-8 md:px-12 md:py-12 border border-blue-700 bg-blue-800">
          <History className="min-w-10 min-h-10 md:w-12 md:h-12 text-blue-600" />
          <p className="text-base sm:text-lg md:text-xl leading-relaxed!">
            Decisões guiadas por evidências, não por opinião
          </p>
        </div>
      </div>
    </section>
  );
}
