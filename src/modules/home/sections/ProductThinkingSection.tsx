export function ProductThinkingSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white py-20 lg:py-32 px-6 sm:px-12 lg:px-24">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: "#998663", opacity: 0.25 }}
      />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        <div className="max-w-4xl space-y-4 sm:space-y-2">
        <h2 className="text-4xl sm:text-5xl 2xl:text-6xl font-extralight tracking-tight leading-[1.2] ">
          Produto não avança só com ideia boa, discovery ou backlog cheio.
        </h2>
        <p className="font-medium text-3xl sm:text-4xl text-gold-500 tracking-tight ">
            Avança quando existe clareza de direção.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-12 md:gap-20 2xl:gap-32 border border-gold-800/30 bg-linear-to-br from-zinc-950/40 via-zinc-950/80 to-zinc-900/60 rounded-3xl md:rounded-4xl px-6 py-8 sm:p-12 md:p-16 lg:px-12">
          <div>
            <h2 className="text-lg lg:text-2xl font-medium md:font-extralight tracking-tight leading-[1.6]">
            As boas decisões são embasadas em um entendimento profundo do contexto, dos clientes e do negócio.
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              "Análise do momento do negócio",
              "Contexto em que o produto está inserido",
              "Escuta ativa da equipe interna e clientes",
              "Análise das travas em vendas e dificuldades de retenção",
            ].map((item, i) => (
              <p key={item} className="flex text-white text-base lg:text-lg font-light leading-snug">
                <span className="text-gold-700 mr-3">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
