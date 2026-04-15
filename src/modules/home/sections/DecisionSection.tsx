import { Check } from "lucide-react";

export function DecisionSection() {
  return (
    <section className="bg-stone-300 py-20 sm:py-30 px-6 sm:px-12 md:px-20">
      <div className="flex flex-col max-w-5xl mx-auto space-y-12">
        <div className="flex-1">
          <p className="text-2xl md:text-2xl lg:text-4xl text-center leading-relaxed text-stone-900 font-semibold">
            Boas decisões de produto não começam na solução. Começam em
            contexto, impacto e direção.
          </p>
        </div>
        <div className="flex justify-center gap-12 text-stone-700 text-lg sm:text-xl leading-relaxed!">
          <div className="flex items-start gap-3 sm:gap-3 py-2 px-4 border border-stone-400 rounded-full">
            <span className="text-yellow-500 mt-2">
              <Check className="min-w-4 min-h-4 w-4 h-4 sm:min-w-6 sm:min-h-6 sm:w-6 sm:h-6" />
            </span>
            <p>Clareza sobre o objetivo estratégico</p>
          </div>
          <div className="flex items-start gap-3 sm:gap-3 py-2 px-4 border border-stone-400 rounded-full">
            <span className="text-yellow-500 mt-2">
              <Check className="min-w-4 min-h-4 w-4 h-4 sm:min-w-6 sm:min-h-6 sm:w-6 sm:h-6" />
            </span>
            <p>Impacto no negócio e na jornada do cliente</p>
          </div>
        </div>
      </div>
    </section>
  );
}
