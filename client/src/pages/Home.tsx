import { ChevronRight, LucideIcon, GraduationCap, Building2, User2, BarChart3, HelpCircle, Briefcase, Layout, Globe, Search, Telescope, CircleDollarSign, CircleUserRound, History } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans text-[#111111] bg-white selection:bg-blue-600 selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen min-h-[700px] bg-[#111111] text-white flex flex-col items-center justify-center overflow-hidden">
        {/* Social Icons Top Right */}
        <div className="absolute top-12 right-16 flex gap-8 z-50 text-white">
          <a href="#" className="hover:opacity-70 transition-opacity">
            <img src="/images/Whatsapp.svg" alt="WhatsApp" className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/eduardopavani/" className="hover:opacity-70 transition-opacity">
            <img src="/images/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
          </a>
        </div>

        {/* Glow / Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Symbol behind profile */}
        <div className="absolute inset-0 z-5 flex items-center justify-center">
          <img
            src="/images/symbol.svg"
            alt=""
            className="h-[60%] w-auto object-contain opacity-20"
            style={{ filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(3347%) hue-rotate(212deg) brightness(99%) contrast(101%)' }}
          />
        </div>

        {/* Profile Image (Eduardo) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <img
            src="/images/img-profile-2.webp"
            alt="Eduardo Pavani"
            className="h-full w-auto object-contain object-bottom"
          />
        </div>

        {/* Logo and Hero Text */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 mt-44">
          <div className="flex items-center gap-3 mb-8">
            <img src="/images/logo.svg" alt="eduardopavani" className="h-12 sm:h-20 md:h-28 w-auto" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl max-w-3xl !leading-relaxed tracking-tight">
            Estratégia, clareza e execução na construção de produtos digitais.
          </h1>
        </div>
      </section>

      {/* --- THINKING SECTION (BLUE) --- */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-6xl mx-auto text-center max-w-5xl py-20 px-6">
          <p className="text-zinc-800 uppercase tracking-[0.4em] text-base font-extrabold mb-10">
            Como eu penso produto
          </p>
          <h2 className="text-4xl font-bold leading-relaxed mb-6 mx-auto">
            Produto, para mim, não começa no "o que vamos construir".<br className="hidden md:block" />
            Começa no porquê. Só depois avança para decisões de execução.
          </h2>
          <p className="text-blue-100/80 text-lg md:text-xl mx-auto font-medium">
            Antes de discutir soluções e funcionalidades, busco o que realmente sustenta o produto: objetivos e clareza estratégica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-12 px-12 py-12 border border-blue-700 bg-blue-800">
            <Telescope className="w-12 h-12 text-blue-600" />
            <p className="text-xl leading-relaxed">Onde a empresa quer chegar</p>
          </div>
          <div className="flex flex-col gap-12 px-12 py-12 border border-blue-700 bg-blue-800">
            <CircleDollarSign className="w-12 h-12 text-blue-600" />
            <p className="text-xl leading-relaxed" >Como o produto gera receita e quais os potenciais retornos</p>
          </div>
          <div className="flex flex-col gap-12 px-12 py-12 border border-blue-700 bg-blue-800">
            <CircleUserRound className="w-12 h-12 text-blue-600" />
            <p className="text-xl leading-relaxed">Quem é de fato o seu cliente ideal e seu contexto real</p>
          </div>
          <div className="flex flex-col gap-12 px-12 py-12 border border-blue-700 bg-blue-800">
            <History className="w-12 h-12 text-blue-600" />
            <p className="text-xl leading-relaxed">O contexto do produto, de onde ele veio e por que é preciso mudar</p>
          </div>
        </div>
      </section>

      {/* --- DECISION SECTION (WHITE) --- */}
      <section className="bg-[#fafafa] py-24 px-6 md:px-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">

          {/* Vertical Divider (Hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -ml-px"></div>

          {/* Left Side - Title */}
          <div className="flex flex-col justify-center items-start md:pr-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111111]">Como decido<br /> e priorizo</h2>
          </div>

          {/* Right Side - List */}
          <div className="flex flex-col justify-center space-y-12 md:pl-12">
            <div className="space-y-8">
              <p className="text-xl font-bold text-[#111111]">Minhas decisões são guiadas por:</p>
              <div className="space-y-5">
                <BaseListItem text="Alinhamento com o objetivo estratégico" />
                <BaseListItem text="Impacto real no negócio" />
                <BaseListItem text="Impacto na dor do cliente" />
                <BaseListItem text="Relação entre custo e retorno" />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Ideias que não contribuem diretamente para o caminho definido — mesmo sendo boas — ficam fora.
              </p>
              <p className="text-lg font-bold text-[#1a56db]">
                Foco é o que permite que o produto avance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION (DARK WITH IMAGE) --- */}
      <section className="relative bg-[#111111] text-white py-24 px-6 md:px-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <img src="/images/bg-arch.webp" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="flex-1 md:pr-12 space-y-4">
            <h2 className="text-4xl font-bold leading-tight !leading-relaxed">
              Experiência estratégica e responsabilidade real
            </h2>
            <p className="text-gray-400 text-xl !leading-relaxed">
              Ao longo da minha trajetória, atuei em contextos onde decisões de produto precisavam ser tomadas com clareza, responsabilidade e visão de longo prazo.
            </p>
          </div>

          <div className="flex-[1.5] space-y-8">
            <div className="flex items-start gap-4">
              <span className="text-blue-500 mt-1">
                <ChevronRight className="w-5 h-5" />
              </span>
              <p className="text-lg leading-relaxed text-gray-300">
                Participei diretamente de comitês de produto, trabalhando junto a board, CEOs e lideranças para definir direcionamento estratégico, prioridades e roadmap.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-blue-500 mt-1">
                <ChevronRight className="w-5 h-5" />
              </span>
              <p className="text-lg leading-relaxed text-gray-300">
                Também liderei produto em contextos internacionais, assumindo visão completa — do macro ao micro — em plataformas digitais, estruturando estratégia, execução e posicionamento de mercado.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-blue-500 mt-1">
                <ChevronRight className="w-5 h-5" />
              </span>
              <p className="text-lg leading-relaxed text-gray-300">
                Essas experiências consolidaram minha atuação como alguém responsável por transformar visão em direção concreta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TODAY SECTION (BLUE SPLIT) --- */}
      <section className="flex flex-col md:flex-row min-h-[450px]">
        <div className="flex-1 bg-[#1a56db] text-white p-12 md:p-24 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-10">O que faço hoje</h2>
          <div className="space-y-6 text-xl leading-relaxed opacity-95">
            <p>
              Atuo como Product Manager Estratégico, trabalhando próximo aos C-levels para definir objetivos, estruturar roadmap e garantir clareza na execução.
            </p>
            <p>
              Meu papel é conectar visão, estratégia e realidade ao o time de engenharia: transformar decisões estratégicas em planos possíveis, comunicar prioridades ao time técnico e sustentar o foco necessário para que o produto avance.
            </p>
          </div>
        </div>
        <div className="flex-1 bg-[#1547b3] text-white p-12 md:p-24 flex flex-col justify-center space-y-8">
          <ExperienceItem text="Gerenciamento de roadmap estratégico e priorização" />
          <ExperienceItem text="Definição de objetivos de produto alinhados ao negócio" />
          <ExperienceItem text="Conexão entre os times de engenharia, design e stakeholders" />
          <ExperienceItem text="Garantia de foco e clareza para que as entregas aconteçam" />
        </div>
      </section>

      {/* --- BASE SECTION (WHITE) --- */}
      <section className="bg-white py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Base que sustenta minha atuação</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <BaseListItem text="Minha trajetória começou no design, com foco em aplicações digitais, ainda antes da consolidação dos produtos digitais como conhecemos hoje." />
              <BaseListItem text="Sou formado em Desenho Industrial (Programação Visual) e possuo pós-graduação em Design de Hipermídia, uma das primeiras formações voltadas ao design interativo, software e experiências digitais no Brasil." />
              <BaseListItem text="Fui Co-fundador e diretor de criação de uma agência de publicidade, onde desenvolvi forte vivência em negócio, relacionamento com clientes e entendimento profundo de dores reais." />
              <BaseListItem text="Com o tempo, minha atuação naturalmente evoluiu para o universo de produtos digitais e software. Passei por funções de UX Designer, Product Designer e Product Manager, unindo formação, estudo e prática." />
            </div>

            <div className="flex items-center">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1a56db] leading-tight">
                Hoje, essa trajetória se reflete em uma visão ampla, que integra estratégia, negócio, design e tecnologia.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORMATION SECTION (DARK) --- */}
      <section className="bg-[#111111] text-white py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">Formação</h2>

          <div className="divide-y divide-gray-800">
            <FormationItem
              title="Bacharel em Desenho Industrial - Programação Visual"
              institution="Universidade Positivo - Curitiba-PR"
            />
            <FormationItem
              title="Pós-graduação em Design de Hipermídia"
              institution="Universidade Anhembi Morumbi - São Paulo-SP"
            />
            <FormationItem
              title="Digital Product Leadership - Product Manager"
              institution="Tera"
            />
            <FormationItem
              title="Marketing Digital - Nanodegree"
              institution="Udacity"
            />
            <FormationItem
              title="Estratégias Digitais de Marketing"
              institution="Escola Superior de Propaganda e Marketing - São Paulo-SP"
            />
            <FormationItem
              title="Atendimento em Agências de Comunicação"
              institution="Escola Superior de Propaganda e Marketing - São Paulo-SP"
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#111111] py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-center gap-8">
          <a href="#" className="hover:opacity-70 transition-opacity">
            <img src="/images/Whatsapp.svg" alt="WhatsApp" className="w-8 h-8 grayscale invert" />
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity">
            <img src="/images/linkedin.svg" alt="LinkedIn" className="w-8 h-8 grayscale invert" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function ExperienceItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-blue-500 mt-1">
        <ChevronRight className="w-5 h-5" />
      </span>
      <p className="text-lg leading-relaxed text-gray-300">{text}</p>
    </div>
  );
}

function BaseListItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-blue-600 mt-1">
        <ChevronRight className="w-6 h-6" />
      </span>
      <p className="text-lg leading-relaxed text-gray-700">{text}</p>
    </div>
  );
}

function FormationItem({ title, institution }: { title: string; institution: string }) {
  return (
    <div className="py-10">
      <h4 className="text-xl md:text-2xl font-medium mb-2 tracking-tight">{title}</h4>
      <p className="text-gray-400 text-lg">{institution}</p>
    </div>
  );
}
