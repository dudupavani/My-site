import { ArrowRight } from "lucide-react";

export function ProductThinkingSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white py-20 lg:py-32 px-6">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: "#998663", opacity: 0.25 }}
      />
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-16">
        <p className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl text-center leading-[1.6] mx-auto">
          Produto não avança só com ideia boa, discovery ou backlog cheio.{" "}
          <strong className="font-semibold">
            Avança quando existe clareza de direção.
          </strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-zinc-900 rounded-4xl p-12 lg:p-16 flex flex-col justify-between min-h-90">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium leading-[1.3]">
              Boas decisões de produto não começam na solução
              </h2>
            </div>
            <div className="mr-0 ml-auto">
              <ArrowRight className="w-10 h-10 text-zinc-600" />
            </div>
          </div>

          <div className="bg-zinc-900 rounded-4xl p-12 lg:p-16 flex flex-col justify-end gap-4 min-h-90">
            {[
              "Analiso o momento do negócio",
              "Leio o contexto em que o produto está inserido",
              "Escuto o feedback dos clientes",
              "Identifico o que trava vendas e retenção",
            ].map((item) => (
              <p key={item} className="text-zinc-400 text-base lg:text-xl leading-snug">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
