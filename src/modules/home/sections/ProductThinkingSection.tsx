export function ProductThinkingSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white py-20 lg:py-32 px-6 sm:px-12 lg:px-24">
      <div
        className="absolute bg-gold-800 opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full blur-[160px] pointer-events-none"
      />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        <div className="max-w-4xl space-y-4 sm:space-y-3">
        <h2 className="text-4xl sm:text-5xl 2xl:text-6xl font-extralight tracking-tight leading-[1.3] ">
          Produto não avança só com ideia boa, discovery ou backlog cheio.
        </h2>
        <p className="font-medium text-3xl sm:text-4xl text-gold-600 tracking-tight leading-snug ">
            Avança quando existe clareza de direção.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[400px_minmax(0,1fr)] 2xl:grid-cols-[500px_minmax(0,1fr)] shadow-2xl gap-8 sm:gap-12 md:gap-20 2xl:gap-32 border-t border-zinc-800 bg-linear-to-br from-zinc-950/40 via-zinc-950/80 to-zinc-90 pt-16">
          <div>
            <h2 className="text-2xl lg:text-3xl font-medium md:font-extralight tracking-tight leading-[1.6] text-white">
              Decisões de produto precisam partir de uma <span className="text-gold-600 font-medium">leitura clara do contexto, </span> dos clientes e do negócio
            </h2>
          </div>
          
          <div className="space-y-6 mt-3">
            {[
              "Análise do momento do negócio",
              "Contexto em que o produto está inserido",
              "Escuta qualificada com equipe interna e clientes",
              "Análise dos gargalos de venda e dos pontos críticos de retenção",
            ].map((item, i) => (
              <p key={item} className="flex text-white text-base lg:text-lg 2xl:text-xl font-light leading-snug">
                <span className="text-zinc-600 mr-3 font-mono">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
