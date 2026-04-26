type TechnicalItem = {
  title: string;
  body: string;
  bodyLeading?: string;
};

const technicalItems: TechnicalItem[] = [
  {
    title: "Desenvolvimento e arquitetura de produto",
    body: "Leitura técnica de aplicações digitais, incluindo lógica de produto, APIs, banco de dados, autenticação, integrações e fluxos entre sistemas. Repertório suficiente para discutir caminhos técnicos com engenharia, reduzir ruído na tomada de decisão e aproximar produto da realidade de implementação.",
  },
  {
    title: "Agentes e sistemas multiagentes com AI",
    body: "Construção de sistemas multiagentes com agentes orquestradores, especialistas e tools para executar fluxos complexos com responsabilidades claras, controle de estado e continuidade entre etapas. Trabalho com LangGraph para desenhar arquiteturas coordenadas, onde cada agente tem um papel definido dentro do sistema.",
    bodyLeading: "leading-[1.4]",
  },
  {
    title: "Prototipação funcional e especificação de produto",
    body: "Criação de protótipos funcionais, fluxos navegáveis, regras de negócio, estados de tela, jornadas e especificações claras para desenvolvimento. A prototipação entra como ponte entre visão, experiência e construção, reduzindo ambiguidade antes da implementação.",
  },
  {
    title: "Engenharia de contexto para agentes de código",
    body: "Estruturação de contexto para agentes de código trabalharem com mais precisão, usando specs, instruções de projeto, regras técnicas, critérios de aceite, documentação auxiliar e workflows definidos. O foco é reduzir improviso, preservar arquitetura e melhorar a qualidade da entrega assistida por AI.",
  },
  {
    title: "Automação e integração de sistemas",
    body: "Estruturação de automações conectando APIs, bancos de dados, webhooks e ferramentas como n8n, Supabase e serviços externos. O objetivo é transformar processos repetitivos ou fragmentados em fluxos mais organizados, rastreáveis e integrados ao produto.",
  },
];

function TechnicalCard({ item }: { item: TechnicalItem }) {
  return (
    <article className="grid min-w-0 grid-cols-1 gap-6 md:gap-12 lg:gap-16 overflow-hidden md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <div className="min-w-0">
        <h3 className="font-mono text-xs font-normal uppercase leading-[1.3] tracking-[0.14em] text-zinc-500 wrap-break-words">
          {item.title}
        </h3>
      </div>
      <div className="min-w-0">
        <p
          className={`max-w-full wrap-break-words text-sm text-white sm:text-base md:text-lg ${
            item.bodyLeading ?? "leading-[1.7]"
          }`}
        >
          {item.body}
        </p>
      </div>
    </article>
  );
}

export function TechnicalSection() {
  return (
    <section className="flex flex-col gap-16 md:gap-24 rounded-lg bg-zinc-950/20 border border-zinc-800 px-6 py-12 sm:px-16 sm:py-16">
      <header className="flex flex-col gap-6">
        <p className="font-mono text-xs uppercase leading-[1.4] tracking-[0.25em] text-zinc-500">
          Design + tecnologia + IA
        </p>
        <h2 className="text-3xl md:text-4xl font-light leading-none text-gold-400">
          Conhecimento técnico
        </h2>

      </header>

      <div className="flex w-full flex-col gap-12 sm:gap-20 lg:gap-24">
        {technicalItems.map((item) => (
          <TechnicalCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
